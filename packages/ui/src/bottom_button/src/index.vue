<template>
  <div class="button">
    <span
      v-for="(val, i) in obj_t"
      :key="i"
      :class="[val.pos, val.isGray ? 'gray' : 'blue']"
      @click="btnaction(val.isGray, val.isSendKey, val.msg)"
      v-html="val.name"
    ></span>
  </div>
</template>

<script>
export default {
  // 底部按钮组件
  data() {
    return {
      obj_t: [],
    };
  },
  props: ['config'],
  methods: {
    pageClick(keyPos) {
      const { obj_t } = this;
      this.btnaction(obj_t[keyPos].isGray, obj_t[keyPos].isSendKey, obj_t[keyPos].msg);
    },
    // 按钮消息处理
    btnaction(isGray, isSendKey, msg) {
      if (isGray) {
        console.log('按钮不可用');
      } else {
        if (isSendKey) {
          page.proKey(msg);
          console.log(`发送页面消息${msg}`);
        } else {
          wsap.sendKey(msg);
          console.log(`发送消息给后台${msg}`);
        }
      }
    },
    // 按钮置灰(禁用),传入参数为按钮位置
    Setgray(F) {
      this.obj_t[F].isGray = true;
    },
    // 重新启用置灰按钮，传入参数为按钮位置
    Regray(F) {
      this.obj_t[F].isGray = false;
    },
  },
  watch: {
    config(newValue) {
      const array = newValue?._config?.split(':');
      const btnJson = {};
      for (let i = 0; i < array?.length; i += 2) {
        btnJson[array[i]] = array[i + 1];
      }
      this.obj_t = {};
      for (const k in btnJson) {
        const arr_t = btnJson[k].split('|');
        this.obj_t[k] = {
          pos: k,
          name: arr_t[0],
          msg: arr_t[1],
          color: arr_t[2],
          isSendKey: arr_t[3],
          isGray: false,
        };
        // this.$set(this.obj_t, k, {
        //   pos: k,
        //   name: arr_t[0],
        //   msg: arr_t[1],
        //   color: arr_t[2],
        //   isSendKey: arr_t[3],
        //   isGray: false,
        // });
      }
    },
  },

  mounted() {
    // 获取按钮相关的数据
    const array = this.config?._config?.split(':');
    const btnJson = {};
    for (let i = 0; i < array?.length; i += 2) {
      btnJson[array[i]] = array[i + 1];
    }
    // for (let k = 1; k <= 8; ++k) {
    //   const keyInfo = wsap.pageinfoNode.getAttribute(`FKey${k}`);
    //   if (keyInfo != null && keyInfo != '') {
    //     btnJson[`F${k}`] = keyInfo;
    //   }
    // }

    // 按钮数据的相关处理
    for (const k in btnJson) {
      const arr_t = btnJson[k].split('|');
      const obj = {
        pos: k,
        name: arr_t[0],
        msg: arr_t[1],
        color: arr_t[2],
        isSendKey: arr_t[3],
        isGray: false,
      };
      this.obj_t.push(obj);
      // this.$set(this.obj_t, k, {
      //   pos: k,
      //   name: arr_t[0],
      //   msg: arr_t[1],
      //   color: arr_t[2],
      //   isSendKey: arr_t[3],
      //   isGray: false,
      // });
    }
  },
};
</script>

