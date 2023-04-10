---
layout: post
title: "Introducing the CFML Jupyter Kernel"
date: 2023-04-10
tags: [CFML,Python,Jupyter]
excerpt: "I created a new CFML Jupyter Kernel powered by CommandBox. This project is open source, and hosted on GitHub."
permalink: "introducing-cfml-jupyter-kernel.html"
---
## TL;DR

I created a new CFML Jupyter Kernel powered by CommandBox. This project is open source, and hosted on GitHub at [https://github.com/jsteinshouer/cfml-jupyter-kernel](https://github.com/jsteinshouer/cfml-jupyter-kernel).

## Table of Contents
- [Introduction](#introduction)
- [What is a Jupyter Notebook?](#what-is-a-jupyter-notebook)
  - [Documents](#documents)
  - [Jupyter Application](#jupyter-application)
  - [Kernels](#kernels)
  - [Use Cases](#use-cases)
- [CFML Kernel](#cfml-kernel)
  - [Magic Commands](#magic-commands)
  - [CFML Examples](#cfml-examples)
  - [Usage](#usage)
  - [Next steps](#next-steps)

## Introduction

I recently went through an introductory course for learning Python on linked in learning. I typically like to do some kind of project when learning a new language or technology.

 Jupyter notebooks is something that has interested me so I started playing around to see if I could add a Jupyter Kernel for CFML. I decided to try and implement one that interacts with the CommandBox REPL. While researching I came across some examples doing this with other languages so thought I could possibly use those as a starting point. 

## What is a Jupyter Notebook?

### Documents

A Jupyter notebook is shareable document that typically contains three elements or “cells” as they are called. 

1. **Text -** This is formatted text, typically written in Markdown but rendered as HTML. 
2. **Code** - This is an input cell that contains code that can be executed in the document.
3. **Output** - These cells will contain the output of the executed code.

The documents use specific data schema stored in JSON format. The the file extension they use is `ipynb.`

### Jupyter Application

There are various applications that can be used to interact with and edit Jupyter notebooks.

**VS Code**

VS Code has a Jupyter extension that allows you to edit and view Jupyter notebooks within VS Code. The nice thing about it is the syntax highlighting and editing experience matches what you get with VS Code. 

This means you can also use Github Codespaces as well.

**Jupyter Lab**

This is a web application that has a nice interface for creating, editing, and viewing Jupyter notebooks. 

************Others************

See [https://jupyter.org/](https://jupyter.org/) for information on some of the other options available.

### Kernels

Jupyter kernels add support for different languages. The Jupyter application sends the executable code to the kernel. The Kernel is responsible for executing it and returning the result. They have a [list of kernels here.](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels)

### Use Cases

Jupyter notebooks are used pretty heavily in the data science community. My first exposure to them was when someone did a demo for me using the Pandas Python library to do some data exploration and transformation within a Jupyter notebook interface. More recently I started using Azure Data Studio which has support for running SQL code within a Jupyter notebook. 

Besides data science, here are some use cases that came to mind:

- Learning new languages without needing to setup a complete development environment
- Documentation with executable examples
- Interactive books to teach programing concepts
- Training materials
- Research and debugging

One example I found was [this project](https://github.com/IHaskell/learn-you-a-haskell-notebook) , which is an interactive book for learning Haskell.

## CFML Kernel

This project is a Jupyter kernel that uses Python to interact with the CommandBox REPL for executing CFML code. There is a kernel for both cfscript and cfml tags. The code for the project is open source and hosted on Github.

[https://github.com/jsteinshouer/cfml-jupyter-kernel](https://github.com/jsteinshouer/cfml-jupyter-kernel)

### Magic Commands

The IPython kernel has a concept called [magic commands](https://ipython.readthedocs.io/en/stable/interactive/magics.html) which are special commands that can be called in the notebook cell. I have implemented a couple commands for the CFML kernel.

**$install**

This command can be used to call the [CommandBox install command](https://commandbox.ortusbooks.com/package-management/installing-packages) to install packages from ForgeBox. 

![$install qb](https://static.jasonsteinshouer.com/images/jupyter/Code_pxKLOOuMfw.png)

**$loadjar**

This is a wrapper for the CommandBox [classLoad](https://commandbox.ortusbooks.com/developing-for-commandbox/commands/loading-ad-hoc-jars#classload) method that will allow you to load custom jar and class files.

![$loadjar](https://static.jasonsteinshouer.com/images/jupyter/Code_vWjnezmiSp.png)

### CFML Examples

**ArrowFunctions.ipynb**

<script src="https://gist.github.com/jsteinshouer/61e426c715fd14fe161bef89be32fc44.js"></script>

You can execute this example on mybinder.org using this link:

[![Run this example on mybinder.org](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jsteinshouer/cfml-jupyter-kernel/main?urlpath=/tree/cfml_examples/ArrowFunctions.ipynb)

**cfquery.ipynb**

A simple example of using cfquery:

<script src="https://gist.github.com/jsteinshouer/29f86ad2b31a1285c0b36f1e5e7ee6c1.js"></script>

You can execute this example on mybinder.org using this link:

[![Run this example on mybinder.org](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jsteinshouer/cfml-jupyter-kernel/main?urlpath=/tree/cfml_examples/cfquery.ipynb)

### Usage

**Local**

It can be installed locally by cloning the repo. CommandBox and Python are required.

```bash
git clone https://github.com/jsteinshouer/cfml-jupyter-kernel.git
pip install ./cfml-jupyter-kernel
python -m cfml_kernel.cfscript.install
python -m cfml_kernel.cfml.install
```

**MyBinder.org**

This URL can be used to run the CFML Jupyter kernel and create and edit notebooks. The `urlpath` parameter can point to any notebook accessible on the internet or you can also upload one. 

https://mybinder.org/v2/gh/jsteinshouer/cfml-jupyter-kernel/main?urlpath=/tree

**Docker**

I have created a pre-built image with Jupyter, CommandBox, and the CFML kernel installed. Here is an example of how to run it.

```bash
docker run -v ${PWD}:/home/jovyan/work -p 8888:8888 -e JUPYTER_TOKEN=123 ghcr.io/jsteinshouer/cfml-jupyter:latest
```


**Github Codespaces / Dev Container**

Here is an example `devcontainer.json` file that can be used to run the CFML Kernel with Github Codespaces or the VS Code Dev Containers extension.

```json
{
    "workspaceFolder": "/workspace",
    "image": "ghcr.io/jsteinshouer/cfml-jupyter:latest"
    "settings": {
        "terminal.integrated.shell.linux": "/bin/bash"
    },
    "extensions": [
		"formulahendry.auto-close-tag",
		"kamasamak.vscode-cfml",
		"ms-toolsai.jupyter",
		"ms-python.python"
	],
    "forwardPorts": [
        8888
    ],
    "remoteUser": "jovyan"
}
```

### Next steps

One thing I am looking to do next is add support for rendering other types of output some as html. There may be some other magic commands that could be useful as well. Please create an issue if you have any ideas.