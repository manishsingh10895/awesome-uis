type Options = {
    axis?: "x" | "y" | null,
    max: number,
    perspective: number,
    fullPage?: boolean;
    easing: string,
    speed: number,
}

type TiltElement = HTMLElement & { tilt: Tilt };

let defaultOptions: Options = {
    max: 15,
    perspective: 1000,
    speed: 300,
    easing: "cubic-bezier(.03,.98,.52,.99)",
}

class Tilt {

    width: number;
    height: number;
    clientWidth: number;
    clientHeight: number;
    left: number;
    top: number;
    fullPageListing: boolean;

    transitionTimeout: number;
    event: MouseEvent;
    updateCall: any;
    updateBind: any;
    element: HTMLElement;

    options: Options;

    constructor(element, options: Options = defaultOptions) {
        if (!(element instanceof Node)) {
            throw ("Error as ");
        }

        this.options = this._makeOptions(options);
        this.fullPageListing = Tilt.isTrueOption("fullPageListing");
        this.updateBind = this.update.bind(this);
    }

    static isTrueOption(setting: any) {
        return setting === "" || setting === true || setting === 1;
    }

    update() {
        let values = this._getPositionValues();

        this.element.style.transform = `perspectinve(${this.options.perspective}px) 
        rotateX(${values.tiltY}deg)
        rotateY(${values.tiltX}deg)
        `;

        this.element.dispatchEvent(new CustomEvent("tiltChange", {
            detail: values
        }));

        this.updateCall = null;
    }

    private _getPositionValues() {
        let x, y;
        if (this.fullPageListing) {
            x = this.event.clientX / this.clientWidth;
            y = this.event.clientY / this.clientHeight;
        }
        else {
            x = (this.event.clientX - this.left) / this.width;
            y = (this.event.clientY - this.top) / this.height;
        }

        x = Math.min(Math.max(x, 0), 1);
        y = Math.min(Math.max(y, 0, 1));

        let tiltX = (this.options.max - x * this.options.max * 2).toFixed(2);
        let tiltY = (y * this.options.max * 2 - this.options.max).toFixed(2);
        let angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);

        return {
            tiltX,
            tiltY,
            percentageX: x * 100,
            percentageY: y * 100,
            angle
        };
    }

    onMouseEnter() {
        this.updateElementPosition();
        this.element.style.willChange = "transform";

        this.setTransition();
    }

    setTransition() {
        clearTimeout(this.transitionTimeout);

        this.element.style.transition = this.options.speed + "ms " + this.options.easing;

        this.transitionTimeout = setTimeout(() => {
            this.element.style.transition = "";
        }, this.options.speed);
    }

    updateElementPosition() {
        let rect = this.element.getBoundingClientRect();

        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;
        this.left = rect.left;
        this.top = rect.top;
    }

    onMouseMove(event: MouseEvent) {
        if (this.updateCall !== null) {
            cancelAnimationFrame(this.updateCall);
        }

        this.event = event;
        this.updateCall = requestAnimationFrame(this.updateBind);
    }

    private _makeOptions(options: Options) {
        let defaults: Options = defaultOptions;

        let newOptions = { ...defaults };

        for (let prop in defaults) {
            if (prop in options) {
                newOptions[prop] = options[prop];
            }
        }

        return newOptions;
    }

    updateClientSize() {
        this.clientWidth = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        this.clientHeight = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    }

    onWindowResize() {
        this.updateClientSize();
    }

    static init(elements: Node | NodeList, options: Options) {
        let els;
        if (elements instanceof Node) {
            els = [elements];
        }

        if (elements instanceof NodeList) {
            els = [].slice.call(elements);
        }

        if (!(els instanceof Array)) {
            return;
        }

        els.forEach((elem) => {
            if (!("tilt" in elem)) {
                elem.tilt = new Tilt(elem, options);
            }
        });
    }
}