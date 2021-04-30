paper.install(window);
window.onload = function()
{
    
    // paper
    var canavas = document.getElementById("mainCanvas");
    paper.setup(canavas);

    // ui-按钮
    var restart = document.getElementById("restart");
    var testx = document.getElementById("testx");
    testx.value = num = 0;    // 计分

    var to_x = 0 , to_y = 0;        // 方向坐标
    var rto_x = 0 , rto_y = 0;      // 红色方向坐标

    // 绘图
    var c= Shape.Rectangle(400,300,30,30);        // blue
    c.fillColor = '#66ccff';
    var army = Shape.Rectangle(1,1,10,10);      // red
    army.fillColor = 'red';

    // 旋转
    var path = new paper.Path();
    
    view.onFrame = function(event) {            //  刷新 函数
        c.rotate(30);
        army.rotate(5);
        stock_glide(c,to_x,to_y);

        border_limit();
        eat_check();
        
    }


    
    red_random = function()                 // 红色随机
    {
        army.position = new paper.Point(Math.random()*800,Math.random()*600);
    }
    red_random();
    red_slide_random = function()
    {

    }

    restart.onclick = function()        // 重置
    {
        red_random();
        c.position.x = 400; c.position.y = 300;
        testx.value = num = 0;
        to_x = to_y = 0;
    }


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
        if(c.position.x==800||c.position.x==0)   to_x = -to_x;
        if(c.position.y==600||c.position.y==0)   to_y = -to_y;
    }


    eat_check = function()          // 吞噬 检测
    {
        if((c.position.x-army.position.x)*(c.position.x-army.position.x) + 
        (c.position.y-army.position.y)*(c.position.y-army.position.y) > 25*25)    return;
        testx.value = ++num;
        red_random();
        eat_check();            // 递归检测 - 防止重生在脸上
    }
    
    var tool = new Tool();


    tool.onMouseDown = function(event)
    {
        var step = 20;
        console.log(event);
        to_x = (event.point.x - c.position.x) / step;
        to_y = (event.point.y - c.position.y) / step;
        console.log(to_x + " " + to_y);
    }
    // 边缘碰撞
    // border_boom =  function()
    // {
    //     if()
        
    //     return;
    // }
    
    

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