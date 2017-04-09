<template>
    <div>
        <header class="top-wraper">
            <img class="goback" src="../../../static/images/fanhui@3x.png" alt="">
            嘉币理财
            <a class="wx-mybtn" @click="myfinancial"></a>
        </header>
        <div class="container">
            <div class="financil-wrapper">
                <div class="profit-wrapper clearfix">
                    <div class="pull-left"><span>收益率:(%)</span>
                        <p><i class="wx-dot1"></i> 12</p>
                        <p><i class="wx-dot2"></i> 14</p>
                        <p><i class="wx-dot3"></i> 16</p>
                        <p><i class="wx-dot4"></i> 18</p>
                    </div>
                    <div class="canvas-wrap">
                        <span class="sign1">1000</span>
                        <span class="sign2">200</span>
                        <span class="sign3">500</span>
                        <span class="sign4">800</span>
                        <canvas id="canvas" width="200" height="200" style="width: 3.6rem;height: 3.6rem;"></canvas>
                        <div class="showbox">
                            <p>当前年化收益率</p>
                            <span>{{aList.show_annualized}}%</span>
                        </div>
                    </div>
                    <div class="pull-right">融资金额单位：（万元）</div>
                  </div>
                <div class="capital-wrapper clearfix">
                    <div class="pull-left capital-left">
                      <div class="capital-list">项目金额 <br/> <em>{{aList.total_num}}</em> </div>
                      <div class="capital-list ">资金锁定期  <br/><em> {{aList.capital_freeze_day}}天</em></div>
                    </div>
                    <div class="capital-list pull-right">剩余额度 <br/> <em>{{aList.balance_num}}</em></div>
                </div>
            </div>
            <!--<p class="line"></p>-->
            <div class="prompt"><p>温馨提示：本项目由深圳前海新创互联网投资控股有限公司提供</p></div>
            <div class="step-wrapper">
                <dl>
                    <dt>今日投资</dt>
                    <dd class="icon-step"><img src="./images/icon-step@3x.png" alt=""></dd>
                    <dd>{{aList.start_sell_time | date}}</dd>
                    <dd class="icon-line"><img src="./images/icon-line@3x.png" alt=""></dd>
                </dl>
                <dl>
                    <dt>开始计息</dt>
                    <dd class="icon-step"><img src="./images/icon-step@3x.png" alt=""></dd>
                    <dd>{{aList.end_sell_time | date}}</dd>
                    <dd class="icon-line"><img src="./images/icon-line@3x.png" alt=""></dd>
                </dl>
                <dl>
                    <dt>锁定期</dt>
                    <dd class="icon-step"><img src="./images/icon-step@3x.png" alt=""></dd>
                    <dd >{{aList.capital_freeze_day}}天</dd>
                    <dd class="icon-line"><img src="./images/icon-line@3x.png" alt=""></dd>
                </dl>
                <dl>
                    <dt >到期返本</dt>
                    <dd class="icon-step"><img src="./images/icon-step@3x.png" alt=""></dd>
                    <dd >{{aList.return_time |date}}</dd>
                </dl>
            </div>
            <div class="nav-wrapper" >
                <div id="wrapper" class="wrapper">
                    <ul class="nav">
                        <li :class="{'on':sel1}" @click="project">项目介绍</li>
                        <li :class="{'on':sel2}" @click="rules">计息规则</li>
                        <li :class="{'on':sel3}" @click="capitalUse">资金用途</li>
                        <li :class="{'on':sel4}" @click="source">还款来源</li>
                        <li :class="{'on':sel5}" @click="guarantee">投资担保</li>
                    </ul>
                </div>
                <article class="wx-article" v-show="show1">
                    <h2><em></em>嘉币理财项目介绍</h2>
                    <textarea  rows="9"  readonly="readonly">{{aList.introduction}}</textarea>
                </article>
                <article class="wx-article" v-show="show2">
                    <h2><em></em>投资收益为募集额递增收益比例递增方式展现</h2>
                    <textarea  rows="12"  readonly="readonly">{{aList.interest_accrual_rules}}</textarea>
                </article>
                <article class="wx-article" v-show="show3">
                    <h2><em></em>资金使用如下</h2>
                     <textarea  rows="2"  readonly="readonly">{{aList.use_of_funds}}</textarea>
                </article>
                <article class="wx-article" v-show="show4">
                    <h2><em></em>还款来源如下：</h2>
                     <textarea  rows="4"  readonly="readonly">{{aList.repaying_source}}</textarea>
                </article>
                <article class="wx-article" v-show="show5">
                    <h2><em></em>投资担保企业基本信息</h2>
                     <textarea  rows="22"  readonly="readonly">{{aList.investment_guarantee}}</textarea>
                </article>
            </div>
        </div>
        <div class="foot-wrapper clearfix">
            <div class="pull-left share" @click="share"><img src="./images/icon-share.png" alt="分享"/>分享</div>
            <a class="btn" @click="gobuy">立即购买</a>
        </div>
    </div>
