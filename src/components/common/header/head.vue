<template>
    <div>
      <header class="top-wraper">
        <img v-if="goBack" class="goback" src="./img/fanhui@3x.png" alt="goback" @click="$router.go(-1)">
        {{headTitle}}
        <router-link v-if="sign" class="wx-help" to="/help"></router-link>
      </header>
    </div>
</template>
<style scoped lang="scss">
  @import '../../../../static/style/mixin.scss';
  .wx-help {display: block; position: absolute;right: .3rem;top: .25rem;width: .6rem;height: .6rem;background: url("./img/help@3x.png")no-repeat;
    background-size: .6rem .6rem;}
  .wx-help img{width: .6rem}
</style>
<script>
  export default {
    data(){
      return{

      }
    },
    props: ['sign', 'headTitle', 'goBack'],
  }
</script>
