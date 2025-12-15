window.addEventListener("DOMContentLoaded", () => {
    // original spawning script, but i didnt like how they overlap with each other so i changed it
    // not using this

    const clouds = document.querySelectorAll('.clouds');
    const stars = document.querySelectorAll('.stars');

    const cloudbutt = document.querySelector('.cloud-button');
    const starbutt = document.querySelector('.star-button');

    if (clouds != null) {
        clouds.forEach(cloud => {
            const randomMargin = Math.floor(Math.random() * (innerWidth - 100));
            console.log("Random margin:", randomMargin);

            const randomMarginH = Math.floor(Math.random() * (innerHeight - 150));
            console.log("Random margin:", randomMarginH);

            cloud.style.marginTop = randomMarginH + "px";
            cloud.style.marginLeft = randomMargin + "px";
        });
    }

    if (stars != null) {
        stars.forEach(star => {
            const randomMargin = Math.floor(Math.random() * (innerWidth - 100));
            console.log("Random margin:", randomMargin);

            const randomMarginH = Math.floor(Math.random() * (innerHeight - 150));
            console.log("Random margin:", randomMarginH);

            star.style.marginTop = randomMarginH + "px";
            star.style.marginLeft = randomMargin + "px";
        });
    }

    if (cloudbutt && starbutt != null) {
        const randomMargin = Math.floor(Math.random() * (innerWidth - 100));
        console.log("Random margin:", randomMargin);

        const randomMarginH = Math.floor(Math.random() * (innerHeight - 150));
        console.log("Random margin:", randomMarginH);


        cloudbutt.style.marginTop = (randomMarginH - (cloudbutt.height / 3.5)) + "px";
        cloudbutt.style.marginLeft = (randomMargin - (cloudbutt.width / 2)) + "px";
        starbutt.style.marginTop = randomMarginH + "px";
        starbutt.style.marginLeft = randomMargin + "px";
    }
});

