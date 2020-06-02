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
    totaltime: timeleft,
    totaltimebreak: timeleftBreak
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
    },
    totaltimebreak (state) {
      return state.totaltimebreak
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
      if (state.isBreak) {
        state.timeleft = state.totaltime
        return state.timeleft
      } else {
        state.timeleft = state.totaltimebreak
        state.totaltime = state.totaltimebreak
        return [state.timeleft, state.totaltimebreak]
      }
    },
    timeminus (state) {
      if (state.totaltime > 1) {
        state.totaltime--
        state.timeleft = state.totaltime
        return [state.totaltime, state.timeleft]
      } else { return [state.totaltime, state.timeleft] }
    },
    timeplus (state) {
      if (state.totaltime < 30) {
        state.totaltime++
        state.timeleft = state.totaltime
        return [state.totaltime, state.timeleft]
      } else { return [state.totaltime, state.timeleft] }
    },
    timebreakminus (state) {
      if (state.totaltimebreak > 1) {
        state.totaltimebreak--
        return state.totaltimebreak
      } else { return state.totaltimebreak }
    },
    timebreakplus (state) {
      if (state.totaltimebreak < 25) {
        state.totaltimebreak++
        return state.totaltimebreak
      } else {
        return state.totaltimebreak
      }
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
