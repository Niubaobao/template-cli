import { reactive } from 'vue'

// 把相同业务进行抽离
function useRemoveStudent() {
  let state = reactive({
    stus: [
      { id: 1, name: 'zs', age: 10 },
      { id: 2, name: 'ls', age: 20 },
      { id: 3, name: 'ww', age: 30 },
      { id: 4, name: 'zl', age: 40 },
    ],
  })

  function remStu(index) {
    state.stus = state.stus.filter((stu, idx) => idx !== index)
  }
  return { state, remStu }
}

export default useRemoveStudent
