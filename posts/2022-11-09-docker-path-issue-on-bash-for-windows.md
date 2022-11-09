---
layout: post
title: "Issues Running Docker in Git Bash for Windows"
date: 2022-11-09
tags: [Docker]
excerpt: ""
permalink: "docker-path-issue-on-bash-for-windows.html"
---

For awhile I had issues with trying to run some docker commands using Git Bash in Windows. I would typcially have to move over to Powershell and run them to get it to work the way I expected. An example is this command to try and open a shell for a container it would give me an error.

```bash
$ docker exec -t mycontainer /bin/bash
OCI runtime exec failed: exec failed: container_linux.go:380: starting container process caused: exec: "C:/Program Files/Git/usr/bin/bash": stat C:/Program Files/Git/usr/bin/bash: no such file or directory: unknown
```

Another example is when it would mount the wrong directory to a container.

```
docker run -v /$PWD:/usr/share/nginx/html:ro -p 8000:80 nginx
```

Eventually I got frustrated enough to try to find out why. After a bit of searching I found out that the issue is Git Bash will attempt to convert the file path to a windows file path. This caused problems because the docker containers are Linux.

One workaround is to add an extra slash at the beginning of the path. This tells Git Bash to not convert it. 

```bash
docker exec -t mycontainer //bin/bash
```

```bash
docker run -v //$PWD://usr/share/nginx/html:ro -p 8000:80 nginx
```

You can also globally disable the POSIX path conversion in Git Bash (MinGW) by setting `MSYS_NO_PATHCONV=1`. 

I solution I ended using was to use this function in my `.bashrc` file to disable the POSIX path conversion just for the `docker` command. 

```bash
# Workaround for Docker for Windows in Git Bash.
docker()
{
  (export MSYS_NO_PATHCONV=1; "docker.exe" "$@")
}
```

I found the solution on this [Stack Overflow](https://stackoverflow.com/questions/48427366/docker-build-command-add-c-program-files-git-to-the-path-passed-as-build-argu) thread. There is also a reference to it in this [Github Issue](https://github.com/docker-archive/toolbox/issues/673#issuecomment-355275054).