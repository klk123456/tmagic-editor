<template>
  <div :class="['type_basic', { active: isActive }, { gray: isGray }]"
       @click="SignClick(config, id)">
    <div v-if="config.isSigned"
         :class="mask">
      <div :class="['type_name', { active: isActive }, { gray: isGray }]">{{ config.typeName }}</div>
      <div v-show="config.isRead"
           class="agreement"
           @click.stop="ReadArgument(config, 'typeData')">协议</div>
      <div v-if="isActive"
           class="rb_icon"></div>
    </div>
    <template v-else>
      <div :class="['type_name', { active: isActive }, { gray: isGray }]">{{ config.typeName }}</div>
      <div v-show="config.isRead"
           class="agreement"
           @click.stop="ReadArgument(config, 'typeData')">协议</div>
      <div v-if="isActive"
           class="rb_icon"></div>
    </template>
  </div>
</template>

<script>
/*
组件名称：语音提示组件
功能说明：提供页面语音播放功能
        可开启语音播放，页面调用 Open(name)，参数name:需要播放的语音名
        可关闭语音播放，页面调用 Stop()
*/
export default {
  data () {
    return {
      isActive:"",
      isGray:"",
    };
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    'config.isGray'(newValue, oldValue) {
      console.log(newValue,oldValue);
        this.isGray = newValue;
    },
    'config.isActive'(newValue, oldValue) {
        this.isActive = newValue;
    }
  },
  methods: {
    ReadArgument (item, type) {
      
      this.$refs.msgSignBox.Open();
      // 读取展示对应协议
      if (type === "typeData") {
        this.pathSrc = item.pathSrc;
      } else if (type === "agreementTypeData") {
        this.pathSrc = item.pathSrc;
      }

      // 点击阅读条款时停止大页面的倒计时
      this.$refs.time.Stoptimer();
    },
    SignClick (item, i) {
      if(!this.isGray){
        this.isActive = !this.isActive
        this.$emit('update:config', {...this.config,isActive:!this.isActive})
      }
      if (wsap.pageInitJSONDATA.olderSignedItems[item.id] == "3") {
        this.$refs.msgBox.Open();
        // _this.PopMsg = "办理开户业务需同意账户类协议";
        this.PopMsg = `签约状态查询异常，暂时无法签约${item.typeName}，请稍后再试！！`;
        return;
      }
      // 全部未签约
      if (this.OldTypeData.length === 0) {
        this.typeData.forEach((it) => {
          if (it.id === item.id) {
            it.isActive = !it.isActive;
            // if (!it.isActive) {
            //   this.selectAll_typedata = false;
            // }
          }
        });
        // 控制全选框
        setTimeout(() => {
          var checked0_num = 0;
          this.typeData.forEach((item) => {
            if (item.isActive) checked0_num++;
          });
          if (checked0_num == this.typeData.length) this.selectAll_typedata = true;
          else this.selectAll_typedata = false;
        });
      }
      // 全部已签约
      else if (this.OldTypeData.length === this.typeData.length) {
        // 控制全选框
        this.selectAll_typedata = false;
      }
      // 部分已签约
      else {
        this.OldTypeData.forEach((v) => {
          v.isActive = true;
          v.isGray = true;
        });
        this.OptionalTypeData.forEach((v) => {
          if (v.id === item.id) {
            v.isActive = !v.isActive;
            if (!v.isActive) {
              this.selectAll_typedata = false;
            }
          }
        });
        // 控制全选框
        setTimeout(() => {
          var checked0_num = 0;
          this.OptionalTypeData.forEach((item) => {
            if (item.isActive) checked0_num++;
          });
          if (checked0_num == this.OptionalTypeData.length) this.selectAll_typedata = true;
          else this.selectAll_typedata = false;
        });
      }

      // setTimeout(() => {
      //   var checked0_num = 0;
      //   this.typeData.forEach((item) => {
      //     if (item.isActive) checked0_num++;
      //   });
      //   if (checked0_num == this.typeData.length) this.selectAll_typedata = true;
      //   else this.selectAll_typedata = false;
      // });
      this.$forceUpdate();
    },
  },
  mounted () {
    this.isActive = this.config.isActive;
    this.isGray = this.config.isGray;
  },
  beforeDestroy () {
  },
};
</script>

