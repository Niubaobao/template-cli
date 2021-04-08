<template>
  <!-- 
  组件的模板决定了组件生成的dom标签
  vue内部 ： 组件经历 创建vnode -> 渲染vnode -> 生成vnode
  vnode: 一个可以描述组件信息的javascript对象
 -->
  <h1>{{ msg }}</h1>
  <div>
    <p ref="box">hello world</p>
    <p>{{ count }}</p>
  </div>
  <button @click="increment">
    count is:{{ state.count }},double is:{{ state.double }}
  </button>
  <custom-button></custom-button>
</template>

<script lang="ts">
import CustomButton from './customButton.vue'

import {
  ref,
  defineComponent,
  reactive,
  computed,
  watch,
  onMounted,
  onBeforeMount,
} from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },

  components: {
    CustomButton,
  },

  // 在creat之前，beforeCreate之后执行
  setup: () => {
    // 用来获取demo元素
    let box = ref(null)
    onMounted(() => {
      console.log(box.value)
    })

    const count = ref(0)

    let state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
    })

    //监听响应属性变化
    watch(
      () => count.value,
      (count, precount) => {
        console.log(count, precount)
      },
    )

    //也可以监听多个属性变化
    watch([count, state], ([count, state], [precount, prestate]) => {
      console.log([precount, prestate])
    })

    //生命周期函数
    /*
    生命周期映射关系
    beforeCreate -> 使用 setup() 
    created -> 使用 use setup() 
    beforeMount -> onBeforeMount 
    mounted -> onMounted 
    beforeUpdate -> onBeforeUpdate 
    updated -> onUpdated 
    beforeDestroy-> onBeforeUnmount 
    destroyed -> onUnmounted 
    activated -> onActivated 
    deactivated -> onDeactivated 
    errorCaptured -> onErrorCaptured
    */
    console.log('setup')

    onBeforeMount(() => {
      console.log('onBeforeMount')
    })

    // onMounted(() => {
    //   console.log("onMounted");
    // });

    function increment() {
      state.count++
      count.value++
    }

    return { count, state, increment, box }
  },
})
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
