<template>
    <div>
        <head-top head-title="账户安全认证" go-back='true' ></head-top>
        <div class="content" >
            <ul class="step-wrapper">
                <li class="sel sel2"><i class="step1"></i><span>设置认证</span></li>
                <li class="sel sel2"><i class="step2"></i><span>身份认证</span></li>
                <li ><i class="step3"></i><span>支付设置</span></li>
            </ul>
            <div class="cells-wrapper">
                <div class="cell ">
                    <div class="cell__hd"><label class="cell-label">验证预留手机号</label></div>
                    <div class="cell__bd">
                        <input class="cell-input tel" type="text" value="173934945479" v-model="mobile"/>
                    </div>
                </div>
                <div class="cell cell_vcode">
                    <div class="cell__hd"><label class="cell-label">验证码</label></div>
                    <div class="cell__bd">
                        <input class="cell-input" type="number" placeholder="输入验证码" v-model="code"/>
                    </div>
                    <div class="cell__ft">
                        <!--<a href="javascript:;" class="weui-vcode-btn">获取验证码</a>-->
                        <a href="javascript:;" class="vcode-btn"  @click="getCode" v-show="!countdown">获取验证码</a>
                        <!--<div class="codeBtn pull-left" @click="getCode"  v-show="!CodeMsg">获取验证码</div>-->
                        <a href="javascript:;" class="vcode-btn" v-show="countdown">已发送({{countdown}}s)</a>
                    </div>
                </div>
                <div class="btn-area">
                    <a class="btn" href="javascript:" @click="gopayment">下一步</a>
                    <!--<router-link class="weui-btn weui-btn_disabled" href="javascript:" @click="gopayment" to="/payment">下一步</router-link>-->
                </div>
            </div>
        </div>
    </div>
</template>
<style  scoped lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
    .step-wrapper{padding:.3rem .4rem .2rem ;font-size: .3rem;display: flex;background-color: #eee;}
    .step-wrapper li{flex: 1;text-align: center;color: #999;font-size: 14px;}
    .step-wrapper i{display: block;width: 100%;height:.5rem;background:url("./images/step4.png")no-repeat;}
    .step1{background-position: -30px -5px!important;}
    .step2{background-position: -150px -5px!important;}
    .step3{background-position: -276px -5px!important;}
    .sel{color: #222!important;}
    .sel2 .step2{background-position:-150px -102px!important; }
    .sel2 .step1,.sel3 .step1{background-position:-30px -48px!important; }
    .sel1 .step2,.sel3 .step2{background-position:-150px -48px!important; }
    .sel3 .step3{background-position:-276px -48px!important; }
    .cell-label{width: 125px;}
    .tel{color:#409fff}
    .btn{
      @include btn(.3rem ,80%)
    }
</style>
<script>
  import headTop from './../common/header/head.vue'
    export default{
        data () {
            return {
                mobile:'',
                countdown:0,
                code:''
            }
        },
        created: function() {
            this.mobile = this.$route.query.mobile;
            var realname = this.$route.query.realname;
        },
        methods:{
            getCode:function(){
                var phone=this.mobile;
                this.countdown=60;
                this.timer = setInterval(() =>  {
                    this.countdown --;
                    if (this.countdown == 0) {
                        clearInterval(this.timer)
                    }
                }, 1000);
                this.$http.post('/msm/send/',{
                    kind:1,
                    phone:phone
                }).then(function(res){
                    console.log(res.data.pay_id);
                })
            },
            gopayment:function(){
                var Api=this.GLOBAL;
                var codereg=/^.{6,}$/;
                var code=this.code;
                var realname = this.$route.query.realname;
                if(code==''){
                    alert('请输入验证码');
                }else if(!codereg.test(code)){
                    alert('请输入6位验证码');
                }else {
                    this.$http.post(Api+"/create/user_code/",{
                        code:realname
                    }).then(function(response){
                        var res = response.data;
                        console.log(res);
                        alert(res.detail);
//                        if(res.success==0){
                            this.$router.push({ path: 'payment'});
//                        }
                    });
                }
            }
        },
        components: {
          headTop
        }
    }
</script>
