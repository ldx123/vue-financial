<template>
    <div v-show="alertShow">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <!--<div class="weui-dialog__hd"><strong class="weui-dialog__title">弹窗标题</strong></div>-->
            <div class="weui-dialog__bd">理财金金额不足</div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="alert()">确定</a>
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
                alertShow:true
            }
        },
        methods: {
            alert(){
                this. alertShow=!this. alertShow;
//                this.alertShow!=this.alertShow;
            }
        }
    }
</script>