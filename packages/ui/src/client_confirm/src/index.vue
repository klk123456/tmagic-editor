<template>
  <div>
    <div :class="config.needRemoveMain ? '' : 'main'">
      <div class="infos">
        <!-- 客户基本信息和业务信息数据 -->
        <slot></slot>
        <!-- <div class="basictitle">客户信息</div>
                <div class="basicinfo">
                    <el-row :gutter="10">
                        <el-col :lg="4" :xl="3"><div class="grid-content bg-purple">姓名</div></el-col>
                        <el-col :lg="18" :xl="18"><div class="grid-content bg-purple-light name">{{clientSignInfo.name}}</div></el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :lg="4" :xl="3"><div class="grid-content bg-purple">民族</div></el-col>
                        <el-col :lg="5" :xl="5"><div class="grid-content jobTitle bg-purple-light">{{clientSignInfo.race}}</div></el-col>
                        <el-col :lg="2" :xl="2"><div class="grid-content bg-purple">国家</div></el-col>
                        <el-col :lg="3" :xl="5"><div class="grid-content bg-purple-light">{{clientSignInfo.nationality}}</div></el-col>
                        <el-col :lg="3" :xl="3"><div class="grid-content bg-purple">证件有效期</div></el-col>
                        <el-col :lg="7" :xl="6"><div class="grid-content bg-purple-light">{{icdate}}</div></el-col>
                    </el-row>

                </div>
                <div class="basictitle">业务信息</div>
                <div class="basicinfo">
                    <el-row :gutter="10">
                        <el-col :lg="4" :xl="3"><div class="grid-content bg-purple">业务类型</div></el-col>
                        <el-col :lg="10" :xl="12"><div class="grid-content bg-purple-light">{{clientSignInfo.businessType}}</div></el-col>
                        <el-col :lg="3" :xl="3"><div class="grid-content bg-purple">身份证号</div></el-col>
                        <el-col :lg="3" :xl="6"><div class="grid-content bg-purple-light">{{clientSignInfo.ICNo}}</div></el-col>
                    </el-row>
                </div> -->
      </div>

      <!-- 客户图像信息 -->
      <div class="customerImage" v-if="showPic">
        <div class="basictitle">客户图像信息</div>
        <div class="customerImageInfo">
          <el-row :gutter="10">
            <el-col :lg="6" :xl="6">
              <div class="image-content">
                <div class="imgtype">
                  <img :src="'data:image/png;base64,' + config.PicInfo.frontBase64" alt="" />
                </div>
                <div class="imgname">身份证正面</div>
              </div>
            </el-col>
            <el-col :lg="6" :xl="6">
              <div class="image-content">
                <div class="imgtype">
                  <img :src="'data:image/png;base64,' + config.PicInfo.backBase64" alt="" />
                </div>
                <div class="imgname">身份证反面</div>
              </div>
            </el-col>
            <el-col :lg="4" :xl="4">
              <div class="image-content">
                <div class="imgtype">
                  <img :src="'data:image/png;base64,' + config.PicInfo.photoBase64" alt="" />
                </div>
                <div class="imgname">身份证头像</div>
              </div>
            </el-col>
            <el-col :lg="4" :xl="4">
              <div class="image-content">
                <div class="imgtype">
                  <img :src="'data:image/png;base64,' + config.PicInfo.networkingBase64" alt="" />
                </div>
                <div class="imgname">联网核查头像</div>
              </div>
            </el-col>
            <el-col :lg="4" :xl="4">
              <div class="image-content">
                <div class="imgtype">
                  <img :src="'data:image/png;base64,' + config.PicInfo.sceneBase64" alt="" />
                </div>
                <div class="imgname">现场照片</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 客户同意的信息展示 -->
      <!-- <div class="alreadySigned" v-show="ifshowalreadySigned">本人已同意业务相关的条款及协议：{{ strSign }}。</div> -->
      <div class="alreadySigned" v-show="ifshowalreadySigned">我已同意本业务涉及的：{{ config.strSign }}。</div>
      <div class="alreadySigned" v-show="ifshowAlreadySpecial">{{ config.specialMsg }}。</div>
      <!-- <div class="alreadySigned" v-show="!ifshowalreadySigned && ifneedFingerprintOrSign">客户签名</div> -->
      <div class="basictitle" v-show="!ifshowalreadySigned && ifneedFingerprintOrSign">客户签名</div>
      <!-- 电子签名 -->
      <div :class="config.needRemoveMain ? '' : 'customerName_box'" v-show="ifneedFingerprintOrSign" @click="HiddenSignatureTip()">
        <div class="customerName">
          <div class="signature-pad" id="signature-pad">
            <div class="signature-pad--body">
              <!-- 初始化签名提示语 -->
              <!-- <div class="content" id="content_layer_tip" v-show="initShow">请点击该区域进行签名，若您选择指纹签名方式，将进行工作人员授权</div> -->
              <div class="content" id="content_layer_tip">请点击该区域进行签名，若您选择指纹签名方式，将进行工作人员授权</div>
              <!-- 禁止签名 -->
              <div class="content" v-if="prohibitSign">
                <img class="printImg" :src="'data:image/png;base64,' + customerNamePng" />
              </div>
              <!-- 画布 -->
              <canvas class="pcanvas" id="mycanvas"> </canvas>
            </div>
          </div>
        </div>
      </div>
      <!-- 指纹签名按钮 -->
      <button v-show="ifneedFingerprintOrSign" :class="['btn', { btn_gray: notClickable }]" :disabled="notClickable" @click="FingerPrintSign">选择指纹签名</button>
    </div>

    <!--  返回首页按钮【否则底部按钮位置不对齐】 -->
    <backhome></backhome>
    <!--  底部按钮组件  -->
    <bottombutton ref="btn"></bottombutton>
    <Messagebox :btn="PopBtn" :tipStr="PopMsg" ref="msgBox" :msgtime="5" @Continue="closePop"></Messagebox>

    <!--  声音组件  -->
    <sound ref="sound"></sound>
    <!-- 指纹签名弹窗 -->
    <!-- <el-dialog :title="title" center :visible.sync="coverClientFinger" append-to-body :close-on-click-modal="false" :destroy-on-close="true"> -->
    <el-dialog @close="CloseDialogSendData" :title="title" center append-to-body :visible.sync="coverClientFinger" :close-on-click-modal="false" :destroy-on-close="true">
      <div class="titleFingerprint">请录入您的指纹</div>
      <div class="fingerImg">
        <img src="../../assets/Picture/components/1920x1200/finger.gif" alt="" />
      </div>
    </el-dialog>

    <!-- <FingerprintMessagebox :title="titleFingerBox" :btn="PopBtn" :tellerNoChecked="tellerNoCheckedMsg" ref="msgFingerprintBox" @Continue="Continue" @close="closePop"></FingerprintMessagebox> -->
  </div>
