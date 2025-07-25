---
title: 力扣碎碎念
description: 一些近在眼前的为什么
date: 2025-04-16 
image: 
categories:
    - Syntax
tags:
    - C++
---

[吴师兄学算法](https://blog.algomooc.com/)

## 为什么要使用引用 &

[两数之和](https://leetcode.cn/problems/two-sum/?envType=study-plan-v2&envId=top-100-liked)

```C++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // 实现代码将在这里
    }
};
```

1. **避免不必要的拷贝**：
   - 如果不使用引用（`vector<int> nums`），当传入大型数组时，C++ 会创建整个向量的完整副本
   - 使用引用（`vector<int>& nums`）可以直接操作原始数据，不产生拷贝开销

2. **内存效率**：
   - 对于大型输入数组，拷贝会消耗大量内存和时间
   - 引用只是原始数据的别名（通常实现为指针），内存占用固定（通常4或8字节）

3. **性能优化**：
   - 引用传递是O(1)时间复杂度
   - 值传递是O(n)时间复杂度（n为数组大小）

4. **允许修改原数据**（虽然本题不需要）：
   - 如果函数需要修改输入数组，引用是必要的
   - 如果不想允许修改，可以用 `const vector<int>& nums`



**引用 vs 值传递的对比：**
| 特性        | 引用传递 (`vector<int>&`) | 值传递 (`vector<int>`) |
|------------|--------------------------|-----------------------|
| 内存使用    | 极小（仅引用）           | 复制整个向量          |
| 时间复杂度 | O(1)                     | O(n)                  |
| 能否修改原数据 | 可以                    | 不能（修改的是副本）  |
| 适用场景    | 大型数据结构             | 小型或需要隔离的数据  |

在算法题目中，特别是输入规模可能很大的情况下，使用引用是更优的选择。


## 十大经典排序算法（动图演示）
[十大经典排序算法（动图演示）](https://www.cnblogs.com/onepixel/p/7674659.html)

## 设计模式
[设计模式](https://www.yuque.com/nathan-kd4ra/soft_exam/yqqus1x0752qwt9y#70e53119)

[C++设计模式（全23种）](https://blog.csdn.net/weixin_45712636/article/details/124328504)

