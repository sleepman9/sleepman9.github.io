---
title: Git Practice
description: 实际开发过程中的git使用
date: 2025-03-24
image: cover.webp
categories:
    - Tools
tags:
    - Git
    - vscode
weight: 1      # You can add weight to some posts to override the default sorting (date descending)
---

## 学习网站
[Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN)

[Git文档](https://git-scm.com/doc)


## git代码（基于实际开发流程）

ps:在vscode中可以可视化仓库的变化情况

ps:本文件主要使用命令行的形式，在vscode中可视化验证自己的操作是否正确

## ssh key&权限 检查
```bash
ssh -vT git@gitlab.xxx.tech

# 把 ssh -vT 输出里关于 Offering public key、Authentications that can continue、No such identity 等几行贴出来，就能精确定位是“没key / 用错key / key无权限 / agent没加载 / 服务端拒绝”
#也可以将输出的内容给GPT判断

```
![image](/assets/image.png)

**解决方案：**
```bash
#在远端机器生成 key，并加到 GitLab

mkdir -p ~/.ssh && chmod 700 ~/.ssh   #创建目录，设置权限

ssh-keygen -t ed25519 -C "whwang02@gitlab.btd.tech" -f ~/.ssh/id_ed25519    
#ssh-keygen：生成 SSH 密钥对（私钥 + 公钥）。
#-t ed25519：指定密钥算法为 Ed25519（推荐，安全且速度快）。
#-C "whwang02@gitlab.btd.tech"：给公钥加一段注释（comment），#方便你在 GitLab 上识别这把 key 属于谁/哪台机器。
#-f ~/.ssh/id_ed25519：指定输出文件名：
#私钥：~/.ssh/id_ed25519
#公钥：~/.ssh/id_ed25519.pub 执行时通常会提示你输入 passphrase（可选）。设置了更安全，但每次使用可能需要解锁（可配 ssh-agent）。

chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
cat ~/.ssh/id_ed25519.pub

#验证
ssh -T git@gitlab.xxx.tech   #Welcome to GitLab, @whwang02!

```


## 1. Clone代码

1. 假设已经将代码`clone`​到本地了

## 2. 拉取远程仓库最新代码

1. ​`git fetch`​拉取远程所有更新。

    ​![image](assets/image-20241106100439-ut2gw03.png "粉色部分是git fetch后出现的")​

    * 可以点击粉色节点查看变化内容。（这里不再使用git diff命令，可视化方便直观）

2. ​`git merge`​合并到当前分支

    ​![image](assets/image-20241106102009-gppsf65.png "合并后，粉色节点变成蓝色空心，表示当前所在节点")​

## 3.提交代码

1. ​`git add .`​将修改存入暂存区（stage）
2. ​`git commit -m "备注信息"`​提交已经存入到stage的内容
3. ​`git push origin wwh_dev`​将本地的`wwh_dev`​分支，推送到`origin`​远端

‍

背景：在main分支开发完毕后，在没有commit的情况下，新建了分支mph_generator_dev当作是本次开发的备份，同样在没有commit的情况下，又新建了一个分支wwh_dev当作是提交分支。

warning：当我执行完`git push origin wwh_dev`​ 后，其他分支的内容都回到了修改前  
​![image](assets/image-20241112102741-63lyvcr.png "`git push origin wwh_dev`执行之后")​  
​![image](assets/image-20241112102556-4b9js4p.png "回到其他分支，背景中的原先想法都没有了")​

error:猜想造成的原因是，创建其他分支之前没有`commit`​ 造成的。此想法还没有验证。（TODO）  
  
main分支没有commit的情况下新建了A分支，A分支git commit之后，main分支所有修改都消失了

‍

‍

‍

‍

## 4.向管理者提交pull requests

1. 在GUI页面中进行的。

    ​![image](assets/image-20241202141543-hlc6qfm.png)​

    ​![image](assets/image-20241202141630-8z1rx41.png)​

源分支：开发完成的分支

目标分支：项目分支

2. 解决冲突

    在GUI界面上解决，并且在GUI界面，`git add .`​和`git commit -m "备注信息"`​

等待管理员接受PR,合并代码后，以此开发任务就完成了。

‍

### 4.1查看是否提交成功

背景：在wwh_dev分支上开发，提交代码后，merge之后，想在其他分支看我提交的内容，同时保证一个分支时刻保持最新。问题来了。在Thermal5.0（想要保持最新的分支）看不到我提交的内容。

原因在于没有进行分支追踪：  
执行 `git pull <远程> <分支>`​     例如：git pull origin Thermal5.0  
执行之后，即可得到最新提交代码

### 4.2 添加分支跟踪
Git 分支追踪（Branch Tracking），通常被称为设置 “上游分支”（Upstream Branch）。简单来说，就是建立本地分支与远程分支之间的对应关系。

*   **没有追踪时**：你需要打全命令，明确告诉 Git 你想拉取或推送到哪里。
    *   `git pull origin master`
    *   `git push origin master`
*   **有追踪时**：Git 已经知道当前分支对应哪个远程分支，只需要输入：
    *   `git pull`
    *   `git push`

手动：

​`git branch --set-upstream-to=<remote_name>/<remote_branch> <branch_name>`​

‍

新建分支的时候建立追踪关系：

​`git checkout -b my_branch origin/develop`​

​`git switch -c my_branch origin/develop`​

‍

### 4.3 查看跟踪分支

‍

git branch -vv

‍

‍

‍

## 5. 再开启一个新开发任务

1. 分支分配

    1. ​`main`​分支，保持和origin远端的同步，不要在这个上面开发
    2. ​`dev`​分支，每次最新任务的开发分支
    3. ​`dev_xx_backup`​分支，开发完一个任务后的备份，拷贝来自`dev`​分支，包含任务测试代码
2. 分支管理

    1. 每次`push`​提交后，等待管理员检查无误后，将`dev`​分支删除
    2. 保证`main`​分支最新，从`main`​分支中新建一个分支当成当前任务的分支
    3. 此时`branch`​结构中只包含，一个`main`​分支，一个`dev`​分支，和`每次任务的备份`​分支

‍

## 6.SOURCE CONTROL GRAPH

ps：图片都来自`vscode`​

1. 来自于`git fetch`​之后

    ​![屏幕截图 2024-11-12 143950](assets/屏幕截图%202024-11-12%20143950-20241112152941-6iufqqs.png)​

    解释：  

    1. 每一个实心圆代表每一次提交节点
    2. 不同颜色的线，表示不同开发人员的开发路线
    3. <span data-type="text" style="background-color: var(--b3-card-info-background); color: var(--b3-card-info-color);">蓝色空心圆</span>表示当前所在的节点
    4. 圆环表示合并操作

2. 来自`git merge`​之后

    ​![image](assets/image-20241112153120-r572v33.png)​

    1. 框中标注的部分，当时是在GUI界面上修改分支冲突的，所以会从蓝色线程中分出一个分支到橙色线程的合并


## 删除远程分支

‍要删除 Git 仓库中的**远程分支**，你可以使用以下命令：

```bash
git push <remote_name> --delete <branch_name>
```

**示例**：
```bash
git push origin --delete feature/login
```

这条命令会将远程名为 `origin` 的仓库中的 `feature/login` 分支删除。

---

**常见说明**：
- `<remote_name>` 通常是 `origin`，可以通过 `git remote -v` 查看。
- 删除远程分支不会影响本地的分支，如果你也想删除本地的，可以用：
  ```bash
  git branch -d <branch_name>
  ```

‍

‍

