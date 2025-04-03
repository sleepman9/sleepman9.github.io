---
title: Vscode Debug 
description: .vscode中的文件配置
date: 2025-04-03 
image: 
categories:
    - Tools
tags:
    - Vscode

---

**.vscode launch.json 调试设置**

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


这段 JSON 配置文件是为 Visual Studio Code (VSCode) 中的调试器或运行器设置的，特别是用于运行 Python 脚本 `run.py`。这是 VSCode 的 **launch.json** 文件配置的一部分，用于设置如何运行 Python 程序以及传递的参数。下面是每个部分的解释：

###  **version**: "0.2.0"
   - 这是 VSCode 配置文件的版本号，表示该配置文件遵循的格式版本。`0.2.0` 是比较老的版本，但它仍然被广泛使用。

###  **configurations**: []
   - 该数组包含一个或多个配置对象，每个配置代表一种不同的调试或运行方式。在这里，只有一个配置对象。

###  配置对象解释：

```json
{
    "name": "Python: Run run.py",
    "type": "python",
    "request": "launch",
    "program": "${workspaceFolder}/run.py",
    "args": [
        "thermal",
        "-i",
        "${workspaceFolder}/case/3DIC_real_case/test_simulation.json",
        "-o",
        "${workspaceFolder}/case/3DIC_real_case/output"
    ],
    "console": "integratedTerminal"
}
```

####  **name**: `"Python: Run run.py"`
   - 这是配置的名称，用于标识和显示该配置。这个名称在 VSCode 的调试配置选择器中会出现，方便用户选择执行哪个配置。

#### **type**: `"python"`
   - 这表示配置类型为 Python，告诉 VSCode 使用 Python 解释器来执行程序。

####  **request**: `"launch"`
   - 该设置表明这是一个启动配置，而不是附加配置（`attach`）。即，当点击 "启动" 或 "调试" 按钮时，VSCode 会运行这个配置来启动 Python 脚本。

####  **program**: `"${workspaceFolder}/run.py"`
   - 指定要执行的 Python 程序。`${workspaceFolder}` 是一个内置变量，代表当前工作区的根文件夹路径。所以这里表示执行 `run.py` 脚本，该脚本位于工作区根目录下。

####  **args**: `[ "thermal", "-i", "${workspaceFolder}/case/3DIC_real_case/test_simulation.json", "-o", "${workspaceFolder}/case/3DIC_real_case/output" ]`
   - 这是传递给 Python 脚本 `run.py` 的命令行参数。
     - `"thermal"`：传递给脚本的第一个参数，可能是某种运行模式或功能的标志。
     - `"-i"` 和 `"${workspaceFolder}/case/3DIC_real_case/test_simulation.json"`：`-i` 可能是输入文件的标志，后面跟着路径指向一个 JSON 配置文件。
     - `"-o"` 和 `"${workspaceFolder}/case/3DIC_real_case/output"`：`-o` 可能是输出目录或文件的标志，后面跟着路径指向输出目录。
     
     这些参数可以让 `run.py` 根据输入的 JSON 配置文件进行仿真，并将结果输出到指定目录。

####  **console**: `"integratedTerminal"`
   - 该设置指定程序输出将在 VSCode 内部集成的终端中显示，而不是在外部终端中显示。这样，用户可以直接在 VSCode 的终端面板中查看程序输出。

### 总结：
这段配置文件的作用是设置一个 Python 调试或运行配置，在运行时：
- 执行 `run.py` 脚本。
- 传递三个命令行参数：`thermal`（运行模式），`-i` 后跟输入文件的路径，`-o` 后跟输出目录的路径。
- 输出将显示在 VSCode 的集成终端中。

这是设置调试或运行 Python 脚本的常见方式，尤其是在涉及到多个输入输出参数时。