export class Flower {
    x: number
    y: number
    size: number
    image: HTMLImageElement
    maxFlowerSize: number
    ctx: CanvasRenderingContext2D;

    frameSize: number
    frameY: number = Math.floor(Math.random() * 3);
    frameX: number = Math.floor(Math.random() * 3);

    willFlower = false;

    vs: number // velocity of size change
    angle: number = 0;
    va: number = Math.random() * 0.05 - 0.025;

    constructor(x, y, size, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vs = Math.random() * 0.3 + 0.2;

        this.maxFlowerSize = this.size + Math.random() * 80;
        this.image = new Image();
        this.image.src = 'flowers.png';
        this.frameSize = 100;
        this.ctx = ctx;
        if (this.size > 11.5) {
            this.willFlower = true;
        }
    }

    grow() {
        if (this.size < this.maxFlowerSize && this.willFlower == true) {
            console.log("GROW");
            this.size += this.vs;
            this.angle += this.va;

            this.ctx.save()
            this.ctx.translate(this.x, this.y);
            this.ctx.rotate(this.angle);
            this.ctx.drawImage(this.image, this.frameSize * this.frameX,
                this.frameSize * this.frameY, this.frameSize, this.frameSize,
                0 - this.size / 2, 0 - this.size / 2, this.size, this.size
            );
            this.ctx.restore()
            requestAnimationFrame(this.grow.bind(this));
        }

    }
}