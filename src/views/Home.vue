<template>
  <div id="home">
    <h1>{{currentText}}</h1>
    <div id="clock" class="d-flex w-100 p-0 m-auto container flex-wrap">
      <div id="totaltimebreakadjust" class="d-flex col-12 col-lg-3 flex-lg-column justify-content-between">
        <b-btn variant='none'>
          <font-awesome-icon color='purple' @click="timebreakadjust('plus')"  :icon="['fas','plus']"></font-awesome-icon>
        </b-btn>
        <span class="shadow-lg rounded">Break:{{totaltimebreak/60}}min</span>
          <b-btn variant='none' @click="timebreakadjust('minus')">
        <font-awesome-icon color='purple' :icon="['fas','minus']"></font-awesome-icon>
        </b-btn>
      </div>
      <radial-progress-bar v-if="!isBreak" class="m-auto h-25  col-12 col-lg-4 p-0" :diameter="300" :completed-steps="timeleft" :total-steps="totaltime" startColor="#eee"   stopColor="#e74" innerStrokeColor="#444">
          <b-btn variant='primary' v-if='status!=1' @click='start' >
            <font-awesome-icon :icon="['fas','play']" ></font-awesome-icon>
          </b-btn>
          <b-btn variant='danger' v-if='status==1'     @click='pause'>
            <font-awesome-icon :icon="['fas','pause']" ></font-awesome-icon>
          </b-btn>
          <b-btn  variant='success' v-if='current.length > 0    || todos.length > 0' @click="finish(true)">
            <font-awesome-icon :icon="['fas','step-forward']"     ></font-awesome-icon>
          </b-btn>
          <span class="bg-primary text-white shadow-lg border rounded">{{timetext}}</span>
      </radial-progress-bar>
      <radial-progress-bar v-else class="m-auto" :diameter="300" :completed-steps="timeleft" :total-steps="totaltimebreak" startColor="#ccc"   stopColor="#c11" innerStrokeColor="#333">
          <b-btn variant='primary' v-if='status!=1'     @click='start' >
          <font-awesome-icon :icon="['fas','play']" ></font-awesome-icon>
          </b-btn>
          <b-btn  variant='danger' v-if='status==1'     @click='pause'>
          <font-awesome-icon :icon="['fas','pause']" ></font-awesome-icon>
          </b-btn>
          <b-btn  variant='success' v-if='current.length > 0    || todos.length > 0' @click="finish(true)">
          <font-awesome-icon :icon="['fas','step-forward']"     ></font-awesome-icon>
          </b-btn>
          {{timetext}}
      </radial-progress-bar>
      <div id="totaltimeadjust" class="d-flex col-12 col-lg-3 flex-lg-column justify-content-between">
        <b-btn  variant='none'>
          <font-awesome-icon color='purple' @click="timeadjust('plus')"  :icon="['fas','plus']"></font-awesome-icon>
        </b-btn>
        <span class="shadow-lg rounded">Work:{{totaltime/60}}min</span>
          <b-btn variant='none' @click="timeadjust('minus')">
        <font-awesome-icon color='purple' :icon="['fas','minus']"></font-awesome-icon>
        </b-btn>
      </div>

    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      // status :
      // 0 = 停止
      // 1 = 播放
      // 2 = 暫停
      status: 0,
      timebreakrange: this.$store.totaltimebreak
    }
  },
  computed: {
    currentText () {
      return this.current.length > 0 ? this.current : this.todos.length > 0 ? '點擊開始' : '沒有事項'
    },
    timetext () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m} min: ${s} sec`
    },
    alarm () {
      return this.$store.getters.alarm
    },
    timeleft () {
      return this.$store.getters.timeleft
    },
    current () {
      return this.$store.getters.current
    },
    todos () {
      return this.$store.getters.todos
    },
    totaltime () {
      return this.$store.getters.totaltime
    },
    totaltimebreak () {
      return this.$store.getters.totaltimebreak
    },
    isBreak () {
      return this.$store.getters.isBreak
    }
  },
  methods: {
    start () {
      if (this.status === 2) {
      // 暫停後繼續
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft < 0) {
            this.finish(false)
          }
        }, 1000)
      } else {
      // 開始
        if (this.todos.length > 0) {
          this.$store.commit('start')
          this.status = 1
          this.timer = setInterval(() => {
            this.$store.commit('countdown')
            if (this.timeleft < 0) {
              this.finish(false)
            }
          }, 1000)
        }
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish')

      if (!skip) {
        const audio = new Audio()
        audio.src = './alarms/' + this.alarm
        audio.play()
      }
      if (this.todos.length > 0) {
        this.start()
      } else {
        alert('結束')
      }
    },
    pause () {
      clearInterval(this.timer)
      console.log(this.body)
      this.status = 2
    },
    timeadjust (i) {
      if (this.status !== 1) {
        if (i === 'minus') {
          this.$store.commit('timeminus')
        } else {
          this.$store.commit('timeplus')
        }
      }
    },
    timebreakadjust (i) {
      if (this.status !== 1) {
        if (i === 'minus') {
          this.$store.commit('timebreakminus')
        } else {
          this.$store.commit('timebreakplus')
        }
      }
    }
  }
}
</script>
