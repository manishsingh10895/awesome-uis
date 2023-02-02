import { Flower } from "./flower";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const roots: Root[] = [];

let drawing = false;

ctx.lineWidth = 0.1;
ctx.globalCompositeOperation = 'source-over'

class Root {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    maxSize: number;
    size: number;

    angleX: number;
    angleY: number;
    vs: number; // velocity of size
    va: number; // velocity of angle
    vax: number; //velocity of angleX
    vay: number; //velocity of angleY

    lightness: number; // lightness 

    animationHandler: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;

        this.maxSize = Math.random() * 7 + 5;
        this.size = Math.random() * 1 + 2;
        this.vs = Math.random() * 0.2 + 0.05;


        this.angleX = Math.random() * 6.2;
        this.angleY = Math.random() * 6.2;

        this.vax = Math.random() * 0.6 - 0.3;
        this.vay = Math.random() * 0.6 - 0.3;
        this.lightness = 10;
    }

    stop() {
        cancelAnimationFrame(this.animationHandler);
    }

    update() {
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.vs;
        this.angleX += this.vax;
        this.angleY += this.vay;

        if (this.lightness < 70) this.lightness += 0.5;

        if (this.size < this.maxSize) {
            ctx?.beginPath();
            ctx?.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(140, 100%, ${this.lightness}%)`;
            ctx?.fill();
            ctx?.stroke();
            this.animationHandler = requestAnimationFrame(this.update.bind(this))
        } else {
            const flower = new Flower(this.x, this.y, this.size, ctx);
            flower.grow();
        }
    }
}

console.log('DONE');

function mouseMove(e) {
    if (drawing) {
        for (let x in [1, 2, 3]) {
            const root = new Root(e.x, e.y);

            root.update();

            roots.push(root);
        }
    }
}

window.addEventListener('mousemove', mouseMove);

window.addEventListener('mousedown', (e) => {
    drawing = true;

    for (let x in Array.from(Array(30))) {
        const root = new Root(e.x, e.y);

        root.update();

        roots.push(root);
    }

});

window.addEventListener('mouseup', () => {
    drawing = false;
});

window.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() == 'escape') {
        for (let i = 0; i < roots.length; i++) {
            roots[i].stop();
        }
    }

    window.removeEventListener('mousemove', mouseMove);
})