<style lang="scss">
// 1280*1024
// @media screen and (min-width: 1280px) and (min-height: 1024px) {
.button {
  position: absolute;
  left: 0;
  // right: 0;
  height: 100%;
  width: 100%;
  // top: 0;
  text-align: right;
  z-index: 101;
  span {
    display: none;
    height: 100%;
    width: 100%;
    border-radius: 2.063vw;
    line-height: 4.063vw;
    // margin-left: 8.625vw;
    font-family: 'HYQiHei 65j';
    font-size: 1.5vw;
    color: #ffffff;
    text-align: center;
    font-weight: 400;
    position: absolute;
    &.gray {
      background: #cccccc;
      box-shadow: 0vw 0.25vw 1.875vw 0vw rgba(80, 216, 196, 0.25);
    }
    &.blue {
      background-image: linear-gradient(180deg, #9ed1a4 0%, #7cae7e 100%);
      box-shadow: 0vw 0.25vw 1.875vw 0vw rgba(80, 216, 208, 0.25);
      &:active {
        background-image: linear-gradient(180deg, #9ccca2 0%, #4d894f 100%);
      }
    }
    &.F8 {
      display: inline-block;
      right: 2.813vw;
    }
    &.F7 {
      display: inline-block;
      right: 0;
    }
    &.F6 {
      display: inline-block;
      right: 34.688vw;
    }
    &.F5 {
      display: inline-block;
      right: 50.625vw;
    }
    &.F4 {
      display: inline-block;
      right: 66.563vw;
    }
  }
}
// }

@media screen and (min-width: 1600px) and (min-height: 1200px) and (max-width: 1600px) and(max-height:1200px) {
  .button {
    position: absolute;
    bottom: 42px;
    right: 0px;
    height: 65px;
    left: 0;
    text-align: right;
    z-index: 101;
    span {
      display: none;
      height: 100%;
      width: 200px;
      border-radius: 33px;
      line-height: 65px;
      // margin-left: 138px;
      font-family: 'HYQiHei 65j';
      font-size: 24px;
      color: #ffffff;
      text-align: center;
      font-weight: 400;
      position: absolute;
      &.gray {
        background: #cccccc;
        box-shadow: 0px 4px 30px 0px rgba(80, 216, 196, 0.25);
      }
      &.blue {
        background-image: linear-gradient(180deg, #9ed1a4 0%, #7cae7e 100%);
        box-shadow: 0px 4px 30px 0px rgba(80, 216, 208, 0.25);
        &:active {
          background-image: linear-gradient(180deg, #9ccca2 0%, #4d894f 100%);
        }
      }
      &.F8 {
        display: inline-block;
        right: 45px;
      }
      &.F7 {
        display: inline-block;
        right: 300px;
      }
      &.F6 {
        display: inline-block;
        right: 555px;
      }
      &.F5 {
        display: inline-block;
        right: 810px;
      }
      &.F4 {
        display: inline-block;
        right: 1065px;
      }
    }
  }
}

@media screen and (min-width: 1900px) and (min-height: 1000px) {
  .button {
    position: absolute;
    bottom: 50px;
    right: 50px;
    height: 65px;
    left: 0;
    text-align: right;
    z-index: 101;
    span {
      display: none;
      height: 100%;
      width: 200px;
      border-radius: 33px;
      text-align: center;
      line-height: 65px;
      // margin-left: 138px;
      font-family: 'HYQiHei 65j';
      font-size: 24px;
      color: #ffffff;
      text-align: center;
      font-weight: 400;
      position: absolute;
      &.gray {
        background: #cccccc;
        box-shadow: 0px 4px 30px 0px rgba(80, 216, 196, 0.25);
      }
      &.blue {
        background-image: linear-gradient(180deg, #9ed1a4 0%, #7cae7e 100%);
        box-shadow: 0px 4px 30px 0px rgba(80, 216, 208, 0.25);
        &:active {
          background-image: linear-gradient(180deg, #9ccca2 0%, #4d894f 100%);
        }
      }
      &.F8 {
        display: inline-block;
        left: 1649px;
      }
      &.F7 {
        display: inline-block;
        left: 1337px;
      }
      &.F6 {
        display: inline-block;
        left: 1025px;
      }
      &.F5 {
        display: inline-block;
        left: 713px;
      }
      &.F4 {
        display: inline-block;
        left: 401px;
      }
    }
  }
}
@media screen and (min-width: 1900px) and (min-height: 1100px) {
  .button {
    position: absolute;
    bottom: 60px;
    right: 50px;
    height: 65px;
    left: 0;
    text-align: right;
    z-index: 101;
    span {
      display: none;
      height: 100%;
      width: 200px;
      border-radius: 33px;
      text-align: center;
      line-height: 65px;
      // margin-left: 138px;
      font-family: 'HYQiHei 65j';
      font-size: 24px;
      color: #ffffff;
      text-align: center;
      font-weight: 400;
      position: absolute;
      &.gray {
        background: #cccccc;
        box-shadow: 0px 4px 30px 0px rgba(80, 216, 196, 0.25);
      }
      &.blue {
        background-image: linear-gradient(180deg, #9ed1a4 0%, #7cae7e 100%);
        box-shadow: 0px 4px 30px 0px rgba(80, 216, 208, 0.25);
        &:active {
          background-image: linear-gradient(180deg, #9ccca2 0%, #4d894f 100%);
        }
      }
      &.F8 {
        display: inline-block;
        left: 1649px;
      }
      &.F7 {
        display: inline-block;
        left: 1337px;
      }
      &.F6 {
        display: inline-block;
        left: 1025px;
      }
      &.F5 {
        display: inline-block;
        left: 713px;
      }
      &.F4 {
        display: inline-block;
        left: 401px;
      }
    }
  }
}
</style>
