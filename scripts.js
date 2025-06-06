// REGISTER PLUGINS - - - REGISTER PLUGINS - - - REGISTER PLUGINS - - - REGISTER PLUGINS - - -
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText)
// REGISTER PLUGINS - - - REGISTER PLUGINS - - - REGISTER PLUGINS - - - REGISTER PLUGINS - - -


// AIRPODS ANIMATION - - - AIRPODS ANIMATION - - - AIRPODS ANIMATION - - - AIRPODS ANIMATION 

const canvas = document.getElementById("hero");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const TOTAL_FRAMES = 65;
const createURL = (frame) => {
    const id = frame.toString().padStart(4, "0");
    return `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/large/${id}.png`;
};

const images = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const img = new Image();
    img.src = createURL(i);
    return img;
});

const airpods = { frame: 0 };

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images[airpods.frame], 0, 0);
}

// AIRPODS ANIMATION - - - AIRPODS ANIMATION - - - AIRPODS ANIMATION - - - AIRPODS ANIMATION 

images[0].onload = () => render();

// apenas arranca
const appearTl = gsap.timeline()

appearTl
    .fromTo("#hero",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.5 })
    .fromTo(".title",
        { autoAlpha: 0, scale: 0.9 },
        { autoAlpha: 1 })
    .to(".title",
        { scale: 1 })
    .to("#hero",
        { scale: 1 }, "<")



// timeline
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
    }
});

const splitText = new SplitText(".first-p", {
    type: "lines"
});

tl
    .to(airpods, {
        frame: TOTAL_FRAMES - 1,
        ease: "none",
        snap: "frame",
        onUpdate: render
    })
    .from(".second-header", {
        y: 40,
        backgroundColor: "black",
        borderBottom: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "+=100",
            scrub: true,
        }
    }, "<")
    .to(".second-header-container", {
        borderBottom: "none"
    }, "<")
    .to(".title", {
        scale: 1.2,
        autoAlpha: 0
    })
    .fromTo(".second-title",
        { scale: 0.9, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1 }
    )
    .to(".second-title", {
        autoAlpha: 0
    })
    .from(".video", {
        autoAlpha: 0
    }, "-=0.2")
    .fromTo(splitText.lines,
        { autoAlpha: 0 },
        {
            autoAlpha: 1,
            duration: 2,
            y: 100,
            stagger: 0.2,
        }, "+=0.4")
    .to(".first-p", {
        autoAlpha: 0,
        y: "-100"
    })
    .to(".video", {
        autoAlpha: 0
    }, "<")
    .fromTo(".audio-performance",
        { autoAlpha: 0, scale: 0.9 },
        { autoAlpha: 1, ease: "power2.out" },
        "+=0.2"
    );



// NO GSAP - - - NO GSAP - - - NO GSAP - - - NO GSAP - - - 
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};


const ul = document.getElementById("list-white");
const items = ul.getElementsByTagName("li");

function onHandleClick(elem, siblings) {
    elem.addEventListener("click", () => {
        if (elem.className.includes("active")) {
            return;
        }
        Array.from(siblings).forEach((sibling) => {
            if (sibling !== elem) {
                sibling.className = "li";
            }
        });
        elem.className = "li active";
    });
}

Array.from(items).forEach(element => {
    onHandleClick(element, items);
});
