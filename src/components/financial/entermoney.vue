<template>
    <div>
      <head-top head-title="输入金额" go-back='true'></head-top>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
            <!--输入金额-->
        <!--</header>-->
        <article class="content">
            <div class="wx-list ">
                <span>项目剩余额度</span>
                <span class="pull-right wx-reg">{{balance_num}}</span>
            </div>
            <div class="wx-list-b">
                <p class="tip">投资金额（元）100元起，100元倍数递增</p>
                <div class="wx-count" >
                    <img class="wx-del" src="./images/del@3x.png" alt="减" @click="changeMoney(-1)"/>

                    <div class="wx-money"><input class="wx-reg" type="number" v-model="num"/>
                    <p class="msg" v-show="msg">投资金必须是100的倍数</p>
                    </div>

                    <img class="wx-add" src="./images/add@3x.png" alt="加" @click="changeMoney(1)"/>
                </div>
            </div>
            <div class="wx-list">
                <img class="wx-list-icon" src="./images/yujishouru@3x.png" alt=""/>
                预计至少收益（元）
                <span class="pull-right wx-reg">{{reward}}</span>
            </div>
            <div class="wx-list">
                <img class="wx-list-icon" src="./images/qianbao@3x.png" alt=""/>
                理财金余额（元）<span class="wx-reg">{{available}}</span>
                <div v-if="seen" class="pull-right" @click="allput">全投<img class="we-raido" src="./images/weigou@3x.png" alt=""/></div>
                <div v-else class="pull-right" @click="allput">全投<img class="we-raido" src="./images/gouxuan@3x.png" alt=""/></div>
            </div>
            <div class="wx-agree">我已阅读并同意<span><router-link to="/touzixieyi">《投资协议》</router-link></span>及<span><router-link to="/zhuanhuanxieyi">《转换协议》</router-link></span></div>
        </article>
        <!--<button class="wx-footBtn">确认投资</button>-->
        <button class="weui-btn wx-footBtn" @click="submit">确认投资</button>
        <v-success v-show="show"></v-success>
        <!--<v-confirm v-show="confirmShow" ></v-confirm>-->
    </div>
</template>
<style  scoped lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
  .content{background-color: $bgec;}
  .wx-list, .wx-list-b{
    width: 100%;
    padding: 0 .3rem;
    margin-bottom: .2rem;
    background-color: $bgfc;
    @include sc(.3rem, #222);
  }
  .wx-list{
    height: 1.04rem;
    line-height: 1rem;
    .wx-list-icon{display:inline-block;width: .4rem;vertical-align: middle;margin-right: .2rem}
  }
  .wx-list-b{
    .tip{padding-top: .3rem;@include sc(.24rem, #999);}
    .wx-count{padding:1rem 0 .6rem 0;position: relative }
    img{display: flex;width:.8rem; }
    .wx-del,.wx-add{position: absolute;top: 1rem;}
    .wx-del{left: .3rem;}
    .wx-add{right: .3rem;}
    .wx-money{width: 4.7rem; margin: 0 auto;padding-bottom: .2rem; border-bottom: 2px solid #cfcfcf;
      text-align: center;position: relative}
    input{ width: 4.7rem;  font-size: .72rem;  text-align: center; }

  }
  .wx-agree{
    margin-top: .32rem;
    text-align: center;
    @include sc(.24rem, #999);
    a{color: #409fff;}
  }
  .wx-reg{color: #FF4A4A}
  .we-raido{width: .5rem;vertical-align: middle;}
  .wx-footBtn{
    @include btn(.3rem, 100%);
    position: absolute;
    bottom: 0;
    left:0;
    z-index: 2;
  }
  .msg{ @include sc(.24rem, #FF4A4A);position: absolute;padding-top: .3rem; }
</style>
<script>
    import headTop from './../common/header/head.vue'
    import vSuccess from './../common/success.vue'
//    import Confirm from './confirm.vue'
    export default{
        data () {
            return {
                balance_num:0,
                seen: true,
                num:0,
                show_annualized:0,
                balance_num:0,
                available:0,
                show:false,
                msg:false,
                confirmShow:false,
                srcimg:'./images/weigou@3x.png'
            }
        },
        created () {
            var _this = this;
            _this.finanView();
            _this.View();
        },
        computed : {
            reward:function(){
                return parseInt ((this.num * (this.show_annualized/100))/12);
            }

        },
        methods: {
            finanView(){
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/money/").then(function(response){
                    var res = response.data;
                    this.available=res.available;
//                    console.log(res);
                });
            },
            View:function(){
                var Api=this.GLOBAL;
                this.$http.get(Api+'/financial/regular/').then(function(response) {
                    var res = response.data;
                    this.show_annualized=res.results[0].show_annualized;
                    this.balance_num=res.results[0].balance_num;
                    this.balance_num=res.results[0].balance_num;
                })
            },
            changeMoney: function (way) {
                if(way>0){
                    var wnum=parseInt(this.num);
                    this.num=wnum += 100;
//                    this.num += 100;
                }else{
                    this.num -= 100;
                    if(this.num<0){
                        this.num=0;
                    }
                }
            },
            allput(){
                this.seen=!this.seen;
                this.num=this.available;
                var allnum=parseInt(this.num/100)*100;
                var Api=this.GLOBAL;
                    this.$http.post(Api+"/financial/regular/1/buy/", {num: allnum}).then(function (response) {
                        var res = response.data;
                        if (res.success == 0) {
                            this.show = true;
                            this.intervalid = setInterval(function () {
                                window.history.go(-1);
                            }, 3000);
                        }
                    });
            },
            submit(){
//              alert('ok');
                var num=parseInt(this.num);
                var newnum=parseInt(this.num/100)*100;
                var Api=this.GLOBAL;
                if(num!=newnum ||num==0){
                        this.msg=true;
                }else {
                    this.msg=false;
                    this.$http.post(Api+"/financial/regular/1/buy/",{num:num}).then(function(response){
                        var res = response.data;
                        if(res.success==0){
                            this.show=true;
                            this.intervalid = setInterval(function(){
                                window.history.go(-1);
                            }, 3000);
                        }else {
                          alert(res.detail);
                        }
                    });
                }

            }
        },
        components: {
            headTop,
           vSuccess
//            'v-success': Success

//            'v-confirm':Confirm
        },
        beforeDestroy () {
            clearInterval(this.intervalid);
        }
    }
</script>
