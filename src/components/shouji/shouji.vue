<template>
    <div>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
            <!--手机绑定-->
        <!--</header>-->
        <head-top head-title="手机绑定" go-back='true' ></head-top>
        <div class="content">
            <div class="banner"><img src="./images/bg@3x.png" alt=""></div>
            <!--<div style="height: 3rem;"></div>-->
            <div class="cells-wrapper">
                <div class="cell cell_select cell_select-before">
                    <div class="cell__hd">
                        <select class="select" name="select2">
                          <option value="1">+86</option>
                        </select>
                    </div>
                    <div class="cell__bd">
                        <input class="cell-input" type="number" placeholder="请输入号码" v-model="telephone"/>
                    </div>
                </div>
                <div class="cell cell_vcode">
                    <div class="cell__hd"><label class="cell-label">验证码</label></div>
                    <div class="cell__bd">
                        <input class="cell-input" type="number" placeholder="请输入验证码" v-model="telecode" @blur="codeblur"/>
                    </div>
                    <div class="cell__ft">
                        <a href="javascript:;" class="vcode-btn"  @click="getCode" v-show="!CodeMsg">获取验证码</a>
                        <!--<div class="codeBtn pull-left" @click="getCode"  v-show="!CodeMsg">获取验证码</div>-->
                        <a href="javascript:;" class="vcode-btn" v-show="CodeMsg">已发送({{CodeMsg}}s)</a>
                    </div>
                </div>
            </div>
            <div>
                <label for="agree" class="agree-wrap">
                    <input id="agree" type="checkbox" checked class="agree__checkbox">
                    <span class="agree__text">
                        我已阅读并同意<router-link to="/reg_user_protocol">《用户协议》</router-link>
                    </span>
                </label>
            </div>
            <div class="btn-area">
                <!--<a class="weui-btn weui-btn_disabled" href="javascript:" >绑定手机</a>-->
                <button class="btn" v-show="btn" @click="reg">绑定手机</button>
                <button class="btn" v-show="!btn" disabled="disabled">绑定手机</button>
            </div>
        </div>

    </div>
</template>
<style  scoped lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
  .cells-wrapper{
    margin-top: .4rem;
  }
  .cell_select{
    @include borderT-1px(#E8E6E6);
  }
  .cell_select-before .cell__hd:before{
   -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
   transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  }
  .banner img{display: flex;width: 100%;}
  .btn{
    @include btn(.3rem ,80%)
  }
</style>
<script>
  import headTop from './../common/header/head.vue'
    export default{
        data () {
            return {
                token: '',
                id: '',
                telephone: '',
                CodeMsg: 0,
                telecode: '',
                btn:false
            }
        },
        methods:{
            getCode:function(){
                var Api=this.GLOBAL;
                var phone=this.telephone;
                var expr=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                //if(expr.test(IDNumber))

                if(!phone){
                    alert('请输入手机号码！');
                    return false;
                }if(!expr.test(phone)){
                    alert('请输入正确的手机号码！');
                    return false;
                }else {
                    if(phone){
                        this.CodeMsg=60;
                        this.timer = setInterval(() =>  {
                                    this.CodeMsg --;
                        if (this.CodeMsg == 0) {
                            clearInterval(this.timer)
                        }
                    }, 1000);
                    }
                    this.$http.post(Api+'/msm/send/',{
                        kind:12,
                        phone:phone
                    }).then(function(res){
                        console.log(res.data.pay_id);
                    },function(res){
                    });
                }
            },
            codeblur:function(){
                if(this.telecode.length>0){
                    this.btn = !this.btn;
                }

            },
            reg:function(){
                var token=window.localStorage.getItem('token');
                var openid=window.localStorage.getItem('id');
                var phone=this.telephone;
                var code=this.telecode;
                var Api=this.GLOBAL;
                if(!code){
                    alert('请输入验证码！');
                    return false;
                }
                if(code.length!=6){
                    alert('验证不正确，请重新输入！');
                    return false;
                }
                else {
                    this.$http.post(Api+'/bind/weixin/',{
                        phone:phone,
                        code:code,
                        access_token: token,
                        openid: openid,
                        unionid: ''
                    }).then(function(res){
//                        alert('绑定成功');
                        console.log(res.data.token);
                        console.log(res.data.id);
                        console.log(res.data.old);
//                        this.intervalid = setInterval(function() {
//                            window.history.go(-1);
//                        }, 3000);

                    });
                }
            }
        },
        components: {
            headTop
        }
    }
</script>
