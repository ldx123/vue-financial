<template>
    <div>
        <!--<header class="wx-top">-->
            <!--<img class="goback" src="../../../static/images/goback.png" alt="goback" onclick="history.go(-1)">-->
            <!--记录详情-->
        <!--</header>-->
      <head-top head-title="记录详情" go-back='true' ></head-top>
        <div class="content">
            <div class="state">
                <p>{{num}}</p>
                <span :class="{'col':b,'zcol':h}">{{status}}</span>
            </div>
            <div class="cells-wrapper">
                <div class="cell">
                    <div class="cell__bd">
                        <p>借款项目名称：</p>
                        <p>借款编号:</p>
                    </div>
                    <div class="cell__ft">
                        <p>{{name}}</p>
                        <p>{{regular_number}}</p>
                    </div>
                </div>
                <div class="cell">
                    <div class="cell__bd">
                        <p>当前年化收益率：</p>
                        <p>开始计息：</p>
                        <p>还款到账：</p>
                        <p>到期本息：</p>
                    </div>
                    <div class="cell__ft">
                        <p>{{show_annualized}}</p>
                        <p>{{show_end_sell_time}}</p>
                        <p>{{show_return_time}}</p>
                        <p>{{principal_and_interest}}</p>
                    </div>
                </div>
                <div class="cell">
                    <div class="cell__bd">
                        <p>购买时间：</p>
                    </div>
                    <div class="cell__ft">
                        <p>{{buy_time}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style  scoped lang="scss" rel="stylesheet/scss">
  @import '../../../static/style/mixin.scss';
  .content{background-color: $bgec;}
  .cell p{
    margin-bottom: .2rem;
    @include sc(.3rem, #666);
  }
    .state{padding: .6rem 0 .1rem 0; text-align: center; background-color:$bgfc; @include sc(.3rem, #999);}
    /*.state{font-size: .3rem;color: #999;}*/
    .col{color: #409fff;}
    .zcol{color: #FC8F37;}
</style>
<script>
  import headTop from './../common/header/head.vue'
    export default{
        data () {
            return {
                name:0,
                regular_number:'',
                num:0,
                principal_and_interest:0,
                show_annualized:0,
                status:'',
                show_end_sell_time:'',
                show_return_time:'',
                buy_time:'',
                b:false,
                h:false
            }
        },
        created () {
//            var id = this.$route.query.id;
            var id = this.$route.params.id;
            var Api=this.GLOBAL;
            this.$http.get(Api+"/financial/order/"+id+"/").then(function(response){
                var res = response.data;
                this.name=res.name;
                this.buy_time=res.buy_time;
                this.regular_number=res.regular_number;
                this.num=res.num;
                this.principal_and_interest=res.principal_and_interest;
                this.show_annualized=res.show_annualized;
                this.status=res.status;
                this.show_end_sell_time=res.show_end_sell_time;
                this.show_return_time=res.show_return_time;
                if(this.status=="招标中"){
                    this.b=true;
                }if(this.status=="还款中"){
                    this.h=true;
                }
            });
        },
        components: {
          headTop
        }
    }
</script>
