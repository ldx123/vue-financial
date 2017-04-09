<template>
    <div class="page" id="app" style="background-color: #fff;">
        <!--<div class="top">-->
            <!--<div class="tophead" >-->
                <!--<span>专属邀请</span>-->
            <!--</div>-->
        <!--</div>-->
        <head-top head-title="专属邀请" go-back=''></head-top>
        <article class="article-wrapper container">
            <div class="banner">
                <img src="./images/ban2@3x.png">
            </div>
            <form action="" class="cells-wrapper">
                <div class="cell cell_select cell_select-before">
                    <div class="cell__hd">
                      <select class="select" name="select2">
                        <option value="1">+86</option>
                      </select>
                    </div>
                    <div class="cell__bd">
                      <input class="cell-input" type="number" placeholder="请输入号码" v-model="telephone" />
                    </div>
                </div>
                <div class="cell cell_vcode">
                    <div class="cell__bd">
                      <input class="cell-input code-input" type="number" placeholder="请输入验证码" v-model="telecode"/>
                    </div>
                    <div class="cell__ft">
                      <a href="javascript:;" class="vcode-btn"  @click="getCode" v-show="!CodeMsg">获取验证码</a>
                      <a href="javascript:;" class="vcode-btn" v-show="CodeMsg">已发送({{CodeMsg}}s)</a>
                    </div>
                </div>
                <div class="loginBtn" @click="reg"><img src="./images/loginbtn@3x.png" alt=""></div>
            </form>
        </article>
        <div class="m-foot" id="m-foot">
            <a href="https://itunes.apple.com/hk/app/chuan-jia-bao/id1123273445?mt=8">
                <img src="./images/down@3x.png" alt="">
            </a>
        </div>
    </div>
</template>
<style scoped  lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
  .cells-wrapper{
    width: 5.2rem;
    margin: 0 auto;
    margin-top: .6rem;
    font-size: .28rem;
  }
  .loginBtn img{width: 4rem;display: flex;margin: 30px auto 0 auto;}
  .m-foot{
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    z-index:2;
    a{display: block;}
    img{width: 100%;display: flex;}
  }
  .cell_select-before .cell__hd:before{
    content: " ";
    width: 0px;
    height:0px;
    border-width: 8px 8px 0;
    border-style: solid;
    border-color: #222 transparent transparent transparent;
  }
  .select {width: 90px;}
  .cell_select-before .cell__hd:after {border-right: 0px solid #D9D9D9;  }
  .vcode-btn{border: none;}
  .code-input{border-right: 1px solid #E8E6E6;}
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
                telecode: ''
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
                    });
                }

            },
            reg:function(){
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

                    this.$http.post(Api+'/register_or_login/',{
                        phone:phone,
                        code:code
//                        invite_code:'110'
                    }).then(function(res){
//                        alert('ok');
                       if(res.data.token||res.data.id){
                          console.log(res.data.token);
                          console.log(res.data.id);
                            alert('注册成功！')
                       }
                        if(res.data.error==2){
                          console.log(res.data.error);
                          console.log(res.data.detail);
                        }
                    });
                }
            }
        },
      components: {
        headTop
      }
    }
</script>
