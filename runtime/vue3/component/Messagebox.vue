<template>
  <div class="cover" v-if="isshow">
    <div class="box">
      <div class="header">
        <img :src="getImg" alt="" />
      </div>
      <div v-if="tipStr" class="tipStr" v-html="tipStr"></div>
      <slot></slot>
      <div class="footer">
        <span
          v-for="(item, i) in btn"
          :key="i"
          :class="btn.length == 1 ? 'right' : i == 0 ? 'left' : 'right'"
          @click="Btnactive(item.isEvent, item.msg)"
          >{{ item.name }}</span
        >
      </div>
      <div :class="{ time: time }">
        <span>{{ time }}</span>
        <span>s</span>
      </div>
    </div>
  </div>
</template>

<script>
/*
 弹框组件
 1.弹框内标题等具体内容使用插槽传入的方式
 2.需传入弹框按钮 btn 相关数据:name->按钮显示文字;msg->按钮发送的消息;isEvent->是否有页面事件，如果有触发Continue事件(页面提供对应的事件处理)，如果没有则发送按键消息；
 具体格式如下：
 btn: [
        { name: "安全退出", msg: "Cancel", isEvent: false },
        { name: "继续办理", msg: "continue", isEvent: true },
      ],
3.弹框是否含有倒计时，如果含有传入msgtime,
4.tipStr 传入的提示字段
5.新增src 传入字段，支持修改弹窗图片，仅限svg格式。传入名称即可无需后缀，图片目录src/assets/Picture/components/1920x1200/
5.支持插槽
*/
export default {
  props: ['btn', 'msgtime', 'tipStr', 'src'],
  data() {
    return {
      isshow: false,
      // valueInTheMessageSent: "TimeOut",
      time: '',
    };
  },
  computed: {
    // getImg() {
    //   // try {
    //   //   return require(`@/assets/Picture/components/1920x1200/${this.src}.svg`);
    //   // } catch (e) {
    //   //   return require('@/assets/Picture/components/1920x1200/warn.svg');
    //   // }
    // },
  },
  methods: {
    // 显示弹框
    Open() {
      ('弹框组件');
      this.isshow = true;
      // window.onclick = null;
      // 判断是否有倒计时，如果有 显示并开启倒计时
      if (this.msgtime) {
        this.time = this.msgtime;
        this.Timer = setInterval(() => {
          this.time -= 1;
          if (this.time == 0) {
            this.isshow = false;
            clearInterval(this.Timer);
            this.$emit('TimeOut');
          }
        }, 1000);
      }
    },
    // 关闭弹框
    Close() {
      this.isshow = false;
      clearInterval(this.Timer);
      this.$emit('close');
    },
    // 修改(设置)弹窗倒计时时间
    Settime(time) {
      this.msgtime = time;
    },
    // 弹框按钮消息处理
    Btnactive(isEvent, msg) {
      if (isEvent) {
        this.Close();
        this.$emit('Continue', msg);
      } else {
        this.Close();
        wsap.sendKey(msg);
        console.log('发送按键消息');
      }
    },
  },
  mounted() {},
  beforeUnmount() {
    clearInterval(this.Timer);
  },
};
</script>

