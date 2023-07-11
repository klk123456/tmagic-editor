<template>
  <div class="nav">
    <el-steps :active="active - 1" align-center>
      <el-step v-for="(item, index) of Nav" :key="index" :title="item">
        <template v-slot:icon>
          <img v-if="active - 1 > index" class="img_prev" src="../../assets/Picture/components/bj.png" alt="" />
          <img v-else-if="active - 1 == index" class="img_in" src="../../assets/Picture/components/bj.png" alt="" />
          <img v-else class="img_next" src="../../assets/Picture/components/bj.png" alt="" />
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
// 导航栏组件
// import { mapState } from 'vuex';

export default {
  data() {
    return {
      Nav: [],
      active: '',
    };
  },
  props: ['config'],
  computed: {
    myConfig() {
      return this.config._config;
    },
  },
  watch: {
    myConfig(newValue) {
      const arr = newValue.split(':');
      this.Nav = arr[0].split('|');
      this.active = arr.pop() * 1;
    },
  },
  methods: {
    // 指定进度条到具体第几步,参数num:具体的步骤几
    Step(num) {
      this.active = num;
    },
    // 下一步
    Stepto() {
      this.active += 1;
    },
    // 上一步
    Stepback() {
      this.active -= 1;
    },
    // 增加进度条步骤，参数num：在第几位增加，参数name:增加的步骤名
    Add(num, ...args) {
      this.Nav.splice(num - 1, 0, ...args);
    },
    // 删除进度条步骤，参数num:删除第几步
    Remove(num) {
      this.Nav.splice(num - 1, 1);
    },
    // 修改步骤名，参数num:修改第几位，参数name:修改的步骤名
    Reset(num, name) {
      this.Nav.splice(num - 1, 1, name);
    },
  },
  mounted() {
    // 获取导航栏相关的数据信息
    const node = this.config._config;
    const arr = node.split(':');
    this.Nav = arr[0].split('|');
    this.active = arr.pop() * 1;
    // if (this.curApp.msg) {
    //   try {
    //     // const xmlNode = wsap.selectSingleNode(
    //     //   wsap.NavigationXMLDoc,
    //     //   `//Root/FirstApp[@id='${this.curApp.msg}']/app[@id='${wsap.currentPageName}']`,
    //     // );
    //     // const arr = xmlNode.getAttribute('Navigation').split(':');
    //     // this.Nav = arr[0].split('|');
    //     // this.active = arr.pop() * 1;
    //   } catch (e) {
    //     console.log('未在public/cfg/public/MainCfg/Navigation.xml中配置导航栏');
    //   }
    // }
  },
};
</script>

<style lang="scss">
// 1280*1024
.nav {
  width: 56.25vw;
  position: absolute;
  bottom: 65.688vw;
  right: 2.813vw;
  z-index: 104;

  .img_prev {
    background-image: url('../../assets/Picture/components/1920x1200/Nav_prev.svg');
    width: 2.2vw;
    height: 2.2vw;
    background-size: 100% 100%;
  }
  .img_in {
    background-image: url('../../assets/Picture/components/1920x1200/Nav_in.svg');
    width: 2.2vw;
    height: 2.2vw;
    background-size: 100% 100%;
  }
  .img_next {
    background-image: url('../../assets/Picture/components/1920x1200/Nav_next.svg');
    width: 2.2vw;
    height: 2.2vw;
    background-size: 100% 100%;
  }

  .el-step__title.is-finish {
    color: #999999;
    font-size: 1.25vw;
    font-weight: 400;
    font-family: 'HYQiHei 65j';
    line-height: 1.875vw;
  }
  .el-step__title.is-process {
    font-size: 1.5vw;
    color: #333333;
    line-height: 1.875vw;
    font-weight: 400;
    font-family: 'HYQiHei 65j';
  }
  .el-step__title.is-wait {
    color: #999999;
    font-size: 1.25vw;
    font-weight: 400;
    font-family: 'HYQiHei 65j';
    line-height: 1.875vw;
  }
  .el-step__line-inner {
    border: 0.063vw solid rgba(108, 195, 164, 1);
    background-color: rgba(108, 195, 164, 1);
  }
  .el-step__line {
    width: 68%;
    left: 66% !important;
    background-color: rgba(204, 204, 204, 1) !important;
  }
}
// @media screen and (min-width: 1600px) and (min-height: 1200px) and (max-width: 1600px) and(max-height:1200px) {
//   .nav {
//     width: 900px;
//     position: absolute;
//     bottom: 987px;
//     right: 45px;
//     z-index: 104;

