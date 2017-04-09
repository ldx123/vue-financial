<template>
    <div>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
            <!--账户安全认证-->
        <!--</header>-->
        <head-top head-title="账户安全认证" go-back='true' ></head-top>
        <div class="content">
            <!--<div class="step"><img src="./images/step1.png" alt=""></div>-->
            <ul class="step-wrapper">
                <li class="sel"><i class="step1"></i><span>设置认证</span></li>
                <li ><i class="step2"></i><span>身份认证</span></li>
                <li ><i class="step3"></i><span>支付设置</span></li>
            </ul>
            <div class="cells-wrapper" >
                <div class="cell ">
                    <div class="cell__hd"><label class="cell-label">真实姓名</label></div>
                    <div class="cell__bd">
                        <input class="cell-input" type="text" placeholder="输入真实姓名" v-model="realname"/>
                    </div>
                </div>
                <div class="cell ">
                    <div class="cell__hd"><label class="cell-label">身份证件号</label></div>
                    <div class="cell__bd">
                        <input class="cell-input" type="text" placeholder="输入身份证件号" v-model="idcard"/>
                    </div>
                </div>
                <p><i></i>请填写本人开户的银行(信用)卡信息</p>
                <div class="cell ">
                    <div class="cell__hd"><label class="cell-label">银行卡号</label></div>
                    <div class="cell__bd">
                        <input class="cell-input" type="text" placeholder="输入银行卡号" v-model="bankcard"/>
                    </div>
                </div>
                <p style="padding-right: 0;"><i></i>请填写银行卡所属支行(如:招商银行广州金穗支行)</p>
                <div class="cell ">
                    <div class="cell__hd"><label class="cell-label">银行卡所属支行</label></div>
                    <div class="cell__bd">
                        <input class="cell-input" type="text" placeholder="输入银行卡所属支行" v-model="withdraw_card_info"/>
                    </div>
                </div>
                <p><i></i>身份验证码将发送至此手机号</p>
                <div class="cell ">
                    <div class="cell__hd"><label class="cell-label">银行预留手机号</label></div>
                    <div class="cell__bd">
                        <input class="cell-input" type="text" placeholder="输入银行绑定手机号" v-model="mobile"/>
                    </div>
                </div>
                <div class="btn-area">
                     <!--<router-link class="weui-btn weui-btn_disabled" href="javascript:" @click="goidentity" to="/identity">下一步</router-link>-->
                     <!--<a class="weui-btn weui-btn_disabled" href="javascript:" @click="goidentity">下一步</a>-->
                     <button class="btn" v-show="btn"  @click="goidentity">下一步</button>
                    <!--<button class="weui-btn" disabled v-show="disbtn">下一步</button>-->
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
    .sel2 .step2{background-position:-150px -103px!important; }
    .sel2 .step1,.sel3 .step1{background-position:-30px -49px!important; }
    .sel1 .step2,.sel3 .step2{background-position:-150px -49px!important; }
    .sel3 .step3{background-position:-276px -49px!important; }
    .cells-wrapper{
        .cell-label{width: 120px;}
        h3{padding: 20px 0 10px 15px;@include sc(.3rem ,#999);@include borderB-1px(#E8E6E6);}
        p{padding: 20px 15px 10px 15px;color:#999;@include borderB-1px(#E8E6E6);}
        i{display: inline-block;width: .1rem;height: .1rem;border-radius: 50%;background-color: #FF4A4A;vertical-align: top;margin: 6px 6px 0 0;}
    }
    .btn{
      @include btn(.3rem ,80%)
    }

</style>
<script>
  import headTop from './../common/header/head.vue'
    export default{
        data () {
            return {
                btn:true,
                disbtn:true,
                realname:'',
                idcard:'',
                bankcard: '',
                mobile:'',
                withdraw_card_info:''
            }
        },
        created (){
        },
        methods:{
            goidentity:function(){
                var realname=this.realname,
                        idcard=this.idcard,
                        bankcard=this.bankcard,
                        mobile=this.mobile,
                        withdraw_card_info=this.withdraw_card_info;

                if(realname=='' || idcard=='' || bankcard=='' || mobile=='' || withdraw_card_info==''){
                    alert('请填写完整信息');
                    return false;
                }else {
                    this.disbtn=false;
                    this.btn=true;
                    var Api=this.GLOBAL;
                    var telreg=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                    var idreg=/(^\d{15}$)|(^\d{17}(\d|X)$)/;
                    var bankreg=/(^([0-9]{16}|[0-9]{19})$)/;
                    if(!idreg.test(idcard)){
                        alert('请输入正确身份证号！');
                    }else if(!bankreg.test(bankcard)){
                        alert('请输入正确银行卡号！');
                    }else if(!telreg.test(mobile)){
                        alert('请输入正确手机号码！');
                    }else {
                        this.$http.post(Api+"/create/true_user/",{
                            realname:realname,
                            idcard:idcard,
                            bankcard: bankcard,
                            mobile:mobile,
                            withdraw_card_info:withdraw_card_info
                        }).then(function(response){
                            var res = response.data;
                            console.log(res);
                            if(res.success==0){
                                this.$router.push({ path: 'identity' ,query: {mobile:this.mobile,realname:this.realname}});
                            }
                        })
                    }

                }

            }

        },
        components: {
          headTop
        }
    }
</script>
