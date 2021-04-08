#### 如果不知道怎么去实现就去借鉴源码怎么编写的会收到启发（typeScript）

###

- 基础类型存储在栈内存，被引用或拷贝时，会创建一个完全相等的变量
- 引用类型存储在堆内存，存储的是地址，多个引用指向同一个地址，这里会涉及一个“共享”的概念。

### js 中判断类型方法

- typeof typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了 function 类型以外，其他的也无法判断。

```
typeof 1 // 'number'

typeof '1' // 'string'

typeof undefined // 'undefined'

typeof true // 'boolean'

typeof Symbol() // 'symbol'

typeof null // 'object'

typeof [] // 'object'

typeof {} // 'object'

typeof console // 'object'

typeof console.log // 'function'

```

- instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型

- 第三种判断方法：Object.prototype.toString

```
Object.prototype.toString({})       // "[object Object]"

Object.prototype.toString.call({})  // 同上结果，加上call也ok

Object.prototype.toString.call(1)    // "[object Number]"

Object.prototype.toString.call('1')  // "[object String]"

Object.prototype.toString.call(true)  // "[object Boolean]"

Object.prototype.toString.call(function(){})  // "[object Function]"

Object.prototype.toString.call(null)   //"[object Null]"

Object.prototype.toString.call(undefined) //"[object Undefined]"

Object.prototype.toString.call(/123/g)    //"[object RegExp]"

Object.prototype.toString.call(new Date()) //"[object Date]"

Object.prototype.toString.call([])       //"[object Array]"

Object.prototype.toString.call(document)  //"[object HTMLDocument]"

Object.prototype.toString.call(window)   //"[object Window]"

```

### 深浅拷贝

#### 方法一 object.assign js 对象的合并，可以进行浅拷贝 语法 Object.assign(target, ...sources)

- object.assign 方法有几点需要注意
  1，它不会拷贝对象的继承属性
  2，它不会拷贝对象的不可枚举的属性
  3， 可以拷贝 Symbol 类型的属性

#### 方法二：扩展运算符方式

- 扩展运算符的语法为：let cloneObj = { ...obj }; 这也是一个浅拷贝

#### 方法三：concat 只能用于拷贝数组 也属于浅拷贝

#### 方法四：slice 拷贝数组 属于浅拷贝 slice 的语法为：arr.slice(begin, end);

```
//实现一个浅拷贝方法
 const shallowClone = target => {
     if(typeof target !== 'object' && target !== null){
       //引用数据类型
       let cloneTarget = Array.isArray(target) ? [] : {}
       for (let key in target) {
        if(target.hasOwnProperty(key)){//遍历一个对象的所有自身属性 忽略继承属性
          cloneTarget[key] = target[key]
        }
       }
       return cloneTarget
     }else{
       //简单类型
       return target
     }
    }

```

### 深拷贝

- 定义：将一个对象从内存中完整地拷贝出来一份给目标对象，并从堆内存中开辟一个全新的空间存放新对象，且新对象的修改并不会改变原对象，二者实现真正的分离

#### 方法一：乞丐版（JSON.stringfy）

- 拷贝的对象的值中如果有函数、undefined、symbol 这几种类型，经过 JSON.stringify 序列化之后的字符串中这个键值对会消失；
- 拷贝 Date 引用类型会变成字符串
- 无法拷贝不可枚举的属性
- 无法拷贝对象的原型链；
- 拷贝 RegExp 引用类型会变成空对象
- 对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；
- 无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)

#### 方法二：基础版（手写递归实现）

```
 let obj1 = {
      a:{
        b:1
      }
    }

    // alt + 向上箭头 向上移动一行代码

   const deepClone = obj => {
     let cloneObj = {}
     for (const key in obj) {
       if(typeof obj[key] ==='object'){
         cloneObj[key] = deepClone(obj[key])//递归调用
       }else{
         cloneObj[key] = obj[key]
       }
     }
     return cloneObj
     }

     let obj2 = deepClone(obj1)
     obj1.a.b = 2
     console.log(obj2)
```

- 存在的问题：
  1 ，这个深拷贝函数并不能复制不可枚举的属性以及 Symbol 类型；
  2，这种方法只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝；
  3，对象的属性里面成环，即循环引用没有解决

### 方法三：改进版（改进后递归实现）
