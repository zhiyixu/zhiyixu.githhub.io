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

let mouseDown = false
window.addEventListener("mousedown", function () {
    mouseDown = true
})

window.addEventListener("mouseup", function () {
    mouseDown = false
})

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth - margin;
    canvas.height = window.innerHeight - margin;
})


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



class Partical {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.shadowColor = this.color
        if (mouseDown) {
            c.shadowBlur = 3
        } else {
            c.shadowBlur = 15
        }
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
    }

}


let particals = [];
let cnt = 300
const colorArr = [
    "rgb(234, 245, 162)",
    "rgb(138, 226, 240)",
    "rgb(231, 161, 161)",
    "rgb(35, 174, 238)"
]


function init() {
    for (let i = 0; i < cnt; i++) {
        const canvasWidth = canvas.width + 300;
        const canvasHeight = canvas.height + 300;
        const x = Math.random() * canvasWidth - canvasWidth / 2;
        const y = Math.random() * canvasHeight - canvasHeight / 2;
        const radius = Math.random()
        particals.push(
            new Partical(
                x,
                y,
                radius,
                colorArr[randomInt(0, colorArr.length)]
            )
        )
    }
}

let radians = 0
let alpha = 0.7
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = `rgba(0,0,0,${alpha})`
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.save()
    c.translate(canvas.width / 2, canvas.height / 2)
    c.rotate(radians)
    particals.forEach((partical) => {
        partical.update()
    })
    c.restore()
    radians += 0.0015
    if (mouseDown && alpha >= 0.05) {
        alpha -= 0.01
    } else if (!mouseDown && alpha < 0.7) {
        alpha += 0.001
    }
}

init();
animate();








