<template>
  <el-cascader 
           :underline="config.atr.underline"
           :href="config.atr.href"
           :target="config.atr.targer">{{config.text}} </el-cascader>
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
  
    
  },
  created () { },
  mounted () {
  },
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>
