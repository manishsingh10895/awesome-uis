import './style.css'
import "./vanilla-tilt";
import VanillaTilt from './vanilla-tilt';

declare var window: any;

VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 25
});

document.body.onfullscreenchange = function () {
    const frame = document.querySelector("#frame");

    console.log("fullScreen");

    if (frame) {
        let _frame = frame;

        _frame.classList.toggle("fullframe");
    };
}

window.changeFullScreen = function () {
    document.body.requestFullscreen();
}

document.onload = function () {
    let body = document.body;

    body.onfullscreenchange = function () {
        const frame = document.querySelector("#frame");

        console.log("fullScreen");

        if (frame) {
            let _frame: HTMLElement = frame as HTMLElement;

            _frame.classList.toggle("fullframe");
        }
    }

    // let x = document.querySelector("frame");

    // x?.requestFullscreen();
}