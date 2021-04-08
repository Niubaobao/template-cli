<!--
// 栈 stack

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 -->

 <!-- 
 Map 
 js对象是object 本质上是键值对的集合（hash结构）但是传统上只能用字符串当做键

 es6提供了Map结构 它类似与对象 也是键值对的集合 但是键的范围不限于字符串，各种类型的值（包括对象）都可以当作键 map提供值对值的对应
 是一种更完善的hash结构实现

 Map.set(key, value)
 Map.get(key)
 Map.has(key)
 Map.delete(key)
 Map.has(key)

 Map也可以接受一个数组作为参数，该数组的成员是一个个键值对的数组

  -->

  <!-- var s = "{[]}" -->

```
const isValid = (s) => {
  const n = s.length;

  // s的长度必须是偶数 不然就不用对比了直接返回false
  if (n % 2 === 1) return false

  const pairs = new Map([
    [')', '('],
    ['}', '{'],
    [']', '[']
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

  return !stack.length
}

```

<!--
给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，判断二者是否相等，并返回结果。 # 代表退格字符。

注意：如果对空文本输入退格字符，文本继续为空。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/backspace-string-compare
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 -->

 <!-- 
    进栈出栈 遇到#出栈  不是#出栈 最后对比两个字符串
  -->
  <!-- 题解：
    循环字符串，遇到#好就进行出栈操作，非#号就进栈。最后化成字符串进行比较是否是相等
   -->

```
const strCompare = (s, t) => {
 const str = (s, a = []) => {
   const len = s.length;
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


```

<!--实现一个MyQueue类，该类用两个栈来实现一个队列。  -->
<!--
MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-queue-using-stacks-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 -->

 <!-- 
    题解：队列的特点是 先入先出， 栈的特点是先入后出
    用两个栈来模拟队列的特性 一个栈为入队栈 一个栈为出队栈
  -->

```
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
```

<!--
用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 -->

```
var CQueue = function() {
   this.stackIn = []
   this.stackout = []

};

/**
* @param {number} value
* @return {void}
*/
CQueue.prototype.appendTail = function(value) {
   this.stackIn.push(value)
};

/**
* @return {number}
*/
CQueue.prototype.deleteHead = function() {
   if(this.stackIn.length<1) return -1

   while(this.stackIn.length>1){
       this.stackout.push(this.stackIn.pop())
   }
   var num = this.stackIn.pop()

   while(this.stackout.length){
       this.stackIn.push(this.stackout.pop())
   }
   return num
};

```

<!--

给你一个由大小写英文字母组成的字符串 s 。

一个整理好的字符串中，两个相邻字符 s[i] 和 s[i+1]，其中 0<= i <= s.length-2 ，要满足如下条件:

若 s[i] 是小写字符，则 s[i+1] 不可以是相同的大写字符。
若 s[i] 是大写字符，则 s[i+1] 不可以是相同的小写字符。
请你将字符串整理好，每次你都可以从字符串中选出满足上述条件的 两个相邻 字符并删除，直到字符串整理好为止。

请返回整理好的 字符串 。题目保证在给出的约束条件下，测试样例对应的答案是唯一的。

注意：空字符串也属于整理好的字符串，尽管其中没有任何字符。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/make-the-string-great
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 -->

 <!--
 
 输入：s = "leEeetcode"
输出："leetcode"
解释：无论你第一次选的是 i = 1 还是 i = 2，都会使 "leEeetcode" 缩减为 "leetcode" 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/make-the-string-great
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 -->

 <!-- 题解：
    利用栈 满足条件的推入栈 不满足条件的出栈  最后返回字符串
  -->

```

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


```

<!--
请设计一个栈，除了常规栈支持的pop与push函数以外，还支持min函数，该函数返回栈元素中的最小值。执行push、pop和min操作的时间复杂度必须为O(1)。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/min-stack-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 -->

```
/**
* initialize your data structure here.
*/
var MinStack = function() {
   this.stackIn = []
};

/**
* @param {number} x
* @return {void}
*/
MinStack.prototype.push = function(x) {
   this.stackIn.push(x)

};

/**
* @return {void}
*/
MinStack.prototype.pop = function() {
    this.stackIn.pop()
};

/**
* @return {number}
*/
MinStack.prototype.top = function() {
   return this.stackIn[this.stackIn.length-1]
};

/**
* @return {number}
*/
MinStack.prototype.getMin = function() {
   return Math.min(...this.stackIn)
};

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(x)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/
```

<!-- 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：

void push(int x) 将元素 x 推到队列的末尾
int pop() 从队列的开头移除并返回元素
int peek() 返回队列开头的元素
boolean empty() 如果队列为空，返回 true ；否则，返回 false

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/implement-queue-using-stacks
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 -->
 <!-- 
 主要是利用栈的 先进后出   队列的先进先出的特性
  -->

```
/**
* Initialize your data structure here.
*/
var MyQueue = function() {
  this.stackIn = []
  this.stackOut = []
};

/**
* Push element x to the back of queue.
* @param {number} x
* @return {void}
*/
MyQueue.prototype.push = function(x) {
  this.stackIn.push(x)
};

/**
* Removes the element from in front of queue and returns that element.
* @return {number}
*/
MyQueue.prototype.pop = function() {
  while(this.stackIn.length>1){
      this.stackOut.push(this.stackIn.pop())
  }
  var num = this.stackIn.pop()
  while(this.stackOut.length){
      this.stackIn.push(this.stackOut.pop())
  }
  return num
};

/**
* Get the front element.
* @return {number}
*/
MyQueue.prototype.peek = function() {
  while(this.stackIn.length){
      this.stackOut.push(this.stackIn.pop())
  }
  var num = this.stackOut[this.stackOut.length-1]

  while(this.stackOut.length){
      this.stackIn.push(this.stackOut.pop())
  }
  return num
};

/**
* Returns whether the queue is empty.
* @return {boolean}
*/
MyQueue.prototype.empty = function() {
  return !this.stackIn.length && !this.stackOut.length
};

/**
* Your MyQueue object will be instantiated and called as such:
* var obj = new MyQueue()
* obj.push(x)
* var param_2 = obj.pop()
* var param_3 = obj.peek()
* var param_4 = obj.empty()
*/

```
