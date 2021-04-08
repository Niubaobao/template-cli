<!-- v-for 集中抽离-->
<template>
  <div>
    <form>
      <input type="text" v-model="state2.stu.id" />
      <input type="text" v-model="state2.stu.name" />
      <input type="text" v-model="state2.stu.age" />
      <input type="submit" @click="addStu" />
    </form>
    <ul>
      <li
        v-for="(item, index) in state.stus"
        :key="item.id"
        @click="remStu(index)"
      >
        {{ item.name }}---{{ item.age }}
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'
import useRemoveStudent from './removeStudent'
import useAddStudent from './addStudents'
export default {
  name: 'listDemo',
  setup() {
    let { state, remStu } = useRemoveStudent()
    let { state2, addStu } = useAddStudent(state)
    return { state, remStu, state2, addStu }
  },
}
</script>

<style></style>
