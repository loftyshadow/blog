# 寻找峰值

> 峰值元素是指其值严格大于左右相邻值的元素。
>
> 给你一个整数数组  `nums`，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回  **任何一个峰值**  所在位置即可。
>
> 你可以假设  `nums[-1] = nums[n] = -∞` 。
>
> 你必须实现时间复杂度为  `O(log n)`  的算法来解决此问题。
>
> **示例 1：**
>
> 输入：nums = `[1,2,3,1]`
>
> 输出：2
>
> 解释：3 是峰值元素，你的函数应该返回其索引 2。
>
> **示例  2：**
>
> 输入：nums = `[1,2,1,3,5,6,4]`
>
> 输出：1 或 5
>
> 解释：你的函数可以返回索引 1，其峰值元素为 2；
>   或者返回索引 5， 其峰值元素为 6。
>
> **提示：**
>
> - `1 <= nums.length <= 1000`
> - `-231 <= nums[i] <= 231 - 1`
> - 对于所有有效的  `i`  都有  `nums[i] != nums[i + 1]`

## 方法一：寻找最大值

**思路与算法**

由于题目保证了 $nums[i]≠nums[i+1]$，
那么数组 $nums$ 中最大值两侧的元素一定严格小于最大值本身。因此，最大值所在的位置就是一个可行的峰值位置。

我们对数组 $nums$ 进行一次遍历，找到最大值对应的位置即可

::: code-group

```java
class Solution {
	public int findPeakElement(int[] nums) {
		int idx = 0;
		for (int i = 1; i < nums.length; ++i) {
			if (nums[i] > nums[idx]) {
			idx = i;
			}
		}
	return idx;
	}
}
```

```javascript
var findPeakElement = function (nums) {
  let idx = 0
  for (let i = 1; i < nums.length; ++i) {
    if (nums[i] > nums[idx]) {
      idx = i
    }
  }
  return idx
}
```

:::
**复杂度分析**

- 时间复杂度：$O(n)$，其中 $n$ 是数组 $nums$ 的长度。

## 方法二：迭代爬坡

**思路与算法**

俗话说「人往高处走，水往低处流」。如果我们从一个位置开始，不断地向高处走，那么最终一定可以到达一个峰值位置。

因此，我们首先在$[0,n)$的范围内随机一个初始位置$i$，随后根据 $nums[－1],nums[],nums[i+ 1]$
三者的关系决定向哪个方向走:

- 如果 $nums[－1]< nums[i] > nums[+1]$，那么位置 $i$ 就是峰值位置，我们可以直接返回 $i$ 作
  为答案
- 如果 $nums[－1]< nums[i] < nums[+1]$，那么位置 $i$ 处于上坡，我们需要往右走，即 $i←+1$;
- 如果 $nums[－1] > nums[i] > nums[+1]$，那么位置 $i$ 于下坡，我们需要往左走，即 $i<i-1$;
- 如果 $nums[－1] > nums[i] < nums[+1]$，那么位置 $i$ 山谷，两侧都是上坡，我们可以朝任意方向走。
  如果我们规定对于最后一种情况往右走，那么当位置不是峰值位置时：
- 如果 $nums[i]< nums[i＋1]$，那么我们往右走;
- 如果 $nums[i] > nums[i+1]$，那么我们往左走。

::: code-group

```java
class Solution {
    public int findPeakElement(int[] nums) {
        int n = nums.length;
        int idx = (int) (Math.random() * n);

        while (!(compare(nums, idx - 1, idx) < 0 && compare(nums, idx, idx + 1) > 0)) {
            if (compare(nums, idx, idx + 1) < 0) {
                idx += 1;
            } else {
                idx -= 1;
            }
        }

        return idx;
    }

    // 辅助函数，输入下标 i，返回一个二元组 (0/1, nums[i])
    // 方便处理 nums[-1] 以及 nums[n] 的边界情况
    public int[] get(int[] nums, int idx) {
        if (idx == -1 || idx == nums.length) {
            return new int[]{0, 0};
        }
        return new int[]{1, nums[idx]};
    }

    public int compare(int[] nums, int idx1, int idx2) {
        int[] num1 = get(nums, idx1);
        int[] num2 = get(nums, idx2);
        if (num1[0] != num2[0]) {
            return num1[0] > num2[0] ? 1 : -1;
        }
        if (num1[1] == num2[1]) {
            return 0;
        }
        return num1[1] > num2[1] ? 1 : -1;
    }
}
```