window.addEventListener("DOMContentLoaded", () => {
    // original source:
    // https://www.sololearn.com/en/Discuss/1896398/how-to-add-elements-in-html-at-random-positions-without-overlapping
    // https://www.sololearn.com/en/compiler-playground/Wd1nuGDLR8Nr/?ref=app

    // spawns an image, checks if it overlaps with anything in imgPoss list, if not, add it to body and list
    // spawns "goal" images until two are spawned, spawns clouds until hitting relative max, spawns fluff until relative max

    // wont do anything if on fourth (last) page
    if (window.location.href.endsWith('page-4.html')) return;

    // list of image positions
    const imgPoss = [];
    let maxX, maxY;
    // amt of each item i want, so i can tell it to move on after a certain amt
    const MAX_GOAL = 2;
    const MAX_CLOUDS = 15;
    const MAX_FLUFF = 50;

    function updateMax() {
        maxX = window.innerWidth - 10; // arbitrary buffer window border
        maxY = window.innerHeight - 10;
    }

    // mini star and cloud assets
    const imgs = [
        { src: '../images/star1.png', width: 15, height: 15 },
        { src: '../images/star2.png', width: 15, height: 15 },
        { src: '../images/star3.png', width: 15, height: 15 },
        { src: '../images/star4.png', width: 15, height: 15 },
        { src: '../images/star5.png', width: 15, height: 15 },
        { src: '../images/star6.png', width: 15, height: 15 },
        { src: '../images/cloud1.png', width: 12, height: 12 },
        { src: '../images/cloud2.png', width: 10, height: 12 },
    ];
    // cloud image placeholder
    const clouds = [
        { type: 'img', width: 150, height: 70, class: "cloud-button", id: "cloud-button" }
    ];
    // cloud and star placeholder assets
    const goals = [
        { type: 'img', width: 150, height: 70, class: "cloud-button", id: "cloud-button" },
        { type: 'img', width: 50, height: 50, class: "star-button", id: "star-button" }
    ]

    function placeImg() {
        if (imgPoss.length < MAX_GOAL) {
            console.log("spawning goal");
            console.log(imgPoss.length);
            const current = window.location.href;
            
            //taking the dimentions of cloud placeholder in list
            const goalWidth = goals[0].width;
            const goalHeight = goals[0].height;

            //generate spawn coords
            const r = Math.random;
            const x = r() * (maxX - (goals[0].width));
            const y = r() * (maxY - (goals[0].height));

            // isOverlap(x position, y position, cloud images width and height)
            // will stop and retry if it overlaps with anything
            if (isOverlap(x, y, goalWidth, goalHeight)) return;

            // using forEach to make sure it generates the cloud and the star
            goals.forEach(imgData => {
                // creates an image, appends to body, adds to list of positions
                const img = document.createElement('img');
                if (imgData.class) img.classList.add(imgData.class);
                if (imgData.id) img.id = imgData.id;

                // ngl the class r2d2 already have position = absolute
                // but the code came with these two so im keeping it i guess
                img.classList.add('r2d2');
                img.style.position = 'absolute';

                // chooses asset bsaed on which item in goals list, and what page is opened
                if (imgData == goals[0]) {
                    //random cloud
                    const i = Math.floor(Math.random() * 2);
                    if (i == 0) {
                        img.src = "../images/cloud-b.png";
                    } else if (i == 1) {
                        img.src = "../images/cloud-f.png";
                    }
                    img.style.left = `${x}px`;
                    img.style.top = `${y}px`;
                } else {
                    // star depending on page
                    if (current.endsWith('index.html')) {
                        img.src = "../images/star-p.png";
                    } else if (current.endsWith('page-2.html')) {
                        img.src = "../images/star-b.png";
                    } else if (current.endsWith('page-3.html')) {
                        img.src = "../images/star-g.png";
                    }
                    // make the star be centered to its cloud
                    img.style.left = `${x + (goals[0].width / 3)}px`;
                    img.style.top = `${y + (goals[0].height / 3.5)}px`;
                }
                img.style.width = `${imgData.width}px`;
                img.style.height = `${imgData.height}px`;

                document.body.appendChild(img);
                imgPoss.push({ x, y, width: imgData.width, height: imgData.height });
            });
        }
        // if the list of objects goes past 2, go onto spawning clouds
        else if (imgPoss.length >= MAX_GOAL && imgPoss.length < MAX_GOAL + MAX_CLOUDS) {
            console.log("spawning clouds");
            console.log(imgPoss.length);

            //random sprite picker
            const imgData = clouds[Math.floor(Math.random() * clouds.length)];

            const r = Math.random;
            const x = r() * (maxX + imgData.width) - imgData.width;
            const y = r() * (maxY + imgData.height) - imgData.height;

            if (!isOverlap(x, y, imgData.width, imgData.height)) {
                const img = document.createElement('img');
                if (imgData.class) img.classList.add(imgData.class);
                if (imgData.id) img.id = imgData.id;

                const i = Math.floor(Math.random() * 2);
                if (i == 0) {
                    img.src = "../images/cloud-b.png";
                } else if (i == 1) {
                    img.src = "../images/cloud-f.png";
                }

                img.classList.add('r2d2');
                img.style.position = 'absolute';
                img.style.left = `${x}px`;
                img.style.top = `${y}px`;
                img.style.width = `${imgData.width}px`;
                img.style.height = `${imgData.height}px`;

                document.body.appendChild(img);
                imgPoss.push({ x, y, width: imgData.width, height: imgData.height });
            }
        }
        // after reaching 2 + 15, spawn fluff
        else if (imgPoss.length >= MAX_GOAL + MAX_CLOUDS && imgPoss.length < MAX_GOAL + MAX_CLOUDS + MAX_FLUFF) {
            console.log("spawning fluff");
            console.log(imgPoss.length);
            if (imgPoss.length >= (MAX_GOAL + MAX_CLOUDS + MAX_FLUFF)) return;

            const imgData = imgs[Math.floor(Math.random() * imgs.length)];

            const r = Math.random;
            const x = r() * (maxX + imgData.width) - imgData.width;
            const y = r() * (maxY + imgData.height) - imgData.height;

            if (!isOverlap(x, y, imgData.width, imgData.height)) {
                const img = document.createElement('img');
                img.src = imgData.src;
                img.classList.add('r2d2');
                img.style.position = 'absolute';
                img.style.left = `${x}px`;
                img.style.top = `${y}px`;
                img.style.width = `${imgData.width}px`;
                img.style.height = `${imgData.height}px`;

                document.body.appendChild(img);
                imgPoss.push({ x, y, width: imgData.width, height: imgData.height });
            }
        }
    }

    function isOverlap(x, y, width, height) { // returns true if overlap
        // fake block in middle so that things dont spawn on top of middle text
        const BLOCK_W = 500;
        const BLOCK_H = 300;
        const block = {
            x: window.innerWidth / 2 - BLOCK_W / 2,
            y: window.innerHeight / 2 - BLOCK_H / 2,
            width: BLOCK_W,
            height: BLOCK_H
        };
        // check overlap with the middle text square
        if (
            x < block.x + block.width &&
            x + width > block.x &&
            y < block.y + block.height &&
            y + height > block.y
        )  return true;
        // check overlap with each item on the item list
        const img = { x: width, y: height };
        for (const imgPos of imgPoss) {
            if (
                x > imgPos.x - img.x && 
                x < imgPos.x + img.x &&
                y > imgPos.y - img.y && 
                y < imgPos.y + img.y
            ) return true;
        }
        // if it returns true, it means the new image is overlapping with old images
        // above will then generate a new coord and check for overlaps again until it spawns
        return false;
    }

    // places them on a 1milisec interval, while maintaining a border buffer
    onload = function () {
        updateMax();
        setInterval(placeImg, 1);
    }
    // when resizing page, i guess its supposed to update the border buffer? idk actually it was just there so im keeping it
    onresize = function () {
        updateMax();
    }
});

// on clicking a cloud, will add a class that makes it fade out
// when done, hide cloud so that u can click stuff underneath it
$(document).on("click", ".cloud-button", function () {
    const i = this;
    $(i).addClass('fade-out')
    i.addEventListener('animationend', () => {
        i.style.display = 'none';
    }, { once: true });
});

// on clicking a star, will redirect to new window based on current window
$(document).on("click", ".star-button", function () {
    const current = window.location.href;
    if (current.endsWith('index.html')) {
        console.log("directing to page 2")
        window.location.href = 'page-2.html';
    } else if (current.endsWith('page-2.html')) {
        console.log("directing to page 3")
        window.location.href = 'page-3.html';
    } else if (current.endsWith('page-3.html')) {
        console.log("directing to page 4")
        window.location.href = 'page-4.html';
    }
});

// on clicking the last page image, will bring u back to beginning
// i like bringing it loop
$(document).on("click", ".repeat", function () {
    const current = window.location.href;
    if (current.endsWith('page-4.html')) {
        console.log("directing to page 1")
        window.location.href = 'index.html';
    }
});
