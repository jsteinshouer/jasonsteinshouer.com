---
layout: post
title: "Using Environment Variables to Populate JSON Templates in .NET"
date: 2024-11-23
tags: [.NET]
excerpt: "I have a JSON document template for authenticating with a remote API. I don't want to store actual secret credentials in the template. Instead, I want to read the secrets from the environment, populate the JSON payload using the template, and pass in the secret credentials."
permalink: "using-env-vars-to-populate-json-in-dotnet.html"
---

I have a JSON document template for authenticating with a remote API. I don't want to store actual secret credentials in the template. Instead, I want to read the secrets from the environment, populate the JSON payload using the template, and pass in the secret credentials.

I have been doing web development for a while but don't have a lot of experience with .NET. While there may be better approaches and alternative designs that avoid this solution entirely, I saw this as a valuable learning opportunity and wanted to explore it.

## My Approach

### applicationSettings.json
    
This file stores the settings structure without any secret values, making it safe to commit to source control.
    
```json
{
    "MyAppSettings": {
        "credentials": {
            "credentialsKey1": {
                "username": "",
                "password": "",
                "clientId": ""
            }
        }
    }
}
```
    
### Environment variables
    
Environment variables store the actual secret values. The .NET configuration provider nests the data using double underscores `__` as separators. 

Best practices for loading environment variables in my development environment was another thing I struggled with but will save that for a separate topic of discussion.
    
```
MyAppSettings__credentials__credentialsKey1__username=TheUsername
MyAppSettings__credentials__credentialsKey1__password=Password1
MyAppSettings__credentials__credentialsKey1__clientId=123456
```
    
### Program.cs
    
In our `Program.cs` file we can tell the configuration provider to load application settings from environment variables last so that they override anything in application settings.

```csharp
builder.Configuration
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", true, true)
    .AddEnvironmentVariables();
```
    
### Example


```csharp
private object GetCredentialsObject(string credentialsKey, string jsonTemplate, IConfiguration configuration)
{
    string json = jsonTemplate;
    IEnumerable<System.Collections.Generic.KeyValuePair<string, string?>> credentials = configuration.GetSection("MyAppSettings").GetSection("credentials").GetSection(credentialsKey).AsEnumerable(true);

    foreach ((string key, string? value) in credentials)
    {
        json = json.Replace( $"{% raw %}{{{key}}}{% endraw %}", value);
    }

    return JsonSerializer.Deserialize<dynamic>(json);
}
```

```csharp
public object TestGetCredentialsObject(IConfiguration configuration)
{

    var credentialsKey = "credentialsKey1"; 

    string jsonTemplate = @"
    {
        ""grant_type"": ""password"",
        ""username"": ""{username}"",
        ""password"": ""{password}"",
        ""clientId"": ""{clientId}""
    }";

    return GetCredentialsObject(credentialsKey,jsonTemplate,configuration);
}
```
    
An important note is that this is case-sensitive so the case used between environment variables and application settings has to match.
    

## Alternative Approaches

### String Interpolation
    
I would need to hard code the json template for string interpolation to work as it is done at compilation. For this solution I wanted the json template to be able to change at runtime. 
    
### Using `String.Format`
    
This was a possible option that I explored but seemed more complex.
    
### Others
    
I am sure there are alternative designs I could use. One may be to implement a class for each explicitly define the object and populate it with secret values.