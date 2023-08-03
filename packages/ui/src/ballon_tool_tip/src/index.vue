<template>
  <div>
    <div class="box"
         v-if="isshow">
      <div class="tipStr"
           v-html="config.tipStr"></div>
      <div class="icon"></div>
      <slot></slot>

      <!-- <div :class="{ time: time }">
      <span>{{ time }}</span>
      <span>s</span>
    </div> -->
    </div>
  </div>
</template>

<script>
// (function() {
//   "use strict";
//   /*一个气泡提示 Add By 刘召 2019-06-02*/
//   userBase.BallonToolTip = {};
//   /**
//    * @author：刘召
//    * @version：v1.0
//    * @el：气泡链接器，可以是一个id或样式
//    * @infoHTML：提示的内容,可以是文字或HTML
//    * @director：提示所在的位置，可选：1、2、3、4代表，上、右、下、左
//    * @time:气泡自动关闭时间，毫秒位单位
//    * @作用域 全位置可见 模块公共对象
//    */
//   userBase.BallonToolTip.BallonToolTip = function(el,infoHTML,intDirector,intTime) {
//     var int_director=1,int_time=4000;
// 	  if(intDirector != undefined && intDirector != "undefined"  && Mtils.validation.isInteger(intDirector)){
// 		  int_director=parseInt(intDirector);
// 	  }
// 	  if(intTime != undefined && intTime != "undefined" &&  Mtils.validation.isInteger(intTime)){
// 	  		  int_time=parseInt(intTime);
// 	  }
// 	  layer.tips('<span class="Laytips">'+infoHTML+'</span>', el, {
//       		  tips: [int_director, '#5E5E5E'],
//       		  time: int_time
//       		});
//   };
// }());

/*
 弹框组件
 1.弹框内标题等具体内容使用插槽传入的方式
 3.弹框是否含有倒计时，如果含有传入msgtime,
 4.tipStr 传入的提示字段
 5.支持插槽
*/
export default {
  props: ["config", "msgtime", "tipStr", "tipId"],
  data () {
    return {
      isshow: true,
      time: "",
      tipStr: "",
      top: "",
      left: "",
    };
  },

  methods: {
    // 显示弹框
    Open () {
      console.log("提示语组件");
      this.isshow = true;
      // window.onclick = null;
      // 判断是否有倒计时，如果有则开启倒计时
      if (this.config.msgtime) {
        this.time = this.config.msgtime;
        this.Timer = setInterval(() => {
          this.time--;
          if (this.time == 0) {
            this.isshow = false;
            clearInterval(this.Timer);
            this.$emit("TimeOut");
          }
        }, 1000);
      }
    },
    // 关闭弹框
    Close () {
      this.isshow = false;
      clearInterval(this.Timer);
      this.$emit("close");
    },
    //修改(设置)弹窗倒计时时间
    Settime (time) {
      this.msgtime = time;
    },
    //获取元素的纵坐标
    getTop (e) {
      var offset = e.offsetTop;
      if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
      return offset;
    },

    //获取元素的横坐标
    getLeft (e) {
      var offset = e.offsetLeft;
      if (e.offsetParent != null) offset += this.getLeft(e.offsetParent);
      return offset;
    },

    // 设置提示语位置
    Position (TipId, TipMsg) {
      this.Open();
      this.tipStr = TipMsg;
      var ele = document.querySelector(TipId);
      // let p = ele.getBoundingClientRect();
      // console.log(p);
      // this.top = p.y;
      // this.left = p.x;

      // this.top = this.getTop(ele);
      // this.left = this.getLeft(ele);
      // console.log(this.top);
      // console.log(this.left);

      // this.top = $("ele").offsetTop;
      // this.left = this.getLeft(ele);

      this.top = 550 + "px";
      this.left = 600 + "px";
      console.log(this.top);
      console.log(this.left);
      // $("TipId").css("position", "absolute").css("top", this.top).css("left", this.left);
      $(".box").css("position", "absolute").css("top", "550px").css("left", "600px");
    },
  },
  mounted () {
    // this.isshow = this.config.isshow;
    if (this.config.isshow) {
      this.Open()

    }
  },
  beforeDestroy () {
    clearInterval(this.Timer);
  },
};
</script>

<style lang="scss">
// 1280*1024
.box {
  position: absolute;
  left: 0;
  top: 0;
  width: 37.5vw;
  height: 12.5vw;
  background: rgba(224, 224, 224, 0.65);
  border-radius: 0.75vw;
  z-index: 9999;
  .tipStr {
    margin-top: 1.25vw;
    margin-left: 10%;
    width: 80%;
    font-size: 1.625vw;
    color: #333;
    text-align: center;
    font-family: "HYQiHei 65j";
    font-weight: 400;
  }
  // .time {
  //   width: 4.969vw;
  //   height: 3vw;
  //   font-size: 2.875vw;
  //   line-height: 3vw;
  //   text-align: right;
  //   span:first-child {
  //     color: rgb(248, 248, 248);
  //   }
  //   span:last-child {
  //     color: rgb(140, 140, 140);
  //   }
  // }
}
@media screen and (min-width: 1600px) and (min-height: 1200px) and (max-width: 1600px) and(max-height:1200px) {
  .box {
    position: absolute;
    left: 0;
    top: 0;
    width: 600px;
    height: 200px;
    background: rgba(224, 224, 224, 0.65);
    border-radius: 12px;
    z-index: 9999;
    .tipStr {
      margin-top: 20px;
      margin-left: 10%;
      width: 80%;
      font-size: 26px;
      color: #333;
      text-align: center;
      font-family: "HYQiHei 65j";
      font-weight: 400;
    }
    // .time {
    //   width: 79.5px;
    //   height: 48px;
    //   font-size: 46px;
    //   line-height: 48px;
    //   text-align: right;
    //   span:first-child {
    //     color: rgb(248, 248, 248);
    //   }
    //   span:last-child {
    //     color: rgb(140, 140, 140);
    //   }
    // }
  }
}
@media screen and (min-width: 1900px) and (min-height: 1000px) {
}
@media screen and (min-width: 1900px) and (min-height: 1100px) {
  .box {
    position: absolute;
    left: 0;
    top: 0;
    width: 400px;
    height: 50px;
    background: rgba(224, 224, 224, 0.65);
    border-radius: 4px;
    z-index: 9999;
    display: block;
    .tipStr {
      position: relative;
      margin: 3% 10%;
      width: 80%;
      font-size: 24px;
      color: #333;
      text-align: left;
      font-family: "HYQiHei 35j";
      font-weight: 400;
    }
    .icon {
      border-style: solid;
      border-width: 20px 18px 18px 18px;
      border-color: rgba(224, 224, 224, 0.65) transparent transparent
        transparent;
      width: 0px;
      height: 0px;
      position: absolute;
      top: 50px;
      left: 2px;
    }
    // .time {
    //   width: 79.5px;
    //   height: 48px;
    //   font-size: 46px;
    //   line-height: 48px;
    //   text-align: right;
    //   span:first-child {
    //     color: rgb(248, 248, 248);
    //   }
    //   span:last-child {
    //     color: rgb(140, 140, 140);
    //   }
    // }
  }
}
</style>
