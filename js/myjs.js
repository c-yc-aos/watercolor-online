var panel = null;//色彩及更多工具调整面板整体
var myevent = null;
var tiaos = null;
var rgbs = null;
var colortest = null;
var colorrgba = new Array(0,0,0,1);//颜色值
var colorc16 = null;
var sizebut = null;//size 块
var basize = 10;//笔触大小
//canvas 组件
var canvas_t = null;//预览层
var canvas_v = null;//实际绘画层

var t_v = null;
var v_v = null;//上下文对象

var types = 1; // 绘画类型
var xiangp = false;
//colortest 颜色值刷新
function colorrgb(){
  colortest.style.backgroundColor="rgba("+colorrgba[0]+","+colorrgba[1]+","+colorrgba[2]+","+colorrgba[3]+")";
}
window.onload = function (){
  panel = document.getElementById("box");
  tiaos = document.getElementsByClassName("tiao");
  rgbs = document.getElementsByClassName("rgbbut");
  colortest = document.getElementById("colortest");
  colorc16 = document.getElementsByClassName("colorc16");
  sizebut = document.getElementById("sizebuts");
  canvas_t = document.getElementById("cantest");
  canvas_v = document.getElementById("canvalue");
  canvas_t.width = $(window).width();
  canvas_t.height = $(window).height();
  canvas_v.width = $(window).width();
  canvas_v.height = $(window).height();
  t_v = canvas_t.getContext("2d");
  v_v = canvas_v.getContext("2d");
  t_v.lineJoin="round";
  v_v.lineJoin="round";
  v_v.lineCap="round";
}
window.onmouseup=function(){
   v_v.stroke();   
 
   v_v.beginPath();

  v_v.closePath();
   v_v.fill();
  canvas_t.onmousemove=function(){
  t_test();
  }
   window.onmousemove=function(){
  }
}
function xiu(){
  var ls = sizebut.style.marginLeft.substring(0,sizebut.style.marginLeft.length-2);
  var s = document.getElementById("bei").value;
  basize=(ls*1+5)*s;
}
//处理笔触大小调整
function sizeto(){
  var sx = document.getElementById("rgbjie").offsetLeft;
  var tx = sx+panel.offsetLeft+10;
  var s = document.getElementById("bei").value;
  window.onmousemove=function(){
    sizego(s,tx);
  }
}
function sizego(as,sx){
  event  = arguments.callee.caller.arguments[0] || window.event || event ;
  var x = event.clientX || event.pageX;
   var ox = x-sx;
   if(1<=ox&&ox<=108){
     sizebut.style.marginLeft = (ox-5)+"px";
     tiaos[4].style.width=ox+"px";
     basize=ox*as;
   }
 
}
//处理rgb调色板中按钮的位移
function rgbato(but){
  var i=0;
  for(;i<rgbs.length;i++){
    if(rgbs[i]!=but){
    }else{
       break;
    }
  }
  var sx = document.getElementById("rgbjie").offsetLeft;
  var tx = sx+panel.offsetLeft+10;
  window.onmousemove=function(){
    rgbago(i,tx);
  }
}
function upms(){
  window.onmousemove=function(){
  }
}
function inputc(ins){
  for (var i = 0 ;i<colorc16.length;i++) {
    if(colorc16[i]==ins){
      if(parseInt(colorc16[i].value)<256){
        colorrgba[i] = colorc16[i].value;
      }else{
         colorrgba[i] = colorc16[i].value = 255;
      }
      
    }
  }; 
  colorrgb();
  getrgbw();
}
function getrgbw(){
  for(var i=0;i<3;i++){
      rgbs[i].style.marginLeft = (colorrgba[i]/2-5)+"px";
      tiaos[i].style.width=(colorrgba[i]/2)+"px";
  }
}
function rgbago(i,sx){//rgb格式颜色更改
  event  = arguments.callee.caller.arguments[0] || window.event || event ;
  var x = event.clientX || event.pageX;
  var ox = x-sx;
  if(i<=2){
    if(ox>=0&&ox<=127.5){
      rgbs[i].style.marginLeft = (ox-5)+"px";
      tiaos[i].style.width=ox+"px";
      colorrgba[i] = ox*2;
      colorc16[i].value=ox*2;
    }
  }else{
    ox -= 27.5;
     if(ox>=0&&ox<=100){
      rgbs[i].style.marginLeft = (ox-5)+"px";
      tiaos[i].style.width=ox+"px";
      colorrgba[i] = ox/100;
    }
  }
    colorrgb();
}
//面本整体位移
function panto(){
  window.onmousemove=function(){
    pango();
  }
}
function pango(){//移动调色板
  event = arguments.callee.caller.arguments[0] || window.event || event ;
  var x = event.clientX || event.pageX;
  var y = event.clientY || event.pageY;
  panel.style.top = (y-5)+"px";
  panel.style.left = (x-50)+"px";
}
//鼠标悬停预览
function t_test(){
  t_v.clearRect(0,0,canvas_t.width,canvas_t.height);
  event = arguments.callee.caller.arguments[0] || window.event || event ;
  var x = event.clientX || event.pageX;
  var y = event.clientY || event.pageY;
  var ox = x/$(window).width()*canvas_t.width;
  var oy = y/$(window).height()*canvas_t.height;
  if(!xiangp){
    t_v.fillStyle =  colortest.style.backgroundColor;
    t_v.beginPath();
    t_v.arc(ox,oy,basize/2,0,Math.PI*2,true);
    t_v.closePath();
    t_v.fill();
  }else{
    t_v.fillStyle = "#000000";
    t_v.strokeRect((ox-(basize/2)),(oy-(basize/2)),basize,basize);
  }
  
}
function typeos(ose){
  types = ose.value;
}
//绘制预览
function painting(){
  event = arguments.callee.caller.arguments[0] || window.event || event ;
  var x = event.clientX || event.pageX;
  var y = event.clientY || event.pageY;
  var ox = x/$(window).width()*canvas_t.width;
  var oy = y/$(window).height()*canvas_t.height;
  if(!xiangp){
    switch(types){
      case "1":
      case 1:
        v_v.lineTo(ox,oy);
        t_v.arc(ox,oy,basize/2,0,Math.PI*2,true);
        t_v.closePath();
        t_v.fill();
        break;
      case "2":
        v_v.lineTo(ox,oy);
         v_v.stroke();
        break;
      case "3":
        v_v.lineTo(ox,oy);
        v_v.stroke();
        v_v.closePath();
         v_v.beginPath();
        v_v.lineTo(ox,oy);
        break;
    }
  }else{
    t_v.clearRect(0,0,canvas_t.width,canvas_t.height);
    t_v.fillStyle = "#000000";
    t_v.strokeRect((ox-(basize/2)),(oy-(basize/2)),basize,basize);
    v_v.clearRect((ox-(basize/2)),(oy-(basize/2)),basize,basize);
  }
  
  // v_v.closePath();
  // v_v.beginPath();
  // v_v.lineTo(ox,oy);
  // v_v.beginPath();
  // v_v.lineTo(ox,oy);
  // v_v.fill();
  // t_v.lineTo(ox,oy);
}
function ready(){//开始绘画的起始步骤（鼠标被按下）
  event = arguments.callee.caller.arguments[0] || window.event || event ;
  var x = event.clientX || event.pageX;
  var y = event.clientY || event.pageY;
  var ox = x/$(window).width()*canvas_t.width;
  var oy = y/$(window).height()*canvas_t.height;
  t_v.clearRect(0,0,canvas_t.width,canvas_t.height);
  v_v.strokeStyle = colortest.style.backgroundColor;
  v_v.beginPath();
  v_v.lineWidth=basize;
  v_v.moveTo(ox,oy);
  canvas_t.onmousemove =function(){} ;
  window.onmousemove=function(){
    painting();
  };
}
function baocun(){
  var a = document.createElement('a');
  a.href = canvas_v.toDataURL();
  a.download = this;
  a.click();
}
function cachu(but){
  if(!xiangp){
    but.style.backgroundColor="#f00";
  }else{
    but.style.backgroundColor="#ca9";
  }
  xiangp = !xiangp;
}