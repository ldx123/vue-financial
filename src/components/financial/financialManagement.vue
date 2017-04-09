<template>
    <div>
        <head-top head-title="我的理财" go-back='true' sign="true"></head-top>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
            <!--我的理财-->
            <!--<router-link class="wx-help" to="/help"></router-link>-->
        <!--</header>-->
        <div class="content">
            <div class="userinfo clearfix">
                <div class="pull-left">
                    <span class="avatar"><img :src="srcimg" alt=""/></span>
                    <span v-text="name"></span>
                </div>
                <span class="pull-right">{{phone}}</span>
            </div>
            <div class="grids-wrapper">
                <a href="javascript:;" class="wx-grid js-grid" @click="finanView">
                    <p><i class="wx-dot1"></i>可用余额（元）</p>
                    <span v-text="available"></span>
                </a>
                <a href="javascript:;" class="wx-grid js-grid">
                    <p><i class="wx-dot2"></i>冻结金额（元）</p>
                    <span v-text="freeze"></span>
                </a>
                <a href="javascript:;" class="wx-grid js-grid">
                    <p><i class="wx-dot3"></i>在投余额（元）</p>
                    <span v-text="invest"></span>
                </a>
                <a href="javascript:;" class="wx-grid js-grid">
                    <p><i class="wx-dot4"></i>总资产（元）</p>
                    <span v-text="all"></span>
                </a>
                <a href="javascript:;" class="wx-grid js-grid">
                    <p><i class="wx-dot5"></i>累计收益（元）</p>
                    <span v-text="allenter"></span>
                </a>
                <a href="javascript:;" class="wx-grid js-grid">
                    <p><i class="wx-dot6"></i>累计佣金（元）</p>
                    <span v-text="allreward"></span>
                </a>
            </div>
            <div class="transform-wrapper ">
                <div class="column1">
                    <router-link  class="wx-txbtn" to="/RechargeWithdrawals"></router-link>
                    <p><img class="icon" src="./images/available@3x.png" alt=""/> 可用嘉币(个)</p>
                    <span v-text="availablejb" >0.00</span>
                    <router-link  to="/turnIn" class="changeBtn" style="margin-left: -.2rem;"><img  src="./images/turnin@3x.png" alt="转入"></router-link>
                </div>
                <div class="column2">
                    <p><img class="icon" src="./images/qianbao@3x.png" alt=""/> 可用理财金(元)</p>
                    <span v-text="available"></span>
                    <router-link  to="/turnOut" class="changeBtn"><img  src="./images/turnout@3x.png" alt="转出"></router-link>
                </div>
                <img class="change" src="./images/change@2x.png" alt="转换">
            </div>

            <div class="cells-wrapper">
                <router-link class="cell cell_access" to="/fundsDetail">
                    <div class="cell__bd">
                        <p>资金明细</p>
                    </div>
                    <div class="cell__ft"></div>
                </router-link>
                <router-link class="cell cell_access" to="/buyRecord">
                    <div class="cell__bd">
                        <p>购买记录</p>
                    </div>
                    <div class="cell__ft"></div>
                </router-link>
                <router-link class="cell cell_access" to="/rewardRecord">
                    <div class="cell__bd">
                        <p>奖励记录</p>
                    </div>
                    <div class="cell__ft"></div>
                </router-link>

            </div>
        </div>
    </div>
</template>
<script>
    import headTop from './../common/header/head.vue'
    var newid=window.localStorage.getItem('id');
    export default{
        data () {
            return {
                available:0.00,
                freeze:0.00,
                invest:0.00,
                all:0.00,
                allenter:0.00,
                allreward:0.00,
                reward:0.00,
                recommend:0.00,
                active:0.00,
                availablejb:0.00,
                phone:'',
                name:'',
                srcimg:'/static/images/avatar.jpg'
            }
        },
        methods: {
            finanView:function(){
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/money/").then(function(response){
                    var res = response.data;
                    this.available=res.available;
                    this.freeze=res.freeze;
                    this.invest=res.invest;
                    this.all=res.all;
                    this.allenter=res.xx;
                    this.allreward=res.yy;
//                    console.log(res);
                });
            },
            userinfo:function(){
                var Api=this.GLOBAL;
                var id=parseInt(newid);
                var url=Api+"/info/users/" +id+ "/";
                console.log(url);
               this.$http.get(url).then(function(response){
                   var res = response.data;
                   this.availablejb=res.available;
                   this.phone=res.phone;
                   this.name=res.name;
                   this.srcimg=res.avatar;
//                   console.log(res);

               }) ;
            }
        },
        created () {
            var _this = this;
            _this.finanView();
            _this.userinfo();
       },
        components: {
          headTop
        }
    }

</script>

<style  scoped lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
  .content{background-color: $bgec;}
  /*.userinfo{}*/
  .userinfo{
    padding:0 .3rem;line-height:3;
    background-color:$bgfc;
    @include sc(.3rem, #222);
    .avatar{display: inline-block; width: 38px;height: 38px;border-radius: 50%;overflow: hidden;vertical-align: middle;}
    .avatar img{width: 100%;height: 100%;}
  }
  .wx-grid{
    @include sc(.3rem, #222);
    @include grid(50%);
  }
  .transform-wrapper{
    padding-top: 60px;
    margin-bottom: .2rem;
    background-color:$bgfc;
    @include sc(.3rem, #222);
    @include fj;
    position: relative;
    span{color: #999;}
    .icon{width: .4rem;vertical-align: middle;}
    .column1,.column2{text-align: center;}
    .change{position: absolute;left: 50%;margin-left: -6%; bottom: .4rem;width: 14%;height:15%;}
    .changeBtn{display:block;}
    .changeBtn img{width: 70%;}
    .wx-txbtn{
      width: 1.38rem;height: .42rem;
      background: url("./images/tixian@3x.png")no-repeat;
      background-size: 1.38rem .42rem;
      position: absolute;left: .8rem;top: 30px;
    }
  }

</style>