<style lang="scss" scoped>
/* 中心内容 */
.my-container-main {
  /* width: 97vw; */
  /* width: 85.625vw;
    height: 43.75vw;
    position: relative;
    top: 13.5vw;
    left: 9.75vw;
    display: flex;
    flex-direction: column;
    overflow-x: hidden; */
  width: 85.625vw;
  height: 43.75vw;
  position: relative;
  top: 11vw;
  left: 7.25vw;
  margin: 2.5vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.checkImage {
  width: 2.25vw;
  height: 2.25vw;
  img {
    width: 100%;
  }
}
.choice {
  margin-bottom: 1.625vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .tip {
    margin-left: 3.75vw;
  }
}
.choice span {
  padding-left: 1.375vw;
  line-height: 2.25vw;
  font-family: "HYQiHei 65j";
  font-size: 1.875vw;
  color: #333333;
  font-weight: 400;
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 79.875vw;
}
.type_basic {
  width: 17.335vw;
  height: 8.636vw;
  background: #f8fffc;
  border: 0.063vw solid rgba(206, 227, 213, 1);
  border-radius: 0.313vw;
  margin-right: 1.75vw;
  margin-bottom: 2.625vw;
  position: relative;
}
.type_basic .type_name {
  font-family: "HYQiHei 65j";
  font-size: 1.75vw;
  color: #333333;
  text-align: center;
  line-height: 8.636vw;
  font-weight: 400;
}

/* 选中协议 */
/* .active :active {
    border: 0.063vw solid rgba(94, 183, 62, 1);
    width: 17.335vw;
    height: 8.636vw;
    background: #f8fffc;
    border-radius: 0.313vw;
    margin-right: 1.75vw;
    margin-bottom: 2.625vw;
    position: relative;
  } */
.active {
  border: 0.063vw solid rgba(94, 183, 62, 1);
  width: 17.335vw;
  height: 8.636vw;
  background: #f8fffc;
  border-radius: 0.313vw;
  margin-right: 1.75vw;
  margin-bottom: 2.625vw;
  position: relative;
}
.active .type_name {
  font-family: "HYQiHei 65j";
  color: #3c8e1e;
  font-size: 1.75vw;
  text-align: center;
  line-height: 8.636vw;
  font-weight: 400;
}
.rb_icon {
  position: absolute;
  top: 6.125vw;
  left: 14.813vw;
  width: 3.066vw;
  height: 3.044vw;
  background-size: 100% 100%;
  background-image: url("/static/Pictures/appstore/1920x1200/IssueCard/choice.svg");
}
/* 协议不可选 */
.gray {
  width: 17.335vw;
  height: 8.636vw;
  background: #eef4f1;
  border: 0.063vw solid rgba(151, 158, 153, 0.5);
  border-radius: 0.313vw;
  margin-right: 1.75vw;
  margin-bottom: 2.625vw;
  position: relative;
}
.gray .type_name {
  font-family: "HYQiHei 35j";
  font-size: 1.75vw;
  color: #cacaca;
  text-align: center;
  font-weight: 400;
}
/* 已签约项默认置灰打勾不可取消 */
.mask {
  width: 17.335vw;
  height: 8.636vw;
  background: rgba(217, 228, 223, 0.5);
  border-radius: 0.313vw;
  margin-right: 1.75vw;
  margin-bottom: 2.625vw;
  position: relative;
  border: 0.063vw solid rgba(94, 183, 62, 1);
  /* pointer-events:none; */
}
.mask_name {
  font-family: "HYQiHei 65j";
  color: #3c8e1e;
  font-size: 1.75vw;
  text-align: center;
  line-height: 8.636vw;
  font-weight: 400;
  /* pointer-events:none; */
}
.type_basic .agreement {
  display: block;
  /* width: 3.5vw; */
  width: 4.25vw;
  height: 1.5vw;
  background: #ecfbf5;
  border: 0.063vw solid rgba(94, 183, 62, 1);
  border-radius: 0.125vw;
  font-family: "HYQiHei 65j";
  font-size: 1.063vw;
  color: #5eb73e;
  font-weight: 400;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tips {
  display: flex;
  align-items: center;
  margin-bottom: 1.625vw;
}
.tips span {
  margin-left: 1vw;
  font-family: "HYQiHei 50j";
  font-size: 1.625vw;
  color: #3c3c3c;
  font-weight: 400;
}
.agreementContent {
  width: 96.25vw;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  flex-direction: column;
  /* margin-left: 18.75vw; */
}
.agreementContent .content {
  display: flex;
}
.agreementType {
  width: 12.5vw;
  display: flex;
  align-items: center;
  margin-top: 1.25vw;
  margin-right: 9vw;
}
/* 协议名常规样式 */
.agreementType .agree_name {
  margin-left: 1vw;
  font-family: "HYQiHei 50j";
  font-size: 1.625vw;
  color: #3c3c3c;
  font-weight: 400;
}
/* 客户已签约某个协议，则灰显展示 */
.agreementType .agreeChecked {
  margin-left: 1vw;
  font-family: "HYQiHei 50j";
  font-size: 1.625vw;
  color: #bdb9b9;
  font-weight: 400;
}
.agreementContent > span {
  height: 2.188vw;
  margin-top: 2.5vw;
  color: rgba(236, 37, 23, 0.999);
  font-family: "HYQiHei 35j";
  font-size: 1.5vw;
  font-weight: 400;
}
iframe {
  margin-top: 2vw;
  margin-left: 5.5vw;
  /* width: 62.75vw;
    height: 23.75vw; */
  width: 69.375vw;
  height: 43.75vw;
}
</style>
