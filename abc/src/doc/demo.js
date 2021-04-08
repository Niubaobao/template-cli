// github1s.~~~~~~~ 后追加1s  test

const isValid = (s) => {
  const n = s.length

  // s的长度必须是偶数 不然就不用对比了直接返回false
  if (n % 2 === 1) return false

  const pairs = new Map([
    [')', '('],
    ['}', '{'],
    [']', '['],
  ])

  const stack = []

  for (let i = 0; i < s.length; i++) {
    if (pairs.has(s[i])) {
      if (!stack.length || stack[stack.length - 1] !== pairs.get(s[i])) {
        return false
      }
      stack.pop()
    } else {
      stack.push(s[i])
    }
  }

  // foreach return这是跳出本次循环
  // s.split('').forEach(item => {
  //   if (pairs.has(item)) {
  //     if (!stack.length || stack[stack.length - 1] !== pairs.get(item)) {
  //       return false
  //     }
  //     stack.pop()
  //   } else {
  //     stack.push(item)
  //   }

  // });

  return !stack.length
}

// 844. 比较含退格的字符串

/*
 输入：S = "ab#c", T = "ad#c"
输出：true
解释：S 和 T 都会变成 “ac”。

输入：S = "a#c", T = "b"
输出：false
解释：S 会变成 “c”，但 T 仍然是 “b”。
*/

var S = 'ab#c'
var T = 'ad#c'

const strCompare = (s, t) => {
  const str = (s, a = []) => {
    const len = s.length
    for (let i = 0; i < len; i++) {
      if (s[i] === '#') {
        a.pop()
      } else {
        a.push(s[i])
      }
    }
    return a.join('')
  }

  return str(s) === str(t)
}

// 【栈】化栈为队

var MyQueue = function () {
  this.stackIn = []
  this.stackOut = []
}

MyQueue.prototype.push = function (x) {
  this.stackIn.push(x)
}

MyQueue.prototype.pop = function () {
  while (this.stackIn.length > 1) {
    this.stackOut.push(this.stackIn.pop())
  }
  var num = this.stackIn.pop()

  while (this.stackOut.length) {
    this.stackIn.push(this.stackOut.pop())
  }
  return num
}

MyQueue.prototype.peek = function () {
  while (this.stackIn.length) {
    this.stackOut.push(this.stackIn.pop())
  }
  var num = this.stackOut[this.stackOut.length - 1]

  while (this.stackOut.length) {
    this.stackIn.push(this.stackOut.pop())
  }
  return num
}

MyQueue.prototype.empty = function () {
  return !this.stackIn.length && !this.stackOut.length
}

// 1544. 整理字符串

var makeGood = function (s) {
  let res = []

  for (let i of s) {
    if (
      res.length &&
      res[res.length - 1] != i &&
      res[res.length - 1].toUpperCase() === i.toUpperCase()
    ) {
      res.pop()
    } else {
      res.push(i)
    }
  }

  return res.join('')
}



// hashMap


