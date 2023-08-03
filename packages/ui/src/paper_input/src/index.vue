<template>
  <div>
      <input type="text" class="input-warpper" id="input-warpperid" :value="config.atr.value" @input="getInputValue" />
  </div>
</template>
<script>
import Component from '../../Component.vue';
export default {
  name: 'PaperInput',
  // props: {
  //     /** input框的value值 */
  //     value: {
  //         type: [String, undefined],
  //         default: undefined,
  //     },
  //     // 判断输入框内value的类型
  //     format: {
  //         type: String
  //     },
  // },
  props:['config'],
  data() {
      return {
          // inputValue: config.atr.value,//数据内容
          iptindex: ""
      };
  },
  //引入Component组件
  components:{
    'magic-ui-component':Component
  },
  mounted() {
      // if (this.format == "account") {
      //     // 账号数据处理
      //     this.inputValue = tools.convAccountData(this.value, " ", 4)
      // } else if (this.format == "amount") {
      //     // 金额数据处理
      //     this.inputValue = tools.conAmountFormatNumber(this.value, 2)
      // }
      // // 字符串处理
      // page.proKey = key => {
      //     const input = document.querySelector(".input-warpper")
      //     this.iptindex = input.selectionStart
      //     if (tools.hasKeyInString(key, "BACK,Back")) {
      //         this.inputValue = this.inputValue.slice(0, input.selectionStart - 1) + this.inputValue.slice(input.selectionStart)
      //         if (this.format == "account") {
      //             // 账号数据处理
      //             this.inputValue = tools.convAccountData(this.inputValue, " ", 4)
      //         } else if (this.format == "amount") {
      //             // 金额数据处理
      //             this.inputValue = tools.conAmountFormatNumber(this.inputValue, 2)
      //         }
      //         this.nn = this.iptindex - this.inputValue.length - 1
      //         input.focus()
      //         setTimeout(() => {
      //             input.setSelectionRange(input.selectionStart + this.nn, input.selectionStart + this.nn);
      //         }, 10)
      //         if (input.selectionStart - 1 == 0) {
      //             setTimeout(() => {
      //                 input.setSelectionRange(input.selectionStart - 1, input.selectionStart - 1);
      //             }, 100)
      //         }

      //     } else if (tools.hasKeyInString(key, "1,2,3,4,5,6,7,8,9,0,00")) {
      //         input.focus()
      //         this.inputValue =
      //             this.inputValue.substring(0, input.selectionStart) +
      //             key +
      //             this.inputValue.substring(input.selectionEnd, input.textLength);

      //         this.nn = this.iptindex - this.inputValue.length + 1
      //         setTimeout(() => {
      //             input.setSelectionRange(input.selectionStart + this.nn, input.selectionStart + this.nn);
      //         }, 10)
      //         console.log(this.inputValue)
      //         if (this.format == "account") {
      //             // 账号数据处理
      //             this.inputValue = tools.convAccountData(this.inputValue, " ", 4)
      //         } else if (this.format == "amount") {
      //             // 金额数据处理
      //             this.inputValue = tools.conAmountFormatNumber(this.inputValue, 2)
      //         }
      //     }
      // };
  },
  methods: {
      getInputValue(e) {
          const event = e
          const target = event.srcElement || event.taget;
          this.inputValue = target.value;
          console.log(this.inputValue)
          this.$emit('change', this.inputValue);
      }
  }
};
</script>
<style>
@media screen and (min-width: 768px) and (max-width: 1279px) {
  .input-warpper {
      color: black;
      height: 25px;
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      outline-style: none;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 13px 14px;
      width: 300px;
      font-size: 24px;
      font-weight: 700;
      font-family: "Microsoft soft";
  }
}

@media screen and (min-width: 1280px) and (max-width: 1899px) {
  .input-warpper {
      height: 30px;
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      outline-style: none;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 13px 14px;
      color: black;
      width: 300px;
      font-size: 24px;
      font-weight: 700;
      font-family: "Microsoft soft";
  }
}

@media screen and (min-width: 1900px) {
  .input-warpper {
      color: black;
      height: 40px;
      position: absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      outline-style: none;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 13px 14px;
      width: 300px;
      font-size: 24px;
      font-weight: 700;
      font-family: "Microsoft soft";
  }
}
</style>
