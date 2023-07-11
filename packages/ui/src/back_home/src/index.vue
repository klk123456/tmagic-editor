<template>
  <div class="gohome" @click="Backhome">
    <img src="../../assets/Picture/components/1920x1200/home.svg" alt="" />
    <span>返回首页</span>
  </div>
</template>

<script>
export default {
  // 返回首页组件
  methods: {
    // 发送返回首页的按钮消息
    Backhome() {
      wsap.sendKey('Continue');
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
// 1280*1024
.gohome {
  width: 100%;
  height: 100%;
  border-radius: 2.063vw;
  background-image: linear-gradient(180deg, #9ed1a4 0%, #7cae7e 100%);
  box-shadow: 0vw 0.25vw 1.875vw 0vw rgba(80, 114, 216, 0.25);
  position: absolute;
  // left: 2.813vw;
  // bottom: 4.625vw;
  z-index: 102;
  img {
    width: 2.25vw;
    height: 2.25vw;
    position: absolute;
    left: 1.5vw;
    bottom: 1.3vw;
  }
  span {
    font-size: 1.5vw;
    color: #ffffff;
    font-weight: 400;
    position: absolute;
    left: 4.75vw;
    bottom: 1.5vw;
    font-family: 'HYQiHei 65j';
  }
  &:active {
    background-image: linear-gradient(180deg, #9ccca2 0%, #4d894f 100%);
  }
}
@media screen and (min-width: 1600px) and (min-height: 1200px) and (max-width: 1600px) and(max-height:1200px) {
  .gohome {
    width: 200px;
    height: 65px;
    border-radius: 33px;
    background-image: linear-gradient(180deg, #9ed1a4 0%, #7cae7e 100%);
    box-shadow: 0px 4px 30px 0px rgba(80, 114, 216, 0.25);
    position: absolute;
    left: 45px;
    bottom: 42px;
    z-index: 102;
    img {
      width: 36px;
      height: 36px;
      position: absolute;
      left: 24px;
      bottom: 15px;
    }
    span {
      font-size: 26px;
      color: #ffffff;
      font-weight: 400;
      position: absolute;
      left: 76px;
      bottom: 15px;
      font-family: 'HYQiHei 65j';
    }
    &:active {
      background-image: linear-gradient(180deg, #9ccca2 0%, #4d894f 100%);
    }
  }
}
@media screen and (min-width: 1900px) and (min-height: 1000px) {
  .gohome {
    width: 200px;
    height: 65px;
    border-radius: 33px;
    background-image: linear-gradient(180deg, #9ed1a4 0%, #7cae7e 100%);
    box-shadow: 0px 4px 30px 0px rgba(80, 114, 216, 0.25);
    position: absolute;
    left: 100px;
    bottom: 50px;
    z-index: 102;
    img {
      width: 36px;
      height: 36px;
      position: absolute;
      left: 24px;
      bottom: 15px;
    }
    span {
      font-size: 26px;
      color: #ffffff;
      font-weight: 400;
      position: absolute;
      left: 76px;
      bottom: 15px;
      font-family: 'HYQiHei 65j';
    }
    &:active {
      background-image: linear-gradient(180deg, #9ccca2 0%, #4d894f 100%);
    }
  }
}
@media screen and (min-width: 1900px) and (min-height: 1100px) {
  .gohome {
    width: 200px;
    height: 65px;
    border-radius: 33px;
    background-image: linear-gradient(180deg, #9ed1a4 0%, #7cae7e 100%);
    box-shadow: 0px 4px 30px 0px rgba(80, 114, 216, 0.25);
    position: absolute;
    left: 100px;
    bottom: 60px;
    z-index: 102;
    img {
      width: 36px;
      height: 36px;
      position: absolute;
      left: 24px;
      bottom: 15px;
    }
    span {
      font-size: 26px;
      color: #ffffff;
      font-weight: 400;
      position: absolute;
      left: 76px;
      bottom: 15px;
      font-family: 'HYQiHei 65j';
    }
    &:active {
      background-image: linear-gradient(180deg, #9ccca2 0%, #4d894f 100%);
    }
  }
}
</style>
