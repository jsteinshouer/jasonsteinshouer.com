---
layout: post
title: "Creating Java Thread Dumps for Coldfusion with Jstack"
date: 2023-11-09
tags: [CFML,Coldfusion,Java]
excerpt: "Another option to see what is going on at a specific point in time is to generate a JVM Thread Dump. You can generate a thread dump by using the jstack tool that comes with the Java Development Kit (JDK)."
permalink: "coldfusion-thread-dumps-with-jstack.html"
---

In Fusion Reactor, you can see a stack trace of a request to a Coldfusion application. This is a great tool to see what is going on when trying to debug a performance problem. I highly recommend having Fusion Reactor in your toolbelt.

Another option to see what is going on at a specific point in time is to generate a JVM Thread Dump. You can generate a thread dump by using the `jstack` tool that comes with the Java Development Kit (JDK). Here is the output of `jstack -h` on Windows. 

```bash
$./bin/jstack -h
Usage:
    jstack [-l][-e] <pid>
        (to connect to running process)

Options:
    -l  long listing. Prints additional information about locks
    -e  extended listing. Prints additional information about threads
    -? -h --help -help to print this help message
```

According to the [online documentation](https://docs.oracle.com/en/java/javase/17/docs/specs/man/jstack.html) , the tool prints a Java stack trace the Java threads in the specified process ID. 

To find the Windows process ID (PID), you can use the `tasklist` command or run the Task Manager program to find it.

```bash
D:\ColdFusion2021\jre>tasklist | findstr /c:"coldfusion.exe"
coldfusion.exe               13852 Services                   0  7,834,132 K
```

We then use that PID with `jstack` to get our thread dump. You may need to run the Command Prompt as an Administrator to avoid access denied errors. By default it prints the output to the console but here I am redirecting the output to a file to make it easier to read and search later. 

```bash
D:\ColdFusion2021\jre>.\bin\jstack 13852 > java_dump.txt
```

The topic of what to look for in the thread dump could probably be a whole other blog article.It will likely depend on the issue you are trying to debug. If you are debugging in your development environment there may only be a single request. If the dump is from production there will probably be multiple threads handling requests at the time the dump was taken. In this case, you may be looking for a specific request or just a thread that is in a running, waiting, or blocked status.

I am sure there are many other ways to do this but this is one that worked for me so wanted to document it here. There is probably a lot of [content](https://duckduckgo.com/?q=java+thread+dump) out there on this subject as well as how to [analyze the thread dump](https://duckduckgo.com/?q=analyze+java+thread+dump). [Charlie Arehart's blog](https://www.carehart.org/) is also great resource for this kind of information related to Coldfusion. 