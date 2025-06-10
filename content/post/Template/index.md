---
title: Template Format
description: 收集md写作格式
slug: Format
date: 2025-03-27 
image: cover.jpg
categories:
    - Base
tags:
    - markdown
# weight: 1       # You can add weight to some posts to override the default sorting (date descending)
---

## 颜色块-提示

> Photo by [Pawel Czerwinski](https://unsplash.com/@pawel_czerwinski) on [Unsplash](https://unsplash.com/)

## 可视化展示

<!-- https://github.com/kyechan99/capsule-render -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=300&color=timeGradient&text=Raincarnator&desc=Programming%20/%20Design%20/%20ACGN&descAlignY=54&fontAlignY=40&fontSize=80&descAlign=62&animation=fadeIn" />
</p>

<p align="center">
  <p align="center">你好，我是<b>失迹</b>。<br/>一位 <b>编程 / 设计 / ACGN</b> 爱好者。</p>
  <p align="center">Hi, I am <b>Raincarnator</b>.<br/>A <b>Programming / Design / ACGN</b> enthusiast.</p>
</p>

<p align="center">
  <!-- https://github.com/anuraghazra/github-readme-stats -->
  <img align="center" width="400" src="https://github-readme-stats.vercel.app/api?username=Raincarnator&theme=transparent&show_icons=true&hide_border=true&rank_icon=github" />
  <!-- https://github.com/DenverCoder1/github-readme-streak-stats -->
  <img align="center" width="400" src="https://streak-stats.demolab.com?user=Raincarnator&theme=transparent&date_format=%5BY.%5Dn.j&hide_border=true" />
  <br/>
  <!-- https://github.com/Ashutosh00710/github-readme-activity-graph -->
  <img width="800" src="https://github-readme-activity-graph.vercel.app/graph?username=Raincarnator&theme=github-compact&hide_border=true&area=true" />
  <br/>
  <!-- https://github.com/anuraghazra/github-readme-stats -->
  <img align="center" src="https://github-readme-stats.vercel.app/api/wakatime?username=ArauKaede&theme=transparent&hide_border=true&layout=compact&langs_count=22" />
  <!-- https://github.com/anuraghazra/github-readme-stats -->
  <img align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=Raincarnator&theme=transparent&hide_border=true&layout=donut-vertical&langs_count=6" />
  <br/>
  <!-- https://github.com/tandpfun/skill-icons -->
  <img align="center" src="https://skillicons.dev/icons?i=cpp,kotlin,html,css,js,ts,java,md,latex,windows,vscode,androidstudio,ps,azure,netlify,cloudflare,github,git,npm,materialui&theme=light&perline=10" />
</p>

<!-- https://github.com/badges/shields -->
<p align="center">
  <a href="https://wakatime.com/@ArauKaede"><img src="https://wakatime.com/badge/user/9b029946-d3d7-4021-993b-1ee294b8297a.svg" ></a>
  <img src="https://komarev.com/ghpvc/?username=Raincarnator&abbreviated=true"/>
  <img src="https://img.shields.io/github/stars/Raincarnator?style=flat&logoColor=%231677ff&labelColor=rgb(89, 89, 89)&color=rgb(3, 126, 187)"/>
  <img src="https://img.shields.io/github/followers/Raincarnator?style=flat&logoColor=%231677ff&labelColor=rgb(89, 89, 89)&color=rgb(3, 126, 187)"/>
</p>

<!-- https://github.com/kyechan99/capsule-render -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=300&color=timeGradient&text=Flowers%20will%20bloom%20in%20the%20world,%20and%20magnificent%20and%20immortal%20things%20will%20follow.&desc=Reincarnatey%20Network%20Co.,%20Ltd&descAlignY=93&fontAlignY=60&fontSize=20&descAlign=50&animation=fadeIn&descSize=15&section=footer&fontAlign=50" />
</p>

## video

For more details, check out the [documentation](https://stack.jimmycai.com/writing/shortcodes).

### Bilibili video

{{< bilibili "BV1d4411N7zD" >}}

### Tencent video

{{< tencent "g0014r3khdw" >}}

### YouTube video

{{< youtube "0qwALOOvUik" >}}

### Generic video file

{{< video "https://www.w3schools.com/tags/movie.mp4" >}}

## Gist

{{< gist CaiJimmy e2751a943de10b2a5b3a8a6c2120cb86 >}}

## GitLab

{{< gitlab 2589724 >}}

## Quote

{{< quote author="A famous person" source="The book they wrote" url="https://en.wikipedia.org/wiki/Book">}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
{{< /quote >}}

-----

## 锚点链接

### ✅ 标准做法：通过标题跳转（推荐）

Markdown 中每个标题（`#` 开头的那种）会自动生成一个锚点，你可以用它来链接。

#### 例子：

```markdown
# 无序列表

- 项目一
- 项目二
- 项目三

[跳转到无序列表](#无序列表)
```

✔️点击“跳转到无序列表”会定位到标题“无序列表”。

---

 > ⚠️ 如果你非要链接到**无序列表中的某项**（不是标题），标准 Markdown **不支持自动为列表项生成锚点**，但有以下几种变通方法：

---

### ✅ 方法 1：人为加标题辅助跳转

```markdown
### 项目一 {#item1}
- 描述内容

[跳转到项目一](#item1)
```

✔️注意这里的 `{#item1}` 是一些 Markdown 渲染器（比如 GitBook、Typora、Hugo）支持的**手动锚点语法**。

---

### ✅ 方法 2：加隐藏标题（用于跳转）

```markdown
<span id="item2"></span>
- 项目二：这里是第二项

[跳转到项目二](#item2)
```

✔️这个用 `<span>` 标签定义锚点，大多数 Markdown 引擎都支持。

## 分页
Markdown 本身 不支持分页，因为它是一种纯文本标记语言，设计目的是用于网页、文档等平台上的内容结构整理，没有“分页”这个概念。但根据你使用的平台或输出格式，可以用不同的技巧实现类似分页的效果

导出PDF
```markdown
<div style="page-break-after: always;"></div>
```