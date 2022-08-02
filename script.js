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
