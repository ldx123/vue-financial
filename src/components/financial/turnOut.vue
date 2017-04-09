<template>
    <div>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
            <!--转入理财金-->
        <!--</header>-->
      <head-top head-title="转入理财金" go-back='true' ></head-top>
        <div class="content">
            <div class="cells-wrapper">
                <div class="cell">
                    <div class="cell__bd">
                        <p>可转出理财金（元）</p>
                    </div>
                    <div class="cell__ft">{{availablejb}}</div>
                </div>
            </div>
            <div class="input-wrapper">
                <h2>转入理财金</h2>
                <div class="input-money clearfix">
                    <div class="pull-left"><em>¥</em><input type="number" v-model="num" @blur="btnclick()"/><i></i></div>
                    <button class="pull-right" @click="allturnout">全部转出</button></div>
                <div class="clearfix tip">
                    <p class="tip-msg">{{msg}}</p>
                    <p class="pull-right">1元=1嘉币</p>
                </div>
            </div>
            <button v-show="disbtn" class="btn"  disabled >确认</button>
            <button v-show="abtn" class="btn"  @click="jbturnout()">确认</button>
        </div>
        <v-success v-show="show"></v-success>
        <v-confirm v-show="alertShow" ></v-confirm>
    </div>
</template>
<script>
  import headTop from './../common/header/head.vue'
    import Success from './../common/success.vue'
    import Alert from './../common/alert.vue'
    var newid=window.localStorage.getItem('id');
    export default{
        data () {
            return{
                availablejb:'',
                num:'',
                msg:'',
                disbtn:true,
                show:false,
                abtn:false,
                alertShow:false
            }
        },
        created () {
            var _this = this;
            _this.userinfo();
            _this.jbturnout();
        },
        methods: {
            userinfo:function(){
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/money/").then(function(response){
                    var res = response.data;
                    this.availablejb=res.available;
//                    console.log(res);
                }) ;
            },
            btnclick(){
              if(this.num.length>0){
                this.disbtn=false;
                this.abtn=true;
              }
            },
            jbturnout(){
                var num=parseInt(this.num);
                var Api=this.GLOBAL;
                this.$http.post(Api+"/financial/refund/",{num:num}).then(function(response){
                    var res = response.data;
                    this.msg=res.detail;
                    if(res.success==0){
                        this.show=true;
                        this.intervalid = setInterval(function() {
                            window.history.go(-1);
                        }, 3000);
                    }
                });
            },
            allturnout(){
                this.num=this.availablejb;
                var num=parseInt(this.num);
                var Api=this.GLOBAL;
                this.disbtn=false;
                this.abtn=true;
                if(num==0){
                    this.abtn=false;
                    this.disbtn=true;
//                    this.alertShow=true;
                }else {
                    this.$http.post(Api+"/financial/refund/", {num: num}).then(function (response) {
                        var res = response.data;
                        this.msg = res.detail;
                        if (res.success == 0) {
                            this.show = true;
                            this.intervalid = setInterval(function () {
                                window.history.go(-1);
                            }, 3000);
                        }
                    });
                }
            }
        },
        components: {
            'v-success': Success,
            'v-confirm':Alert,
             headTop
        },
        beforeDestroy () {
            clearInterval(this.intervalid);
        }

    }
</script>
<style  scoped lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
  .content{background-color: $bgec;}
  .cells-wrapper{margin: .2rem 0;}
  .input-wrapper{
    margin-bottom:.6rem;
    padding: 0 .3rem;
    background-color: $bgfc;
    h2{line-height: 3;@include sc(.3rem, #999);}
    em{font-size: .6rem;vertical-align: middle;}
    i{display: inline-block;width: 2px;height:.5rem;background-color: #E8E6E6;vertical-align: middle;}
    .input-money{height: 1rem;line-height: 1rem;padding-bottom: .1rem; @include borderB-1px(#E8E6E6);}
    input{width: 4rem;height: .7rem; margin-right: 10px;font-size: .6rem; vertical-align: middle;}
    button{@include sc(.3rem, #999);background-color: #fff;margin-top: .4rem;}
  .tip-msg{color: #FF4A4A;flex: 1;position: absolute;left: .3rem;}
  .tip{font-size: .24rem;color: #999;line-height: .8rem;}
  }
  .cell__ft{color: #222;}
  .btn{@include btn(.3rem, 80%)}
</style>
