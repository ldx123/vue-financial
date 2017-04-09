/**
 * Created by anita on 2017/3/10.
 */
//理财
import App from '../App.vue'
import Home from '../components/financial/index.vue'
import Entermoney from '../components/financial/entermoney.vue'
import FinancialManagement from '../components/financial/financialManagement.vue'
import RewardRecord from '../components/financial/rewardRecord.vue'
import TurnIn from '../components/financial/turnIn.vue'
import TurnOut from '../components/financial/turnOut.vue'
import BuyRecord from '../components/financial/buyRecord.vue'
import BuyDetail from '../components/financial/buyDetail.vue'
import FundsDetail from '../components/financial/fundsDetail.vue'
import Help from '../components/common/agreement/help.vue'
import Touzi from '../components/common/agreement/touzixieyi.vue'
import Zhuanhuan from '../components/common/agreement/zhuanhuanxieyi.vue'

//专属邀请
import Zhuanshu from '../components/zhuanshu/index.vue'
import Share from '../components/zhuanshu/share.vue'
//手机绑定
import Shouji from '../components/shouji/shouji.vue'
import reg_user_protocol from '../components/common/agreement/reg_user_protocol.vue'
//充值提现
import Chongti from '../components/tixian/RechargeWithdrawals.vue'
import Tixian from '../components/tixian/tixian.vue'
import Chongzhi from '../components/tixian/chongzhi.vue'
import Attestation from '../components/tixian/attestation.vue'
import Identity from '../components/tixian/identity.vue'
import Payment from '../components/tixian/payment.vue'
import User_protocol from '../components/common/agreement/pay_user_protocol.vue'
export default {
  mode: 'history',
  routes:[
    {path:'/', component:App},
    {path:'/home',component:Home},
    {path:'/financialManagement',component:FinancialManagement},
    {path:'/entermoney',component:Entermoney},
    {path:'/rewardRecord',component:RewardRecord},
    {path:'/turnIn',component:TurnIn},
    {path:'/turnOut',component:TurnOut},
    {path:'/buyRecord',component:BuyRecord},
    {path:'/buyRecord/:id',component:BuyDetail},
    {path:'/fundsDetail',component:FundsDetail},
    {path:'/help',component:Help},
    {path:'/touzixieyi',component:Touzi},
    {path:'/zhuanhuanxieyi',component:Zhuanhuan},

    {path:'/zhuanshu',component:Zhuanshu},
    {path:'/share',component:Share},

    {path:'/shouji',component:Shouji},
    {path:'/reg_user_protocol',component:reg_user_protocol},

    {path:'/RechargeWithdrawals',component:Chongti},
    {path:'/tixian',component:Tixian},
    {path:'/chongzhi',component:Chongzhi},
    {path:'/attestation',component:Attestation},
    {path:'/identity',component:Identity},
    {path:'/payment',component:Payment},
    {path:'/pay_user_protocol',component:User_protocol},
  ]
}
