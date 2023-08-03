<template>
  <div>
    <el-DatePicker v-model="config.atr['v-model']" :style="{width:config.style.width}" > </el-DatePicker>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  components: {},
  props: ['config'],
  watch: {
    'config.atr.v-model'(old,newValue){
      console.log(old,newValue);
    }

  },
  created () { },
  mounted () {
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
