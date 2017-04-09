<template>
    <div>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
            <!--提现-->
        <!--</header>-->
        <head-top head-title=" 提现" go-back='true' ></head-top>
        <div class="content">
            <div class="import-wrapper">
                <h2>请输入提现金额</h2>
                <p class="money-icon">￥</p>
                <div class="money-input"><input type="number" value="100" v-model="money"/></div>
                <p class="point">提现超过一万收0.1%手续费</p>
            </div>
            <div class="info-wrapper">
                <p>股票被套牢，急需用钱</p>
            </div>
            <div class="btn-wrapper">
                <p>默认绑定银行卡，如有需要更改请联系客服 <span class="pull-right">****123</span></p>
                <button class="btn" @click="txsubmit">提现</button>
            </div>
        </div>
    </div>
</template>
<style  scoped lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
     .content{background-color: $bgec;}
    .import-wrapper{padding: 0 .7rem;line-height: 1;background-color: #fff;border-bottom: 1px solid #E8E6E6;margin-bottom: .2rem;}
    .import-wrapper h2{font-size: .34rem;color: #000;padding-top: .78rem;}
    .money-icon{font-size: .48rem;color: #000;margin-top: .58rem;}
    .money-input{border-bottom: 1px solid #E8E6E6;width: 100%;}
    .money-input input{font-size: .88rem;color: #000;margin-left: .5rem;width: 90%;border: none;}
    .point{font-size: .24rem;color: #888;padding: .45rem 0;}
    .info-wrapper{height: 3rem;margin-bottom: .2rem;background-color: #fff;padding: .32rem .7rem;font-size: .24rem;
        color: #222;;
    }
    .btn-wrapper{background-color: #fff;padding: .32rem}
    .btn-wrapper p {font-size: .12rem;color: #888;margin-bottom: .6rem}
    .btn{
      @include btn(.3rem ,80%);
      background-color: #fc8f37;
    }
    /*.weui-btn_tx{ margin-top: .6rem; background-color: #FC8F37;width: 90%!important; }*/
</style>
<script>
  import headTop from './../common/header/head.vue'
    var newid=window.localStorage.getItem('id');
    var id=parseInt(newid);

    export default{
        data () {
            return {
                money:null,
                remark:'',
                available:''
            }
        },
        created (){
            userinfo:{
                var Api=this.GLOBAL;
                var url=Api+"/info/users/" +id+ "/";
                this.$http.get(url).then(function(response){
                    var res = response.data;
//                    console.log(res);
                    this.available=res.available;
                }) ;
            }
        },
        methods:{
            txsubmit(){
                var Api=this.GLOBAL;
                var money=parseInt(this.money);
                var available=parseInt(this.available);
//                alert(available);
//                alert(money);
//                alert(money<available);
                if(money==null){
                    alert('请输入提现金额');
                }else if(money>available){
                    alert('余额不足');
                }else if(money<100){
                    alert('提现100起');
                }else{
                    this.$http.post(Api+'/money/refund/',{
                        money:money
                    }).then(function(response){
                        var res = response.data;
                        if(res){
                            alert('提现申请成功，请等待核审！');
                           this.$router.push({ path: 'RechargeWithdrawals' });
//                            this.intervalid = setInterval(function() {
//                              window.history.go(-1);
//                            }, 3000);
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
