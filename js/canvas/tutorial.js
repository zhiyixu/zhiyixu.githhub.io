var canvas = document.querySelector("canvas");
var drow = document.querySelector("div.row")
const sizeRatio = 3 / 5;
canvas.width = drow.clientWidth;
canvas.height = drow.clientWidth * sizeRatio;
var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 10;


canvas.addEventListener('mousemove', function (event) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();

})

function Circle(x, y, radius = 30, dx = 4, dy = 4, color = "blue") {
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
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        // mouse interacitity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}


var x = Math.random() * window.innerWidth;
var y = Math.random() * window.innerHeight;
var dy = (Math.random() - .5) * 8;
var dx = (Math.random() - .5) * 8;
var radius = 30;


var circleArr = [];
var colorArr = [
    "#8F797E",
    "#FFC2B5",
    "#FFE3CC",
    "#646C8F",
    "#DCC3A1",

]; // kuler

var circleArr = [];

var cnt = 500;
function init() {
    circleArr = [];
    for (var i = 0; i < cnt; i++) {
        circleArr.push(
            new Circle(
                x = Math.random() * (window.innerWidth - radius * 2) + radius,
                y = Math.random() * (window.innerHeight - radius * 2) + radius,
                radius = Math.random() * 10 + 1,
                dx = (Math.random() - .5) * 1,
                dy = (Math.random() - .5) * 1,
                color = colorArr[Math.floor(Math.random() * colorArr.length)]
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
        circleArr[i].update();
    }
}
animate();









