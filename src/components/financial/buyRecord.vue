<template>
    <div>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
            <!--购买记录-->
        <!--</header>-->
      <head-top head-title="购买记录" go-back='true' ></head-top>
        <div class="content">
            <ul class="tab-wrapper">
                <li :class="{'on':sel1}" @click="businessList">招商中</li>
                <li :class="{'on':sel2}" @click="repaymentList">还款中</li>
                <li :class="{'on':sel3}" @click="alreadyList">已还款</li>
            </ul>
            <div class="cells-wrapper">
                <div v-for="item in List" >
                    <router-link :to="'/buyRecord/'+item.id">
                        <div class="cell" >
                            <div class="cell__bd">
                                <p>{{item.name}}</p>
                                <span>还款到账：{{item.return_time}}</span>
                            </div>
                            <div class="cell__ft">
                                <p class="wx-m">{{item.num}}</p>
                                <span>到期本息：{{item.principal_and_interest}}</span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <p class="nomore">没有更多了......</p>
        </div>
    </div>
</template>
<script>
  import headTop from './../common/header/head.vue'
    export default{
        data () {
            return {
                sel1:false,
                sel2:false,
                sel3:false,
                List:[]
            }
        },
        created () {
            var _this = this;
            _this.businessList();
        },
        methods:{
            businessList(){
                this.sel1=true;
                this.sel2=false;
                this.sel3=false;
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/order/?status=1").then(function(response){
                    var res = response.data;
                    this.List=res.results;
                    this.id=res.results.id;
//                    console.log( this.id);
                });
            },
            repaymentList(){
                this.sel1=false;
                this.sel2=true;
                this.sel3=false;
                var Api=this.GLOBAL;
                this.$http.get(Api+"/financial/order/?status=2").then(function(response){
                    var res = response.data;
                    this.List=res.results;
                    this.id=res.results.id;
//                    console.log(res);
                });
            },
            alreadyList(){
                var Api=this.GLOBAL;
                this.sel1=false;
                this.sel2=false;
                this.sel3=true;
                this.$http.get(Api+"/financial/order/?status=3").then(function(response){
                    var res = response.data;
                    this.List=res.results;
                    this.id=res.results.id;
//                    console.log(res);
                });
            }
        },
        components: {
          headTop
        }

    }

</script>
<style  scoped lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
  .content{background-color: $bgec;}
  .cell{
    span{@include sc(.2rem, #999);}
  }
  .cell__bd p{@include sc(.3rem, #222);}
  .cell__ft p{@include sc(.3rem, #FC8F37);}

</style>
