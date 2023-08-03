<template>
  <div class="percent-button" :class="{'down': isDown}" @mousedown="isDown = true" @mouseup="isDown = false" @mouseleave="isDown = false" @click="click">
    <div class="percent-button-text">
      <span v-if="percent >= 1">{{config.readyText}}</span>
      <span v-if="percent < 1" >{{percentShow}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "percent-button",
  props: ['config'],
  data() {
    return {
      isDown: false,
      percent: 0,
      inputs: {}
    };
  },
  methods: {
    click: function () {
      let _obj = this;
      if (_obj.percent !== 1) {
        for (let id in _obj.inputs) {
          if (_obj.inputs.hasOwnProperty(id)) {
            let input = _obj.inputs[id];
            if (!input.isComplete) {
              if (typeof input.position == "function") {
                input.position();
              }
              break;
            }
          }
        }
        return;
      }
      if (typeof _obj.$listeners["buttonClick"] !== "undefined") {
        this.$emit("buttonClick");
      }
    },
    bindInput: function (id, positionFunction) {
      /* 向按钮绑定必输输入项 */
      //id-被绑定输入项在此按钮中的唯一标识，positionFunction在按钮未100%完成时点击可定位到未输入项的方法
      let _obj = this;
      if (!_obj.inputs.hasOwnProperty(id)) {
        Vue.set(_obj.inputs, id, {
          isComplete: false
        });
      }
      Vue.set(_obj.inputs[id], "position", positionFunction);
      this.updatePercent();
    },
    unbindInput: function (id) {
      /* 从按钮中解绑输入项 */
      let _obj = this;
      if (_obj.inputs.hasOwnProperty(id)) {
        Vue.delete(_obj.inputs, id);
        this.updatePercent();
      }
    },
    updateInput: function (id, isComplete) {
      /* 通知按钮更新输入项输入状态 */
      let _obj = this;
      if (_obj.inputs.hasOwnProperty(id)) {
        Vue.set(_obj.inputs[id], "isComplete", isComplete);
        this.updatePercent();
      }
    },
    updatePercent() {
      let total = 0;
      let complete = 0;
      for (let id in this.inputs) {
        if (this.inputs.hasOwnProperty(id)) {
          total++;
          let input = this.inputs[id];
          if (input.isComplete) {
            complete++;
          }
        }
      }
      if (total !== 0) {
        let result = complete / total;
        if (result !== 1) {
          result += "";
          result = result.substr(0, 4);
          result = Number(result);
        }
        this.percent = result;
        return;
      }
      this.percent = 1;
    }
  },
  computed: {
    percentShow() {
      let percent = this.percent + '';
      if (percent.indexOf('.') === -1) {
        percent += '.00';
      } else {
        let next = percent.split('.')[1];
        if (next.length < 2) {//1位小数
          percent += '0';
        }
      }
      return '已完成' + Number(percent.substr(2, 2)) + '%';
    }
  }
};
</script>

<style scoped>

.percent-button {
  position: absolute;
  top: 940px;
  left: 1030px;
  display: inline-block;
  width: 200px;
  height: 54px;
  border-radius: 27px;
  box-shadow: 0 2px 30px 0 rgba(80, 114, 216, 0.25);
  background-image: linear-gradient(180deg, #a8cbff 0%, #87b9ff 100%);
  box-sizing: border-box;
  padding: 12px 10px 0 20px;
  line-height: 60px;
}
.percent-button-text {

  font-size: 20px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 29px;
  height: 29px;
}

</style>
