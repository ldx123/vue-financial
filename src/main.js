import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import routerconfig from './router/index.js'

//
import countup from '../static/vendor/countUp.js';
import iscroll from '../static/vendor/iscroll.js';
import {Api} from '../static/js/api.js';
import '../static/js/rem'
//import './static/vendor/jweixin'

Vue.prototype.GLOBAL = Api;

Vue.use(countup);
Vue.use(iscroll);
Vue.use(VueResource);
Vue.use(VueRouter);
const router = new VueRouter(routerconfig);

//时间过滤器
Vue.filter('date',function(val){
  var timestamp = Date.parse(new Date(val));
  var oDate=new Date(timestamp);
  function add0(n) {return n < 10 ? '0' + n : n ;}
  var y =oDate.getFullYear();
  var m =oDate.getMonth() + 1;
  var d =oDate.getDate();
  return y + '.' + add0(m) + '.' + add0(d);
});
//将token写入到header
var newid=window.localStorage.getItem('id');
var newToken=window.localStorage.getItem('token');
Vue.http.interceptors.push(function(request, next){
  if (newToken) {
    Vue.http.headers.common['Authorization'] = 'JWT  ' + newToken;
    //this.$router.push({ path: 'home' });
    //alert(newToken);

  }
  next(function(response){
    if (response.status === 401) {
      //alert('非常抱歉, 您只能以游客的身份浏览商城!')
      localStorage.clear();
      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3ede64a43feeee5e&redirect_uri=http%3A%2F%2Fmyjiabao.com%2Fwx_login&response_type=code&scope=snsapi_userinfo&state=vue#wechat_redirect';

    }
  })
});
//vue实例
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});

