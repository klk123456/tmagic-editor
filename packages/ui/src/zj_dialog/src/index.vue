<template>
<!-- 创建弹框 add by xyx 20210416-->
  <div >
    <div id="ZJdialog_backshade" v-show="zjdialogshow"></div>
    <div id="ZJdialog_content" v-show="zjdialogshow">
      <!-- 加载图片区域 -->
    <div id="ZJdialog_img">
       <!-- <img  :src="'/static/Pictures/public/1280x1024/PromptPicture/'+src" /> -->
    </div>
    <div id="ZJdialog_middle">
     <p class="ZJdialog_tips" style="font-size:23px;">{{title}}</p>
     <p class="ZJdialog_tips" style="font-size:20px">{{text1}}</p>
     <p class="ZJdialog_tips" style="font-size:20px">{{text2}}</p>
    </div>
    <div id="ZJdialog_Btnarea">
    <p 
      v-for="item in zjdialogbtn"
      :key="item"
      :id="'ZJdialog_'+item.id"
      class="ZJdialog_Btn"
      :class="[item.color=='red'?'ZJredBtn':(item.color=='blue'?'ZJbluebtn':'')]"
      @click="zjbtnclick(item)"
      >
      {{item.text}}

   </p>
    </div>

    </div>

  </div>
</template>
<script>

export default {
  name: "ZJdialog",
  props: ['config','pagename','zjdialog'],
  data() {
    return {
      zjdialogbtn:[],
      title:"",
      TimerValue:"",
      text1:"",
      text2:"",
      src:"",
      zjdialogshow:this.config.zjdialog,
	    zjpagename:this.config.pagename,
    };
  },
  created(){
  },
  methods: {
    // 按钮点击事件
    zjbtnclick(item){
				this.zjdialog=false;
        this.$emit("ZJdialogClick",item);
    },

  },

  watch:{
    zjdialog:function(val,oldval){
    	console.log("!!!!!!!",this.zjdialog)
     this.zjdialogshow=this.zjdialog;
    },
		'config.pagename':function(val,oldval){
    	if(val!=oldval){
				this.zjdialogbtn=[];
				this.title="";
				this.TimerValue="";
				this.text1="";
				this.text2="";
				this.src="";

	    }

			this.zjpagename = this.config.pagename;
			// wsap.ZJdialogpageinfoNode = wsap.selectSingleNode(wsap.ZJdialogXMLDoc, "//Root/*[@name='"+this.zjpagename+"']");
			// if(wsap.ZJdialogpageinfoNode){
			// 	this.title=wsap.ZJdialogpageinfoNode.getAttribute("title");
			// 	this.TimerValue=wsap.ZJdialogpageinfoNode.getAttribute("TimerValue");
			// 	this.text1=wsap.ZJdialogpageinfoNode.getAttribute("text1");
			// 	this.text2=wsap.ZJdialogpageinfoNode.getAttribute("text2");
			// 	this.src=wsap.ZJdialogpageinfoNode.getAttribute("src");
			// 	for(let i=0;i<9;i++){
			// 		var FkeyBtn=wsap.ZJdialogpageinfoNode.getAttribute("F"+i)
			// 		if(FkeyBtn){
			// 			FkeyBtn=FkeyBtn.split(":");
			// 			this.zjdialogbtn.push({
			// 				id:"F"+i,color:FkeyBtn[2],text:FkeyBtn[0],message:FkeyBtn[1],prokey:FkeyBtn[3]
			// 			})
			// 		}
			// 	}
			// }
		}
  },
  computed: {
  },
  mounted() {

  }
};
</script>

<style scoped>

.ZJdialog_tips{
  margin: 15px 0 0 0;
  text-align: center;
}

#ZJdialog_backshade{
   position:absolute;
   width: 100%;
   height: 100%;
   background: #333;
   opacity: 0.5;
   top: 0px;
   left: 0px;
   z-index: 20000;

}
#ZJdialog_content{
   margin: 315px auto 0;
    z-index: 20001;
    width: 700px;
    height: 382px;
    border-width: 0px;
    border-radius: 10px;
    background: #fff;
    position: relative;
    overflow: auto;



}
#ZJdialog_img{
    /* top: 50px;
    position: relative; */
    width: 100%;
    text-align: center;
    height: 78px;
    margin: 50px 0 10px 0; 
}

#ZJdialog_middle{
  margin: 0 auto;
  height: 160px;
  width: 90%;

  overflow: auto;
}

#ZJdialog_Btnarea{
  margin: 10px 0;
  width: 100%;
  height: 54px;
  text-align: center;
}


.ZJdialog_Btn{
  display: inline-block;
  box-shadow: 0 4px 30px 0 rgba(80,114,216,0.25);
  border-radius: 30px;
  width: 160px;
  height: 54px;
  font-size: 20px;
  line-height: 54px;
  overflow: hidden;
  margin: 0 35px;

}
.ZJdialog_Btn:active{
  box-shadow: 0 0 0 2px #cff09e, 0 0 0 4px #3ac7bd;
}

.ZJbluebtn {
  color: #fff;
  background-image: linear-gradient(180deg, #A8CBFF 0%, #87B9FF 100%);
  box-shadow: 0 4px 30px 0 rgba(80,114,216,0.25);
  border-radius: 28px;
}
.ZJredBtn{
  color: #fff;
  background-image: linear-gradient(180deg, #ff9696 0%, #ff6b6b 100%);
  box-shadow: 0 2px 30px 0 rgba(80, 114, 216, 0.25);
  border-radius: 28px;
}


</style>