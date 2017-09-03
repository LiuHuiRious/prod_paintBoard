window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var select = document.getElementById('painterWidth');
    var painterColor = document.getElementsByClassName('painterColor');
    var painterColors = painterColor[0].getElementsByTagName('span');
    var painterCurrentColor = document.getElementsByClassName('currentColor');

    var Top = canvas.offsetTop;
    var Left = canvas.offsetLeft;
    var oldX,oldY;
    var paintWidth = parseInt(select.value);
    var paintColor = painterCurrentColor[0].style.color;
    var moveStart = false;

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

    function move(e){
        if (moveStart){
            var newX = e.pageX - Left;
            var newY = e.pageY - Top;

            context.beginPath();
            context.moveTo(oldX,oldY);
            context.lineTo(newX,newY);
            context.strokeStyle = paintColor;
            context.lineCap = 'round';
            context.lineWidth = paintWidth;
            context.stroke();
            oldX = newX;
            oldY = newY;
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
}