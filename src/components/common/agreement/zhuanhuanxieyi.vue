<template>
    <div>
      <head-top head-title="转换协议" go-back='true' ></head-top>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
            <!--转换协议-->
        <!--</header>-->
        <div class="content">
            <article class="wx-article">
                <h1>嘉币与理财金的转换</h1>
                <p>嘉币：为广东嘉金界科技有限公司旗下APP平台传嘉宝默认的平台货币。嘉币可用于在传嘉宝APP上进行包括但不限于购买货品，参与活动，提现等。客户在进行平台活动操作时需提前进行嘉币充值，充值换算比例为1：1。</p>
                <p>理财金：为前海新创互联网金融默认的投资资金代称。该理财金可以和嘉币之间可以在传嘉宝APP和前海新创互联网金融认可的前提下按照一定的规则转化，转化的比例为1:1.</p>
                <p>客户在进行项目参与时，将默认允许嘉币与理财金之间自由转换，转换比例为1：1。同时默认接受包括但不限于转换后嘉币账户和理财金账户将根据转换的数额进行相应的变更等。</p>
                <p>客户在传嘉宝APP以及前海新创互联网金融项目界面上的一切操作，包括但不限于自行操作，默认操作，授权操作等，均为客户自己主观意识行为，且认可行为所带来的效果。</p>
            </article>
        </div>
    </div>
</template>
<style scoped>
    .content{font-size: .24rem; }
    .wx-article{background-color: #fff;padding: .4rem 0;}
    .wx-article h1{text-align: center;margin-bottom: .2rem;font-size: .3rem;}
    .wx-article p{padding: 0 .3rem;margin-bottom: .2rem;}
</style>
<script>
  import headTop from './../header/head.vue'
  export default{
    components: {
      headTop
    }
  }
</script>
