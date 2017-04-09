<template>
    <div>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
            <!---->
        <!--</header>-->
        <head-top head-title="资金明细" go-back='true' ></head-top>
        <div class="content">
            <div class="bg">
                <div class="In-total">
                    <p class="In-total-tt">总资产</p>
                    <p id="numAnim" class="In-total-con">{{all}}</p>
                </div>
                <div class="grids-wrapper">
                    <a  class="wx-grid js-grid">
                        <p ><i  class="wx-dot1"></i>可用余额(元)</p>
                        <span v-text="available"></span>
                    </a>
                    <a  class="wx-grid js-grid">
                        <p ><i  class="wx-dot2"></i>冻结金额(元)</p>
                        <span v-text="freeze"></span>
                    </a>
                    <a  class="wx-grid js-grid">
                        <p ><i  class="wx-dot3"></i>在投余额(元)</p>
                        <span v-text="invest"></span>
                    </a>
                </div>
            </div>
            <div>
                <ul class="tab-wrapper">
                    <li :class="{'on':sel1}" @click="alldoing">全部</li>
                    <li :class="{'on':sel2}" @click="turnin">收入</li>
                    <li :class="{'on':sel3}" @click="turnout">支出</li>
                </ul>
                <!--<div class="weui-cells__title">{{count}}月</div>-->
                <router-view></router-view>
                <ul class="cells-wrapper">
                    <li v-for="item in alllist" class="cell">
                        <div class="cell__bd ">
                            <p v-text="item.change_reason"></p>
                            <span v-text="item.time"></span>
                        </div>
                        <div class="cell__ft ">
                            <p>{{item.show_num}}元</p>
                            <span>{{item.general}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <p class="nomore">没有更多了......</p>
        </div>
    </div>
</template>
<script>
  import headTop from './../common/header/head.vue'
    export default{
        data () {
            return {
                available:0.00,
                freeze:0.00,
                invest:0.00,
                all:0.00,
                count:0,
                sel1:false,
                sel2:false,
                sel3:false,
                alllist:[]
            }
        },
        created () {
            var _this = this;
            _this.finanView();
            _this.alldoing();
        },

        methods: {
            finanView(){
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/money/").then(function(response){
                    var res = response.data;
                    this.available=res.available;
                    this.freeze=res.freeze;
                    this.invest=res.invest;
                    this.all=res.all;
                    var numAnim = new CountUp("numAnim", 0, this.all, 2, 2.5);
                        numAnim.start();
                });
            },
            alldoing(){
                this.sel1=true;
                this.sel2=false;
                this.sel3=false;
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/bill/").then(function(response){
                    var res = response.data;
                    this.count=res.count;
                    this.alllist=res.results;
                });
            },
            turnin(){
                this.sel1=false;
                this.sel2=true;
                this.sel3=false;
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/bill/?reason=1&reason=3&reason=4&reason=7").then(function(response){
                    var res = response.data;
                    this.count=res.count;
                    this.alllist=res.results;
                });
            },
            turnout(){
                this.sel1=false;
                this.sel2=false;
                this.sel3=true;
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/bill/?reason=2&reason=5&reason=6").then(function(response){
                    var res = response.data;
                    this.count=res.count;
                    this.alllist=res.results;
                });
            }
        },
        components: {
          headTop
        }
    }
</script>
<style  scoped lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
  .content{background-color: $bgec;}
  .bg{background-color: $bgfc;margin-bottom: .2rem;}
    .In-total{width: 4.5rem; height: 4.5rem;margin: 0 auto;text-align: center;
      background: #fff url("./images/zonzhichan@3x.png")no-repeat center;background-size: 100%;}
    .In-total-tt{padding-top: 1.3rem;@include sc(.3rem, #fff);}
    .In-total-con{@include sc(.6rem, #fff);}
    .grids-wrapper{margin-bottom: 0;}
    .wx-grid{
      @include sc(.3rem, #222);
      @include grid(33.33%);
    }
    .js-grid span{color: #999;}
    .cell__bd{
      color:#666;
      span{@include sc(.2rem, #999);}
    }
    .cell__ft{
      padding-right: 0;
      width: 48%;
      color:#222;
      span{@include sc(.2rem, #FC8F37);}
    }
</style>
