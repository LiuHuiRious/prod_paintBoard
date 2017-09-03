window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var Top = canvas.offsetTop;
    var Left = canvas.offsetLeft;
    var oldX,oldY;
    var paintWidth = 5;
    var paintColor = 'red';
    var moveStart = false;

    canvas.addEventListener('mousemove',move,true);
    canvas.addEventListener('mousedown',down,false);
    canvas.addEventListener('mouseup',up,false);

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