```javascript
var findPeakElement = function (nums) {
  const n = nums.length
  let idx = parseInt(Math.random() * n)

  while (
    !(compare(nums, idx - 1, idx) < 0 && compare(nums, idx, idx + 1) > 0)
  ) {
    if (compare(nums, idx, idx + 1) < 0) {
      idx += 1
    } else {
      idx -= 1
    }
  }

  return idx
}

// 辅助函数，输入下标 i，返回一个二元组 (0/1, nums[i])
// 方便处理 nums[-1] 以及 nums[n] 的边界情况
const get = (nums, idx) => {
  if (idx === -1 || idx === nums.length) {
    return [0, 0]
  }
  return [1, nums[idx]]
}

const compare = (nums, idx1, idx2) => {
  const num1 = get(nums, idx1)
  const num2 = get(nums, idx2)
  if (num1[0] !== num2[0]) {
    return num1[0] > num2[0] ? 1 : -1
  }
  if (num1[1] === num2[1]) {
    return 0
  }
  return num1[1] > num2[1] ? 1 : -1
}
```

:::

**复杂度分析**

- 时间复杂度：$O(n)$，其中 $n$ 是数组 $nums$ 的长度。在最坏情况下，数组 $nums$ 单调递增，并且我们随机到位置 $0$，这样就需要向右走到数组 $nums$ 的最后一个位置。

- 空间复杂度：$O(1)$。

## 方法三：方法二的二分查找优化

**思路与算法**

我们可以发现，如果 $nums[i]<nums[i+1]$，并且我们从位置向右走到了位置$i+1$，那么位置$i$
左侧的所有位置是不可能在后续的迭代中走到的。

> 这是因为我们每次向左或向右移动**一个**位置，要想「折返」到位置$i$以及其左侧的位置，我们首先需要在位置$i+1$ 向左走到位置，但这是不可能的。

并且根据方法二，我们知道位置$i+1$以及其右侧的位置中一定有一个峰值，因此我们可以设计出
如下的一个算法：

- 对于当前可行的下标范围$[l,r]$，我们随机一个下标$i$；
- 如果下标$i$是峰值，我们返回$i$作为答案;
- 如果 $nums[i]<nums[i+1]$，那么我们抛弃$[l,r]$的范围，在剩余$[i＋1,r]$的范围内继续随机选取下标;
- 如果 $nums[i] > nums[i+1]$，那么我们抛弃$[i,r]$ 的范围，在剩余$[l,i－1]$ 的范围内继续随机选取下标。
  在上述算法中，如果我们固定选取为$[l,r]$的中点，那么每次可行的下标范围会减少一半，成为一
  个类似二分查找的方法，时间复杂度为$O(log n)$。

::: code-group

```java
class Solution {
    public int findPeakElement(int[] nums) {
        int n = nums.length;
        int left = 0, right = n - 1, ans = -1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (compare(nums, mid - 1, mid) < 0 && compare(nums, mid, mid + 1) > 0) {
                ans = mid;
                break;
            }
            if (compare(nums, mid, mid + 1) < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return ans;
    }

    // 辅助函数，输入下标 i，返回一个二元组 (0/1, nums[i])
    // 方便处理 nums[-1] 以及 nums[n] 的边界情况
    public int[] get(int[] nums, int idx) {
        if (idx == -1 || idx == nums.length) {
            return new int[]{0, 0};
        }
        return new int[]{1, nums[idx]};
    }

    public int compare(int[] nums, int idx1, int idx2) {
        int[] num1 = get(nums, idx1);
        int[] num2 = get(nums, idx2);
        if (num1[0] != num2[0]) {
            return num1[0] > num2[0] ? 1 : -1;
        }
        if (num1[1] == num2[1]) {
            return 0;
        }
        return num1[1] > num2[1] ? 1 : -1;
    }
}
```

```javascript
var findPeakElement = function (nums) {
  const n = nums.length
  let left = 0,
    right = n - 1,
    ans = -1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (compare(nums, mid - 1, mid) < 0 && compare(nums, mid, mid + 1) > 0) {
      ans = mid
      break
    }
    if (compare(nums, mid, mid + 1) < 0) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return ans
}

// 辅助函数，输入下标 i，返回一个二元组 (0/1, nums[i])
// 方便处理 nums[-1] 以及 nums[n] 的边界情况
const get = (nums, idx) => {
  if (idx === -1 || idx === nums.length) {
    return [0, 0]
  }
  return [1, nums[idx]]
}

const compare = (nums, idx1, idx2) => {
  const num1 = get(nums, idx1)
  const num2 = get(nums, idx2)
  if (num1[0] !== num2[0]) {
    return num1[0] > num2[0] ? 1 : -1
  }
  if (num1[1] === num2[1]) {
    return 0
  }
  return num1[1] > num2[1] ? 1 : -1
}
```

:::

**复杂度分析**

- 时间复杂度：$O(log⁡n)$，其中 $n$ 是数组 $nums$ 的长度。

- 空间复杂度：$O(1)$。
