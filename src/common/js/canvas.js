/**
 * Created by anita on 2017/3/13.
 */
//画圆形进度
function circleProgress(value){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    var value= Number(value),// 当前百分比,数值
        color = "#fff",// 进度条样式
        maxpercent = 10000000,//最大值，可设置
        c_width = 200,// canvas，宽度
        c_height =200;// canvas,高度
    // 清空画布
    context.clearRect(0, 0, c_width, c_height);
    // 画初始圆
    context.beginPath();
    // 将起始点移到canvas中心
    context.moveTo(c_width/2, c_height/2);
    // 绘制一个中心点为（c_width/2, c_height/2），半径为c_height/2，起始点0，终止点为Math.PI * 2的 整圆
    context.arc(c_width/2, c_height/2, c_height/2, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = 'rgba(255,255,255,0)'; //填充颜色
    context.fill();
    // 绘制内圆
    context.beginPath();
    context.strokeStyle = '#fff';
    context.lineCap = 'round';
    context.closePath();
    context.fill();
    context.lineWidth = 3.0;//绘制内圆的线宽度

    function draw(cur){
        // 画内部空白
        context.beginPath();
        context.moveTo(24, 24);
        context.arc(c_width/2, c_height/2, c_height/2-10, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        // 画内圆
        context.beginPath();
        // 绘制一个中心点为（c_width/2, c_height/2），半径为c_height/2-5不与外圆重叠，
        // 起始点-(Math.PI/2)，终止点为((Math.PI*2)*cur)-Math.PI/2的 整圆cur为每一次绘制的距离
        context.arc(c_width/2, c_height/2, c_height/2-5, -(Math.PI / 2), ((Math.PI * 2) * cur ) - Math.PI / 2, false);
        context.stroke();
    }
    // 调用定时器实现动态效果
    var timer=null,n=0;
    function loadCanvas(nowT){
        timer = setInterval(function(){
            if(n>nowT){
                clearInterval(timer);
            }else{
                draw(n);
                n += 0.01;
            }
        },15);
    }
    loadCanvas(value/10000000);
    timer=null;
}





