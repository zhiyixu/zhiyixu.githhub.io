var canvas = document.querySelector("canvas");
var drow = document.querySelector("div.row")
const sizeRatio = 3 / 5;
canvas.width = drow.clientWidth;
canvas.height = drow.clientWidth * sizeRatio;
var c = canvas.getContext("2d");

var canvasRect = canvas.getBoundingClientRect()

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 10;

var gravity = .5; // move this far than last farme
var fraction = .7; // keep % of energy ench bounding

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("click", function () {
    init();
})

// window.addEventListener("resize", function () {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     init();

// })


function getDestance(x1, y1, x2, y2) {
    let xDistance = x1 - x2;
    let yDistance = y1 - y2;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Partical(x, y, radius = 30, color = "blue") {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = .05;
    this.distanceFromCenter = randomInt(80, 150);
    this.lastMouse = {
        x: this.x,
        y: this.y
    }


    this.update = function () {
        const lastPoint = {
            x: this.x,
            y: this.y
        }
        this.radians += this.velocity;

        // mouse movient effect

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * .05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * .05;

        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    }

    this.draw = function (lastPoint) {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }

}


var x = Math.random() * canvas.width;
var y = Math.random() * canvas.height;
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

var cnt = 80;
var partical;
var particals = [];

function init() {
    particals = [];
    for (let i = 0; i < cnt; i++) {
        const _radius = (Math.random() * 3) + 1;
        particals.push(
            new Partical(mouse.x, mouse.y, radius = _radius,
                color = colorArr[randomInt(0, colorArr.length)])
        );
    }
}

init();

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(255,255,255,.05)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    particals.forEach(partical => {
        partical.update();
    })
}
animate();






