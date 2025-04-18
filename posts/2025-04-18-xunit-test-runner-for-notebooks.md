---
layout: post
title: "Building an xUnit Test Runner for Jupyter Notebooks using AI"
date: 2025-04-18
tags: [.NET, Jupyter, Copilot, AI]
excerpt: "In order to execute the xUnit tests in the notebook. I needed a test runner that would work in the notebook. Instead of me spending hours researching how to do it I asked Copilot to see what it could come up with."
permalink: "xunit-test-runner-for-notebooks.html"
---

I am behind the curve when it comes to using an AI coding assistant. I just recently started playing around with MS Copilot in VS Code. I am also been learning the [xUnit test framework](https://xunit.net/) for .NET and wanted to be able to create some working test examples inside a [Jupyter notebook](https://jupyter.org/). I am using the [Polyglot Notebooks](https://code.visualstudio.com/docs/languages/polyglot) extension for VS Code. 

In order to execute the xUnit tests in the notebook. I needed a test runner that would work in the notebook. Instead of me spending hours researching how to do it I asked Copilot to see what it could come up with.

To start off I created a notebook that installed the xUnit package. This is a “magic” command you can use to install Nuget packages.

```csharp
#r "nuget:xunit"
```

I then added this class with two tests.

```csharp
using Xunit;

public class CalculatorTests
{
    [Fact]
    public void Add_ShouldReturnCorrectSum()
    {
        int result = Add(2, 3);
        Assert.Equal(5, result);
    }

    [Fact]
    public void Add_TestShouldFail()
    {
        int result = Add(1, 1);
        Assert.Equal(3, result);
    }

    private int Add(int a, int b) => a + b;
}
```

I then prompted Copilot with:

> Can you write a simple xunit test runner that allows me to pass in a single test class?
> 

Copilot thought about it and then generated this:

```csharp
using System;
using System.Linq;
using System.Reflection;
using Xunit;

public class SimpleTestRunner
{
    public static void RunTests(Type testClassType)
    {
        Console.WriteLine($"Running tests in {testClassType.Name}...");

        // Create an instance of the test class
        var testClassInstance = Activator.CreateInstance(testClassType);

        // Get all methods with the [Fact] attribute
        var testMethods = testClassType.GetMethods()
            .Where(m => m.GetCustomAttributes(typeof(FactAttribute), false).Any());

        foreach (var method in testMethods)
        {
            try
            {
                Console.WriteLine($"Running {method.Name}...");
                method.Invoke(testClassInstance, null);
                Console.WriteLine($"✔ {method.Name} passed.");
            }
            catch (TargetInvocationException ex)
            {
                Console.WriteLine($"✘ {method.Name} failed: {ex.InnerException?.Message}");
            }
        }
    }
}

SimpleTestRunner.RunTests(typeof(CalculatorTests));
```

It did a nice job of explaining how the code works. It also explained the limitation of only supporting the `[fact]` attribute but said it could be extended to support `[Theory]` as well as other xUnit attributes if needed. It gave an example of what the output should look like. 

When I executed it I was shocked to see that it worked without any tweaking necessary. The output matched exactly with what Copilot said it should be.

```
Running tests in CalculatorTests...
Running Add_ShouldReturnCorrectSum...
✔ Add_ShouldReturnCorrectSum passed.
Running Add_TestShouldFail...
✘ Add_TestShouldFail failed: Assert.Equal() Failure: Values differ
Expected: 3
Actual:   2
```

In the little experience I have had previously there is usually some changes needed before the code will run. This also lines up with experiences I have heard from other developers as well.

I later added this in the `catch` block to show a stacktrace if an exception occurs.

```csharp
if ( ex.InnerException?.GetType().Namespace != "Xunit.Sdk" )
{
    Console.Write($"{ex.InnerException?.StackTrace}");
}
```

I then added a new xUnit test using the `[Theory]` attribute and asked Copilot to extend it to support the `[Theory]` attribute with inline data.

```csharp
using Xunit;

public class InlineDataTest
{
    [Theory]
    [InlineData(1, 1)]
    [InlineData(2, 2)]
    [InlineData(5, 5)]
    public void Should_be_equal(int value1, int value2)
    {
        Assert.Equal(value1, value2);
    }
}
SimpleTestRunner.RunTests(typeof(InlineDataTest));
```

The code generated from this prompt did not work however. There was a problem with how it was passing the data to the `Invoke` method. Here is a snippet of the offending code.

```csharp
Console.WriteLine($"Running {method.Name} with arguments: {string.Join(", ", data.Data)}...");
method.Invoke(testClassInstance, data.Data);
```

It generated this error when executed.

```
Error: (32,107): error CS1061: 'InlineDataAttribute' does not contain a definition for 'Data' and no accessible extension method 'Data' accepting a first argument of type 'InlineDataAttribute' could be found (are you missing a using directive or an assembly reference?)
```

I fed the error back to the Copilot prompt. It then told me to use  `data.GetData(method)`. Which then compiled and executed but was giving me a runtime error that parameter count mismatch. It took me awhile to figure out that it was actually an array of an array. After some debugging I landed on this to get it working.

```csharp
var parameters = data.GetData(method).ToArray<object[]>()[0];
Console.WriteLine($"Running {method.Name} with arguments: {String.Join(",", parameters)}...");
method.Invoke(testClassInstance, parameters);
```

Here is the full test runner class I ended up with. 

```csharp
using System;
using System.Linq;
using System.Reflection;
using Xunit;

public class SimpleTestRunner
{
    public static void RunTests(Type testClassType)
    {
        Console.WriteLine($"Running tests in {testClassType.Name}...");

        // Create an instance of the test class
        var testClassInstance = Activator.CreateInstance(testClassType);

        // Get all methods with the [Fact] or [Theory] attribute
        var testMethods = testClassType.GetMethods()
            .Where(m => m.GetCustomAttributes(typeof(FactAttribute), false).Any() ||
                        m.GetCustomAttributes(typeof(TheoryAttribute), false).Any());

        foreach (var method in testMethods)
        {
            var theoryData = method.GetCustomAttributes(typeof(InlineDataAttribute), false)
                                   .Cast<InlineDataAttribute>();
            
            if (theoryData.Any())
            {
                // Handle [Theory] with [InlineData]
                foreach (var data in theoryData)
                {
                    try
                    {
                        var parameters = data.GetData(method).ToArray<object[]>()[0];
                        Console.WriteLine($"Running {method.Name} with arguments: {String.Join(",", parameters)}...");
                        method.Invoke(testClassInstance, parameters);
                        Console.WriteLine($"✔ {method.Name} passed.");
                    }
                    catch (TargetInvocationException ex)
                    {
                        Console.WriteLine($"✘ {method.Name} failed: {ex.InnerException?.Message}");
                        if ( ex.InnerException?.GetType().Namespace != "Xunit.Sdk" )
                        {
                            Console.Write($"{ex.InnerException?.StackTrace}");
                        }
                    }
                }
            }
            else
            {
                // Handle [Fact]
                try
                {
                    Console.WriteLine($"Running {method.Name}...");
                    method.Invoke(testClassInstance, null);
                    Console.WriteLine($"✔ {method.Name} passed.");
                }
                catch (TargetInvocationException ex)
                {
                    Console.WriteLine($"✘ {method.Name} failed: {ex.InnerException?.Message}");
                    if ( ex.InnerException?.GetType().Namespace != "Xunit.Sdk" )
                    {
                        Console.Write($"{ex.InnerException?.StackTrace}");
                    }
                }
            }
        }
    }
}
```

You can even save it in the same directory as your notebook and load it like this. This way you can use share it with multiple notebooks if needed.

```csharp
#load "SimpleTestRunner.cs"
```

```csharp
SimpleTestRunner.RunTests(typeof(CalculatorTests));
```

```
Running tests in CalculatorTests...
Running Add_ShouldReturnCorrectSum...
✔ Add_ShouldReturnCorrectSum passed.
Running Add_TestShouldFail...
✘ Add_TestShouldFail failed: Assert.Equal() Failure: Values differ
Expected: 3
Actual:   2
```

I realize this is probably yak shaving at it’s best but I was happy with what was produced. I thought the test runner is worth sharing. Here is an [Github Gist](https://gist.github.com/jsteinshouer/eb19cadb3c2d4b2b35ed895c2943be77) of the example as well. 

I think the more important thing was getting some experience using AI as a coding tool. I was able to come up with a solution using Copilot much quicker than I could have on my own. 

I spend more time reading code then writing new code so I plan to also explore using AI to help me understand code better and quicker as well. I am also interested to see how it can help with refactoring.