</template>

<script>
/**
 签名框组件
 1.客户基本信息和业务信息等具体数据使用插槽传入的方式
 2.不需要在具体页面的配置文件中配置底部按钮和音频，仅配置倒计时和标题即可
 3.需传入的数据
      pageNameMsg - String | 发送信息的对应页面名字[必传] | "RegularAccountOpening::ClientSign"
      specialMsg - String | 客户同意的特殊信息展示[可以不传] | "本人同意并确认提前支取，自愿承担损失的利息"
      strSign - String | 本业务涉及的协议[可以不传] | "《账户类》"
      needFingerprintOrSign - Boolean | 是否需要电子签名和指纹签名[可以不传] | true-需要，默认值为true
      PicInfo - Object | 客户相关图像信息[可以不传] | "PicInfo":{"frontBase64":'',"backBase64":'',"photoBase64":'',"networkingBase64":'',"sceneBase64":''}
      needRemoveMain - Boolean | 是否需要移除main节点[可以不传] | true-需要，默认值为false

 3.若指纹模块异常，则选择指纹签名按钮置灰不可点击
 */

export default {
  props: ["config","specialMsg", "pageNameMsg", "strSign", "needFingerprintOrSign", "PicInfo", "needRemoveMain"],
  data() {
    return {
      // 指纹签名标志 "0"-手写签名，"1"-指纹签名
      fingerflag: "0",
      // fingerflag: "1",
      // fingerflag: false,
      customerNamePng: "",
      // 选择指纹签名按钮置灰不可点击
      notClickable: false,
      // 签名框展示初始化提示语
      // initShow: true,
      // 禁止签名
      prohibitSign: false,
      // 客户同意的信息展示
      ifshowalreadySigned: true,
      ifshowAlreadySpecial: true,
      ifneedFingerprintOrSign: true,
      ifneedRemoveMain: false,
      // // 签名弹窗
      // titleFingerBox: "",
      // 是否展示客户图像信息
      showPic: false,
      // el-dialog对话框的指纹签名弹窗
      title: "",
      coverClientFinger: false,
      tipStr: "",
    };
  },
  created() {
    console.log("签名框组件");
    console.log(
      "子组件接收到的父组件数据：strSign | specialMsg | pageNameMsg | needFingerprintOrSign | PicInfo | needRemoveMain",
      this.config,
      // this.specialMsg,
      // this.pageNameMsg,
      // this.needFingerprintOrSign,
      // this.PicInfo,
      // this.needRemoveMain
    );
    // 统一页面左上角的标题内容
    // if (wsap.pageinfoNode) {
    //   this.tipStr = wsap.pageinfoNode.getAttribute("CTitle");
    //   console.log("页面左上角的标题内容:", this.tipStr);
    //   if (this.tipStr != "请确认您的交易信息") {
    //     // this.tipStr = '请确认您的交易信息'
    //     wsap.pageinfoNode.setAttribute("CTitle", "请确认您的交易信息");
    //   }
    // }
    // 展示业务过程中客户已同意的协议名称
    console.log("子组件接收到的展示业务过程中客户已同意的协议名称:", this.config.strSign);
    if (this.config.strSign == "" || this.config.strSign == undefined) {
      this.ifshowalreadySigned = false;
    }
    // 展示业务相关的特殊信息
    console.log("子组件接收到的展示业务相关的特殊信息:", this.config.specialMsg);
    if (this.config.specialMsg == "" || this.config.specialMsg == undefined) {
      this.ifshowAlreadySpecial = false;
    }
    // 是否需要展示电子签名或电子指纹
    console.log("子组件接收到的是否需要展示电子签名或电子指纹标志:", this.config.needFingerprintOrSign);
    this.ifneedFingerprintOrSign = this.config.needFingerprintOrSign;
    // 需要展示电子签名或电子指纹
    if (this.ifneedFingerprintOrSign === "" || this.ifneedFingerprintOrSign === undefined) {
      this.ifneedFingerprintOrSign = true;
    }
    // 不需要展示电子签名或电子指纹
    else if (this.ifneedFingerprintOrSign === false) {
      this.ifneedFingerprintOrSign = false;
    }
    // 是否需要展示客户图像信息
    this.showPic = this.config.PicInfo ? true : false;
    console.log(this.config.PicInfo , this.showPic);
    // 是否需要移除main节点
    console.log("子组件接收到的是否需要移除main节点标志:", this.config.needRemoveMain);
    // 不需要移除main节点
    if (this.config.needRemoveMain === "" || this.config.needRemoveMain === undefined || this.config.needRemoveMain === false) {
      this.ifneedRemoveMain = false;
    }
    // 需要移除main节点
    else if (this.config.needRemoveMain === true) {
      this.ifneedRemoveMain = true;
    }
  },
  methods: {
    // 通过移除元素隐藏签名文字提示
    HiddenSignatureTip() {
      let content_layer_tip = document.getElementById("content_layer_tip");
      console.log("通过移除元素隐藏签名文字提示:", content_layer_tip);
      if (content_layer_tip) {
        content_layer_tip.remove();
      }
    },
    // 通过添加元素在重签时重新显示文字提示
    // <div class="content" id="content_layer_tip" v-show="initShow">请点击该区域进行签名，若您选择指纹签名方式，将进行工作人员授权</div>
    AddSignatureTip() {
      let ifShowed = document.getElementById("content_layer_tip");
      let add_content_layer_tip = $("<div></div>").text("请点击该区域进行签名，若您选择指纹签名方式，将进行工作人员授权").attr("id", "content_layer_tip").attr("class", add_content);

      var fbl = wsap.screenWidth + "x" + wsap.screenHeight;
      console.log("此时的分辨率fbl：", fbl);
      var add_content = {};
      if (fbl == "1920x1200") {
        add_content_layer_tip.css({
          width: "99%",
          height: "99%",
          lineHeight: "30vh",
          position: "absolute",
          top: "100%",
          left: "0",
          bottom: "0",
          right: "0",
          transform: "translateY(-50%)",
          margin: "auto",
          fontFamily: "HYQiHei 35j",
          fontSize: "1.875vw",
          color: "#aaaaaa",
          letterSpacing: "0",
          textAlign: "center",
          fontWeight: "400",
          zIndex: "99",
        });
        console.log(add_content);
      } else if (fbl == "1920x1080") {
        add_content_layer_tip.css({
          width: "99%",
          height: "99%",
          lineHeight: "17vw",
          position: "absolute",
          top: "100%",
          left: "0",
          bottom: "0",
          right: "0",
          transform: "translateY(-50%)",
          margin: "auto",
          fontFamily: "HYQiHei 35j",
          fontSize: "36px",
          color: "#aaaaaa",
          letterSpacing: "0",
          textAlign: "center",
          fontWeight: "400",
          zIndex: "99",
        });
      } else if (fbl == "1600x1200") {
        add_content_layer_tip.css({
          width: "99%",
          height: "99%",
          lineHeight: "332px",
          position: "absolute",
          top: "100%",
          left: "0",
          bottom: "0",
          right: "0",
          transform: "translateY(-50%)",
          margin: "auto",
          fontFamily: "HYQiHei 35j",
          fontSize: "36px",
          color: "#aaaaaa",
          letterSpacing: "0",
          textAlign: "center",
          fontWeight: "400",
          zIndex: "99",
        });
      }
      console.log("通过添加元素在重签时重新显示文字提示:", add_content_layer_tip);
      if (!ifShowed) {
        $(".signature-pad--body").prepend(add_content_layer_tip);
      }
    },
    // // 通过变量控制隐藏签名文字提示 - 客户随意滑动屏幕可能会导致提示隐藏
    // HiddenSignature() {
    //   this.initShow = false;
    // },
    // 指纹签名按钮点击事件
    FingerPrintSign() {
      this.HiddenSignatureTip();
      var strJSON = {
        messagetype: "pagemessage",
        messageinfo: {
          infotype: "fingerSign",
          // pagename: "RegularAccountOpening::ClientSign",
          pagename: this.config.pageNameMsg,
          fingerSignflag: "1",
        },
      };
      wsap.sendMsg(strJSON);
    },
    // 关闭弹窗时发送消息通知APP关闭指纹仪，APP关闭指纹仪
    CloseDialogSendData() {
      wsap.sendKey("x");
    },
  },
  mounted() {
    const _this = this;
    // 进入页面播放音频
    // _this.$refs.sound.Open("F_ClientConfirm");
    // 底部按钮设置
    // FKey8="确认|Enter|blue|true" FKey7="重签|Clear||true"  FKey6="上一步|Back||true"
    // _this.$set(_this.$refs.btn.obj_t, "F8", {
    //   pos: "F8",
    //   name: "确认",
    //   msg: "Enter",
    //   color: "green",
    //   isSendKey: true,
    //   isGray: true,
    // });
    // _this.$set(_this.$refs.btn.obj_t, "F7", {
    //   pos: "F7",
    //   name: "重签",
    //   msg: "Clear",
    //   color: "green",
    //   isSendKey: true,
    //   isGray: false,
    // });
    // _this.$set(_this.$refs.btn.obj_t, "F6", {
    //   pos: "F6",
    //   name: "上一步",
    //   msg: "Back",
    //   color: "green",
    //   isSendKey: true,
    //   isGray: false,
    // });

    // 不需要展示电子签名或电子指纹
    if (this.ifneedFingerprintOrSign === false) {
      // 按钮位置
      // this.$delete(this.$refs.btn.obj_t, "F8");
      // this.$delete(this.$refs.btn.obj_t, "F7");
      // this.$delete(this.$refs.btn.obj_t, "F6");
      // _this.$set(_this.$refs.btn.obj_t, "F7", {
      //   pos: "F7",
      //   name: "返回",
      //   msg: "Back",
      //   color: "green",
      //   isSendKey: true,
      //   isGray: false,
      // });
      // _this.$set(_this.$refs.btn.obj_t, "F8", {
      //   pos: "F8",
      //   name: "确认",
      //   msg: "Enter",
      //   color: "green",
      //   isSendKey: true,
      //   isGray: false,
      // });
    }
    // 签名框
    // 确认按钮置灰
    // userBase.RippleButton.disableButton("F8");
    var intWidth, signaturePad;
    intWidth = "1050px";
    // intWidth = "950px";

    // 确认按钮置灰
    // this.$refs.btn.Setgray("F8");
    console.log($("#signature-pad")
      .css("opacity", "0").velocity);
    var signaturePad;
    // $("#signature-pad")
    //   .css("opacity", "0")
    //   .velocity(
      //   { opacity: 1 },
      //   {
      //     duration: 600,
      //     complete: function () {
      //       //动画完成后处理函数
      //       var wrapper = document.getElementById("signature-pad"),
      //         canvas = wrapper.querySelector("canvas");
      //       signaturePad = new SignaturePad(canvas, {
      //         backgroundColor: "rgb(255, 255, 255)", //设置签名区域背景颜色
      //         penColor: "#AAA", //设置签名文字颜色
      //       });
      //       function resizeCanvas() {
      //         var ratio = Math.max(window.devicePixelRatio || 1, 1);
      //         canvas.width = canvas.offsetWidth * ratio;
      //         canvas.height = canvas.offsetHeight * ratio;
      //         canvas.getContext("2d").scale(ratio, ratio);
      //         signaturePad.clear();
      //       }
      //       window.onresize = resizeCanvas;
      //       resizeCanvas();
      //     },
      //   }
      // );
    $("#mycanvas").bind("touchstart mousedown", function () {
      _this.$refs.btn.Regray("F8");
    });

    //处理按键响应事件接口【页面发送消息给APP】
    // page.proKey = function (key) {
    //   var ret = "";
    //   if (tools.hasKeyInString(key, "F1,F2,F3,F4,F5,F6,F7,F8")) {
    //     userBase.RippleButton.buttonClick(key);
    //   }
    //   //处理密码键盘按键  重新签名 处理
    //   else if (tools.hasKeyInString(key, "Clear")) {
    //     // _this.initShow = false;

    //     // 添加签名提示语
    //     _this.AddSignatureTip();

    //     // 取消签名框的其他剩余区域不可进行手写签名的控制
    //     _this.prohibitSign = false;
    //     // 可以进行指纹签名
    //     _this.notClickable = false;

    //     _this.fingerflag = false;
    //     signaturePad.clear();
    //     userBase.RippleButton.disableButton("F8");
    //   } else if (tools.hasKeyInString(key, "Back,Cancel")) {
    //     wsap.sendKey(key);
    //     signaturePad.clear();
    //   }
    //   //处理密码键盘按键  撤销或回退签名 处理
    //   else if (tools.hasKeyInString(key, "BackSpace")) {
    //     var data = signaturePad.toData();
    //     if (data) {
    //       data.pop(); // remove the last dot or line
    //       signaturePad.fromData(data);
    //     }
    //   }
    //   //处理密码键盘按键 确认按钮
    //   else if (tools.hasKeyInString(key, "Enter")) {
    //     var dataBase64 = signaturePad.toDataURL();
    //     console.log(dataBase64.length);
    //     if (signaturePad.isEmpty() && _this.fingerflag != "1" && _this.config.needFingerprintOrSign != false) {
    //       userBase.BallonToolTip.BallonToolTipScroll("#signature-pad", "请先签名，再点击确认！");
    //     } else {
    //       //把签名矢量图转化为Base64编码数据 ，在此默认生成的图片格式是PNG的Base64数据
    //       var strJSON = {
    //         messagetype: "pagemessage",
    //         messageinfo: {
    //           infotype: "inputcomplete",
    //           // pagename: _this.$store.state.curApp.msg + '::CtoFInfoConfirmTest',
    //           // pagename: "CurrentToFixed::CtoFInfoConfirmTest",
    //           pagename: _this.config.pageNameMsg,
    //           fingerflag: _this.fingerflag,
    //           Signature: dataBase64.replace(/^data:image\/\w+;base64,/, ""),
    //         },
    //       };
    //       console.log(strJSON);
    //       wsap.sendMsg(strJSON);
    //     }
    //   }
    // };
    //处理应用送达消息【中间消息：APP发给页面的消息处理】
    // page.recvMsg = function (varSourceID, messageType, messageinfo) {
    //   // 调起录入指纹的弹窗
    //   if (messageinfo.transResult == "fingerSign" && messageinfo.successflag == "1") {
    //     // 打开录入指纹的弹窗
    //     _this.coverClientFinger = true;
    //     _this.$refs.sound.Open("F_OwnPrintFinger");
    //     // _this.titleFingerBox = "请录入您的指纹";
    //     // _this.$refs.msgFingerprintBox.Open("0");
    //   }
    //   // 指纹仪故障
    //   if (messageinfo.transResult == "fingerError" && messageinfo.fingerstatus == "0") {
    //     // 指纹仪故障时选择指纹签名按钮置灰不可点击
    //     _this.notClickable = true;
    //   }
    //   // 展示客户录入的指纹图片
    //   if (messageinfo.transResult == "fingerflag" && messageinfo.successflag == "1") {
    //     // 使用img.onload和drawImage方法加载图片
    //     // // 通过不同的分辨率进行定位
    //     // var fbl = wsap.screenWidth + "x" + wsap.screenHeight;
    //     // console.log("此时的分辨率fbl：", fbl);
    //     // // 单位为px
    //     // // var left = 530;
    //     // // 单位为vw
    //     // var left = tools.getVW(530);
    //     // console.log(left);
    //     // if (fbl == "1920x1200" || fbl == "1920x1080") {
    //     //   // 单位为px
    //     //   // left = 650;
    //     //   // 单位为vw
    //     //   left = tools.getVW(650);
    //     // } else if (fbl == "1600x1200") {
    //     //   // left = 0;
    //     //   // 单位为px
    //     //   // left = 530;
    //     //   // 单位为vw
    //     //   left = tools.getVW(530);
    //     // }
    //     // _this.fingerflag = "1";
    //     // _this.initShow = false;
    //     // // 清空画布
    //     // signaturePad.clear();
    //     // // 创建一个Image对象
    //     // var img = new Image();
    //     // // Image对象的src属性对应的属性值为base64图片
    //     // img.src = "data:image/png;base64," + messageinfo.fingerData;
    //     // // 获取画布canvas节点对象
    //     // var strcanvas = document.getElementById("mycanvas").getContext("2d");
    //     // // 加载图片
    //     // img.onload = () => {
    //     //   /**
    //     //    * drawImage方法中的参数：
    //     //    *  第一个参数 | img - 图片对象
    //     //    *  第二个参数 | left - 引入的图片资源距离画布canvas节点左侧的距离
    //     //    *  第三个参数 | 引入的图片资源距离画布canvas节点顶部的距离
    //     //    * 例：
    //     //    *  在1600x1200的分辨率下设置left = 0;且令strcanvas.drawImage(img, left, 0);
    //     //    *    - 此时该base64的指纹图片显示在签名框的左上角
    //     //    */
    //     //   // strcanvas.drawImage(img, left, 0);
    //     //   // 单位为px
    //     //   // strcanvas.drawImage(img, left, 65);
    //     //   // 单位为vw
    //     //   strcanvas.drawImage(img, left, tools.getVW(65));
    //     // };
    //     _this.fingerflag = "1";
    //     // _this.initShow = false;
    //     // 清空画布
    //     signaturePad.clear();
    //     // 关闭录入指纹的弹窗
    //     _this.coverClientFinger = false;
    //     // _this.$refs.msgFingerprintBox.Close();
    //     // 确认按钮恢复可点击状态
    //     _this.$refs.btn.Regray("F8");
    //     // 展示指纹图片后选择指纹签名按钮置灰不可点击
    //     _this.notClickable = true;
    //     // 签名框的其他剩余区域不可进行手写签名
    //     _this.prohibitSign = true;
    //     // 给标签添加src属性
    //     //   $(".printImg")
    //     //     .attr("src", "data:image/png;base64," + messageinfo.fingerData)
    //     //     .css("vertical-align", "middle");
    //     // }
    //     _this.customerNamePng = messageinfo.fingerData;
    //   }
    // };
  },
};
</script>