<style lang="scss">
// 1280*1024
// @media screen and (min-width: 1280px) and (min-height: 1024px) {
.cover {
  position: absolute;
  top: 0;
  right: 0vw;
  z-index: 19891018;
  background-color: rgba(0, 0, 0, 0);
  width: 100vw;
  height: 75vh;

  .box {
    position: absolute;
    top: 22.688vw;
    left: 24.063vw;
    width: 50vw;
    height: 29.625vw;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(0.625vw);
    border-radius: 0.75vw;
    .header {
      text-align: center;
      img {
        width: 5.707vw;
        height: 5.707vw;
        margin-top: 2.507vw;
      }
    }
    .tipStr {
      margin-top: 1.25vw;
      margin-left: 10%;
      width: 80%;
      font-size: 2vw;
      color: #ffffff;
      text-align: center;
      font-family: 'HYQiHei 65j';
      font-weight: 400;
    }
    .footer {
      position: absolute;
      bottom: 3.375vw;
      height: 4.375vw;
      width: 100%;
      text-align: center;
      span {
        width: 14.688vw;
        height: 100%;
        border-radius: 2.188vw;
        font-family: 'HYQiHei 65j';
        font-size: 1.875vw;
        font-weight: 400;
        display: inline-block;
        line-height: 4.375vw;
        &.left {
          background: #ffffff;
          color: #656565;
          margin-right: 6.688vw;
          &:active {
            background: #d5d3d3;
          }
        }
        &.right {
          background: #feb739;
          color: #ffffff;
          &:active {
            background: #e9a329;
          }
        }
      }
    }
    .time {
      position: absolute;
      left: 43.063vw;
      top: 1.969vw;
      width: 4.969vw;
      height: 3vw;
      font-size: 2.875vw;
      line-height: 3vw;
      text-align: right;
      span:first-child {
        color: rgb(248, 248, 248);
      }
      span:last-child {
        color: rgb(140, 140, 140);
      }
    }
  }
}
// }
@media screen and (min-width: 1600px) and (min-height: 1200px) and (max-width: 1600px) and (max-height:1200px) {
  .cover {
    position: absolute;
    top: 0;
    right: 0px;
    z-index: 19891018;
    background-color: rgba(0, 0, 0, 0);
    width: 1600px;
    height: 1200px;

    .box {
      position: absolute;
      top: 363px;
      left: 385px;
      width: 800px;
      height: 474px;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      .header {
        text-align: center;
        img {
          width: 91.31px;
          height: 91.31px;
          margin-top: 40.11px;
        }
      }
      .tipStr {
        margin-top: 20px;
        margin-left: 10%;
        width: 80%;
        font-size: 32px;
        color: #ffffff;
        text-align: center;
        font-family: 'HYQiHei 65j';
        font-weight: 400;
      }
      .footer {
        position: absolute;
        bottom: 54px;
        height: 70px;
        width: 100%;
        text-align: center;
        span {
          width: 235px;
          height: 100%;
          border-radius: 35px;
          font-family: 'HYQiHei 65j';
          font-size: 30px;
          font-weight: 400;
          display: inline-block;
          line-height: 70px;
          &.left {
            background: #ffffff;
            color: #656565;
            margin-right: 107px;
            &:active {
              background: #d5d3d3;
            }
          }
          &.right {
            background: #feb739;
            color: #ffffff;
            &:active {
              background: #e9a329;
            }
          }
        }
      }
      .time {
        position: absolute;
        left: 689px;
        top: 31.5px;
        width: 79.5px;
        height: 48px;
        font-size: 46px;
        line-height: 48px;
        text-align: right;
        span:first-child {
          color: rgb(248, 248, 248);
        }
        span:last-child {
          color: rgb(140, 140, 140);
        }
      }
    }
  }
}
@media screen and (min-width: 1900px) and (min-height: 1000px) {
  .cover {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 19891018;
    background-color: rgba(0, 0, 0, 0);
    width: 1920px;
    height: 1080px;

    .box {
      position: absolute;
      top: 363px;
      left: 543px;
      width: 800px;
      height: 474px;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      .header {
        text-align: center;
        img {
          width: 91.31px;
          height: 91.31px;
          margin-top: 40.11px;
        }
      }
      .tipStr {
        margin-top: 20px;
        margin-left: 10%;
        width: 80%;
        font-size: 32px;
        color: #ffffff;
        text-align: center;
        font-family: 'HYQiHei 65j';
        font-weight: 400;
      }
      .footer {
        position: absolute;
        bottom: 54px;
        height: 70px;
        width: 100%;
        text-align: center;
        span {
          width: 235px;
          height: 100%;
          border-radius: 35px;
          font-family: 'HYQiHei 65j';
          font-size: 30px;
          font-weight: 400;
          display: inline-block;
          line-height: 70px;
          &.left {
            background: #ffffff;
            color: #656565;
            margin-right: 107px;
            &:active {
              background: #d5d3d3;
            }
          }
          &.right {
            background: #feb739;
            color: #ffffff;
            &:active {
              background: #e9a329;
            }
          }
        }
      }
      .time {
        position: absolute;
        left: 689px;
        top: 31.5px;
        width: 79.5px;
        height: 48px;
        font-size: 46px;
        line-height: 48px;
        text-align: right;
        span:first-child {
          color: rgb(248, 248, 248);
        }
        span:last-child {
          color: rgb(140, 140, 140);
        }
      }
    }
  }
}
@media screen and (min-width: 1900px) and (min-height: 1100px) {
  .cover {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 19891018;
    background-color: rgba(0, 0, 0, 0);
    width: 1920px;
    height: 1200px;
    .box {
      position: absolute;
      top: 403px;
      left: 543px;
      width: 800px;
      height: 474px;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      .header {
        text-align: center;
        img {
          width: 91.31px;
          height: 91.31px;
          margin-top: 40.11px;
        }
      }
      .tipStr {
        margin-top: 20px;
        margin-left: 10%;
        width: 80%;
        font-size: 32px;
        color: #ffffff;
        text-align: center;
        font-family: 'HYQiHei 65j';
        font-weight: 400;
      }
      .footer {
        position: absolute;
        bottom: 54px;
        height: 70px;
        width: 100%;
        text-align: center;
        span {
          width: 235px;
          height: 100%;
          border-radius: 35px;
          font-family: 'HYQiHei 65j';
          font-size: 30px;
          font-weight: 400;
          display: inline-block;
          line-height: 70px;
          &.left {
            background: #ffffff;
            color: #656565;
            margin-right: 107px;
            &:active {
              background: #d5d3d3;
            }
          }
          &.right {
            background: #feb739;
            color: #ffffff;
            &:active {
              background: #e9a329;
            }
          }
        }
      }
      .time {
        position: absolute;
        left: 689px;
        top: 31.5px;
        width: 79.5px;
        height: 48px;
        font-size: 46px;
        line-height: 48px;
        text-align: right;
        span:first-child {
          color: rgb(248, 248, 248);
        }
        span:last-child {
          color: rgb(140, 140, 140);
        }
      }
    }
  }
}
</style>
