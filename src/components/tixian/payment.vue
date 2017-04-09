<template>
    <div>
        <head-top head-title="账户安全认证" go-back='true' ></head-top>
        <div class="content">
            <ul class="step-wrapper">
                <li class="sel sel3"><i class="step1"></i><span>设置认证</span></li>
                <li class="sel sel3"><i class="step2"></i><span>身份认证</span></li>
                <li class="sel sel3"><i class="step3"></i><span>支付设置</span></li>
            </ul>
            <div class="cells-wrapper">
                <h3>嘉币支付设置</h3>
                <div class="cell ">
                    <div class="cell__hd"><label class="cell-label">姓名</label></div>
                    <div class="cell__bd">
                        <input class="cell-input " type="text" placeholder="紧急联系人" v-model="new_contact_name"/>
                    </div>
                </div>
                <div class="cell ">
                    <div class="cell__hd"><label class="cell-label">号码</label></div>
                    <div class="cell__bd">
                        <input class="cell-input " type="text" placeholder="紧急联系人手机" v-model="new_contact_phone"/>
                    </div>
                </div>
                <p class="pwd">温馨提示：支付密码与当前设备关联，如果换设备请重新设置支付密码！</p>
                <div class="cell " >
                    <div class="cell__hd"><label class="cell-label">支付密码</label></div>
                    <div class="cell__bd">
                        <input class="cell-input " type="text" placeholder="输入6位支付密码" v-model="new_pay_password"/>
                    </div>
                </div>
                <div class="cell ">
                    <div class="cell__hd"><label class="cell-label">重复密码</label></div>
                    <div class="cell__bd">
                        <input class="cell-input " type="text" placeholder="输入6位支付密码" v-model="new_pay_repassword"/>
                    </div>
                </div>
                <p>
                    *紧急联系人将用作您找回/更换重要账户信息的验证资料。当您的账户金额或商品状态出现异常又无法联系到您本人时，将联系您的紧急联系人。
                </p>

                <label for="agree" class="agree-wrap">
                    <input id="agree" type="checkbox" checked class="agree__checkbox">
                    <span class="agree__text">
                       我已阅读并同意<router-link to="pay_user_protocol">《传嘉宝用户协议》</router-link>
                    </span>
                </label>

                <div class="btn-area">
                    <a class="btn" href="javascript:" @click="gofinish">完成</a>
                    <!--<router-link class="weui-btn weui-btn_disabled" href="javascript:" @click="goidentity" to="/identity">下一步</router-link>-->
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
    .sel2 .step1,.sel3 .step1{background-position:-30px -48px!important; }
    .sel1 .step2,.sel3 .step2{background-position:-150px -48px!important; }
    .sel3 .step3{background-position:-276px -48px!important; }
    .cells-wrapper{
      h3{padding: 20px 0 10px 15px;@include sc(.3rem ,#999);@include borderB-1px(#E8E6E6);}
      p{padding: 20px 15px 10px 15px;color:#999;}
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
                new_contact_name:'',
                new_contact_phone:'',
                new_pay_password: '',
                new_pay_repassword: '',
            }
        },
        methods:{
            gofinish:function(){
                var Api=this.GLOBAL;
                var new_contact_name=this.new_contact_name,
                    new_contact_phone=this.new_contact_phone,
                    new_pay_password=this.new_pay_password,
                    new_pay_repassword=this.new_pay_repassword;
                var telreg=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                var pwdreg=/^.{6,}$/;
                if(new_contact_name==''){
                    alert('请输入联系人');
                }else if(new_contact_phone==''){
                    alert('请输入联系人手机');
                }else if(new_pay_password==''){
                    alert('请输入支付秘密');
                }else if(new_pay_repassword==''){
                    alert('请再次支付秘密');
                }else if(!telreg.test(new_contact_phone)){
                    alert('请输入正确手机号码');
                }else if(!pwdreg.test(new_pay_password)){
                    alert('请输入6位密码');
                }else if(new_pay_repassword !=new_pay_password){
                    alert('两次输入密码不一致');
                }else {
                    this.$http.post(Api+"/create/user_code/",{
                        new_contact_name:new_contact_name,
                        new_contact_phone:new_contact_phone,
                        new_pay_password:new_pay_password
                    }).then(function(response){
                        var res = response.data;
                        console.log(res);
                        alert(res.detail);
                        if(res.success==0){
                            this.$router.push({ path: 'tixian'});
                        }
                    })
                }
            }
        },
        components: {
          headTop
        }
    }
</script>
