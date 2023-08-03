<template>
  <div class="myContentBox">
    <div class="select" v-if="select">
      <img class="img" @click="changeSelect()" :src="selectIndex === index ? Checked : unChecked" alt="" />
    </div>
    <div class="title-box">
      <div class="buyTip" style="background: #f14a4a">{{ info.nowState }}</div>
      <div class="title">{{ info.name }}</div>
    </div>
    <div class="number-box">
      <div class="number" v-if="show">{{ info.profit }}</div>
      <div class="number" v-if="!show" @click="Open">点击查看</div>
      <div class="txt" @click="Open">{{ benchmark }}</div>
      <!-- <div class="txt" @click="Open">{{ info.reserve1=="D709"?"七日年化收益率":info.reserve1=="D321"?"业绩比较基准":"业绩比较基准" }}</div> -->
    </div>
    <div class="risk-box">{{ riskLevel }}</div>
    <div class="detail-box">
      <div style="display: flex; justify-content: flex-start; margin-top: 40px">
        <div class="tip1">{{ info.characterType }}</div>
      </div>
    </div>
    <div class="btn-box" @click="queryDetail()">查看详情</div>
    <PrdMessagebox :btnSign="PopBtnbtnSign" :titleStr="TitleMsg" :mycontentStr="mycontentMsg" ref="msgSignBox" @Continue="Continue" @close="closePop"> </PrdMessagebox>
  </div>
</template>
  
<script>
import PrdMessagebox from "./PrdMessagebox.vue";
export default {
  components: { PrdMessagebox },
  name: "OtherProductItem.vue",
  props: {
    select: Boolean,
    info: Object,
    index: Number,
    selectIndex: Number,
    code: "",
  },
  data() {
    return {
      benchmark: "",
      dialogVisible: false,
      characterTip: [],
      // Checked: "/static/Pictures/appstore/" + wsap.screenWidth + "x" + wsap.screenHeight + "/FinancialPurchasePubAC/table_checked.svg",
      // unChecked: "/static/Pictures/appstore/" + wsap.screenWidth + "x" + wsap.screenHeight + "/FinancialPurchasePubAC/table_uncheck.svg",
      TitleMsg: "",
      PopBtnbtnSign: [{ name: "返回", msg: "", isEvent: false }],
      mycontentMsg: "",
      riskLevel: "",
      show:false,
    };
  },
  created() {
    if (this.info.risk == "1") {
      this.riskLevel = "低风险";
    } else if (this.info.risk == "2") {
      this.riskLevel = "中低风险";
    } else if (this.info.risk == "3") {
      this.riskLevel = "中风险";
    } else if (this.info.risk == "4") {
      this.riskLevel = "中高风险";
    } else if (this.info.risk == "5") {
      this.riskLevel = "高风险";
    }
  },
  mounted() {
    console.log("this.info.reserve1 ===", this.info.reserve1);
    if (this.info.reserve1 == "D709") {
      this.show = true; 
      this.benchmark = "七日年化收益率";
    } else if (this.info.reserve1 == "D321") {
      this.benchmark = "业绩比较基准";
    } else if (this.info.reserve1 == "D303") {
      this.benchmark = "业绩比较基准";
    } else if (this.info.reserve1 == "D306") {
      this.benchmark = "业绩比较基准";
    }
  }, 
  methods: {
    changeSelect() {
      this.$emit("changeSelect", this.index);
    },
    queryDetail() {
      this.$emit("queryDetail", this.index);
    },
    Open() {
      this.$refs.msgSignBox.Open();
      if (this.benchmark == "七日年化收益率") {
        this.TitleMsg = this.benchmark;
        this.mycontentMsg = `1、七日年化收益率是本产品过去七日(含节假白)收益率所折算的产品年化收益率，代表产品近七日的收益水平。<br>2、不足七天以实际日收益率折算。<br>3、此处七日年化收益率截位保留小数点后3位，仅供参考，实际以我行相关公告为准。`;
      } else {
        this.TitleMsg =`${this.benchmark}：${this.info.profit1}（年化）` ;
        this.mycontentMsg = `本产品为固定收益类产品,产品业绩比较基准以,投资现金、到期日在一年以内的利率债等高流动性资产仓位0%-20%,同业存单、存款、债券回购、信用债等固定收益类资产仓位80%-100%,股票等权益类资产仓位0%-20%，公募基金0%-40%为例，综合考虑产品投资策略和市场环境等因素测算，仅作为管理人计算浮动管理费的依据，不代表理财产品未来表现,不等于理财产品实际收益，不作为理财产品收益的业绩保证，也不构成银行对产品收益的承诺,投资者所能获得的最终收益以银行实际支付的为准，投资需谨慎。`;
      }
    },
    Continue(key) {
      console.log("进入Continue", key);
    },
    closePop() {
      console.log("关闭弹窗");
    },
  },
  watch: {
    selectIndex(index) {
      console.log("index===", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.myContentBox {
  width: max-content;
  display: flex;
  justify-content: center;
  background: #ffffff;
  border: 0.81px solid rgba(201, 222, 247, 1);
  height: 105px;
}
.select {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-box {
  width: 260px;
  .title {
    font-family: "HYQiHei 65j";
    font-size: 32px;
    color: #333333;
    letter-spacing: 0;
    line-height: 36px;
    font-weight: 400;
    margin-top: 12px;
    text-align: center;
    //margin-left: -30px;
  }
  .buyTip {
    width: 140px;
    height: 27px;
    margin-left: 62px;
    background: #f14a4a;
    border-radius: 15px 15px 15px 1px;
    font-family: "HYQiHei 65j";
    font-size: 16px;
    color: #ffffff;
    line-height: 25px;
    font-weight: 400;
    text-align: center;
  }
}

::v-deep .number-box {
  width: 160px;
  margin-left: 20px;
  text-align-last: center;
  .number {
    margin-top: 30px;
    font-family: "HYQiHei 65j";
    font-size: 24px;
    color: #f86f3e;
    letter-spacing: 0;
    text-align: right;
    line-height: 20px;
    font-weight: 400;
  }
  .txt {
    margin-top: 15px;
    font-family: "HYQiHei 50j";
    font-size: 22px;
    color: #333333;
    text-align: right;
    line-height: 10px;
    font-weight: 400;
  }
}
.risk-box {
  width: 120px;
  margin-top: 40px;
  font-family: "HYQiHei 50j";
  font-size: 24px;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  line-height: 35px;
  font-weight: 400;
  margin-left: 100px;
}
.detail-box {
  width: 350px;
  margin-left: 100px;
  .text {
    text-align: left;
    font-family: "HYQiHei 65j";
    font-size: 20px;
    color: #505363;
    line-height: 20px;
    font-weight: 400;
  }
  .tip1 {
    padding: 6px 10px 0px 10px;
    height: 24px;
    background: #ffd8ba;
    border-radius: 6px;
    font-family: "HYQiHei 65j";
    font-size: 18px;
    color: #dd4f1c;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
  }
  .tip2 {
    padding: 6px 10px 0px 10px;
    margin-left: 10px;
    height: 24px;
    background: #c9def7;
    border-radius: 6px;
    font-family: "HYQiHei 65j";
    font-size: 14px;
    color: #40628d;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
  }
}
.btn-box {
  margin-top: 40px;
  font-family: "HYQiHei 50j";
  font-size: 26px;
  color: #5580d8;
  text-align: center;
  text-shadow: 0 3px 24px rgba(187, 193, 211, 0.25);
  font-weight: 500;
  margin-left: 30px;
  margin-right: 20px;
}
.dialog {
  margin-top: 30vh;
  width: 50%;
}
</style>