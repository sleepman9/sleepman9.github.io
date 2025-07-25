---
title: ASIC全流程
description: 从有想法到最终type out到底经历了什么
date: 2025-07-20 
image: cover.png
categories:
    - IC
tags:
    - 
---

## ic全流程
1. 规格制定。频率，功耗，速度
2. RTL设计。HDL描述逻辑Algorithm，类似于高级设计语言cpp，里面涉及低功耗设计方法
3. 功能仿真。逻辑代码是否正确，查看波形
4. 逻辑综合。将RTL代码转化为门级网表，里面包含时序约束，功耗约束，PPA优化
5. STA。确保时钟⏰
6. 形式验证。比较RTL 代码逻辑功能是否和逻辑综合出来的门级网表功能一致
7. 门级仿真。
8. DFT。在设计中加入测试结构，使芯片在生产后可以验证其功能正确性
9. Floorplan
10. place
11. CTS
12. route
13. STA
14. PI
15. SI
16. Low Power
17. Signoff

