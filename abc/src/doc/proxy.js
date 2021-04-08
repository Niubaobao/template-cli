var person = {
  name: 'zhangSan',
}

var proxy = new Proxy(person, {
  get: function (target, propKey) {
    if (propKey in target) {
      return target[propKey]
    } else {
      throw Error(`Prop name ${propKey} dose not exit`)
    }
  },
})

// console.log(proxy.name)
// console.log(proxy.age)

//get 方法可以继承的
let proto = new Proxy(
  {},
  {
    get(target, propKey, receiver) {
      console.log(`GET ${propKey}`)
      return target[propKey]
    },
  },
)

let obj = Object.create(proto)
// console.log(obj.name)

let proxy1 = new Proxy(
  {},
  {
    get: function (target, key, receiver) {
      return receiver
    },
  },
)

//console.log(proxy1.hello===proxy1)//true

//如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
const target = Object.defineProperties(
  {},
  {
    foo: {
      value: '22',
      writable: false,
      configurable: false,
    },
  },
)

const handle = {
  get: function (target, key) {
    return 'abc'
  },
}

var proxy2 = new Proxy(target, handle)

//console.log(proxy2.foo) //TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '22' but got 'abc')

//set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

//如果目标对象自身的某个属性不可写，那么set方法将不起作用。
const obj1 = {}

Object.defineProperty(obj1, 'foo', {
  value: 'qqq',
  writable: false,
})

var handler = {
  set: function (obj, prop, value, receiver) {
    obj[prop] = 'wwww'
  },
}
var proxy3 = new Proxy(obj1, handler)
proxy3.foo = 'rrrr'

//console.log(proxy3.foo)//qqq
