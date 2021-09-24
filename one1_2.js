paper.install(window);
let red_rotate = 14;
let move_hitch = 26;
var to_x = 0 , to_y = 0;        // 方向坐标
var $audio_tan = $("#audio_tan")[0];
var $audio_get = $("#audio_get")[0];
let audio_ck = false;
var bluec;
let ck = true;
window.onload = function()
{
    uiset();

    // paper
    var canavas = document.getElementById("mainCanvas");
    paper.setup(canavas);

    // ui-按钮
    var testx = document.getElementById("testx");
    testx.value = num = 0;    // 计分


    
    // 绘图
    var c= Shape.Rectangle(400,300,30,30);        // blue
    c.fillColor = '#66ccff';
    bluec = c;
    // var c = new Raster('img/blue.jpg');
    // // c.set(30,30);
    // c.width = 30;
    // c.height = 30;
    // console.log(c);


    var army = Shape.Rectangle(1,1,10,10);      // red
    army.fillColor = 'red';

    // 旋转
    // var path = new paper.Path();
    
    view.onFrame = function(event) {            //  刷新 函数
        
        if(ck)  return;
	// The time passed in seconds since the last frame event:
        // console.log(event.delta);
        // if(event.delta*300 <= 1) return;

        c.rotate(red_rotate);
        army.rotate(5); 
        stock_glide(c,to_x,to_y);

        border_limit();
        eat_check();
        ck = true;
    }


    
    red_random = function()                 // 红色随机
    {
        army.position = new paper.Point(Math.random()*800,Math.random()*600);
    }
    red_random();

    
    // 重置
    $("#btn_restart").click( function () {
        red_random();
        c.position.x = 400; c.position.y = 300;
        testx.value = num = 0;
        to_x = to_y = 0;
    });


    stock_glide = function(stock,tx,ty)     // 滑行
    {
        stock.position.x -= tx;
        stock.position.y -= ty;
    }
    

    border_limit = function()   // 边界 管理
    {
        // 限制
        c.position.x = Math.max(c.position.x,0) ; c.position.x = Math.min(c.position.x,800);
        c.position.y = Math.max(c.position.y,0) ; c.position.y = Math.min(c.position.y,600);
        
        // 边缘碰撞
        if(c.position.x==800||c.position.x==0) {
            to_x = -to_x;
            if(audio_ck)    $audio_tan.play();
        }
        if(c.position.y==600||c.position.y==0) {
            to_y = -to_y; 
            if(audio_ck)    $audio_tan.play();
        }
        
    }


    eat_check = function()          // 吞噬 检测
    {
        if((c.position.x-army.position.x)*(c.position.x-army.position.x) + 
        (c.position.y-army.position.y)*(c.position.y-army.position.y) > 25*25)    return;
        testx.value = ++num;
        if(audio_ck)    $audio_get.play();
        red_random();
        eat_check();            // 递归检测 - 防止重生在脸上
    }
    
    var tool = new Tool();


    hitch_Change = function(event) {
        to_x = (event.point.x - c.position.x) / move_hitch;
        to_y = (event.point.y - c.position.y) / move_hitch;
    }
    
    tool.onMouseDown = function(event)
    {
        console.log(event);
        hitch_Change(event);
        console.log(to_x + " " + to_y);
    }
    
    

    tool.onKeyDown = function(event)
    {
        var step = 10;
        if(event.key == 'w')
        {
            c.position.y -= step;
        }
        if(event.key == 'a')
        {
            c.position.x -= step;
        }
        if(event.key == 's')
        {
            c.position.y += step;
        }
        if(event.key == 'd')
        {
            c.position.x += step;
        }
    }
    paper.view.draw();



    
}

uiset = function() {

    // ui绑定

    // 旋转
    $("#col-rotate")[0].value = red_rotate;
    $("#col-rotate").prev()[0].innerText = red_rotate;
    $("#col-rotate").change( function() {
        console.log($(this)[0].value);
        red_rotate = $(this)[0].value;
        console.log($(this).prev());
        $(this).prev()[0].innerText = red_rotate;
    });


    // 凝滞值
    $("#col-hitch")[0].value = move_hitch;
    $("#col-hitch").prev()[0].innerText = move_hitch;
    $("#col-hitch").change( function() {
        console.log($(this)[0].value);
        to_x *= move_hitch , to_y *= move_hitch;
        move_hitch = $(this)[0].value;
        to_x /= move_hitch , to_y /= move_hitch;
        $(this).prev()[0].innerText = move_hitch;
    });

    // 音效
    $("#col-audio").click( function() {
        console.log($("#col-audio")[0].click);
        audio_ck = !audio_ck;
    });
}
