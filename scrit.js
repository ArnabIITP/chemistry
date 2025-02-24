"use strict";
const { PI: π, E: e, sin, cos, pow, abs } = Math;
let c, ctx, W, H;
let paused = false, fc = 0, fid = 0;
let r = 0, θ = 0, scf = 30; // Scale factor
let x = 0, y = 0, tempx = 0, tempy = 0;

const setup = () => {
    c = document.getElementById("Canvas");
    ctx = c.getContext("2d");
    [W, H] = setSize(c, ctx);
    window.onresize = () => [W, H] = setSize(c, ctx);
    document.getElementById("Info").onclick = () => alert("Parametric Butterfly\n\nClick to pause/unpause, double-click to clear canvas.");
    c.onclick = () => (paused ? window.requestAnimationFrame(animate) : window.cancelAnimationFrame(fid), paused = !paused);
    c.ondblclick = () => clear(ctx);
    window.requestAnimationFrame(animate);
};

const animate = () => {
    ctx.fillStyle = ctx.strokeStyle = `rgb(${abs(sin(fc/360)) * 255}, ${abs(sin(fc/360 + π/6)) * 255}, ${abs(sin(fc/360 - π/6)) * 255})`;
    ctx.save();
    ctx.translate(W / 2, H / 2);
    tempx = x; tempy = y;
    r = pow(e, sin(θ)) - 2 * cos(4 * θ) + pow(sin((2 * θ - π) / 24), 5);
    r *= scf;
    x = r * cos(θ);
    y = -r * sin(θ);
    line(ctx, x, y, tempx, tempy);
    ctx.restore();
    θ = fc / 60;
    fc++;
    fid = window.requestAnimationFrame(animate);
};

window.onload = setup;
