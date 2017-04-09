<template>
    <div>
        <div id="dialog1" v-show="confirmShow">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <!--<div class="weui-dialog__hd"><strong class="weui-dialog__title">弹窗标题</strong></div>-->
                <div class="weui-dialog__bd">当前可用嘉币不足</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="cancel()">取消</a>
                    <router-link to="/RechargeWithdrawals" class="weui-dialog__btn weui-dialog__btn_primary" >充值</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
    export default{
        data () {
            return{
                confirmShow:true
            }
        },
        methods: {
            cancel(){
                this.confirmShow=false;
            }
        }
    }
</script>