<template>
    <div style="background-color: #fff;">
        <div class="page" id="app">
            <head-top head-title="专属邀请" go-back='' ></head-top>
            <article class="article-wrapper content">
                <div class="banner">
                    <img src="./images/ban@3x.png">
                </div>
                <div class="uesrcode">我的ID号：<span>{{codeId}}</span></div>
                <div class="btn-wrap">
                    <div id="share" class="shareBtn" @click="share">分享邀请</div>
                    <!--<div id="face" class="faceBtn">面对面邀请</div>-->
                </div>
                <div class="tab-wrap">
                    <div class="tag-item"><a @click="a='aaa'" :class="{on: a === 'aaa'}">我的邀请</a></div>
                    <div class="tag-item"><a @click="a='bbb'" :class="{on: a === 'bbb'}" >邀请规则</a></div>
                    <div class="tag-item"><a @click="a='ccc'" :class="{on: a === 'ccc'}" >我的收益</a></div>
                </div>
                <component :is="a"></component>
            </article>
        </div>
    </div>
</template>

<script>
    import headTop from './../common/header/head.vue'
    var newid=window.localStorage.getItem('id');
    var newToken=window.localStorage.getItem('token');
    var newold=window.localStorage.getItem('old');
    export default{
        data () {
            return {
                shareShow:false,
                faceShow:false,
                isweixin:false,
                a:'aaa',
                codeId:newid,
                weixin:false
            }
        },
        components:{
        headTop,
        'aaa':{
            data:function(){
                return {
                    Invitationlist:[]
                }
            },
            mounted: function () {
                var _this = this;
                _this.invitationView();
            },
            methods:{
                invitationView: function () {
                    var Api=this.GLOBAL;
                    this.$http.get(Api+"/money/exclusive/").then(function(response){
                        var res = response.data;
                        console.log(res);
                        if(res){
                            this.Invitationlist = res.results;
                        }
                    });
                }
            },
            template:'<div class="con" id="con_one_1"><div class="title"><span>直接邀请人</span><span class="pull-right">绑定时间</span></div> <ul class="MyInvitationlist"> <li v-for="item in Invitationlist " ><span> {{item.username | phone}}</span><span class="pull-right">{{item.add_time | date}}</span></li></ul> </div>'
        },
        'bbb':{
            template:'<div class="con" id="con_one_2"><div class="ruletitle">邀请人收益规则 </div> <div class="rulelist"> <span><i></i>邀请奖励规则：</span> <p>邀请行为以被邀请用户成功注册传嘉宝账户并绑定对应邀请码为准。邀请奖励的给予方为传嘉宝平台以活动奖励给出。</p> </div> <div class="rulelist"> <span>举例：</span> <p>用户A邀请用户B注册传嘉宝账户，用户A邀请用户D注册传嘉宝账户，用户B邀请用户C注册传嘉宝账户。</p> </div> <div class="rulelist"> <span>邀请奖励的享有为：</span> <p>用户A享有用户B参与奖励的10%</p> <p>用户A享有用户C参与奖励的5%</p> <p>用户A享有用户D参与奖励的10%</p> </div> </div>'
        },
        'ccc':{
            data:function(){
                return {
                    incomeList:[],
                    money:{},
                    count:0
                }
            },
            mounted: function () {
                var _this = this;
                _this.incomeView();
            },
            methods:{
                incomeView:function(){
                    var Api=this.GLOBAL;
                    this.$http.get(Api+"/money/exclusive/").then(function(response){
                        var res=response.data;
                        console.log(res);
                        if(res){
                            this.incomeList=res.billing;
                            this.money=res.money;
                            this.count=res.count;

                        }
                    })
                }
            },
            template:' <div class="con" id="con_one_3"><div class="count"> <div class="count-item"> <p>已邀请人数 </p> <p class="num">{{count}}</p> </div> <div class="count-item"> <p>累计收入(元)</p> <p class="num">{{money.reward}}</p> </div> </div> <div class="listhead"> <span>用户</span> <span>条目</span> <span>我的收益(元)</span> </div> <ul class="Incomelist"> <li v-for="item in incomeList" > <span>{{item.order}}</span> <span>{{item.change_reason}}</span> <span class="red">{{item.num}}</span> </li></ul> </div></h1>'
        }
        },
        methods:{
            share:function(){
                var Api=this.GLOBAL;
                var u = navigator.userAgent;
                var ua = window.navigator.userAgent.toLowerCase();
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                var isWX=ua.match(/MicroMessenger/i) == 'micromessenger';
                if(isiOS){
                    var msg={
                        title:'我刚发现了一个大商机，你也来看看吧',
                        text:'买名表，换名表，上传嘉宝！',
                        url:'http://vue.myjiabao.com/share',
                        imgUrl:'http://vue.myjiabao.com/static/images/logo.jpg'
                    };
                    window.webkit.messageHandlers.share.postMessage(msg);
                }else if(isWX){
//                    alert('ok');
//                    this.weixin=true;
                  alert('点击右上角，选择分享哟！');
                var url=window.location.href;
                this.$http.post(Api+"/wechat_js/",{url:url}).then(function(response){
                    var res=response.data;
                    //console.log(res);
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.appId, // 必填，公众号的唯一标识
                        timestamp:res.timestamp , // 必填，生成签名的时间戳
                        nonceStr: res.nonceStr, // 必填，生成签名的随机串
                        signature: res.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function(){
                        wx.onMenuShareTimeline({
                            title:'我刚发现了一个大商机，你也来看看吧', // 分享标题
                            desc: '买名表，换名表，上传嘉宝！', // 分享描述
                            link: 'http://vue.myjiabao.com/share', // 分享链接
                            imgUrl: 'http://vue.myjiabao.com/static/images/logo.jpg', // 分享图标
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
                            title:'我刚发现了一个大商机，你也来看看吧', // 分享标题
                            desc: '买名表，换名表，上传嘉宝！', // 分享描述
                            link: 'http://vue.myjiabao.com/share', // 分享链接
                            imgUrl: 'http://vue.myjiabao.com/static/images/logo.jpg', // 分享图标
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
                            title:'我刚发现了一个大商机，你也来看看吧', // 分享标题
                            desc: '买名表，换名表，上传嘉宝！', // 分享描述
                            link: 'http://vue.myjiabao.com/share', // 分享链接
                            imgUrl: 'http://vue.myjiabao.com/static/images/logo.jpg', // 分享图标
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
                    wx.error(function(res){

                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

                    });
                })
                }
            }
        },
        mounted:function(){
            var id=this.$route.query.id;
            var token=this.$route.query.token;
            var Old=this.$route.query.old;
            if(token){
              localStorage.setItem("id",id);
              localStorage.setItem("token",token);
              localStorage.setItem("old",Old);
              if(localStorage.length>0){
                window.location.href=window.location.protocol+'zhuanshu'
      //                  this.$router.push({ path: 'zhuanshu' });
              }
            }else{
              if(localStorage.length<=0){
      //                  alert('请先登录');
                window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3ede64a43feeee5e&redirect_uri=http%3A%2F%2Fmyjiabao.com%2Fwx_login&response_type=code&scope=snsapi_userinfo&state=vue#wechat_redirect'
              }
            }
//          alert(localStorage.length);
        }
    }
</script>
<style   lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
  .article-wrapper{
  .banner img{width: 100%;display: flex;}
    .uesrcode{
      text-align: center;
      line-height: 2;
    @include sc(.24rem, #999);
    span{color: #FF4A4A;}
    }
    .btn-wrap{
      @include btn(.26rem, 34%);
    }
    .title {
      margin: .44rem 0 .6rem;
      padding: 0 .78rem;
    @include sc(.24rem, #222);
    }
    .MyInvitationlist li{margin-bottom: .4rem;padding: 0 .78rem;  @include sc(.24rem, #999);}
    .nodata{@include sc(.24rem, #999);text-align: center;}

    .ruletitle{margin: .44rem 0 .42rem .65rem; @include sc(.24rem, #222);}
    .rulelist{margin:0 .84rem .4rem .92rem;line-height: .42rem;position: relative;@include sc(.24rem, #222);}
    .rulelist i{width: .15rem;height: .15rem;background: url(images/dot@3x.png) no-repeat;background-size: 100%; position: absolute; top :.12rem;left: -.3rem;}

  .count{margin: .44rem .4rem .4rem .4rem; padding: 0 .4rem; display: flex; justify-content: space-between;text-align: center;border-bottom: 1px solid #E8E6E6;}
  .count p{font-size: .24rem;}
  .count .num{margin: .32rem 0 .44rem 0; font-size: .32rem;color: #FF4A4A;}
  .listhead span,.Incomelist span{width:33%;display:block; float: left; text-align: center;font-size: .24rem;}
  .listhead{margin-bottom: .6rem; color: #222;overflow: hidden;}
  .Incomelist li{overflow: hidden;margin-bottom: .4rem; font-size: .24rem;color: #999;}
  .red{color: #FF4A4A;}

  }
  .tab-wrap{
    margin-top: .6rem;
    background-color: $bgec;
    @include sc(.24rem, #666);
    @include fj;
    padding: 0 .42rem;
    line-height: 3;
    @include borderB-1px(#E8E6E6);
    a{display: inline-block;}
    .on {
      color: #171F71;
      border-bottom: 2px solid #171F71;
    }
  }
</style>
