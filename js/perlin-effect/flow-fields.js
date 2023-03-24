var num = 500
var noiseScale = 0.001
var bakAlpha = 0.15
var lastNum = num


// the canvas size

var thumb = document.querySelector("div.mb-4")

var cWidth = thumb.clientWidth;
var cHeight = thumb.clientHeight;

let particles = [];
let noiseArray = [];

window.addEventListener("dblclick", function () {
    noiseSeed(millis());
})


function particalInit(num) {
    particles = [];
    noiseArray = [];
    for (let i = 0; i < num; i++) {
        particles.push(createVector(random(width), random(height)));
    }
    stroke(255);
}

function setup() {
    createCanvas(cWidth, cHeight);
    var gui = createGui('Ctrls');
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
            p.x = random(width);
            p.y = random(height);
        }
    }
}


function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.x >= 0 && v.y <= height;
}

