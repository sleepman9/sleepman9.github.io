---
title: vscode相关技巧
description: debug，插件，远程等
date: 2025-03-24 
image: cover.jpg
categories:
    - Tools
tags:
    - vscode 
    - copliot
    - code
---

## Copilot在SSH远程环境中无法调出

1. 按F1键调出命令行，输入settings.json，选择远程环境中的配置文件：
![alt text](asserts/copliot.png)

2. 添加如下配置：
```json

    "remote.extensionKind": {
        "GitHub.copilot": ["ui"],
        "GitHub.copilot-chat": ["ui"],
    },
```
3. 重启VS Code即可。

                      
[原文链接](https://blog.csdn.net/qq_43948052/article/details/146123406)

## Vscode Debug
### Python
.vscode中 launch.json 调试设置

```json
{
    "version": "0.2.0", // 配置文件的版本号
    "configurations": [
        {
            "name": "Python: Run run.py", // 配置的名称，用于在调试配置列表中标识此配置
            "type": "python", // 调试器的类型，这里使用的是 Python 调试器
            "request": "launch", // 请求类型，表示启动一个新的调试会话
            "program": "${workspaceFolder}/run.py", // 要调试的 Python 程序的路径（需要是一个可以运行的程序）
            "args": [ //所有参数的列表
                "thermal", // 第一个参数，表示运行模式
                "-i", // 输入文件参数
                "${workspaceFolder}/case/3DIC_real_case/test_simulation.json", // 输入文件的路径
                "-o", // 输出文件参数
                "${workspaceFolder}/case/3DIC_real_case/output" // 输出文件夹的路径
            ],
            "console": "integratedTerminal" // 指定调试时使用的控制台类型，这里使用集成终端
        }
    ]
}
```


这段 JSON 配置文件是为 Visual Studio Code (VSCode) 中的调试器或运行器设置的，特别是用于运行 Python 脚本 `run.py`。这是 VSCode 的 **launch.json** 文件配置的一部分，用于设置如何运行 Python 程序以及传递的参数。

### C++

> 前提：你需要先把 C++ 工程编译生成可执行文件

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "C++ (gdb): Run run.exe (args like Python)",
      "type": "cppdbg",
      "request": "launch",
      "program": "${workspaceFolder}/build/run.exe",
      "args": [
        "thermal",
        "-i",
        "${workspaceFolder}/case/3DIC_real_case/test_simulation.json",
        "-o",
        "${workspaceFolder}/case/3DIC_real_case/output"
      ],
      "cwd": "${workspaceFolder}",
      "MIMode": "gdb",
      "miDebuggerPath": "C:/msys64/mingw64/bin/gdb.exe",
      "externalConsole": false
    }
  ]
}
```
### conda环境中debug
> 背景：当前conda环境为`A`,按`F5` 开启`debug`，会在`base`环境中`debug`，导致库文件缺失。

**solution:** 指定`python`和`env`

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug (pcbnewPaddle)",
      "type": "python",
      "request": "launch",
      "program": "${file}",
      "console": "integratedTerminal",
      "python": "/opt/conda/envs/pcbnewPaddle/bin/python",  //指定环境的python
      "env": {
        "CONDA_DEFAULT_ENV": "pcbnewPaddle",
        "CONDA_PREFIX": "/opt/conda/envs/pcbnewPaddle"
      }
    }
  ]
}
```

或者默认不设置

```
{
    "version": "0.2.0",
    "configurations": [

        {
            "type": "debugpy",
            "request": "launch",
            "name": "debug Current Python File",
            "program": "${file}",
            "console": "integratedTerminal"
            
        }
    ]
}
```






### 总结
无论是python还是c++还是别的语言，本质都是一样的。他们的大前提都是需要是一个**可执行的文件**（python脚本直接相当于一个可执行，而CPP需要先编译成可执行文件）


## vscode ssh无法连接
[我只教一次！vscode remote-ssh 连接失败的基本原理和优雅的解决方案](https://zhuanlan.zhihu.com/p/671718415)

按照链接中的内容，在远程服务器上，将本机commit ID相关内容删除。（使用的mobaxterm连接远程服务器）

## 网络中断对正在执行程序的影响
> 这里只讨论ssh远程连接服务器的情况

影响因素通常与这个进程挂载在前端还是后端（远程服务器）。为了避免此类因素造成的时间浪费，一律使用`nohup / tmux / screen`方案。

### tmux
首选`tmux`
**例如：**
```
tmux new -s train   
python train.py
# 断网也不怕

#解释
new: new-session 的缩写，表示创建一个新会话。
-s train: s 是 session name 的缩写。
-s: 指定会话名称的参数标志。
train: 你给这个会话起的名字（这里起名为 "train"，方便后续区分是跑训练任务的）。


断线后重连：
tmux attach -t train


attach: attach-session 的缩写，表示连接到某个已存在的会话。
-t train: t 是 target session 的缩写。
-t: 指定目标会话的参数标志。
train: 你刚才创建时起的名字。
```

### 使用 nohup (系统自带，无需安装)
```
nohup python train.py > my_log.log 2>&1 &

命令解释：
nohup: 让程序忽略挂起信号（SIGHUP），即关闭终端时不终止程序。
python train.py: 你要运行的命令。
> my_log.log: 将标准输出保存到 my_log.log 文件中（因为程序在后台跑，你看不到屏幕输出）。
2>&1: 将错误输出（stderr）也重定向到标准输出（stdout），即都写进 log 文件。
&: 让命令在后台运行。

查看/杀死进程：

查看: ps -ef | grep train.py
停止: kill <PID> (PID 是查看命令显示出来的进程号)

```

