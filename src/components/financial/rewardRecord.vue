<template>
    <div>
        <head-top head-title="奖励记录" go-back='true' ></head-top>
        <div class="content">
            <div class="bg">
                <div class="In-total">
                    <p class="In-total-tt">累计奖励</p>
                    <p id="numAnim" class="In-total-con">{{yy}}</p>
                </div>
                <div class="grids-wrapper">
                    <a  class="wx-grid js-grid">
                        <p ><i  class="wx-dot6"></i>累积佣金收益(元)</p>
                        <span >{{recommend}}</span>
                    </a>
                    <a  class="wx-grid js-grid">
                        <p ><i  class="wx-dot7"></i>累积活动奖金(元)</p>
                        <span >{{active}}</span>
                    </a>
                </div>
            </div>
            <div>
                <ul class="tab-wrapper">
                    <li :class="{'on':sel1}" @click="recomme">佣金记录</li>
                    <li :class="{'on':sel2}" @click="reward">奖励记录</li>
                </ul>
                <!--<div class="weui-cells__title">1月</div>-->
                <ul class="wx-cells">
                    <li v-for="item in alllist" class="cell">
                        <div class="cell__bd pull-left">
                            <p v-text="item.change_reason"></p>
                            <span v-text="item.time"></span>
                        </div>
                        <div class="cell__bd pull-right">
                            <p>{{item.show_num}}元</p>
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
                yy:0,
                recommend:0,
                active:0,
                count:0,
                sel1:false,
                sel2:false,
                alllist:[]
            }
        },
        created () {
            var _this = this;
            _this.finanView();
            _this.recomme();
        },
        methods: {
            finanView(){
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/money/").then(function(response){
                    if(res){
                        var res = response.data;
                        this.yy=res.yy;
                        this.recommend=res.recommend;
                        this.active=res.active;
                        this.all=res.all;
                        var numAnim = new CountUp("numAnim", 0, this.yy, 2, 2.5);
                        numAnim.start();
                    }
                });
            },
            recomme(){
                this.sel1=true;
                this.sel2=false;
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/bill/?reason=3").then(function(response){
                    var res = response.data;
                    this.count=res.count;
                    this.alllist=res.results;
                });
            },
            reward(){
                this.sel1=false;
                this.sel2=true;
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/bill/?reason=4").then(function(response){
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
    background: #fff url("./images/record@3x.png")no-repeat center;background-size: 100%;}
  .In-total-tt{padding-top: 1.3rem;@include sc(.3rem, #fff);}
  .In-total-con{@include sc(.6rem, #fff);}
  .grids-wrapper{margin-bottom: 0;}
  .wx-grid{
  @include sc(.3rem, #222);
  @include grid(50%);
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
