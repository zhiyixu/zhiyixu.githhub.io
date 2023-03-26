
var dlt = 0;
var canvas = document.querySelector("canvas");
var drow = document.querySelector("div.row")
const sizeRatio = 3 / 5;
canvas.width = drow.clientWidth;
canvas.height = drow.clientWidth * sizeRatio;
var c = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();

var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

var gui = new dat.GUI();
gui.domElement.style.position = "absolute";
gui.domElement.style.top = canvas.offsetTop + scrollTop + rect.top + "px";
gui.domElement.style.left = canvas.offsetLeft + scrollLeft + rect.left + "px";

window.onscroll = function () {
    gui.domElement.style.top = canvas.offsetTop + scrollTop + rect.top + "px";
    gui.domElement.style.left = canvas.offsetLeft + scrollLeft + rect.left + "px";
};




var backGroundColor = {
    r: 0,
    g: 0,
    b: 0,
    a: 0.01
}

var wave = {
    y: canvas.height / 2,
    length: 0.01,
    amplitude: 300,
    frequency: 0.01
}

var strokeColor = {
    h: 200,
    s: 50,
    l: 50
}

const waveFolder = gui.addFolder("wave");
waveFolder.add(wave, 'y', 0, canvas.height);
waveFolder.add(wave, 'length', -.01, 0.1);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'frequency', -0.01, 1);
waveFolder.open();

const strokeColorFolder = gui.addFolder("stroke");
strokeColorFolder.add(strokeColor, 'h', 0, 255);
strokeColorFolder.add(strokeColor, 's', 0, 100);
strokeColorFolder.add(strokeColor, 'l', 0, 100);
strokeColorFolder.open();

const backGroundFolder = gui.addFolder("backColor");
backGroundFolder.add(backGroundColor, 'r', 0, 255);
backGroundFolder.add(backGroundColor, 'g', 0, 255);
backGroundFolder.add(backGroundColor, 'b', 0, 255);
backGroundFolder.add(backGroundColor, 'a', 0, 1);
backGroundFolder.open();


let increment = wave.frequency;

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = `rgba(${backGroundColor.r}, ${backGroundColor.g}, ${backGroundColor.b}, ${backGroundColor.a})`;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.moveTo(0, canvas.height / 2);

    for (let i = 0; i < canvas.width; i++) {
        c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
    }
    c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))},${strokeColor.s}%,${strokeColor.l}%)`
    c.stroke();
    increment += wave.frequency;
}
animate();


