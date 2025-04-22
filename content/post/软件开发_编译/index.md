---
title: 软件开发——编译
description: Hello build! 
date: 2025-04-18 
image: 
categories:
    - Software
tags:
    - 软件开发
---

> 伟大的UNO一般会问几个为什么！

## QA
1. Q：为什么要编译成动态库

    A:为了**节省资源、方便更新、支持模块化和跨语言调用**，还能实现插件式架构。

2. Q: CMake的构建和编译


3. Q：怎么通过error信息定位解决

## 动态库
### 基本概念
动态库就是 `.so`（Linux）、`.dll`（Windows）、`.dylib`（macOS） 这样的文件，在程序运行时被“动态加载”。

它跟 **静态库**（`.a` 或 `.lib`）的区别在于：

- 静态库是**编译时就嵌入程序里**的，生成的可执行文件比较大。
- 动态库是**运行时才加载**的，可执行文件会“引用”这个库，而不是包含它本体。

---

✅ 为什么编译成动态库？有哪些优点？
**节省内存和磁盘空间**
多个程序都能使用同一个动态库，比如系统的 libc.so、OpenCV、Qt 这些常用库，不用每个程序都各自编译一份，节省资源。

---

**支持模块化设计**
程序可以把功能拆成多个模块，比如：

- 一个主程序（main app）
- 一些插件/功能模块（编译成动态库）

这样设计更灵活、更易维护。

---

**支持“热更新”或“热插拔”**
当你想更新某个模块的功能，只需要替换掉对应的动态库，而不用重新编译整个程序。

**插件机制**
- Python 的 `.pyd` 文件
- MATLAB 的 MEX 动态库
- 浏览器的扩展插件

这些都是通过动态库的形式扩展主程序的功能。

---

**跨语言调用**
很多时候，我们用 C/C++ 写一个高性能的核心模块，然后 Python、Java 等其他语言用 FFI（Foreign Function Interface） 调用这些库。

例如：
```python
# Python 通过 ctypes 加载 .so 或 .dll
from ctypes import cdll
lib = cdll.LoadLibrary('./libexample.so')
```
---

### 怎么生成动态库，链接使用动态库

1. 源代码
2. 编译生成动态库
3. 写主程序
4. 编译主程序时链接动态库
5. 运行主程序

太好了，我们就用最常见的 **C/C++** 来举个例子，展示一下 **怎么编译生成动态库**（以 Linux 下为例，也会顺便说下 Windows 和 macOS 的差异）。

---
#### 创建源代码文件
👉 动态库源文件：`mymath.c`

```c
// mymath.c
#include <stdio.h>

void say_hello() {
    printf("Hello from dynamic library!\n");
}

int add(int a, int b) {
    return a + b;
}
```

👉 头文件：`mymath.h`

```c
// mymath.h
#ifndef MYMATH_H
#define MYMATH_H

void say_hello();
int add(int a, int b);

#endif
```

---

#### 🛠️ 2. 编译生成动态库

**Linux / macOS：**

```bash
gcc -fPIC -shared -o libmymath.so mymath.c
```

解释：
- `-fPIC`：生成位置无关代码（Position Independent Code），动态库需要这个
- `-shared`：告诉编译器要生成共享库
- `-o libmymath.so`：输出文件名，`lib` 开头是习惯命名方式

**Windows（使用 MinGW）：**

```bash
gcc -shared -o mymath.dll mymath.c
```

---

#### 🧪 3. 写主程序调用它：`main.c`

```c
// main.c
#include "mymath.h"

int main() {
    say_hello();
    int result = add(3, 5);
    printf("3 + 5 = %d\n", result);
    return 0;
}
```

---

#### 🏗️ 4. 编译主程序时链接动态库

```bash
gcc -o main main.c -L. -lmymath
```

解释：
- `-L.` 表示在当前目录找库
- `-lmymath` 表示链接名为 `libmymath.so` 的库（`lib` 开头省略，`.so` 后缀省略）

---

