<template>
    <div>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
            <!--充值-->
        <!--</header>-->
        <head-top head-title="充值" go-back='true' ></head-top>
        <div class="content">
            <div class="cells-wrapper">
                <div class="cell">
                    <div class="cell__hd"><img src="./images/weixin.png" alt="" style="width:20px;margin-right:5px;display:block"></div>
                    <div class="cell__bd">
                        <p>微信充值</p>
                    </div>
                    <div class="cell__ft"></div>
                </div>
            </div>
            <div class="import-wrapper clearfix" >
                <h2>充值金额</h2>
                <div class="money-input"><span>￥</span><input type="number" placeholder="100嘉币起" v-model="number" @blur="numblur"/></div>
                <p class="point pull-right">1元=1嘉币</p>
            </div>
            <div class="btn-wrapper">
                <button class="btn" v-show="btn" @click="chongzhi">充值</button>
                <button class="btn" v-show="disbtn" disabled="disabled">充值</button>
            </div>
        </div>
    </div>
</template>
<style  scoped lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
    .import-wrapper{padding: 0 .7rem;line-height: 1;background-color: #fff;border-bottom: 1px solid #E8E6E6;margin-bottom: .2rem;}
    .import-wrapper h2{font-size: .34rem;color: #000;padding-top: .78rem;}
    .money-input{border-bottom: 1px solid #E8E6E6;width: 100%;margin-top: .5rem;}
    .money-input span{font-size: .7rem;margin-right: .2rem;}
    .money-input input{font-size: .88rem;color: #000;width: 80%;border: none;font-weight: 700;}
    .point{font-size: .24rem;color: #888;padding: .45rem 0;}
    .btn-wrapper{padding: .32rem}
    .btn-wrapper p {font-size: .2rem;color: #888;}
    .btn{
      @include btn(.3rem ,80%);
    }
    ::-webkit-input-placeholder{
         font-size:.6rem;
         font-weight: normal;
    }
</style>
<script>
  import headTop from './../common/header/head.vue'
    export default{
        data () {
            return {
                number:null,
                btn:false,
                disbtn:true,
                id:null
            }
        },
        methods:{
           chongzhi:function(){
               var order_money=parseInt(this.number);
               if(order_money<100){
                   alert('充值100起');
                   return false;
               }else {
                   var Api=this.GLOBAL;
                   var order_money=parseInt(this.number);
                   this.$http.post(Api+'/money/order/',{order_money:order_money}).then(function(response){
                       var res = response.body;
                       console.log(res);
                       this.id=res.id;
                       var id=this.id;
                       this.$http.post(Api+'/money/wx_native_pay/',{id:id}).then(function(response){
                           var res = response.body.data;
                           console.log(res);
                           wx.chooseWXPay({
                               appId:res.appid,
                               timestamp: res.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                               nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
                               package: res.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                               signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                               paySign: res.sign, // 支付签名
                               success: function (res) {
                                   alert(res.errmsg);
                                   alert('充值成功！')
                                   // 支付成功后的回调函数
                               }
                           });

                       })
                   });
               }
            },
            numblur:function(){
                if(this.number.length>0){
                    this.btn = true;
                    this.disbtn=false;
                }else {
                    this.btn = false;
                    this.disbtn=true;
                }

            }
        },
        components: {
          headTop
        }
    }
</script>
