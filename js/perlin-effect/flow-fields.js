var num = 1000
var noiseScale = 0.01
var bakAlpha = 0.15
var lastNum = num

var drow = document.querySelector("div.row")

const canvas = {
    width: drow.clientWidth,
    height: drow.clientWidth * 3 / 5
}

var canvasRect = undefined;
// the canvas size

let particles = [];
let noiseArray = [];

var mouse = {
    x: undefined,
    y: undefined
}


window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})


window.addEventListener("dblclick", function () {
    if (mouseIn(mouse)) {
        noiseSeed(millis());
    }
})


function particalInit(num) {
    particles = [];
    noiseArray = [];
    for (let i = 0; i < num; i++) {
        particles.push(createVector(random(canvas.width), random(canvas.height)));
    }
    stroke(255);
}

function setup() {
    createCanvas(canvas.width, canvas.height);
    const c = document.querySelector("canvas")
    canvasRect = c.getBoundingClientRect()
    var gui = createGui('Ctrls');
    gui.setPosition(canvasRect.left, canvasRect.top - 25);
    sliderRange(500, 1500, 50);
    gui.addGlobals('num');

    sliderRange(0.001, 0.05, 0.001);
    gui.addGlobals('noiseScale');

    sliderRange(0.01, 0.3, 0.01);
    gui.addGlobals('bakAlpha');
    particalInit(num);
}


function draw() {
    background(`rgba(73,104,96, ${bakAlpha})`);
    if (lastNum !== num) {
        particalInit(num);
        lastNum = num
    }
    for (let i = 0; i < num; i++) {
        let p = particles[i];
        point(p.x, p.y); // like update the position? 
        strokeWeight(1.5);
        let n = noise(p.x * noiseScale, p.y * noiseScale);
        let a = TAU * n;
        p.x += cos(a);
        p.y += sin(a);
        if (!onScreen(p)) {
            p.x = random(canvas.width);
            p.y = random(canvas.height);
        }
    }
}


function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.x >= 0 && v.y <= height;
}


function mouseIn(mouse) {
    return (
        (mouse.x > canvasRect.left && mouse.x < canvasRect.left + canvas.width) &&
        (mouse.y > canvasRect.top && mouse.y < canvasRect.top + canvas.height)
    )

}
