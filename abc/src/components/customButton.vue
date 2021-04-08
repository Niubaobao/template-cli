<template>
  <div>
    custombutton 从祖先那里通过inject获取的值为:{{ them }}
    <br />
    {{ nothem }}
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    const them = inject('theme')

    const nothem = inject('nothem', '这是获取不到的时候给的默认值') // 第二个参数是获取不到

    return { them, nothem }
  },
}
</script>
