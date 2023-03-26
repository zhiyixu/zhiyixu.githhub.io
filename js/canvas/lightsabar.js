import gsap from "/js/gsap/gsap-core.js";
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

const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

let angle = 0
window.addEventListener("mousemove", function (event) {
    gsap.to(mouse,
        {
            x: event.clientX - canvas.width / 2,
            y: event.clientY - canvas.height / 2,
            duration: 1
        })
    angle = Math.atan2(mouse.y, mouse.x)
})

window.addEventListener("click", function () {
    // init();
})

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth - margin;
    canvas.height = window.innerHeight - margin;
    // init();

})




function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


class Partical {
    constructor(x, y, radius, color, i) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.distanceFromCenter = i
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update(timer) {
        this.draw()
        this.x =
            center.x +
            this.distanceFromCenter *
            Math.cos(-angle) *
            Math.sin(timer + this.distanceFromCenter) *
            Math.cos(timer + this.distanceFromCenter)
        this.y = center.y +
            this.distanceFromCenter *
            Math.sin(-angle) *
            Math.cos(timer + this.distanceFromCenter) *
            Math.sin(timer)
    }

}


let particals;
let cnt = 400

function init() {
    particals = []

    const hueIncriment = 360 / cnt

    for (let i = 0; i < cnt; i++) {
        const x = canvas.width / 2 + i * Math.cos(Math.PI)
        const y = canvas.height / 2 + i * Math.cos(-Math.PI)
        particals.push(
            new Partical(
                x,
                y,
                5,
                `hsl(${hueIncriment * i},50%,50%)`,
                i
            )
        )
    }
}
let timer = 0
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0,0.05)"
    c.fillRect(0, 0, canvas.width, canvas.height);
    particals.forEach(partical => {
        partical.update(timer)
    })
    timer += 0.001
}
init();
animate();









