---
title: Vscode Debug 
description: .vscode中如何设置配置文件
date: 2025-04-03 
image: 
categories:
    - Tools
tags:
    - Vscode

---

## Python
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

## C++

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

## 总结
无论是python还是c++还是别的语言，本质都是一样的。他们的大前提都是需要是一个**可执行的文件**（python脚本直接相当于一个可执行，而CPP需要先编译成可执行文件）