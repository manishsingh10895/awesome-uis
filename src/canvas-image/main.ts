import { imageData } from './image';
import './style.css';

const myImage = new Image();

myImage.src = imageData;

const canvas: HTMLCanvasElement = document.querySelector('#canvas1') as HTMLCanvasElement;

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = 500;
canvas.height = 700;

myImage.addEventListener('load', () => {
    ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);

    //Returns image data from canvas
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    /// pixels.data contains array grouped by 4 elements representing RGBA values individually 
    ///Total number of elements are imageWidth * imageHeight * 4

    console.log(pixels);

    let mappedImage: number[][][] = [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y++) {
        let row: number[][] = [];

        for (let x = 0; x < canvas.width; x++) {
            let pixelRedIndex = (y * 4 * pixels.width) + (x * 4);
            const red = pixels.data[pixelRedIndex]; //0, 4, 8, 12, ......
            const green = pixels.data[pixelRedIndex + 1] // 1, 5, 9, 13
            const blue = pixels.data[pixelRedIndex + 2]; // 2,6,10, 14
            const alpha = pixels.data[pixelRedIndex + 3];//3, 7, 11, 15

            const brightness = calculateRelativeBrightness(red, green, blue);

            const cell = [
                brightness,
                red,
                green,
                blue
            ]

            row.push(cell);
        }

        mappedImage.push(row);
    }

    console.log(mappedImage);

    /**
     * Human eye doesn't perceive brightness of R,G,B colors the same 
     * To normalize the brightness this function is used
     * @param red 
     * @param green 
     * @param blue 
     * @returns 
     */
    function calculateRelativeBrightness(red, green, blue) {
        return Math.sqrt(
            (red * red * 0.299) +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        ) / 100;
    }

    let particles: Particle[] = [];

    const numberParticles = 5000;

    class Particle {
        x: number;
        y: number;
        speed: number;
        velocity: number;
        size: number;
        positionY: number;
        positionX: number;
        constructor() {
            this.x = Math.random() * canvas.width; // horizonal random start
            this.y = 0; //start from top
            this.speed = 0; // initial speed 0
            //Parcticle will fall throght black areas faster
            this.velocity = Math.random() * 0.5; //randomness to random particles to create better fall effect
            ///Random size between 1 and 2.5 pixels
            this.size = Math.random() * 1.5 + 1;

            //Round down x, and y to make sure positionX and Y don't have decimal 
            this.positionX = Math.floor(this.x);
            this.positionY = Math.floor(this.y);
        }

        update() {
            this.positionY = Math.floor(this.y);
            this.positionX = Math.floor(this.x);

            this.speed = mappedImage[this.positionY][this.positionX][0]; //Speed based on cell brightness

            ///2.5 is the maximum speed
            let movement = (2.5 - this.speed) + this.velocity;

            this.y += movement;

            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            //Draw a circle for each particle
            let [brightness, r, g, b] = mappedImage[this.positionY][this.positionX];
            ctx.beginPath();
            // ctx.fillStyle = 'white';
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    init();
    //Initalize canvas with particles 
    function init() {
        for (let i = 0; i < numberParticles; i++) {
            particles.push(new Particle());
        }
    }

    ///Animation loop
    function animate() {
        // ctx.drawImage(myImage, 0, 0, canvas.width, canvas.height);

        //Draw simple slightly transparent black rectangle over image
        //This will give particle fading trails
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgb(0,0,0)';

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = 0.06;

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            ctx.globalAlpha = particles[i].speed * 0.5;
            particles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    animate();
})
