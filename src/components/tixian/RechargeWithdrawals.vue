<template>
    <div>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
                <!--我的嘉币-->
        <!--</header>-->
      <head-top head-title="我的嘉币" go-back='true' ></head-top>
      <div class="content">
            <div class="total-wrapper">
                <span class="rule" @click="ruleshow"><span></span>嘉币规则</span>
                <div class="border-image-top" v-show="rules" @click="rules=false">
                    <div class="weui-mask"></div>
                    <div class="jiaB-tips">
                        <p>1. 嘉币为传嘉宝代币，1嘉币等值于1元</p>
                        <p>2. 嘉币可直接用作购买支付</p>
                    </div>
                </div>
                <div class="money-icon"></div>
                <div class="number">暂无</div>
                <div class="category">
                    <div class="category-grid">
                        <h1>可用嘉币</h1>
                        <p>{{available}}</p>
                    </div>
                    <div class="category-grid">
                        <h1>冻结嘉币</h1>
                        <p>{{freeze}}</p>
                    </div>
                </div>
            </div>
            <div class="point-wrapper">
                <h2>充值温馨提示：</h2>
                <p>单张银行卡银联单日限额为五万，如交易金额超过五万的，请用两张或以上银行卡分别充值，或单张银行卡多日连续充值足额后支付。</p>
            </div>
            <div class="btn-wrapper">
                <div class="chongzhi" @click="chongzhi">充值</div>
                <div class="tixian" @click="tixian">提现</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .jiaB-tips{background-color: #fff;position: absolute;z-index: 10001;font-size: .3rem;width: 80%;border-radius: 10px;
        left: 50%;margin-left: -40%;padding: .4rem 0;
    }
    .jiaB-tips p{margin-left: .4rem;}
    .content{background-color: #fff;}
    .total-wrapper{background:url("./images/coinBgIcon@3x.png")no-repeat;background-size: 100% 100%; margin-bottom: .5rem;height: 3.9rem;margin-bottom: 1.3rem;position: relative;padding-top: .32rem;}
    .rule{font-size: .24rem;color: #fff;position: absolute;right: .3rem;top: .32rem;}
    .rule span{display: inline-block;width: .3rem;height: .3rem;background: url("./images/ruleBtnIcon@3x.png")no-repeat;background-size: .3rem .3rem;vertical-align: middle;
    margin-right: .1rem;;
    }
    .point-wrapper{padding: 0 .3rem;margin-bottom: 1rem;}
    .point-wrapper h2{font-size: .24rem;color: #222;margin-bottom: .1rem;}
    .point-wrapper p{font-size: .24rem;color: #999;}
    .btn-wrapper{font-size: .35rem; line-height: 1rem;text-align: center;}
    .chongzhi{width: 3.6rem;height: 1rem;color: #fff;overflow: hidden; background:url("./images/btn_blue_nor@3x.png") no-repeat center;
        background-size: 5rem 5rem;border-radius: 30px;  margin: 0 auto; margin-bottom: .3rem;}
    .chongzhi:active{width: 3.6rem;height: 1rem;color: #fff;overflow: hidden; background:url("./images/btn_blue_hig@3x.png") no-repeat center;
        background-size: 5rem 5rem;border-radius: 30px;  margin: 0 auto; margin-bottom: .3rem;}
    .tixian{width: 3.6rem;height: 1rem;color:#3D3E54;background-color: #fff;border-radius: 30px;border: 1px solid #E8E6E6;margin: 0 auto;}
    .tixian:active{width: 3.6rem;height: 1rem;color:#3D3E54;background-color: #fff;border-radius: 30px;border: 1px solid #eff1f5;margin: 0 auto;}
    /*.tixian{width: 3.6rem;height: 1rem;color:#3D3E54;background-color: #fff;border-radius: 30px;border: 1px solid #eff1f5;margin: 0 auto;}*/
    .category{background:url("./images/coinWhiteBgIcon@3x.png")no-repeat;background-size: 100% 100%; padding: .52rem 0 .6rem;border-radius: 10px;width: 90%;display: flex;justify-content: space-around;
        position: absolute;left: 50%;margin-left: -45%;bottom:-.85rem;
    }
    .category-grid{text-align: center;}
    .category-grid h1{font-size: .24rem;color: #1f2879;}
    .category-grid p{font-size: .48rem;color: #1f2879;font-weight: 700;}
    .title{width: 40%;display: flex;margin:.1rem auto 0 auto;}
    .line{flex: 1;position: relative;top: -12px;border-bottom: 1px solid #E8E6E6;}
    .text{padding: 0 .1rem;font-size: .3rem;color: #fff;}
    .number{text-align: center;font-size: .8rem;color: #fff;}
    .money-icon{width: 3rem;height: 1.21rem;background: url("./images/leijishouru@3x.png")no-repeat;background-size: 3rem 1.21rem;margin: 0 auto; }
</style>
<script>
  import headTop from './../common/header/head.vue'
    var newid=window.localStorage.getItem('id');
    var id=parseInt(newid);

    export default{
        data () {
            return {
                available:null,
                freeze:null,
                rules:false
            }
        },
        created (){
            View:{
                var Api=this.GLOBAL;
                var url=Api+"/info/users/" +id+ "/";
                this.$http.get(url).then(function(response){
                    var res = response.data;
                    console.log(res);
                    this.available=res.available;
                    this.freeze=res.freeze;
                    this.created=res.created;

                }) ;
            }
        },
        methods:{
            ruleshow(){
                this.rules=true;
            },
            chongzhi(){
                this.$router.push({ path: 'chongzhi' });
            },
            tixian(){
//                console.log(this.created);
//                alert(this.created);
                if(this.created==0){
                    this.$router.push({ path: 'attestation' });
                }if(this.created==1){
                    this.$router.push({ path: 'payment' });
                }if(this.created==2){
                    this.$router.push({ path: 'tixian' });
                }
            }
        },
        components: {
          headTop
        }
    }
</script>
