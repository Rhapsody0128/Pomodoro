import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const timeleft = parseInt(process.env.VUE_APP_TIMELEFT)
const timeleftBreak = parseInt(process.env.VUE_APP_TIMELEFT_BREAK)

export default new Vuex.Store({
  state: {
    todos: [],
    timeleft: timeleft,
    alarm: 'nofeel.mp3',
    current: '',
    isBreak: false,
    src: 'red',
    totaltime: timeleft
  },
  getters: {
    alarm (state) {
      return state.alarm
    },
    todos (state) {
      return state.todos
    },
    timeleft (state) {
      return state.timeleft
    },
    current (state) {
      return state.current
    },
    isBreak (state) {
      return state.isBreak
    },
    totaltime (state) {
      return state.totaltime
    }
  },
  mutations: {
    selectAlarm (state, data) {
      state.alarm = data
    },
    addtodo (state, data) {
      state.todos.push({
        name: data,
        edit: false,
        model: data
      })
    },
    dragTodo (state, data) {
      state.todos = data
    },
    delTodo (state, data) {
      state.todos.splice(data, 1)
    },
    editTodo (state, data) {
      state.todos[data].edit = !state.todos[data].edit
    },
    cancelTodo (state, data) {
      state.todos[data].edit = false
      state.todos[data].model = state.todos[data].name
    },
    saveTodo (state, data) {
      state.todos[data].edit = false
      state.todos[data].name = state.todos[data].model
    },
    start (state) {
      if (state.isBreak) {
        state.current = '休息一下'
      } else if (!state.isBreak) {
        state.current = state.todos[0].name
        state.todos.splice(0, 1)
      }
    },
    countdown (state) {
      state.timeleft--
    },
    finish (state) {
      if (state.todos.length > 0) {
        state.isBreak = !state.isBreak
      }
      state.current = ''
      state.timeleft = state.isBreak ? timeleftBreak : timeleft
    },
    timeminus (state) {
      if (state.totaltime > 2) {
        state.totaltime--
        return state.totaltime
      } else { return state.totaltime }
    },
    timeplus (state) {
      if (state.totaltime < 50) {
        state.totaltime++
        return state.totaltime
      } else { return state.totaltime }
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
