window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var select = document.getElementById('painterWidth');
    var painterColor = document.getElementsByClassName('painterColor');
    var painterColors = painterColor[0].getElementsByTagName('span');
    var painterCurrentColor = document.getElementsByClassName('currentColor');
    var pencil = document.getElementsByClassName('pencil');
    var drawLine = document.getElementsByClassName('drawLine');
    var drawRect = document.getElementsByClassName('drawRect');
    var drawCircle = document.getElementsByClassName('drawCircle');
    var painterErase = document.getElementsByClassName('painterErase');
    var painterErases = painterErase[0].getElementsByTagName('span');


    var painterType = 'draw';
    var Top = canvas.offsetTop;
    var Left = canvas.offsetLeft;
    var oldX,oldY;
    var paintWidth = parseInt(select.value);
    var paintColor = painterCurrentColor[0].style.color;
    var moveStart = false;
    var painterEraseWidth = 2;

    canvas.addEventListener('mousemove',move,true);
    canvas.addEventListener('mousedown',down,false);
    canvas.addEventListener('mouseup',up,false);

    select.onclick = function(){
        paintWidth = parseInt(select.value);
    };

    for(var i=0; i<painterColors.length;  i++){
        painterColors[i].onclick = function(){
            painterCurrentColor[0].style.color = this.style.color;
            paintColor = painterCurrentColor[0].style.color;
        }
    }

    for(var j=0; j<painterErases.length;j++){
        painterErases[j].index = j;
        painterErases[j].onclick = function () {
            painterType = 'erase';
            painterEraseWidth = 1 + Math.pow(3,this.index);
        }
    }

    function move(e){
        if (moveStart){
            var newX = e.pageX - Left;
            var newY = e.pageY - Top;
            if(painterType === 'draw') {
                draw(context, newX, newY);
                oldX = newX;
                oldY = newY;
            }
            else {
                clear(context);
                oldX = newX;
                oldY = newY;
            }
        }
    }

    function down(e){
        oldX = e.pageX -Left;
        oldY = e.pageY - Top;
        moveStart = true;
    }

    function up(){
        moveStart = false;
    }

    function draw(ctx,newX,newY){
        ctx.beginPath();
        ctx.moveTo(oldX,oldY);
        ctx.lineTo(newX,newY);
        ctx.strokeStyle = paintColor;
        ctx.lineCap = 'round';
        ctx.lineWidth = paintWidth;
        ctx.stroke();
    }

    function clear(ctx){
        ctx.beginPath();
        ctx.clearRect(oldX-painterEraseWidth,oldY-painterEraseWidth,2*painterEraseWidth,2*painterEraseWidth);
    }
};