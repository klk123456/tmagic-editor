<template>
  <div :class="['out', { contianer_big: largePrintVersion }]">
    <div class="frame">
      <div class="header">
        <img :src="src" alt="" />
        <span class="ctitle">{{ name }}</span>
        <span class="mid"></span>
        <span class="navtitle">{{ ctitle }}</span>
      </div>
      <slot></slot>
      <magic-ui-component v-for="item in config.items" :key="item.id" :config="item"></magic-ui-component>
    </div>
  </div>
</template>

<script>
import Component from '../../Component.vue';

export default {
  // 外层边框组件+app名称+页面名称
  data() {
    return {
      ctitle: '',
      name: '',
      src: null,
    };
  },
  components: {
    'magic-ui-component': Component,
  },
  props: ['config'],
  watch: {
    'config._appname'(newValue, oldValue) {
      if (newValue && newValue != oldValue) {
        this.name = newValue;
      }
    },
    'config._title'(newValue, oldValue) {
      if (newValue && newValue != oldValue) {
        this.ctitle = newValue;
      }
    },
    'config._icon'(newValue, oldValue) {
      if (newValue && newValue != oldValue) {
        this.src = this.getImg(newValue);
      }
    },
  },
  created() {
    this.src = this.getImg('card');
  },
  mounted() {
    // this.name = this.curApp.name;
    this.name = this.config._appname;
    // 获取页面名称
    // this.ctitle = wsap.pageinfoNode.getAttribute('CTitle');
    this.ctitle = this.config._title;
  },
  methods: {
    getImg(picName) {
      try {
        return new URL(`../../assets/Picture/components/1920x1200/header_${picName}.svg`, import.meta.url).href;
      } catch (e) {
        return new URL('../../assets/Picture/components/1920x1200/header_card.svg', import.meta.url).href;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.out {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
// 1280*1024
.frame {
  position: absolute;
  // top: 9.125vw;
  // left: 1.875vw;
  width: 100%;
  height: 100%;
  border: 0.063vw solid rgba(29, 149, 118, 0.12);
  box-shadow: 0vw 0.188vw 0.375vw 0vw rgba(29, 149, 118, 0.12);
  background: #ffffff;
  z-index: 100;

  .header {
    position: absolute;
    top: 1.813vw;
    left: 1.813vw;

    img {
      width: 2.5vw;
      height: 1.953vw;
      display: inline-block;
      vertical-align: middle;
    }

    .ctitle {
      font-family: 'HYQiHei 65j';
      line-height: 2.125vw;
      font-size: 1.75vw;
      color: #007964;
      margin-left: 0.938vw;
      margin-right: 0.938vw;
      font-weight: 400;
      height: 2.125vw;
      display: inline-block;
      vertical-align: middle;
    }

    .mid {
      height: 2.313vw;
      border: 0.063vw solid rgba(216, 215, 215, 1);
      background-color: rgba(216, 215, 215, 1);
      margin-right: 0.938vw;
      display: inline-block;
      vertical-align: middle;
    }

    .navtitle {
      // font-family: PingFang SC Medium;
      font-family: 'HYQiHei 65j';
      line-height: 2.75vw;
      font-size: 2.25vw;
      color: #303433;
      display: inline-block;
      vertical-align: middle;
      font-weight: 400;
    }
  }
}

@media screen and (min-width: 1600px) and (min-height: 1200px) and (max-width: 1600px) and(max-height:1200px) {
  .frame {
    position: absolute;
    top: 130px;
    left: 30px;
    width: 1540px;
    height: 1040px;
    border: 1px solid rgba(29, 149, 118, 0.12);
    box-shadow: 0px 3px 6px 0px rgba(29, 149, 118, 0.12);
    background: #ffffff;
    z-index: 100;

    .header {
      position: absolute;
      top: 29px;
      left: 29px;

      img {
        width: 40px;
        height: 31.25px;
        display: inline-block;
        vertical-align: middle;
      }

      .ctitle {
        font-family: 'HYQiHei 65j';
        line-height: 34px;
        font-size: 28px;
        color: #007964;
        margin-left: 15px;
        margin-right: 15px;
        font-weight: 400;
        height: 34px;
        display: inline-block;
        vertical-align: middle;
      }

      .mid {
        height: 37px;
        border: 1px solid rgba(216, 215, 215, 1);
        background-color: rgba(216, 215, 215, 1);
        margin-right: 15px;
        display: inline-block;
        vertical-align: middle;
      }

      .navtitle {
        // font-family: PingFang SC Medium;
        font-family: 'HYQiHei 65j';
        line-height: 44px;
        font-size: 36px;
        color: #303433;
        display: inline-block;
        vertical-align: middle;
        font-weight: 400;
      }
    }
  }
}

@media screen and (min-width: 1900px) and (min-height: 1000px) {
  .frame {
    position: absolute;
    top: 130px;
    left: 30px;
    width: 1860px;
    height: 920px;
    border: 1px solid rgba(29, 149, 118, 0.12);
    box-shadow: 0px 3px 6px 0px rgba(29, 149, 118, 0.12);
    background: #ffffff;
    z-index: 100;

    .header {
      position: absolute;
      top: 30px;
      left: 42px;

      img {
        width: 40px;
        height: 31.25px;
        display: inline-block;
        vertical-align: middle;
      }

      .ctitle {
        font-family: 'HYQiHei 65j';
        line-height: 40px;
        font-size: 28px;
        color: #007964;
        margin-left: 15px;
        margin-right: 37px;
        font-weight: 400;
        height: 40px;
        display: inline-block;
        vertical-align: middle;
      }

      .mid {
        // width: 1px;
        height: 37px;
        border: 1px solid rgba(216, 215, 215, 1);
        background-color: rgba(216, 215, 215, 1);
        margin-right: 37px;
        display: inline-block;
        vertical-align: middle;
      }

      .navtitle {
        // font-family: PingFang SC Medium;
        font-family: 'HYQiHei 65j';
        line-height: 40px;
        font-size: 36px;
        color: #303433;
        display: inline-block;
        vertical-align: middle;
        font-weight: 400;
      }
    }
  }
}

@media screen and (min-width: 1900px) and (min-height: 1100px) {
  .frame {
    position: absolute;
    top: 130px;
    left: 30px;
    width: 1860px;
    height: 1030px;
    border: 1px solid rgba(29, 149, 118, 0.12);
    box-shadow: 0px 3px 6px 0px rgba(29, 149, 118, 0.12);
    background: #ffffff;
    z-index: 100;

    .header {
      position: absolute;
      top: 30px;
      left: 42px;

      img {
        width: 40px;
        height: 31.25px;
        display: inline-block;
        vertical-align: middle;
      }

      .ctitle {
        font-family: 'HYQiHei 65j';
        line-height: 40px;
        font-size: 28px;
        color: #007964;
        margin-left: 15px;
        margin-right: 37px;
        font-weight: 400;
        height: 40px;
        flex-grow: 0;
        display: inline-block;
        vertical-align: middle;
      }

      .mid {
        // width: 1px;
        height: 37px;
        border: 1px solid rgba(216, 215, 215, 1);
        background-color: rgba(216, 215, 215, 1);
        margin-right: 37px;
        display: inline-block;
        vertical-align: middle;
      }

      .navtitle {
        font-family: 'HYQiHei 65j';
        line-height: 40px;
        font-size: 36px;
        color: #303433;
        display: inline-block;
        vertical-align: middle;
        font-weight: 400;
      }
    }
  }
}
.contianer_big {
  @media screen and (min-width: 1600px) and (min-height: 1200px) {
    .frame {
      .header {
        .ctitle {
          font-size: 36px;
        }
        .navtitle {
          font-size: 46px;
        }
      }
    }
  }
  @media screen and (min-width: 1900px) and (min-height: 1000px) {
    .frame {
      .header {
        .ctitle {
          font-size: 36px;
        }
        .navtitle {
          font-size: 46px;
        }
      }
    }
  }
  @media screen and (min-width: 1900px) and (min-height: 1100px) {
    .frame {
      .header {
        .ctitle {
          font-size: 36px;
        }
        .navtitle {
          font-size: 46px;
        }
      }
    }
  }
}
</style>
