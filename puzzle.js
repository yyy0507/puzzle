/**
 * Created by yyy on 2017/3/9.
 */
var time = 0;

//设置是否暂停
var pause = true;
//设置定时器
var set_timer;

//大的DIV中装的小DIV的编号
var d = new Array(10);
d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;
//大DIV编号可以移动的位置
var d_direct = new Array(
    [0],[2,4],[1,3,5],[2,6],[1,5,7],[2,4,6,8],[3,5,9],[4,8],[5,7,9],[6,8]
);
//大DIV 编号的位置
var d_posXY = new Array(
  [0],[0,0],[150,0],[300,0],[0,150],[150,150],[300,150],[0,300],[150,300],[300,300]
);
//移动函数
function move(id){
    //找出小DIV在大DIV中的位置
    var i = 1;
    for(i=1;i<10;i++) {
        if (d[i] == id)
            break;
    }
    //找出小DIV可以去的编号
    var target_d = 0;//0表示不能移动
    target_d = moveTo(i);
    //如果target_d!=0，表示可以移动，并且把当前的大DIV的编号设为0，把目标大DIV设置为被点击的小DIV的编号
    if(target_d != 0){
        d[i] = 0;
        d[target_d] = id;
        //设置被点击的小DIV的位置，把他移动到目标大DIV的位置
        document.getElementById("d"+id).style.left = d_posXY[target_d][0] + "px";
        document.getElementById("d"+id).style.top = d_posXY[target_d][1] + "px";
    }
    //设置游戏是否完成
    var finish_flag = true;
    for(var k=1;k<9;k++){
        if(d[k] != k){
            finish_flag = false;
            break;
        }
    }
    if(finish_flag == true){
        if(!pause)
            start();
        alert("congratulation");
    }
}
    function moveTo(cur_div){
        var j = 0;
        var move_flag = false;
        for(j=0;j<d_direct[cur_div].length;j++){
            //如果目标位置的值为0 ，表示可以移动，跳出循环
            if(d[d_direct[cur_div][j]] == 0){
                move_flag = true;
                break;
            }
        }
        if(move_flag == true){
            return d_direct[cur_div][j];
        }else{
            return 0;
        }
    }

//设置定时函数
function timer() {
    time += 1;
    var min = parseInt(time/60);
    var sec = time%60;
    document.getElementById("timer").innerHTML = min+"分"+sec+"秒";
}

//设置开始函数
function start() {
    if(pause){
        document.getElementById("start").innerHTML = "暂停";
        pause = false;
        set_timer = setInterval(timer,1000);
    }else{
        document.getElementById("start").innerHTML = "开始";
        pause = true;
        clearInterval(set_timer);
    }
}
//设置重置函数
function reset() {
    time  = 0;
    random_d();
    if(pause){
        start();
    }
}
    function random_d(){
        for(var i=9;i>1;i--){
            var to = parseInt(Math.random()*(i-1)+1);
            //吧当前DIV的位置设为随机产生的DIV的位置
            if(d[i]!=0){
                document.getElementById("d"+d[i]).style.left = d_posXY[to][0] + "px";
                document.getElementById("d"+d[i]).style.top = d_posXY[to][1] + "px";
            }
            //吧随机产生的DIV的位置设为当前DIV的位置
            if(d[to]!=0){
                document.getElementById("d"+d[to]).style.left = d_posXY[i][0] + "px";
                document.getElementById("d"+d[to]).style.top = d_posXY[i][1] + "px";
            }
            var temp = d[to];
            d[to] = d[i];
            d[i] = temp;
        }
    }
window.onload = function(){
    reset();
}



