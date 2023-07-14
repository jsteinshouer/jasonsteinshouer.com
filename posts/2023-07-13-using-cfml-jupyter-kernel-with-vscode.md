---
layout: post
title: "Using the CFML Jupyter Kernel with VS Code"
date: 2023-07-13
tags: [CFML,Jupyter]
excerpt: "setup and use the CFML Jupyter Kernel locally with VS Code."
permalink: "using-cfml-jupyter-kernel-with-vscode.html"
---

My notes for how to setup and use the [CFML Jupyter Kernel](https://github.com/jsteinshouer/cfml-jupyter-kernel) locally with VS Code.

## Overview

**Pre-requisites**

1. Download and install [Python](https://www.python.org/downloads/).
2. Install VS Code + [Python Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) + [Jupyter Extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)
2. Install [CommandBox](https://www.ortussolutions.com/products/commandbox#download) v5.9.0+ and add it to the system path.

**Install the CFML Julyter Kernels**

```bash
python -m pip install cfml-kernel
python -m cfml_kernel.cfscript.install
python -m cfml_kernel.cfml.install
```

**Note: Depending on your platform you may need to use the `--sys-prefix` flag on the last two commands to get VS code to recognize the Jupyter Kernels.

## Pre-requisites

### Python

The CFML Jupyter Kernel is a Python module so Python is needed to run it. [Download](https://www.python.org/downloads/) and install the version for your platform. You could also use a package manager to install it as well. i.e. On Windows you could use the [Chocolatey package manager](https://chocolatey.org/).

```bash
choco install python
```

### VS Code

I will assume if you are reading this you already have VS Code installed. You will also need to install the [Python Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter Extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) VS Code extensions.

### CommandBox

The cfml-jupyter kernel uses the [CommandBox REPL](https://commandbox.ortusbooks.com/usage/repl) so you will need to install version 5.9.0 or greater. 
you can download it [here](https://www.ortussolutions.com/products/commandbox#download). Follow the [installation instructions](https://commandbox.ortusbooks.com/setup/installation) but make sure it is accesible in the system path.

## Kernel Installation

The CFML Jupyter Kernel package can be installed from PyPi using `pip`.

```bash
python -m pip install cfml-kernel
```

Once the module is installed you need to use these commands to install the CFScript and Tag kernels so that Jupyter will recognize them.

```bash
python -m cfml_kernel.cfscript.install
python -m cfml_kernel.cfml.install
```

In Windows I had to install them with the `--sys-prefix` flag to get VS Code to recognize them.

```bash
python -m cfml_kernel.cfscript.install --sys-prefix
python -m cfml_kernel.cfml.install --sys-prefix
```

Then after restarting VS Code they would be available as a kernel option.

## Usage

If all the above goes well, you should be able to create a new Jupyter notebook in VS Code by opening the Command Pallete (Ctrl+Shift+P) then typing `New Jupyter Notebook`.

Then click Select Kernel.

![Select Kernel1](https://jasonsteinshouer.s3.us-west-2.amazonaws.com/images/jupyter/select-kernel-1.png)

Select Jupyter Kernel...

![Select Kernel2](https://jasonsteinshouer.s3.us-west-2.amazonaws.com/images/jupyter/select-kernel-2.png)

Then choose the kernel that you would like to use.

![Select Kernel3](https://jasonsteinshouer.s3.us-west-2.amazonaws.com/images/jupyter/select-kernel-3.png)

You can then Use the +Code button to add new Code Cells. Type the code you want to execute then click the triangle shaped icon to execute the code. Variables should persist between code cell execution.

![CFML Kernel Usage Example](https://jasonsteinshouer.s3.us-west-2.amazonaws.com/images/jupyter/notebook-example.png)