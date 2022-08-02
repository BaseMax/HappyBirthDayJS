// Elements
const canvas = document.querySelector(".birthday");

// Variables
let mouse = 0.5;
let happy = [];

// Const variables
const NUMBER_HAPPY = 350;
const COLORS = [
    [174, 61, 99],
    [219, 56, 83],
    [248, 182, 70],
    [85, 71, 106],
    [244, 92, 68]
];
const PI_2 = 2 * Math.PI;
const context = canvas.getContext("2d");

// Functions
const resizeWindow = () => {
    window.w = canvas.width = window.innerWidth;
    window.h = canvas.height = window.innerHeight;
};

const range = (a, b) => {
    return (b - a) * Math.random() + a;
};

const drawCircle = (x, y, r, style) => {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    return context.fill();
};

const requestAnimationFrame = (() => {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function(callback) {
             return window.setTimeout(callback, 16.6);
           };
})();

const step = () => {
    requestAnimationFrame(step);
    context.clearRect(0, 0, window.w, window.h);
    let results = [];
    for (let j = 0; j < happy.length; j++) results.push(happy[j].draw());
    return results;
};

// Class
class Particle {
    constructor() {
        this.rgb = `rgba(${COLORS[~~range(0, COLORS.length)].join(",")}`;
        this.r = ~~range(2, 6);
        this.r2 = 2 * this.r;
        this.replace();
    }

    replace() {
        this.opacity = 0;
        this.dop = 0.03 * range(1, 4);
        this.x = range(-this.r2, window.w - this.r2);
        this.y = range(-20, window.h - this.r2);
        this.xmax = window.w - this.r;
        this.ymax = window.h - this.r;
        this.vx = range(0, 2) + 8 * mouse - 5;
        this.vy = 0.7 * this.r + range(-1, 1);
    }

    draw() {
        var ref;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;
        if (this.opacity > 1) {
            this.opacity = 1;
            this.dop *= -1;
        }
        if (this.opacity < 0 || this.y > this.ymax) this.replace();
        if (!((0 < (ref = this.x) && ref < this.xmax))) this.x = (this.x + this.xmax) % this.xmax;
        return drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
    }
};

// Events
window.addEventListener("resize", resizeWindow, false);

window.addEventListener("load", () => {
    for (let i = 1, j = 1; (1 <= NUMBER_HAPPY ? j <= NUMBER_HAPPY : j >= NUMBER_HAPPY); i = 1 <= NUMBER_HAPPY ? ++j : --j) happy.push(new Particle());

    resizeWindow();
    step();
});

document.addEventListener("mousemove", (e) => {
    mouse = e.clientX / window.w;
});
