var canvas = document.querySelector("canvas");
var drow = document.querySelector("div.row")
const sizeRatio = 3 / 5;
canvas.width = drow.clientWidth;
canvas.height = drow.clientWidth * sizeRatio;

var c = canvas.getContext("2d");

var mouse = {
    x: 0,
    y: 0
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}




class Partical {
    constructor(x, y, radius, v) {
        this.x = x
        this.y = y
        this.radius = radius
        this.h = Math.random() * 360
        this.s = 50
        this.l = 0
        this.v = v
        this.alpha = 1
        this.minAlpha = 0.001
        this.maxRadius = 4
        this.ratio = 1.1
    }

    draw(color) {
        c.save()
        c.beginPath()
        c.globalAlpha = this.alpha
        c.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2,
            false
        )
        c.fillStyle = color
        c.fill()
        c.closePath()
        c.restore()
    }

    update() {
        this.v.x *= friction;
        this.v.y *= friction;
        this.v.y += gravity;
        this.x += this.v.x;
        this.y += this.v.y;
        this.alpha -= 0.006;
        this.radius = this.maxRadius + 1 - Math.log(1 + Math.pow(Math.E, this.maxRadius * this.alpha));
        this.l = Math.floor(10 + Math.cos(this.alpha) * 45);
        var color = `hsl(${this.h},${this.s}%,${this.l}%)`;
        if (this.alpha > this.minAlpha) {
            this.draw(color)
        }
    }

}


const gravity = 0.03
const friction = 0.99
var cnt = 300;
const power = 4;
let particals = [];
function init() {
    particals = []
}



function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0,0.05)"
    c.fillRect(0, 0, innerWidth, innerHeight);
    particals.forEach((partical, i) => {
        if (partical.alpha > partical.minAlpha) {
            partical.update()
        } else {
            particals.splice(i, 1)
        }
    })
}

init();
animate();

canvas.addEventListener("click", function (event) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;

    const angleIncrement = Math.PI * 2 / cnt;

    for (let i = 0; i < cnt; i++) {
        particals.push(
            new Partical(
                x = mouse.x,
                y = mouse.y,
                radius = 1,
                v = {
                    x: Math.cos(angleIncrement * i) * Math.random() * power,
                    y: Math.sin(angleIncrement * i) * Math.random() * power
                }
            )
        )
    }

})






