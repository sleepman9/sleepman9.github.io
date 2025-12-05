---
title: SCP_传输文件
description: 使用scp不同服务器中传输小型文件
date: 2025-04-03 
image:
categories:
    - Tools
tags:
    - 
---


`scp`（Secure Copy Protocol）用于在本地与远程服务器之间、或者两台远程服务器之间安全地复制文件。  

---

## 从本地复制到远程服务器
```bash
scp /path/to/local/file username@remote_host:/path/to/remote/directory
```
示例：
```bash
scp myfile.txt user@192.168.1.100:/home/user/
```
这会将 `myfile.txt` 复制到远程服务器 `192.168.1.100` 的 `/home/user/` 目录。

---

## 从远程服务器复制到本地
```bash
scp username@remote_host:/path/to/remote/file /path/to/local/directory
```
示例：
```bash
scp user@192.168.1.100:/home/user/myfile.txt /home/localuser/
```
这会把远程服务器 `/home/user/myfile.txt` 复制到本地 `/home/localuser/` 目录。

---

## 复制整个文件夹（加 `-r` 选项）
### 本地 → 远程
```bash
scp -r /path/to/local/directory username@remote_host:/path/to/remote/directory
```
示例：
```bash
scp -r myfolder user@192.168.1.100:/home/user/
```
将 `myfolder` 目录及其内容复制到远程服务器 `/home/user/`。

### 远程 → 本地
```bash
scp -r username@remote_host:/path/to/remote/directory /path/to/local/directory
```
示例：
```bash
scp -r user@192.168.1.100:/home/user/myfolder /home/localuser/
```
将远程服务器上的 `myfolder` 复制到本地 `/home/localuser/` 目录。

---

## 从一台远程服务器复制到另一台远程服务器
```bash
scp username1@remote_host1:/path/to/file username2@remote_host2:/path/to/destination
```
示例：
```bash
scp user1@192.168.1.101:/home/user1/file.txt user2@192.168.1.102:/home/user2/
```
这会直接把 `192.168.1.101` 上的 `file.txt` 复制到 `192.168.1.102` 上的 `/home/user2/` 目录。

---

## 指定端口（`-P` 选项，大写 P）
```bash
scp -P 2222 myfile.txt user@192.168.1.100:/home/user/
```
如果远程服务器的 SSH 端口不是默认 `22`，可以使用 `-P` 指定端口，如 `2222`。

---

##  使用 `-C` 启用压缩加速传输
```bash
scp -C myfile.txt user@192.168.1.100:/home/user/
```
对于大文件或慢速网络，可以使用 `-C` 进行压缩，提高传输效率。

---

## 限制带宽（`-l` 选项，单位 Kbit/s）
```bash
scp -l 1000 myfile.txt user@192.168.1.100:/home/user/
```
上面命令限制最大带宽为 `1000 Kbit/s`，即 `125 KB/s`。

---

## 总结
| 需求 | 命令示例 |
|------|---------|
| 本地 → 远程 | `scp file.txt user@remote:/home/user/` |
| 远程 → 本地 | `scp user@remote:/home/user/file.txt ./` |
| 复制文件夹 | `scp -r folder user@remote:/home/user/` |
| 远程 → 远程 | `scp user1@host1:/file user2@host2:/dir/` |
| 指定端口 | `scp -P 2222 file user@remote:/home/user/` |
| 启用压缩 | `scp -C file user@remote:/home/user/` |
| 限制带宽 | `scp -l 1000 file user@remote:/home/user/` |

💡 **`scp` 适用于小型文件传输，大规模文件推荐 `rsync` 进行增量传输！** 🚀