//     .img_prev {
//       background-image: url('../assets/Picture/components/1920x1200/Nav_prev.svg');
//       width: 29px;
//       height: 29px;
//       background-size: 100% 100%;
//     }
//     .img_in {
//       background-image: url('../assets/Picture/components/1920x1200/Nav_in.svg');
//       width: 29px;
//       height: 29px;
//       background-size: 100% 100%;
//     }
//     .img_next {
//       background-image: url('../assets/Picture/components/1920x1200/Nav_next.svg');
//       width: 29px;
//       height: 29px;
//       background-size: 100% 100%;
//     }
//   }

//   .el-step__title.is-finish {
//     color: #999999;
//     font-size: 20px;
//     font-weight: 400;
//     font-family: 'HYQiHei 65j';
//     line-height: 30px;
//   }
//   .el-step__title.is-process {
//     font-size: 24px;
//     color: #333333;
//     line-height: 30px;
//     font-weight: 400;
//     font-family: 'HYQiHei 65j';
//   }
//   .el-step__title.is-wait {
//     color: #999999;
//     font-size: 20px;
//     font-weight: 400;
//     font-family: 'HYQiHei 65j';
//     line-height: 30px;
//   }
//   .el-step__line-inner {
//     border: 1px solid rgba(108, 195, 164, 1);
//     background-color: rgba(108, 195, 164, 1);
//   }
//   .el-step__line {
//     width: 68%;
//     left: 66% !important;
//     background-color: rgba(204, 204, 204, 1) !important;
//   }
// }
// @media screen and (min-width: 1900px) and (min-height: 1000px) {
//   .nav {
//     width: 935px;
//     position: absolute;
//     bottom: 868px;
//     right: 70.72px;
//     z-index: 104;

//     .img_prev {
//       background-image: url('../assets/Picture/components/1920x1200/Nav_prev.svg');
//       width: 29px;
//       height: 29px;
//       background-size: 100% 100%;
//     }
//     .img_in {
//       background-image: url('../assets/Picture/components/1920x1200/Nav_in.svg');
//       width: 29px;
//       height: 29px;
//       background-size: 100% 100%;
//     }
//     .img_next {
//       background-image: url('../assets/Picture/components/1920x1200/Nav_next.svg');
//       width: 29px;
//       height: 29px;
//       background-size: 100% 100%;
//     }
//   }

//   .el-step__title.is-finish {
//     color: #999999;
//     font-size: 20px;
//     font-weight: 400;
//     font-family: 'HYQiHei 65j';
//     line-height: 30px;
//   }
//   .el-step__title.is-process {
//     font-size: 24px;
//     color: #333333;
//     line-height: 30px;
//     font-weight: 400;
//     font-family: 'HYQiHei 65j';
//   }
//   .el-step__title.is-wait {
//     color: #999999;
//     font-size: 20px;
//     font-weight: 400;
//     font-family: 'HYQiHei 65j';
//     line-height: 30px;
//   }
//   .el-step__line-inner {
//     border: 1px solid rgba(108, 195, 164, 1);
//     background-color: rgba(108, 195, 164, 1);
//   }
//   .el-step__line {
//     width: 68%;
//     left: 66% !important;
//     background-color: rgba(204, 204, 204, 1) !important;
//   }
// }
// @media screen and (min-width: 1900px) and (min-height: 1100px) {
//   .nav {
//     width: 935px;
//     position: absolute;
//     bottom: 988px;
//     right: 70.72px;
//     z-index: 104;

//     .img_prev {
//       background-image: url('../assets/Picture/components/1920x1200/Nav_prev.svg');
//       width: 29px;
//       height: 29px;
//       background-size: 100% 100%;
//     }
//     .img_in {
//       background-image: url('../assets/Picture/components/1920x1200/Nav_in.svg');
//       width: 29px;
//       height: 29px;
//       background-size: 100% 100%;
//     }
//     .img_next {
//       background-image: url('../assets/Picture/components/1920x1200/Nav_next.svg');
//       width: 29px;
//       height: 29px;
//       background-size: 100% 100%;
//     }
//   }

//   .el-step__title.is-finish {
//     color: #999999;
//     font-size: 20px;
//     font-weight: 400;
//     font-family: 'HYQiHei 65j';
//     line-height: 30px;
//   }
//   .el-step__title.is-process {
//     font-size: 24px;
//     color: #333333;
//     line-height: 30px;
//     font-weight: 400;
//     font-family: 'HYQiHei 65j';
//   }
//   .el-step__title.is-wait {
//     color: #999999;
//     font-size: 20px;
//     font-weight: 400;
//     font-family: 'HYQiHei 65j';
//     line-height: 30px;
//   }
//   .el-step__line-inner {
//     border: 1px solid rgba(108, 195, 164, 1);
//     background-color: rgba(108, 195, 164, 1);
//   }
//   .el-step__line {
//     width: 68%;
//     left: 66% !important;
//     background-color: rgba(204, 204, 204, 1) !important;
//   }
// } ;
</style>
