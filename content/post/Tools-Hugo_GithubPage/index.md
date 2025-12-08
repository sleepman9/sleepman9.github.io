---
title: Hugo Github Pages 搭建个人博客
description: 搭建个人博客的过程
date: 2025-03-28 
image: cover.png
categories:
    - Tools
tags:
    - hugo

weight: 2
---



## 手动搭建博客经历

### 手动方式：
1. 安装：`hugo`, `go`.

    https://github.com/gohugoio/hugo/releases  hugo下载

    https://git-scm.com/install/windows  Git下载
    


2. clone 主题：`git submodule add theme`.
3. hugo server 本地调试。
4. 设置GitHub Pages主页信息
5. 使用GitHub Actions 自动构建/部署（CI/CD）
6. 本地提交到GitHub仓库

上述过程可以参考

[通过 Github workflows CI/CD 自动化部署 Github Pages hugo 免费博客](https://blog.taoluyuan.com/blog/github-workflows) 

[Hugo + Github Pages 搭建个人博客](https://jianzhnie.github.io/post/hugo_site/)

 [在Windows11上安装Hugo，搭建静态网站并部署到GitHub Page](https://zhuanlan.zhihu.com/p/673890323)

### template方式

直到后来遇到了**自动挡**，直接使用 theme template套模板即可（修改个人信息，写post）

### 迁移新电脑本地调试

背景：在一台全新的电脑上，开始原有本地调试功能

1. 安装hugo-Extended，千万不要安装普通版本。区别在于Extended版本支持支持 SCSS/SASS等
2. 安装go 文件中需要使用go拉取相关模块。例如：文件`go.mod`
3. 运行文件 `loacl_run.bat`

ps：如果出现无法访问github情况需要“魔法”


### 个人感悟
最近在接触软件开发的内容，其中对于CI/CD部分一直存在一些疑惑，直到自己搭建博客，对这一块的工作流有了进一步的理解。



## hugo stack theme 魔改
 > 多看优秀的主题，才知道怎么魔改；链接及其评论作者都是与此相关的主题；

 [bloger1](https://linsnow.cn/posts/bloglab/hugo-stack/modify-hugo/)

 [stack 魔改美化](https://www.xalaok.top/post/stack-modify/)

 [stack 魔改美化_2](https://thirdshire.com/hugo-stack-renovation/)

 [建站技术 | 使用 Hugo + Stack 简单搭建一个博客](https://blog.reincarnatey.net/2023/build-hugo-blog-with-stack-mod/)

