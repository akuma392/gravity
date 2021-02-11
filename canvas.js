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

var gravity = 1
var friction = 0.99

function getColor() {
    var colorCode = "0123456789abcdef";
    var code = "#";
    for (var count = 0; count < 6; count++) {
      code = code + colorCode[Math.floor(Math.random() * 16)];
    }
    return code;
}

addEventListener("resize",function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
    
});

addEventListener("click", function(event){
    init();
});

function randomRange(min,max){
    return Math.floor(Math.random()*(max -min + 1) + min);
};

function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy =dy;
    this.radius =radius;
    this.color = getColor();

    

    this.update = function(){
        // if(this.x + this.radius >innerWidth || this.x -radius < 0){
        //     this.dx = -this.dx;
        // }

        // if(this.y + this.radius > innerHeight || this.y -this.radius <0){
        //     this.dy = -this.dy;
        // }

        if(this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.dy;
            this.dy = this.dy * friction;
            this.dx = this.dx * friction;
        }
        else{
            this.dy += gravity;
        }

        if(this.x + this.radius >= canvas.width || this.x - this.radius <=0){
            this.dx = -this.dx * friction;
        }

        this.x += this.dx;
        this.y += this.dy;

        // if (mouse.x -this.x < 50 && mouse.x -this.x > -50 && mouse.y - this.y < 50 && mouse.y -this.y > -50){
        //     if (this.radius < 40){
        //         this.radius +=1;
        //     }
        // }
        // else if( this.radius >10){
        //     this.radius -=1;
        // }

        this.draw();
    }
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fill();
        c.fillStyle = this.color;
        c.stroke();
        // c.closePath();
    };
}


//  array 

let circleArr= [];

function init(){
    circleArr = [];
    for(let i =0;i< 100;i++){
        var radius = randomRange(5,30);

        var x = randomRange(radius,canvas.width - radius);
        var y = randomRange(radius,canvas.height - radius);
    
        // var x = randomRange(50,100)
        // var y = randomRange(100,400);
        var dx = randomRange(-3,3)
        var dy = randomRange(-3,3)
        
        circleArr.push(new Circle(x,y,dx,dy,radius))
    }
}
function animate(){
    requestAnimationFrame(animate);
    
    c.clearRect(0,0,innerWidth,innerHeight);

    for(let j = 0; j< circleArr.length;j++){
        circleArr[j].update();
    }
    
   
    
};



init();
window.addEventListener("mousemove",handleEvent);
animate();