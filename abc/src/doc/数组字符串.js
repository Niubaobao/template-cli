// 数组
/*
数组中的元素在内存中是连续存储的，且每个元素占用相同大小的内存
*/

//寻找数组的中心索引

const nums = [1, 7, 3, 6, 5, 6]

var pivotIndex = (nums) => {
  const total = nums.reduce((a, b) => a + b, 0)
  let sum = 0 //左侧的和

  for (let i = 0; i < nums.length; i++) {
    if (sum == total - sum - nums[i]) {
      return i
    }
    sum += nums[i]
  }
  return -1
}

pivotIndex(nums) //3

//搜索插入位置
/*
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
你可以假设数组中无重复元素。
*/

const arr = [1, 3, 5, 6]
var searchInsert = (nums, target) => {
  let left = 0
  let right = nums.length - 1
  let mid = 0
  let targetIndex = nums.length
  while (left <= right) {
    mid = ((right - left) >> 1) + left
    if (nums[mid] >= target) {
      targetIndex = mid
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return targetIndex
}

searchInsert(arr, 7)

/*
合并区间
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
*/
var mergeArr = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
]

var merge = (arr) => {
  // 判断空值
  if (arr.length == 0) return 0
  // 结果数组
  var targetArr = []
  // 排序
  arr.sort((a, b) => a[0] - b[0])
  targetArr.push(arr[0])

  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0] > targetArr[targetArr.length - 1][1]) {
      // 没有交集
      targetArr.push(arr[i])
    } else {
      //更新当前区间的最大值
      if (arr[i][1] > targetArr[targetArr.length - 1][1]) {
        targetArr[targetArr.length - 1][1] = arr[i][1]
      }
    }
  }
  return targetArr
}

merge(mergeArr)
