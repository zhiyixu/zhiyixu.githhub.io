var canvas = document.querySelector("canvas");
var drow = document.querySelector("div.row")
const sizeRatio = 4 / 7;
canvas.width = drow.clientWidth;
canvas.height = drow.clientWidth * sizeRatio;
var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 10;

var gravity = .7; // move this far than last farme
var fraction = .7; // keep % of energy ench bounding

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("click", function () {
    init();
})

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;
    init();

})

function Ball(x, y, dx, dy, radius = 30, color = "blue") {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = color;
        c.fill();
    }

    this.update = function () {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * fraction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx >= canvas.width ||
            this.x - this.radius <= 0) { // hit the boundry change direction
            this.dx = -this.dx * fraction ** 2;
        }

        if (parseInt(this.y + this.radius) === parseInt(canvas.height)) {
            this.dx = this.dx * .85
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}


var x = Math.random() * window.innerWidth;
var y = Math.random() * window.innerHeight;
var dy = (Math.random() - .5) * 8;
var dx = (Math.random() - .5) * 8;
var radius = 30;


var colorArr = [
    "#8F797E",
    "#FFC2B5",
    "#FFE3CC",
    "#646C8F",
    "#DCC3A1"
]; // kuler

var cnt = 50;
var ball;
var ballArry;


function init() {
    ballArry = [];
    for (var i = 0; i < cnt; i++) {
        var radius = Math.floor(Math.random() * 20 + 10)
        var x = canvas.width * Math.random();
        if (x < radius) { // do not stuck into the boundry
            x = radius;
        } else if (x + radius >= canvas.width) {
            x = canvas.width - radius;
        }
        ballArry.push(
            new Ball(
                x,
                canvas.height / 2 - Math.random() * canvas.height / 2,
                dx = Math.random() * 10 - 5,
                dy = radius * 0.1,//Math.random() * 2 - 1,
                radius,
                colorArr[Math.floor(Math.random() * colorArr.length)]
            )
        )
    }
}

init();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = '#fff';
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < cnt; i++) {
        ballArry[i].update();
    }
}
animate();









