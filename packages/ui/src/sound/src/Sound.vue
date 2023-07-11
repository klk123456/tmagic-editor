<template>
  <div>
    <audio :src="`/static/Sounds/voice/${id}.mp3`" ref="sound" autoplay></audio>
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
  data() {
    return {
      id: "",
    };
  },
  methods: {
    // 开启音频
    Open(name) {
      this.Stop();
      this.id = name;
      setTimeout(() => {
        this.$refs.sound.play();
      }, 5);
    },
    // 关闭音频
    Stop() {
      this.$refs.sound.pause();
    },
  },
  mounted() {
    this.id = wsap.pageinfoNode.getAttribute("voice");
  },
  beforeDestroy() {
    this.Stop();
  },
};
</script>

<style lang="scss" scoped>
</style>
