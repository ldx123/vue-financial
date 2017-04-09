<template>
    <div>
      <head-top head-title="帮助中心" go-back='true' ></head-top>
        <div class="content">
            <article class="wx-article">
            <h3>可用余额：</h3>
            <p>即嘉币转化为理财金后，去除冻结金额和在投金额后所剩余的可用理财金的数额体现；</p>
            <h3>冻结金额：</h3>
            <p>即用于参与正在募集的项目的资金金额；</p>
            <h3>在投金额：</h3>
            <p>即用于参与募集完毕且处于流转中项目的资金金额；</p>
            <h3>总金额：</h3>
            <p>即账户内可用余额、冻结金额、在投金额的总和；</p>
            <h3>累计收益：</h3>
            <p>即参与过的募集资金项目的收益和活动奖励的总和；</p>
            <h3>累计佣金：</h3>
            <p>即所推荐的客户参与募集项目后所产生的推荐佣金的总和</p>
            </article>
        </div>
    </div>
</template>
<style scoped>
    .wx-article{margin-top:.2rem;padding: .4rem 0;}
    .wx-article p{padding: 0 .3rem;font-size: .24rem;margin-bottom: .2rem;}
    h3{color: #666;font-size: .3rem;margin:0 .3rem .1rem .3rem;}
</style>
<script>
  import headTop from './../header/head.vue'
  export default{
    components: {
      headTop
    }
  }
</script>
