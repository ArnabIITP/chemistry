"use strict";

const { PI: π, E: e, sin, cos, pow, abs } = Math;
let c, ctx, W, H;
let paused = false, fc = 0, fid;
let r = 0, θ = 0, scf = 100; // Increased scale factor for better visibility
let x = 0, y = 0, tempx = 0, tempy = 0;

const setup = () => {
    c = document.getElementById("Canvas");
    ctx = c.getContext("2d");

    // Set initial canvas size
    setSize();

    window.onresize = setSize;

    // Info button alert
    document.getElementById("Info").onclick = () => alert(
        "Parametric Butterfly\n\nClick to pause/unpause, double-click to clear canvas."
    );

    // Click to pause/unpause
    c.onclick = () => {
        paused ? requestAnimationFrame(animate) : cancelAnimationFrame(fid);
        paused = !paused;
    };

    // Double-click to clear
    c.ondblclick = () => clearCanvas();

    requestAnimationFrame(animate);
};

// Adjust canvas size dynamically
const setSize = () => {
    W = window.innerWidth;
    H = window.innerHeight;
    c.width = W;
    c.height = H;
    clearCanvas(); // Clears canvas on resize to avoid distortion
};

// Clear the canvas
const clearCanvas = () => {
    ctx.clearRect(0, 0, W, H);
    fc = 0;
    θ = 0;
};

// Draw parametric butterfly curve
const animate = () => {
    ctx.fillStyle = ctx.strokeStyle = `rgb(
        ${abs(sin(fc / 360)) * 255},
        ${abs(sin(fc / 360 + π / 6)) * 255},
        ${abs(sin(fc / 360 - π / 6)) * 255}
    )`;

    ctx.save();
    ctx.translate(W / 2, H / 2);
    
    tempx = x;
    tempy = y;

    r = pow(e, sin(θ)) - 2 * cos(4 * θ) + pow(sin((2 * θ - π) / 24), 5);
    r *= scf;

    x = r * cos(θ);
    y = -r * sin(θ);

    if (fc > 0) { // Prevents the first undefined stroke
        drawLine(tempx, tempy, x, y);
    }

    ctx.restore();
    
    θ = fc / 60;
    fc++;
    
    fid = requestAnimationFrame(animate);
};

// Function to draw a line between two points
const drawLine = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};

// Run setup on page load
window.onload = setup;
