function run() {
    console.log("ON LOAD");
    const handleMouseMove = (e) => {
        console.log(e);
        const { currentTarget: target } = e;

        const rect = target.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    }

    document.querySelectorAll(".card")
        .forEach((card) => {
            console.log(card);
            const c = card as HTMLDivElement;
            c.onmousemove = e => handleMouseMove(e);
        })
}

run();