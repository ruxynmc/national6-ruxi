console.log("My Online CV");

const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

const buttons = document.getElementsByClassName("header-nav-button");

for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", buttonClick);
}


function buttonClick() {
    const selectedButton = document.querySelector(".button--selected");
    if(this !== selectedButton) {
        selectedButton.classList.remove("button--selected");
        this.classList.add("button--selected");

        const selectedPage = document.querySelector(".page--selected");
        selectedPage.classList.remove("page--selected");

        const indexButton = getButtonIndex(this);

        const pages = document.getElementsByClassName("main-page");
        pages[indexButton].classList.add("page--selected")
    }
}

function getButtonIndex(clickedButton) {
    const buttons = document.getElementsByClassName("header-nav-button");
    for(let i = 0; i < buttons.length; i++) {
        const button = buttons[i];

        if(clickedButton === button) {
            return i;
        }
    }
}

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if(this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 300;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        if(!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}


document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);
}