---
title: 无序映射-有序映射
description: 映射之间的区别
date: 2025-04-02 
categories:
    - Syntax
tags:
    - C++
---

## 无序映射（std::unordered_map）

> 输出结果是不确定的  
> 无序映射在插入、查找时平均时间复杂度为 O(1)，但遍历时顺序不确定；  
> [哈希表](https://www.hello-algo.com/chapter_hashing/hash_map/)

```C++
#include <iostream>
#include <unordered_map>
#include <string>

int main() {
    std::unordered_map<std::string, int> fruitCount;
    fruitCount["apple"] = 3;
    fruitCount["banana"] = 2;
    fruitCount["orange"] = 5;

    std::cout << "Unordered Map:" << std::endl;
    for (const auto &item : fruitCount) {
        std::cout << item.first << ": " << item.second << std::endl;
    }
    return 0;
}
```



## 有序映射（std::map）

> 输出结果是顺序的  
> 有序映射会自动对键进行排序，遍历时顺序按键排序，但时间复杂度为 O(log n)。  
> [红黑树](https://oi-wiki.org/ds/rbtree/)

```C++
#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> fruitCount;
    fruitCount["apple"] = 3;
    fruitCount["banana"] = 2;
    fruitCount["orange"] = 5;

    std::cout << "Ordered Map:" << std::endl;
    for (const auto &item : fruitCount) {
        std::cout << item.first << ": " << item.second << std::endl;
    }
    return 0;
}
```

## 区别优缺点
无序映射（std::unordered_map）和有序映射（std::map）的主要区别如下：

- **底层数据结构**  
  - 无序映射使用哈希表，键的存储顺序是无序的。  
  - 有序映射使用红黑树（或其他平衡二叉树），键自动按排序规则排序。

- **查找和插入效率**  
  - 无序映射在平均情况下查找、插入和删除操作的时间复杂度为 O(1)，但最坏情况下可能退化到 O(n)。  
  - 有序映射的这些操作时间复杂度为 O(log n)。

- **内存使用**  
  - 无序映射由于哈希表的实现可能会占用更多的内存空间，用以维护桶以及处理哈希冲突。  
  - 有序映射通常内存开销较小，主要存储树节点及指针。

- **顺序性要求**  
  - 如果需要按键顺序遍历数据，使用有序映射更方便。  
  - 如果仅需要快速查找且不关心顺序，使用无序映射更优。

