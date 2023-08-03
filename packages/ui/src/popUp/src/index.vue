<template>
  <div class="Popbg" v-if="isShowPopBg">
    <transition name="PopTr">
      <div class="PopContent" v-if="isShowPopC">
        <div class="PC_top">
          <div class="PCT_title">{{ (config.atr.title) }}</div>
          <img
            class="PCT_close"
            @click="closePop"
            src="packages/ui/src/popUp/close.svg"
          />
        </div>
        <div class="PC_Line"></div>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: ["config"],
  data() {
    return {
      isShowPopBg: true,
      isShowPopC: true,
    };
  },
  methods: {
    showPop() {
      this.isShowPopBg = true;
      setTimeout(() => {
        this.isShowPopC = true;
      }, 50);
    },
    closePop() {
      this.isShowPopC = false;
      setTimeout(() => {
        this.isShowPopBg = false;
      }, 200);
    },
    MU_PCB(msg) {
      if (msg) {
        page.proKey(msg);
      } else {
        this.closePop();
      }
    },
  },
};
</script>
<style scoped>
.Popbg {
  position: absolute;
  left: 0;
  top: 0;
  width: 1280px;
  height: 1024px;
  background: rgba(0, 0, 0, 0.65);
  z-index: 100000000000000;
}
.PopContent {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 736px;
  height: 740px;
  background: #ffffff;
  box-shadow: 0px 10px 30px 0px rgba(59, 73, 100, 1);
  border-radius: 5px;
}
.PC_top {
  position: absolute;
  left: 40px;
  top: 38px;
  width: 656px;
  height: 35px;
}
.PCT_title {
  float: left;
  width: 500px;
  height: 100%;
  font-size: 28px;
  color: #666666;
  letter-spacing: 0;
  line-height: 28px;
  font-weight: 400;
}
.PCT_close {
  float: right;
  width: 44px;
  height: 44px;
}
/* .PCB_BottomBtn_0 {
  background: #f7fafc;
  color: #333;
}
.PCB_BottomBtn_1 {
  color: #ffffff;
  background: #178ee5;
} */

.PC_Line {
  position: absolute;
  left: 40px;
  top: 100px;
  width: 656px;
  height: 1px;
  background: #cccccc;
}
.PC_bottomBtn {
  position: absolute;
  left: 40px;
  top: 563px;
  width: 656px;
  text-align: center;
}
.PC_bottomBtn table {
  display: inline-block;
}
.PC_bottomBtn td {
  text-align: center;
}

.PCB_BottomBtn {
  display: inline-block;
  width: 200px;
  height: 54px;
  background: #178ee5;
  border-radius: 27px;
  text-align: center;
}
.PCB_BottomBtn span {
  font-size: 22px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  font-weight: 400;
  line-height: 50px;
}
.PCB_BottomBtn_Blue {
  color: #ffffff;
  background: #178ee5;
}
.PCB_BottomBtn_Gray {
  background: #f7fafc;
  color: #333;
}

.PopTr-enter-active {
  animation: scaleEnlarge 0.3s ;
}
.PopTr-leave-active {
  animation: scaleEnlarge 0.3s reverse;
}

/* 弹窗动画关键帧 Start */
/* .fadeIn_DorS {
  animation-name: scaleEnlarge;
  animation-duration: 0.3s;
  animation-timing-function: ease;
} */

@keyframes scaleEnlarge {
  0% {
    left: 50%;
    top: -50%;
    max-width: 0;
    transform: scale(0, 1) translate(-50%, -50%);
    opacity: 0;
  }
  100% {
    left: 50%;
    top: 50%;
    max-width: 1000px;
    transform: scale(1, 1) translate(-50%, -50%);
    opacity: 1;
  }
}

@-webkit-keyframes scaleEnlarge {
  0% {
    left: 50%;
    top: -50%;
    max-width: 0px;
    -webkit-transform: scale(0, 1) translate(-50%, -50%);
    opacity: 0;
  }
  100% {
    left: 50%;
    top: 50%;
    max-width: 1000px;
    -webkit-transform: scale(1, 1) translate(-50%, -50%);
    opacity: 1;
  }
}
</style>