<style lang="scss" scoped>
// 指纹签名按钮
.btn {
  border: none;
  background-color: transparent;
  outline: none;
  height: 65px;
  width: 200px;
  border-radius: 33px;
  line-height: 65px;
  font-family: "HYQiHei 65j";
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  font-weight: 400;
  background-image: linear-gradient(180deg, #9ed1a4 0%, #7cae7e 100%);
  box-shadow: 0px 4px 30px 0px rgba(80, 216, 208, 0.25);
  margin-top: 30px;
}
.btn_gray {
  border: none;
  outline: none;
  height: 65px;
  width: 200px;
  border-radius: 33px;
  line-height: 65px;
  font-family: "HYQiHei 65j";
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  font-weight: 400;
  margin-top: 30px;
  background: #cccccc;
  box-shadow: 0px 4px 30px 0px rgba(80, 216, 196, 0.25);
}
// 指纹弹窗
::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(1005 - 30px);
  width: 637.95px;
  height: 390.46px;
  background: #ffffff;
  border: 1px solid rgba(151, 151, 151, 1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  .el-dialog__header {
    .el-dialog__headerbtn {
      font-size: 36px;
    }
  }
  .el-dialog__body {
    flex: 1;
    overflow: auto;
    .titleFingerprint {
      height: 40px;
      font-family: "HYQiHei 50j";
      font-size: 32px;
      color: #464646;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
    }
    .fingerImg {
      margin-top: 60px;
      height: 143.05px;
      text-align: center;
      img {
        width: 140.52px;
        height: 143.05px;
      }
    }
  }
}
// 标题
.basictitle {
  // font-family: 'HYQiHei-EES';
  height: 56px;
  line-height: 56px;
  font-size: 30px;
  color: #030303;
  letter-spacing: -0.06px;
  font-weight: 400;
}
//1600x1200
@media screen and (min-width: 1600px) and (min-height: 1200px) {
  // // FingerprintMessagebox指纹弹窗遮罩层
  // #coverClientSign {
  //   position: absolute;
  //   top: -130px;
  //   right: -30px;
  //   z-index: 21671082;
  //   background-color: rgba(0, 0, 0, 0.65);
  //   width: 1600px;
  //   height: 1200px;
  // }

  .main {
    position: absolute;
    top: 15vh;
    left: 9%;
    width: 80%;
    // height: 625px;
    height: 46.063vw;
    overflow: scroll;
    overflow-x: hidden;
  }
  // 客户基本信息和业务信息数据
  .infos {
    width: 100%;
    // height: 100%;
    height: auto;

    // .highLight {
    //   // background-color: yellow;
    //   color: blue !important;
    // }
    .basicinfo {
      width: 100%;
      // height: 58.438vw;
      padding: 1px 0 20px 0;
      background: #f9f9f9;
      border-radius: 5px;
    }
    .el-row {
      margin-top: 5px;
    }
    .el-col {
      // height: 56px;
      line-height: 56px;
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      // background: #d3dce6;
      // height: 56px;
      // line-height: 56px;
      text-align: right;
      font-family: "HYQiHei-EZS";
      font-size: 28px;
      color: #8e8e8e;
      letter-spacing: -0.05px;
      font-weight: 400;
    }
    .bg-purple-light {
      // background: #e5e9f2;
      // height: 56px;
      // line-height: 56px;
      padding-left: 10px;
      font-family: "HYQiHei-EZS";
      font-size: 28px;
      color: #1d2122;
      letter-spacing: -0.05px;
      font-weight: 400;
    }

    // .name {
    //   overflow: hidden;
    //   white-space: nowrap;
    //   text-overflow: ellipsis;
    // }
    .grid-content {
      border-radius: 4px;
      // min-height: 36px;
    }
    // .pcavas {
    //   position: absolute;
    //   left: 265px;
    //   // width: 1000px;
    //   margin-left: -258px;
    //   height: 200px;
    //   background: #ffffff;
    //   border: 1px solid rgba(216, 216, 216, 1);
    //   border-radius: 2px;
    // }

    // .content {
    //   width: 100%;
    //   height: 55px;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   bottom: 0;
    //   right: 0;
    //   margin: auto;
    //   font-family: "HYQiHei 35j";
    //   font-size: 36px;
    //   color: #aaaaaa;
    //   letter-spacing: 0;
    //   text-align: center;
    //   font-weight: 400;
    //   z-index: 99;
    // }
  }
  // 客户图像信息
  .customerImage {
    .customerImageInfo {
      width: 98%;
      margin-left: 10px;
      height: 16.75vw;
      // background: #F9F9F9;
      border-radius: 5px;
      .image-content {
        position: relative;
        width: 100%;
        height: 16.75vw;
        background: #ffffff;
        border: 1px solid rgba(217, 217, 217, 1);
        border-radius: 7px;
        margin-left: -1px;
        .imgtype,
        img {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 70%;
          //background: pink;
          border-radius: 10px;
        }
        .imgname {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          text-align: center;
          font-family: "HYQiHei-CES";
          font-size: 24px;
          color: #2f3435;
          letter-spacing: -0.04px;
          font-weight: 400;
        }
      }
    }
  }
  // 客户同意的信息展示
  .alreadySigned {
    margin: 30px 0 20px 20px;
    min-height: 50px;
    font-family: "HYQiHei-EZS";
    font-size: 30px;
    color: #030303;
    letter-spacing: -0.06px;
    font-weight: 400;
  }
  // 电子签名
  .customerName_box {
    // width: 1205px;
    width: 99%;
    // height: 332px;
  }
  .customerName {
    // width: 77.78947vw;
    // width: 100%;
    height: 20vw;
    background: #ffffff;
    position: relative;
    // padding-bottom: 10px;
    border: 3px solid rgba(216, 216, 216, 1);
    border-radius: 3px;
    // 提示语
    .content {
      width: 99%;
      // height: 332px;
      height: 99%;
      line-height: 332px;
      position: absolute;
      top: 100%;
      left: 0;
      bottom: 0;
      right: 0;
      transform: translateY(-50%);
      margin: auto;
      font-family: "HYQiHei 35j";
      font-size: 36px;
      color: #aaaaaa;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
      z-index: 99;
      .printImg {
        vertical-align: middle;
      }
    }

    .signature-pad--body {
      width: 100%;
      height: 100%;
      // 签名区域画布
      .pcanvas {
        width: 100%;
        position: absolute;
        left: 265px;
        margin-left: -265px;
        height: 35vh;
        // height: 27.2vh;
        // height: 100%;
        height: 99%;
        background: #ffffff;
        // border: 1px solid rgba(216, 216, 216, 1);
        // border-radius: 2px;
      }
    }
  }
}

//1920x1080
@media screen and (min-width: 1900px) and (min-height: 1000px) {
  // // FingerprintMessagebox指纹弹窗遮罩层
  // #coverClientSign {
  //   position: absolute;
  //   top: -130px;
  //   right: -30px;
  //   z-index: 21671082;
  //   background-color: rgba(0, 0, 0, 0.65);
  //   width: 1920px;
  //   height: 1080px;
  // }
  .main {
    position: absolute;
    top: 15vh;
    left: 9%;
    width: 80%;
    // height: 625px;
    height: 32.552vw;
    overflow: scroll;
    overflow-x: hidden;
  }
  // 客户基本信息和业务信息数据
  .infos {
    width: 100%;
    // height: 100%;
    height: auto;

    // .highLight {
    //   // background-color: yellow;
    //   color: blue !important;
    // }
    .basicinfo {
      width: 100%;
      // height: 48.438vw;
      padding: 1px 0 20px 0;
      background: #f9f9f9;
      border-radius: 5px;
      i {
        color: green;
      }
    }
    .el-row {
      // margin-top: 30px;
      min-height: 56px;
    }
    .el-col {
      // height: 56px;
      line-height: 56px;
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    // .name {
    //   overflow: hidden;
    //   white-space: nowrap;
    //   text-overflow: ellipsis;
    // }
    .bg-purple {
      // background: #d3dce6;
      // height: 56px;
      // line-height: 56px;
      text-align: right;
      font-family: "HYQiHei-EZS";
      font-size: 28px;
      color: #8e8e8e;
      letter-spacing: -0.05px;
      font-weight: 400;
    }
    .bg-purple-light {
      // background: #e5e9f2;
      // height: 56px;
      // line-height: 56px;
      padding-left: 10px;
      font-family: "HYQiHei-EZS";
      font-size: 28px;
      color: #1d2122;
      letter-spacing: -0.05px;
      font-weight: 400;
    }
    .grid-content {
      border-radius: 4px;
      // min-height: 36px;
    }

    .professional {
      min-height: 36px !important;
    }
    .professionalMing {
      // min-height: 36px !important;
      // overflow: hidden;
      // white-space: nowrap;
      // white-space: wrap;
      // text-overflow: ellipsis;
    }

    // .pcavas {
    //   position: absolute;
    //   left: 265px;
    //   // width: 1000px;
    //   margin-left: -258px;
    //   height: 200px;
    //   background: #ffffff;
    //   border: 1px solid rgba(216, 216, 216, 1);
    //   border-radius: 2px;
    // }
  }
  // 客户图像信息
  .customerImage {
    .customerImageInfo {
      width: 98%;
      margin-left: 10px;
      height: 300px;
      // background: #F9F9F9;
      border-radius: 5px;
      .image-content {
        position: relative;
        width: 100%;
        height: 300px;
        background: #ffffff;
        border: 1px solid rgba(217, 217, 217, 1);
        border-radius: 7px;
        margin-left: -1px;
        .imgtype,
        img {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 70%;
          //background: pink;
          border-radius: 10px;
        }
        .imgname {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          text-align: center;
          font-family: "HYQiHei-CES";
          font-size: 24px;
          color: #2f3435;
          letter-spacing: -0.04px;
          font-weight: 400;
        }
      }
    }
  }
  // 客户同意的信息展示
  .alreadySigned {
    margin: 30px 0 20px 20px;
    min-height: 50px;
    font-family: "HYQiHei-EZS";
    font-size: 30px;
    color: #030303;
    letter-spacing: -0.06px;
    font-weight: 400;
  }
  // 电子签名
  .customerName_box {
    // width: 1480px;
    width: 99%;
  }
  .customerName {
    // width: 76vw;
    // width: 100%;
    height: 17vw;
    background: #ffffff;
    position: relative;
    border: 3px solid rgba(216, 216, 216, 1);
    border-radius: 3px;
    // 提示语
    .content {
      width: 99%;
      //height: 55px;
      height: 99%;
      line-height: 17vw;
      position: absolute;
      // top: 60%;
      top: 100%;
      left: 0;
      bottom: 0;
      right: 0;
      transform: translateY(-50%);
      margin: auto;
      font-family: "HYQiHei 35j";
      font-size: 36px;
      color: #aaaaaa;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
      z-index: 99;
      .printImg {
        vertical-align: middle;
      }
    }
    .signature-pad--body {
      width: 100%;
      height: 100%;
      // 签名区域画布
      .pcanvas {
        width: 100%;
        position: absolute;
        left: 265px;
        margin-left: -265px;
        height: 30vh;
        background: #ffffff;
        // border: 1px solid rgba(216, 216, 216, 1);
        // border-radius: 2px;
      }
    }
  }
}

//1920x1200
@media screen and (min-width: 1900px) and (min-height: 1100px) {
  // // FingerprintMessagebox指纹弹窗遮罩层
  // #coverClientSign {
  //   position: absolute;
  //   top: -130px;
  //   right: -30px;
  //   z-index: 21671082;
  //   background-color: rgba(0, 0, 0, 0.65);
  //   width: 1920px;
  //   height: 1200px;
  // }
  .main {
    position: absolute;
    top: 15vh;
    left: 9%;
    width: 80%;
    // height: 625px;
    height: 36.552vw;
    overflow: scroll;
    overflow-x: hidden;
  }
  // 客户基本信息和业务信息数据
  .infos {
    width: 100%;
    // height: 100%;
    height: auto;
    // .highLight {
    //   // background-color: yellow;
    //   color: blue !important;
    // }
    .basicinfo {
      width: 100%;
      // height: 48.438vw;
      padding: 1px 0 20px 0;
      background: #f9f9f9;
      border-radius: 5px;
      i {
        color: green;
      }
    }
    .el-row {
      // margin-top: 30px;
      // min-height: 56px;
    }
    .el-col {
      // height: 56px;
      // line-height: 56px;
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      // background: #d3dce6;
      // height: 56px;
      // line-height: 56px;
      text-align: right;
      font-family: "HYQiHei-EZS";
      font-size: 28px;
      color: #8e8e8e;
      letter-spacing: -0.05px;
      font-weight: 400;
    }
    // .name {
    //   overflow: hidden;
    //   white-space: nowrap;
    //   text-overflow: ellipsis;
    // }

    .bg-purple-light {
      // background: #e5e9f2;
      // height: 56px;
      // line-height: 56px;
      padding-left: 10px;
      font-family: "HYQiHei-EZS";
      font-size: 28px;
      color: #1d2122;
      letter-spacing: -0.05px;
      font-weight: 400;
    }
    .grid-content {
      border-radius: 4px;
      // min-height: 36px;
    }

    .professional {
      // min-height: 36px !important;
    }
    .professionalMing {
      // min-height: 36px !important;
      // overflow: hidden;
      // white-space: nowrap;
      // white-space: wrap;
      // text-overflow: ellipsis;
    }
  }
  // 客户图像信息
  .customerImage {
    .customerImageInfo {
      width: 98%;
      margin-left: 10px;
      height: 300px;
      // background: #F9F9F9;
      border-radius: 5px;
      .image-content {
        position: relative;
        width: 100%;
        height: 300px;
        background: #ffffff;
        border: 1px solid rgba(217, 217, 217, 1);
        border-radius: 7px;
        margin-left: -1px;
        .imgtype,
        img {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 70%;
          //background: pink;
          border-radius: 10px;
        }
        .imgname {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          text-align: center;
          font-family: "HYQiHei-CES";
          font-size: 24px;
          color: #2f3435;
          letter-spacing: -0.04px;
          font-weight: 400;
        }
      }
    }
  }
  // 客户同意的信息展示
  .alreadySigned {
    margin: 30px 0 20px 20px;
    min-height: 50px;
    font-family: "HYQiHei-EZS";
    font-size: 30px;
    color: #030303;
    letter-spacing: -0.06px;
    font-weight: 400;
  }
  // 电子签名
  .customerName_box {
    // width: 1480px;
    width: 99%;
    height: 30vh;
  }
  .customerName {
    // width: 76vw;
    height: 18vw;
    background: #ffffff;
    position: relative;
    border: 3px solid rgba(216, 216, 216, 1);
    border-radius: 3px;
    // 提示语
    .content {
      width: 99%;
      //height: 55px;
      // height: 30vh;
      height: 99%;
      line-height: 30vh;
      position: absolute;
      // top: 25%;
      top: 100%;
      left: 0;
      bottom: 0;
      right: 0;
      transform: translateY(-50%);
      margin: auto;
      font-family: "HYQiHei 35j";
      font-size: 36px;
      color: #aaaaaa;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
      z-index: 99;
      .printImg {
        vertical-align: middle;
      }
    }
    .signature-pad--body {
      width: 100%;
      height: 100%;
      // 签名区域画布
      .pcanvas {
        width: 100%;
        position: absolute;
        left: 265px;
        margin-left: -265px;
        height: 29vh;
        background: #ffffff;
        // border: 2px solid rgba(216, 216, 216, 1);
        // border-radius: 2px;
      }
    }
  }
}
</style>