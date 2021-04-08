## 组件渲染

- 组件是对 dom 树的抽象，组件的模板决定组件生成的 Dom 标签

### 一个组件要想真正的渲染生成 dom 需要经历

- 创建 vnode --> 渲染 vnode --> 生成 dom
- vnode（一个可以描述组件的 javaScript 对象）

```
<button class='btn' style='width:100px;height:50px'>click me</button>

//我们用vnode来描述上面的button

const vnode = {
  type:'button',
  props:{
    'class':'btn',
    style:{
      width:'100px',
      height:'50px'
    }
  },
  children:'click me'
}
```

- vnode 优点：抽象化 跨平台

### Reactive API

### computed

通过以上分析，我们可以看出 computed 计算属性有两个特点：

延时计算，只有当我们访问计算属性的时候，它才会真正运行 computed getter 函数计算；

缓存，它的内部会缓存上次的计算结果 value，而且只有 dirty 为 true 时才会重新计算。如果访问计算属性时 dirty 为 false，那么直接返回这个 value。

### ------------------->

Composition API 它主要用来优化代码逻辑的组织和复用

## setup 组件渲染前的初始化过程

```
<template>
  <p>{{ msg }}</p>
</template>
<script>
export default {
  data() {
    msg: 1
  }
}
</script>
```

2.x
在组件初始化的时候 data 中定义的 msg 在组件内部是存储在 this.\_data 上的而模板渲染的时候访问 this.msg，实际上访问的是 this.\_data.msg，这是因为 Vue.js 2.x 在初始化 data 的时候，做了一层 proxy 代理。
3.0
为了方便维护，我们把组件中不同状态的数据存储到不同的属性中，比如存储到 setupState、ctx、data、props 中。我们在执行组件渲染函数的时候，为了方便用户使用，会直接访问渲染上下文 instance.ctx 中的属性，所以我们也要做一层 proxy，对渲染上下文 instance.ctx 属性的访问和修改，代理到对 setupState、ctx、data、props 中的数据的访问和修改

当我们访问 instance.ctx 渲染上下文中的属性时，就会进入 get 函数

```

```

### get

在 get 函数中 首先判断 key 不以 $ 开头的情况，这部分数据可能是 setupState、data、props、ctx 中的一种，ctx 包括了计算属性、组件方法和用户自定义的一些数据
如果 key 不以 $ 开头，那么就依次判断 setupState、data、props、ctx 中是否包含这个 key，如果包含就返回对应值

我们可以看到这里定义了 accessCache 作为渲染代理的属性访问缓存，缓存的作用，组件在渲染时会经常访问数据进而触发 get 函数，这其中最昂贵的部分就是多次调用 hasOwn 去判断 key 在不在某个类型的数据中，但是在普通对象上执行简单的属性访问相对要快得多。所以在第一次获取 key 对应的数据后，我们利用 accessCache[key] 去缓存数据，下一次再次根据 key 查找数据，我们就可以直接通过 accessCache[key] 获取对应的值，就不需要依次调用 hasOwn 去判断了

### set

当我们修改 instance.ctx 渲染上下文中的属性的时候，就会进入 set 函数
函数主要做的事情就是对渲染上下文 instance.ctx 中的属性赋值，它实际上是代理到对应的数据类型中去完成赋值操作的。这里仍然要注意顺序问题，和 get 一样，优先判断 setupState，然后是 data，接着是 props

执行 setup
执行 setup 结果保存到 setupResult
当 setupResult 是一个对象的时候，我们把它变成了响应式并赋值给 instance.setupState，这样在模板渲染的时候，依据前面的代理规则，instance.ctx 就可以从 instance.setupState 上获取到对应的数据，这就在 setup 函数与模板渲染间建立了联系
党 setupResult 是个函数的时候 instance.render = setupResult

初始化组件---》创建组件实例---》设置组件实例---》初始化 props---》初始化插槽---》设置稳定组件实例---》创建渲染上下文代理---》创建 setup 函数上下文---》执行 setup 函数获取结果--->处理 setup 函数执行结果---》完成组件实例设置---》标准化模板或者渲染函数---》兼容 options api

## 响应式原理

Vue.js 另一个核心设计思想就是响应式。它的本质是当数据变化后会自动执行某个函数 //当数据变化后，会自动触发组件的重新渲染

