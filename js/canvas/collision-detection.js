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

var gravity = .5; // move this far than last farme
var fraction = .7; // keep % of energy ench bounding

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("click", function () {
    init();
})

window.addEventListener("resize", function () {
    canvas.width = drow.clientWidth;
    canvas.height = drow.clientWidth * sizeRatio;
    init();

})


function destance(x1, y1, x2, y2) {
    let xDistance = x1 - x2;
    let yDistance = y1 - y2;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function resolveCollision(p1, p2) {

    m1 = p1.mess
    m2 = p2.mess

    p1vx = (m1 - m2) / (m1 + m2) * (p1.v.x) + (2 * m2) / (m1 + m2) * (p2.v.x)
    p1vy = (m1 - m2) / (m1 + m2) * (p1.v.y) + (2 * m2) / (m1 + m2) * (p2.v.y)

    p2vx = (2 * m1) / (m1 + m2) * (p1.v.x) + (m2 - m1) / (m1 + m2) * (p2.v.x)
    p2vy = (2 * m1) / (m1 + m2) * (p1.v.y) + (m2 - m1) / (m1 + m2) * (p2.v.y)

    p1.v.x = p1vx;
    p1.v.y = p1vy;
    p2.v.x = p2vx;
    p2.v.y = p2vy;

    // if they collision next frame, change the direction
    let p1x = p1.x + p1.v.x;
    let p1y = p1.y + p1.v.y;
    let p2x = p2.x + p2.v.x;
    let p2y = p2.y + p2.v.y;

    if (Math.sqrt((p1x - p2x) ** 2 + (p1y - p2y) ** 2) < (p1.radius + p2.radius)) {
        let angle = 0;
        if (p1.x != p2.x) {
            angle = Math.atan((p1.y - p2.y) / (p1.x - p2.x));
        }
        let v = Math.sqrt(p1.v.x ** 2 + p1.v.y ** 2)

        p1.v.x = v * Math.cos(angle) * (p1.x > p2.x ? 1 : -1);
        p1.v.y = v * Math.sin(angle) * (p1.y > p2.y ? 1 : -1);

        v = Math.sqrt(p2.v.x ** 2 + p2.v.y ** 2)

        p2.v.x = v * Math.cos(angle) * (p2.x > p1.x ? 1 : -1);
        p2.v.y = v * Math.sin(angle) * (p2.y > p1.y ? 1 : -1);
    }
    if (Math.abs(p1.m * Math.sqrt(p1.v.x ** 2 + p1.v.y ** 2)) > Math.abs(p2.m * Math.sqrt(p2.v.x ** 2 + p2.v.y ** 2))) {
        p2.color = p1.color;
    } else {
        p1.color = p2.color;
    }
}


function Particle(x, y, radius = 30, color = "blue") {
    this.x = x;
    this.y = y;
    this.v = {
        x: (Math.random() - .5) * 2,
        y: (Math.random() - .5) * 2
    }
    this.radius = radius;
    this.color = color;
    this.mess = Math.ceil(this.radius * .1);
    this.opacity = 0.02;
    this.mouseRadius = 150;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save()
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
    }

    this.update = particles => {
        this.draw();
        for (var i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue;
            if (destance(this.x, this.y, particles[i].x, particles[i].y) <= (this.radius + particles[i].radius)) {
                resolveCollision(this, particles[i]);
            }
        }

        if (this.x + this.radius + this.v.x > canvas.width ||
            this.x - this.radius <= 0) {
            this.v.x *= -1
        }

        if (this.y + this.radius + this.v.y > canvas.height ||
            this.y - this.radius <= 0) {
            this.v.y *= -1
        }

        // mouse part
        if (destance(this.x, this.y, mouse.x, mouse.y) <= this.mouseRadius && this.opacity <= 0.35) {
            this.opacity += 0.02;

        } else if (this.opacity > 0) {
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity)
        } else { }

        this.x += this.v.x;
        this.y += this.v.y;
    }

}


var x = Math.random() * canvas.width;
var y = Math.random() * canvas.height;
var dy = (Math.random() - .5) * 8;
var dx = (Math.random() - .5) * 8;
var radius = 30;


var colorArr = [
    "#F291A3",
    "#C4F2EE",
    "#728C8A",
    "#84676a",
    "#0D0D0D"
]; // kuler

var cnt = 80;
var ball;
var ballArry;

let particles = [];

function init() {
    particles = [];
    for (var i = 0; i < cnt; i++) {
        const radius = randomInt(10, 30);
        let color = colorArr[randomInt(0, colorArr.length)];
        let x = randomInt(radius, canvas.width - radius);
        let y = randomInt(radius, canvas.height - radius);
        if (i !== 0) { // skip the first one
            for (var j = 0; j < particles.length; j++) {
                if (destance(x, y, particles[j].x, particles[j].y) <= (radius + particles[j].radius)) {
                    x = randomInt(radius, canvas.width - radius);
                    y = randomInt(radius, canvas.height - radius);
                    j = -1;
                }

            }
        }
        particles.push(
            new Particle(
                x, y, radius, color
            )
        )
    }
}
init();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = '#fff';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => { particle.update(particles) })
}
animate();