#### 🏃 5. 运行程序（Linux）

```bash
LD_LIBRARY_PATH=. ./main
```

> `LD_LIBRARY_PATH=.` 是告诉系统动态库就放在当前目录

---

🎉 **输出结果**

```text
Hello from dynamic library!
3 + 5 = 8
```

---

✅ **小结一波**

| 步骤 | 命令或操作 |
|------|------------|
| 写库代码 | `mymath.c`、`mymath.h` |
| 编译库 | `gcc -fPIC -shared -o libmymath.so mymath.c` |
| 写主程序 | `main.c` |
| 编译主程序 | `gcc -o main main.c -L. -lmymath` |
| 运行程序 | `LD_LIBRARY_PATH=. ./main` |

---

## CMake
CMake 是一个 跨平台的自动化构建系统工具，它使用一种称为 CMakeLists.txt 的配置文件来描述如何生成项目的构建文件（例如 Makefile 或 Visual Studio 工程）。

构建文件中有编译命令GCC,G++等；编译程序；

### 基本概念

#### 📁 CMake 的基本构建流程

CMake 的构建过程分为两个阶段：

1. **配置（Configure）阶段**
这一阶段的目标是生成平台相关的构建文件。

```bash
cmake -S . -B build
```

- `-S .` 指定源码路径
- `-B build` 指定生成的构建文件放在哪个目录（可以叫 `build`）

此时，CMake 会读取 `CMakeLists.txt`，根据系统环境、编译器等生成合适的构建系统（比如 Makefile）。

---

2. **构建（Build）阶段**
使用上一步生成的构建文件，开始真正的**编译**操作。

```bash
cmake --build build
```

这一步等价于执行 `make`（如果你使用的是 Unix/Linux 上的默认生成器），将源代码编译成可执行文件或者库。

---

#### 📜 CMakeLists.txt 基础结构

```cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject)

# 指定 C++ 标准
set(CMAKE_CXX_STANDARD 17)

# 添加源文件并构建成可执行文件
add_executable(my_app main.cpp)
```

- `project(...)`：定义项目名称
- `set(...)`：设置变量，比如 C++ 标准
- `add_executable(...)`：指定编译可执行文件的目标

---

🔁 **常见命令一览**

| 操作 | 命令示例 |
|------|-----------|
| 配置 | `cmake -S . -B build` |
| 构建 | `cmake --build build` |
| 清除构建目录 | `rm -rf build` |
| 设置编译器 | `CC=gcc CXX=g++ cmake -S . -B build` |

---

💡 **小技巧**

- 始终将构建目录和源代码目录分离（Out-of-Source Build），便于管理。
- 可以加上 `-DCMAKE_BUILD_TYPE=Release` 或 `Debug` 来控制编译类型。
- 使用 `target_include_directories` 和 `target_link_libraries` 来管理依赖更清晰。

---



### 应用

使用 CMake 来构建上述小项目：生成动态库 `libmymath.so`，并编译主程序 `main.c` 来调用它。

---

####  项目结构

```
my_project/
├── CMakeLists.txt
├── mymath.c
├── mymath.h
└── main.c
```

---

####  CMakeLists.txt 内容

```cmake
cmake_minimum_required(VERSION 3.10)
project(MyDynamicLibExample C)

# 设置编译为 C99
set(CMAKE_C_STANDARD 99)

# 设置输出目录
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

# 创建动态库
add_library(mymath SHARED mymath.c)

# 创建可执行文件
add_executable(main_exec main.c)

# 链接动态库到可执行程序
target_link_libraries(main_exec PRIVATE mymath)

# 设置头文件路径（可选）
target_include_directories(main_exec PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})
```

---

####  构建步骤（在 Linux/macOS 上）

打开终端：

```bash
mkdir build
cd build
cmake ..
cmake --build .
```

---

#### 行程序

```bash
LD_LIBRARY_PATH=./lib ./bin/main_exec
```

---

 **输出**

```
Hello from dynamic library!
3 + 5 = 8
```

---
