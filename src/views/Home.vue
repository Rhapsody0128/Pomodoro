<template>
  <div id="home">
    <h1>{{currentText}}</h1>
    <div id="clock" class="d-flex w-75 m-auto">
      <div id="totaltimebreakadjust" class='col-4'>
        <b-btn class="h-25 m-auto " variant='none'   @click="timebreakadjust('minus')">
        <font-awesome-icon :icon="['fas','minus']"></font-awesome-icon>
        </b-btn>
        休息時間:{{totaltimebreak}}
        <b-btn class="h-25 m-auto" variant='none'>
          <font-awesome-icon @click="timebreakadjust('plus')"  :icon="['fas','plus']"></font-awesome-icon>
        </b-btn>
      </div>

      <radial-progress-bar class="m-auto col-4"    :diameter="400" :completed-steps="timeleft"    :total-steps="totaltime" startColor="#eee"   stopColor="#e74" innerStrokeColor="#444" isClockwise="false">
      <b-btn variant='primary' v-if='status!=1' @click='start' >
      <font-awesome-icon :icon="['fas','play']" ></font-awesome-icon>
      </b-btn>
      <b-btn  variant='danger' v-if='status==1' @click='pause'>
      <font-awesome-icon :icon="['fas','pause']" ></font-awesome-icon>
      </b-btn>
      <b-btn  variant='success' v-if='current.length > 0 || todos.length > 0' @click="finish(true)">
      <font-awesome-icon :icon="['fas','step-forward']" ></font-awesome-icon>
      </b-btn>
      {{timetext}}
      </radial-progress-bar>
      <div class="col-4" id="totaltimeadjust">
        <b-btn class="h-25 m-auto" variant='none'   @click="timeadjust('minus')">
        <font-awesome-icon :icon="['fas','minus']"></font-awesome-icon>
        </b-btn>
        工作時間:{{totaltime}}
        <b-btn class="h-25 m-auto" variant='none'>
          <font-awesome-icon @click="timeadjust('plus')"  :icon="['fas','plus']"></font-awesome-icon>
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
      tiemer: 0
    }
  },
  computed: {
    currentText () {
      return this.current.length > 0 ? this.current : this.todos.length > 0 ? '點擊開始' : '沒有事項'
    },
    timetext () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m} : ${s}`
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
