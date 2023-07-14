---
layout: post
title: "Using the CFML Jupyter Kernel with VS Code"
date: 2023-07-13
tags: [CFML,Jupyter]
excerpt: ""
permalink: "using-cfml-jupyter-kernel-with-vscode.html"
---

I created a new CFML Jupyter Kernel powered by CommandBox. This project is open source, and hosted on GitHub at [https://github.com/jsteinshouer/cfml-jupyter-kernel](https://github.com/jsteinshouer/cfml-jupyter-kernel).



## Overview


[https://github.com/jsteinshouer/cfml-jupyter-kernel](https://github.com/jsteinshouer/cfml-jupyter-kernel)

Pre-requisites

1. VS Code + [Python Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) + [Jupyter Extension](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)
2. Install [CommandBox](https://www.ortussolutions.com/products/commandbox#download) v5.9.0+ to the system path.
3. [Python](https://www.python.org/downloads/)

## Pre-requisites

**VS Code**

**CommandBox**

The cfml-jupyter kernel uses the [CommandBox REPL]() so you will need to install version 5.9.0 or greater. 
you can download it [here](https://www.ortussolutions.com/products/commandbox#download). Follow the [installation instructions](https://commandbox.ortusbooks.com/setup/installation) but make sure it is accesible in the system path.




### Kernel Installation

It can be installed from PyPi using `pip`.

```bash
python -m pip install cfml-kernel
python -m cfml_kernel.cfscript.install
python -m cfml_kernel.cfml.install
```

In Windows I had to install them with the `--sys-prefix` flag to get VS Code to recognize them.

```bash
python -m pip install cfml-kernel
python -m cfml_kernel.cfscript.install --sys-prefix
python -m cfml_kernel.cfml.install --sys-prefix
```

Then after restarting VS Code they would be available as a kernel option.

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