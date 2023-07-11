<template>
  <el-carousel :height="height + 'px'" class="carousel">
    <el-carousel-item v-for="item in imgList" :key="item">
      <img :src="item" class="img" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  // 外层边框组件+app名称+页面名称
  data() {
    return {
      imgList: '',
      height: '',
    };
  },
  components: {},
  props: ['config'],
  watch: {
    'config.imgList'(newValue, oldValue) {
      if (newValue && newValue != oldValue) {
        this.imgList = this.config.imgList.split(',');
      }
    },
    'config.height'(newValue, oldValue) {
      if (newValue && newValue != oldValue) {
        this.height = this.config.height;
      }
    },
  },
  created() {},
  mounted() {
    this.imgList = this.config.imgList.split(',');
    this.height = this.config.height;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  height: 100%;
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>
