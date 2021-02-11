var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height =window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {};

// c.beginPath();

// c.arc(300,300,30,0,Math.PI*2,false);
// c.fillStyle = "red";
// c.stroke();
// c.fill();

function handleEvent(event){
    mouse.x =event.x;
    mouse.y = event.y;
}


function getColor() {
    var colorCode = "0123456789abcdef";
    var code = "#";
    for (var count = 0; count < 6; count++) {
      code = code + colorCode[Math.floor(Math.random() * 16)];
    }
    return code;
}

function Circle(x,y,dx,dy,radius,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy =dy;
    this.radius =radius;
    this.color = getColor();

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fill();
        c.fillStyle = this.color;
        c.stroke();
    };

    this.update = function(){
        if(this.x + this.radius >innerWidth || this.x -radius < 0){
            this.dx = -this.dx;
        }

        if(this.y + this.radius > innerHeight || this.y -this.radius <0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x -this.x < 50 && mouse.x -this.x > -50 && mouse.y - this.y < 50 && mouse.y -this.y > -50){
            if (this.radius < 40){
                this.radius +=1;
            }
        }
        else if( this.radius >5){
            this.radius -=1;
        }

        this.draw();
    }
}


let circleArr= [];

for(let i =0;i< 100;i++){

    var x = Math.random()*innerWidth;
    var y = Math.random()*innerHeight;

    var dx = (Math.random() - 0.5)*6;
    var dy = (Math.random() - 0.5)*6;
    var radius = (Math.random()* 30) + 15;
    circleArr.push(new Circle(x,y,dx,dy,radius))
}
function animate(){
    requestAnimationFrame(animate);
    
    c.clearRect(0,0,innerWidth,innerHeight);

    for(let j = 0; j< circleArr.length;j++){
        circleArr[j].update();
    }
    
   
    
};




window.addEventListener("mousemove",handleEvent);
animate();