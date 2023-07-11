<template>
  <div class="Countdown" :class="{ show: show }">
    <div class="s">
      <span>{{ timerValue }}</span>
      <span>s</span>
    </div>
    <messagebox ref="msgbox" :btn="btn" @Continue="Continue" @TimeOut="TimeOut" :msgtime="msgtime">
      <div class="text">
        <div class="title">长时间无操作，是否继续进行业务办理?</div>
        <div class="t">
          <span>请在</span>
          <span class="num">{{ msgtime }}</span>
          <span>s内点击按钮，如仍无操作将为您退出系统登录</span>
        </div>
      </div>
    </messagebox>
  </div>
</template>

<script>
// 页面倒计时组件

export default {
  name: 'PageTime',
  data() {
    return {
      value: '',
      timerValue: '',
      timer: '',
      // valueInTheMessageSent: "TimeOut",
      show: true,
      msgtime: 15,
      btn: [
        { name: '安全退出', msg: 'Cancel', isEvent: false },
        { name: '继续办理', msg: 'continue', isEvent: true },
      ],
    };
  },
  computed: {
    // isRemind() {
    //   return this.config.isRemind;
    // },
  },
  props: ['config'],
  watch: {
    'config.time'(newValue, oldValue) {
      console.log(newValue);
      if (newValue > 0 && newValue != oldValue) {
        this.timerValue = newValue;
        this.value = this.timerValue;
        this.Pagetimer();
      }
    },
  },
  methods: {
    // 发送超时消息
    TimeOut() {
      // wsap.sendKey('TimeOut');
    },
    // 初始化页面计时器，开始倒计时
    Pagetimer() {
      this.show = false;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.timerValue -= 1;
        if (this.timerValue == 0) {
          this.Stoptimer();
          this.$emit('end');
          if (this.config.isRemind) {
            this.$refs.msgbox.Open();
          } else {
            this.TimeOut();
          }
          window.onclick = null;
        }

        // 防止在倒计时过程中点击页面又会重启倒计时
        window.onclick = null;
      }, 1000);
    },
    // 暂停计时器
    Stoptimer() {
      console.log(this.timerValue, '---暂停计时器的时刻');
      clearInterval(this.timer);
    },
    // 修改计时器时间
    Settimer(num) {
      this.Stoptimer();
      this.timerValue = num;
      this.value = this.timerValue;
      this.Pagetimer();
    },
    // 重新启动计时器
    Resettimer() {
      this.Stoptimer();
      this.timerValue = this.value;
      this.Pagetimer();
    },
    Continue() {
      window.onclick = this.Resettimer;
    },
  },
  mounted() {
    // 获取页面倒计时时间
    try {
      this.timerValue = this.config.time;
      this.value = this.timerValue;
    } catch (error) {
      console.log('未找到配置的xml信息');
    }
    // this.rshowtime = this.showtime;
    // console.log(this.timerValue);
    // 启动倒计时
    this.Pagetimer();
    // 点击页面重启倒计时
    // window.onclick = this.Resettimer;
  },
  beforeUnmount() {
    this.Stoptimer();
  },
};
</script>

<style lang="scss">
// 1280*1024
// @media screen and (min-width: 1280px) and (min-height: 1024px) {
.Countdown {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.show {
  display: none;
}
.s {
  position: absolute;
  // left: 90.75vw;
  // top: 16.375vw;
  width: 4.969vw;
  height: 3vw;
  font-size: 2.875vw;
  line-height: 3vw;
  text-align: right;
  span:first-child {
    color: rgb(140, 140, 140);
  }
  span:last-child {
    color: rgb(200, 200, 200);
  }
  z-index: 104;
}
.text {
  margin-top: 1.25vw;
  font-family: 'HYQiHei 65j';
  font-weight: 400;
  .title {
    font-size: 2vw;
    color: #ffffff;
    text-align: center;
  }
  .t {
    margin-top: 0.625vw;
    text-align: center;
    font-size: 1.25vw;
    color: #ffffff;
    .num {
      color: red;
    }
  }
}
// }
@media screen and (min-width: 1600px) and (min-height: 1200px) and (max-width: 1600px) and(max-height:1200px) {
  .Countdown {
    position: absolute;
    width: 1600px;
    height: 1200px;
    top: 0;
  }
  .show {
    display: none;
  }
  .s {
    position: absolute;
    left: 1452px;
    top: 262px;
    width: 79.5px;
    height: 48px;
    font-size: 46px;
    line-height: 48px;
    text-align: right;
    span:first-child {
      color: rgb(140, 140, 140);
    }
    span:last-child {
      color: rgb(200, 200, 200);
    }
    z-index: 104;
  }
  .text {
    margin-top: 20px;
    font-family: 'HYQiHei 65j';
    font-weight: 400;
    .title {
      font-size: 32px;
      color: #ffffff;
      text-align: center;
    }
    .t {
      margin-top: 10px;
      text-align: center;
      font-size: 20px;
      color: #ffffff;
      .num {
        color: red;
      }
    }
  }
}
@media screen and (min-width: 1900px) and (min-height: 1000px) {
  .Countdown {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
  .show {
    display: none;
  }
  .s {
    position: absolute;
    left: 1752px;
    top: 254px;
    width: 79.5px;
    height: 48px;
    font-size: 46px;
    line-height: 48px;
    text-align: right;
    span:first-child {
      color: rgb(140, 140, 140);
    }
    span:last-child {
      color: rgb(200, 200, 200);
    }
    z-index: 104;
  }
  .text {
    margin-top: 20px;
    font-family: 'HYQiHei 65j';
    font-weight: 400;
    .title {
      font-size: 32px;
      color: #ffffff;
      text-align: center;
    }
    .t {
      margin-top: 10px;
      text-align: center;
      font-size: 20px;
      color: #ffffff;
      .num {
        color: red;
      }
    }
  }
}
@media screen and (min-width: 1900px) and (min-height: 1100px) {
  .Countdown {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
  .show {
    display: none;
  }
  .s {
    position: absolute;
    left: 1752px;
    top: 239px;
    width: 79.5px;
    height: 48px;
    font-size: 46px;
    line-height: 48px;
    text-align: right;
    span:first-child {
      color: rgb(140, 140, 140);
    }
    span:last-child {
      color: rgb(200, 200, 200);
    }
  }
  .text {
    margin-top: 20px;
    font-family: 'HYQiHei 65j';
    font-weight: 400;
    .title {
      font-size: 32px;
      color: #ffffff;
      text-align: center;
    }
    .t {
      margin-top: 10px;
      text-align: center;
      font-size: 20px;
      color: #ffffff;
      .num {
        color: red;
      }
    }
  }
}
</style>