</template>
<style  scoped lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
  .container{background-color: $bgec;}
  .financil-wrapper{
      margin-bottom: .2rem;
      background:#fff url("./images/bg@3x.png")no-repeat top;
      background-size:100%;
      .profit-wrapper{
          position: relative;
          padding: .3rem .3rem 0;
          @include sc(.18rem, #fff);
          .wx-dot1{
              @include spot(4px,4px, #07CCCE);
          }
          .wx-dot2{
              @include spot(4px,4px, #BBDC48);
          }
          .wx-dot3{
              @include spot(4px,4px, #DC8748);
          }
          .wx-dot4{
              @include spot(4px,4px, #DC4848);
          }
          .canvas-wrap{
              position: absolute;
              top:1rem;
              left: 50%;
              margin-left: -1.8rem;
              width: 3.6rem;
              height: 3.6rem;
              .sign1,.sign2,.sign3,.sign4{position: absolute;}
              .sign1{
                top: -.4rem;
                left: 50%;
                margin-left: -.3rem;
              }
              .sign2{
                top:36%;right:-.5rem;
              }
              .sign3{
                bottom: -.4rem;
                left: 50%;
                margin-left: -.2rem;
              }
              .sign4{
                top: 36%;
                left: -.5rem;
              }
              canvas{
                  position: absolute ;
                  top:0;
                  left: 0;
                  z-index: 0;
              }
              .showbox{
                  width: 3.4rem;
                  height: 3.4rem;
                  position: absolute;
                  top:50%;
                  left:50%;
                  z-index: 2;
                  margin-top: -1.7rem;
                  margin-left: -1.7rem;
                  background: url("./images/inbg@3x.png")no-repeat;
                  background-size: 3.4rem 3.4rem;
                  text-align: center;
                  @include sc(.22rem, #fefefe);
                  p{margin-top: 1.2rem}
                  span{font-size: .6rem;}
              }
          }
      }
      .capital-wrapper{
          margin-top:3rem;
          padding: .6rem 1rem;
          background: url("./images/bg2@3x.png")no-repeat;
          background-size: 100%;
          .capital-left{width: 50%;}
          .capital-list{
              margin-bottom: .34rem;
              @include sc(.3rem, #999);
              em{@include sc(.4rem, #333);}
          }
      }
  }
  .prompt{
    width: 100%;
    background-color: $bgfc;
    line-height: 3;
    @include sc(.18rem, #999);
    p{
      width: 6.3rem;
      margin: 0 auto;
      @include borderB-1px(#E8E6E6);
    }
  }
  .step-wrapper{
      margin-bottom: .2rem;
      padding: .2rem .3rem .1rem .3rem;
      background-color: $bgfc;
      @include sc(.24rem, #333);
      text-align: center;
      @include fj;
      dl{position: relative;flex: 1;}
      dt{margin-bottom: .16rem;}
      dd{margin-bottom: .16rem;color: #999;}
      .icon-step img{width: .44rem;}
      .icon-line{
        position: absolute;left: 42%;top:29%;width: 2rem;
        img{width: 1.2rem;}
      }
  }
.nav-wrapper{
    background-color: $bgfc;
    .nav{
      display: flex;
      width: 120%;
      padding: 0 .32rem;
      line-height: 3;
      @include borderB-1px(#E8E6E6);
    }
    .nav li{
        float: left;
        margin: 0 .2rem;
        @include sc(.3rem, #999);
    }
   .nav .on {
        color: #171F71;
        border-bottom: 2px solid #171F71;
   }
   article{
        margin-top: .4rem;
        @include sc(.28rem, #999);
        h2{
            padding:0 .3rem .2rem .3rem;
            @include sc(.3rem, #222);
        }
        em{
            width: 2px;
            height: 12px;
            margin-right: .1rem;
            display: inline-block;
            background-color: #25329A;
        }
        textarea{
            display: block;
            overflow-y:visible;
            resize: none;
            width:92%;
            margin:0 auto;
            @include sc(.28rem, #999);
            line-height: 1.8;
        }
   }
}
  .wx-mybtn{
    display: block;
    width: 1.2rem;
    height: .45rem;
    position: absolute;
    top: .3rem;
    right: .3rem;
    background: url("./images/licai@3x.png") no-repeat;
    background-size: 1.2rem .45rem;
     }
    /*.wrapper{width: 100%;overflow: hidden;position: relative;height: 1rem;}*/
  .btn{
    @include btn(.24rem, 25%);
    position: absolute;
    top:.2rem;
    right: .3rem;
  }
</style>
<script>
//    import '../../static/js/canvas.js'
    import Success from './../common/success.vue'
    var newid=window.localStorage.getItem('id');
    var tok=window.localStorage.getItem('token');
    var id=parseInt(newid);
//    alert(tok);
    export default{
        data () {
            return {
//                Api:this.GLOBAL.Api,
                aList:[],
                show_annualized:0,
                current_num:0,
                sel1:false,
                sel2:false,
                sel3:false,
                sel4:false,
                sel5:false,
                show1:true,
                show2:false,
                show3:false,
                show4:false,
                show5:false,
                phone:''
            }
        },
        created () {
            var _this = this;
            _this.View();
            _this.project();
        },
        mounted:function(){
            var id=this.$route.query.id;
            var token=this.$route.query.token;
            var Old=this.$route.query.old;
            if(token){
               localStorage.clear();
                localStorage.setItem("id",id);
                localStorage.setItem("token",token);
                localStorage.setItem("old",Old);
                    if(localStorage.length>0){
                      window.location.href=window.location.protocol+'home'
                    }
              }else{
                  if(localStorage.length<=0){
                    window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3ede64a43feeee5e&redirect_uri=http%3A%2F%2Fmyjiabao.com%2Fwx_login&response_type=code&scope=snsapi_userinfo&state=vue#wechat_redirect'
              }
            }
//            alert(localStorage.length);
        },
        methods: {
            myfinancial(){
                var Api=this.GLOBAL;
//                alert(Api);
                var url=Api+"/info/users/" +id+ "/";
                this.$http.get(url).then(function(response){
                    var res = response.data;
                    console.log(res);
                    this.phone=res.phone;
                    console.log(this.phone);
                    if(this.phone=='' || this.phone==null){
                      this.$router.push({ path: 'shouji' });
                    }else {
                       this.$router.push({ path: 'financialManagement' });
                    }
                }) ;
            },
            gobuy(){
                var Api=this.GLOBAL;
                var url=Api+"/info/users/" +id+ "/";
                this.$http.get(url).then(function(response){
                    var res = response.data;
                    console.log(res);
                    this.phone=res.phone;
                    console.log(this.phone);
                    if(this.phone=='' || this.phone==null){
                      this.$router.push({ path: 'shouji' });
                    }else {
                      this.$router.push({ path: 'entermoney' });
                    }
                }) ;
            },
            View:function(){
                var Api=this.GLOBAL;
                this.$http.get(Api+'/financial/regular/').then(function(response) {
                    var res = response.data;
                    this.aList=res.results[0];
                    this.current_num=res.results[0].current_num;
                    console.log(this.current_num);
                    if(res){
                        var val=parseInt(this.current_num);
                        circleProgress(val);
                    }
                    var myScroll = new iScroll('wrapper',{ hScrollbar: false, vScrollbar: false ,vScroll:false});
                })
            },
            share(){
                alert('点击右上角，选择分享哟！');
                var url=window.location.href;
                var Api=this.GLOBAL;
//                alert(url);
                this.$http.post(Api+"/wechat_js/",{url:url}).then(function(response) {
                    var res = response.data;
                    //console.log(res);
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.appId, // 必填，公众号的唯一标识
                        timestamp: res.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.nonceStr, // 必填，生成签名的随机串
                        signature: res.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function () {
                        wx.onMenuShareTimeline({
                            title: '嘉币理财来啦，收益高到没朋友！', // 分享标题
                            desc: '年化收益率最高可达18%%！起投低，收益高，限时发售！快来抢购吧！', // 分享描述
                            link: 'http://vue.myjiabao.com/home', // 分享链接
                            imgUrl: 'http://vue.myjiabao.com/static/images/finance_share.jpg', // 分享图标
                            success: function () {
                                alert('已分享');
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                alert('已取消');
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareAppMessage({
                            title: '嘉币理财来啦，收益高到没朋友！', // 分享标题
                            desc: '年化收益率最高可达18%%！起投低，收益高，限时发售！快来抢购吧！', // 分享描述
                            link: 'http://vue.myjiabao.com/home', // 分享链接
                            imgUrl: 'http://vue.myjiabao.com/static/images/finance_share.jpg', // 分享图标
                            success: function () {
//                                alert('已分享');
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
//                                alert('已取消');
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareWeibo({
                            title: '嘉币理财来啦，收益高到没朋友！', // 分享标题
                            desc: '年化收益率最高可达18%%！起投低，收益高，限时发售！快来抢购吧！', // 分享描述
                            link: 'http://vue.myjiabao.com/home', // 分享链接
                            imgUrl: 'http://vue.myjiabao.com/static/images/finance_share.jpg', // 分享图标
                            success: function () {
                                alert('已分享');
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                alert('已取消');
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    });
                })
            },
            project(){
                this.sel1=true;
                this.sel2=false;
                this.sel3=false;
                this.sel4=false;
                this.sel5=false;
                this.show1=true;
                this.show2=false;
                this.show3=false;
                this.show4=false;
                this.show5=false;
            },
            rules(){
                this.sel1=false;
                this.sel2=true;
                this.sel3=false;
                this.sel4=false;
                this.sel5=false;
                this.show2=true;
                this.show1=false;
                this.show3=false;
                this.show4=false;
                this.show5=false;

            },
            capitalUse(){
                this.sel1=false;
                this.sel2=false;
                this.sel3=true;
                this.sel4=false;
                this.sel5=false;
                this.show3=true;
                this.show1=false;
                this.show2=false;
                this.show4=false;
                this.show5=false;

            },
            source(){
                this.sel1=false;
                this.sel2=false;
                this.sel3=false;
                this.sel4=true;
                this.sel5=false;
                this.show4=true;
                this.show1=false;
                this.show3=false;
                this.show2=false;
                this.show5=false;
            },
            guarantee(){
                this.sel1=false;
                this.sel2=false;
                this.sel3=false;
                this.sel4=false;
                this.sel5=true;
                this.show5=true;
                this.show1=false;
                this.show2=false;
                this.show3=false;
                this.show4=false;
            }
        }
    }
</script>
