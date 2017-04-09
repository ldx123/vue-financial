/**
 * Created by anita on 2017/3/29.
 */

let Api;
// 开发环境打开
if (process.env.NODE_ENV == 'development') {
    Api = 'http://192.168.1.41';
}
// 生产环境打开
if (process.env.NODE_ENV == 'production') {
    Api = 'http://www.myjiabao.com';
}
Api = 'http://192.168.1.41';
export{
    Api

}