2.x
响应式实现的部分它在内部通过 Object.defineProperty API 劫持数据的变化，在数据被访问的时候收集依赖，然后在数据被修改的时候通知依赖更新,首先是依赖收集流程，组件在 render 的时候会访问模板中的数据，触发 getter 把 render watcher 作为依赖收集，并和数据建立联系；然后是派发通知流程，当我对这些数据修改的时候，会触发 setter，通知 render watcher 更新，进而触发了组件的重新渲染
Object.defineProperty API 的一些缺点：不能监听对象属性新增和删除；初始化阶段递归执行 Object.defineProperty 带来的性能负担

3.0
Vue.js 3.0 为了解决 Object.defineProperty 的这些缺陷，使用 Proxy API 重写了响应式部分，并独立维护和发布整个 reactivity 库，

### reactive

```
function reactive (target) {
   // 如果尝试把一个 readonly proxy 变成响应式，直接返回这个 readonly proxy
  if (target && target.__v_isReadonly) {
     return target
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers)
}
```

如果尝试把一个 readonly proxy 变成响应式，直接返回这个 readonly proxy // target.\_\_v_isReadonly
target 目标必须是对象或数组类型
target.\_\_v_raw target 已经是 proxy 对象直接返回 （reactive 函数会通过 target.**v_raw 属性来判断 target 是否已经是一个响应式对象，因为响应式对象的 **v_raw 属性会指向它自身）
只有在白名单里的数据类型才能变成响应式
如果对一个已经是响应式的对象再次执行 reactive，还应该返回这个响应式对象 // 解决嵌套

所以这里 reactive 函数会通过 target.**v_reactive 判断 target 是否已经有对应的响应式对象（因为创建完响应式对象后，会给原始对象打上 **v_reactive 标识，后面会提到），如果有则返回这个响应式对象

带有 \_\_v_skip 属性的对象、被冻结的对象，以及不在白名单内的对象如 Date 类型的对象实例是不能变成响应式的。

响应式的实现方式无非就是劫持数据，Vue.js 3.0 的 reactive API 就是通过 Proxy 劫持数据，而且由于 Proxy 劫持的是整个对象，所以我们可以检测到任何对对象的修改，弥补了 Object.defineProperty API 的不足

```
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
}
```

### 依赖收集 get 函数

依赖收集发生在数据访问的阶段，由于我们用 Proxy API 劫持了数据对象，所以当这个响应式对象属性被访问的时候就会执行 get 函数

```

// 依赖收集
    !isReadonly && track(target, "get" /* GET */, key)

// isReadonly 为 true 则不需要依赖收集  //因为它的属性不会被修改，所以就不用跟踪它的变化了。
// 如果 res 是个对象或者数组类型，则递归执行 reactive 函数把 res 变成响应式
```

Object.defineProperty 是在初始化阶段，即定义劫持对象的时候就已经递归执行了，而 Proxy 是在对象属性被访问的时候才递归执行下一步 reactive，这其实是一种延时定义子对象响应式的实现，在性能上会有较大的提升

整个 get 函数最核心的部分其实是执行 track 函数收集依赖
我们收集的依赖就是数据变化后执行的副作用函数。

### 派发通知：set 函数

主要就做两件事情， 首先通过 Reflect.set 求值 ， 然后通过 trigger 函数派发通知

trigger 函数的实现也很简单，主要做了四件事情：
1，通过 targetMap 拿到 target 对应的依赖集合 depsMap；
2，创建运行的 effects 集合；
3，根据 key 从 depsMap 中找到对应的 effects 添加到 effects 集合；
4，遍历 effects 执行相关的副作用函数。

### ref

首先处理了嵌套 ref 的情况，如果传入的 rawValue 也是 ref，那么直接返回。

接着对 rawValue 做了一层转换，如果 rawValue 是对象或者数组类型，那么把它转换成一个 reactive 对象。

最后定义一个对 value 属性做 getter 和 setter 劫持的对象并返回，get 部分就是执行 track 函数做依赖收集然后返回它的值；set 部分就是设置新值并且执行 trigger 函数派发通知

Vue.js 2.x 的响应式原理图很接近，其实 Vue.js 3.0 在响应式的实现思路和 Vue.js 2.x 差别并不大，主要就是 劫持数据的方式改成用 Proxy 实现 ， 以及收集的依赖由 watcher 实例变成了组件副作用渲染函数
