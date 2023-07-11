<template>
  <div>
    <span v-if="callHelpFlag != 0" class="callmanager" @click="cm_click"></span>
    <audio :src="`/static/Sounds/voice/callHelp.mp3`" ref="sound1"></audio>
  </div>
</template>

<script>
// import { mapState } from 'vuex';

export default {
  // 呼叫大堂经理组件
  computed: {
    // ...mapState({
    //   callHelpFlag: (state) => state.callHelpFlag,
    // }),
  },
  props: ['config'],
  mounted() {
    console.log('===================callHelpFlag', this.config.callHelpFlag);
  },
  methods: {
    cm_click() {
      if (this.config.callHelpFlag == 1) {
        this.$nextTick(() => {
          this.$refs.sound1.pause();
          this.$refs.sound1.play();
        });
      } else if (this.config.callHelpFlag == 2) {
        wsap.sendKey('callHelp');
      }
    },
  },
};
</script>

<style lang="scss">
// 1280*1024
.callmanager {
  z-index: 103;
  position: absolute;
  // bottom: 58.25vw;
  // left: -0.875vw;
  width: 16.25vw;
  height: 6.438vw;
  background: url('../../assets/Picture/components/1920x1200/callmanager.svg');
  background-size: 100% 100%;

  &:active {
    background: url('../../assets/Picture/components/1920x1200/callmanager_in.svg');
    background-size: 100% 100%;
  }
}

@media screen and (min-width: 1600px) and (min-height: 1200px) and (max-width: 1600px) and(max-height:1200px) {
  .callmanager {
    z-index: 103;
    position: absolute;
    bottom: 900px;
    left: -14px;
    width: 260px;
    height: 103px;
    background: url('../assets/Picture/components/1920x1200/callmanager.svg');
    background-size: 100% 100%;

    &:active {
      background: url('../assets/Picture/components/1920x1200/callmanager_in.svg');
      background-size: 100% 100%;
    }
  }
}
@media screen and (min-width: 1900px) and (min-height: 1000px) {
  .callmanager {
    z-index: 103;
    position: absolute;
    bottom: 782px;
    left: -14px;
    width: 260px;
    height: 103px;
    background: url('../assets/Picture/components/1920x1200/callmanager.svg');
    background-size: 100% 100%;

    &:active {
      background: url('../assets/Picture/components/1920x1200/callmanager_in.svg');
      background-size: 100% 100%;
    }
  }
}
@media screen and (min-width: 1900px) and (min-height: 1100px) {
  .callmanager {
    z-index: 103;
    position: absolute;
    top: 206px;
    left: -33px;
    width: 316px;
    height: 103px;
    background: url('../assets/Picture/components/1920x1200/callmanager.svg');
    background-size: 100% 100%;

    &:active {
      background: url('../assets/Picture/components/1920x1200/callmanager_in.svg');
      background-size: 100% 100%;
    }
  }
}
</style>
