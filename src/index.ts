import './index.css';

console.log(import.meta);

console.log(import.meta["MODE"]);

type Page = {
    title: string,
    href: string,
    image: string,
    description: string,
    credit?: {
        name: string,
        href: string,
        platform?: string
    }
};

let pages: Page[] = [
    {
        title: "Tilt Card",
        description: "Ui cards that tilt on mouse hover based on mouse direction",
        href: 'tilt-card.html',
        image: "/tilt-card.png",
        credit: {
            name: "Online Tutorials",
            platform: "Youtube",
            href: "https://www.youtube.com/watch?v=hv0rNxr1XXk"
        }
    },
    {
        title: "Canvas Image Rain",
        href: "canvas-image.html",
        image: "/particle-rain.gif",
        description: "Particle Rain effect with canvas on an image",
        credit: {
            href: "https://www.youtube.com/channel/UCEqc149iR-ALYkGM6TG-7vQ",
            name: "Franks Labratory",
            platform: "Youtube"
        }
    }
];

pages = pages.map(p => ({
    ...p,
    image: "/awesome-uis/" + p.image
}))

document.body.onload = () => {
    let list = document.querySelector('#app .page-list');

    pages.forEach((p) => {
        let li = document.createElement('li');

        let card = document.createElement('div');
        card.classList.add('card');

        let img = document.createElement('img');
        img.src = p.image;

        let title = document.createElement('div');
        title.classList.add('title');
        title.innerHTML = p.title;

        let description = document.createElement('div');
        description.classList.add('description');
        description.innerHTML = p.description;

        let anchor = document.createElement('a');
        anchor.href = p.href;
        anchor.classList.add('anchor');
        anchor.innerHTML = "View";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(anchor);

        if (p.credit) {
            let creditContainer = document.createElement('div');
            creditContainer.classList.add("credit-container");

            let text = document.createTextNode('Credit goes to');

            creditContainer.appendChild(text);

            let name = document.createElement('span');
            name.classList.add('name');

            let link = document.createElement('a');
            link.href = p.credit.href;
            link.innerHTML = p.credit.name;
            link.classList.add('credit-link');

            creditContainer.appendChild(link);
            card.appendChild(creditContainer);
        }

        li.appendChild(card);

        list?.appendChild(li);
    });
}
console.log("asdasd");