var margin = 0
var canvas = document.querySelector("canvas");
var drow = document.querySelector("div.row")
const sizeRatio = 3 / 5;
canvas.width = drow.clientWidth;
canvas.height = drow.clientWidth * sizeRatio;
var c = canvas.getContext("2d");

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

canvas.addEventListener("mousemove", function (event) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
})



function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function visualAble(partical) {

    return (partical.x < 0 ||
        partical.y < 0) || (
            partical.x > canvas.width ||
            partical.y > canvas.height)
}

class Partical {
    constructor(x, y, radius, color, v) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.v = v
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.x += this.v.x;
        this.y += this.v.y
    }

}


let particals = [];
let cnt = 25



function generateRing() {
    setTimeout(generateRing, 500)
    const color = `hsl(${Math.random() * 100 + 140},50%,50%)`
    for (let i = 0; i < cnt; i++) {
        const x = mouse.x;
        const y = mouse.y;
        particals.push(
            new Partical(
                x,
                y,
                5,
                color,
                {
                    x: Math.cos(Math.PI * 2 / cnt * i) * 2,
                    y: Math.sin(Math.PI * 2 / cnt * i) * 2
                }
            )
        )
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0,0.35)"
    c.fillRect(0, 0, canvas.width, canvas.height);
    particals.forEach((partical, i) => {
        if (visualAble(partical)) {
            particals.splice(i, 1)
        } else {
            partical.update()
        }
    })

}

generateRing();
animate();








