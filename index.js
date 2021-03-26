console.log("Spaceship Homework");

const spaceshipArray = ["blue-spaceship.png", "green-spaceship.png", "red-spaceship.png"];

class Spaceship {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    generateHtmlRef() {
        let randomSpaceship = spaceshipArray[Math.floor(Math.random() * spaceshipArray.length)];
        this.ref = document.createElement("img");
        this.ref.src = randomSpaceship;
        this.ref.style.width = "50px";
        this.ref.style.height = "50px";
        this.ref.style.display = "block";
        this.ref.style.marginTop = "15px";
        this.ref.style.marginLeft = "5px";
        document.body.appendChild(this.ref);
    }

    moveUp() {
        this.y -= 5;
        this.ref.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    moveDown() {
        this.y += 5;
        this.ref.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    moveLeft() {
        this.x -= 5;
        this.ref.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    moveRight() {
        this.x += 5;
        this.ref.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

let spaceship;
document.getElementById("generate-spaceship").addEventListener("click", () => {
    spaceship = new Spaceship();
    spaceship.generateHtmlRef();
});

let keyUpPress = false;
let keyDownPress = false;
let keyLeftPress = false;
let keyRightPress = false;

document.addEventListener('keydown', (event) => {
    if(event.key === "ArrowUp")     keyUpPress = true;
    if(keyUpPress) spaceship.moveUp();

    if(event.key === "ArrowDown")   keyDownPress = true;
    if(keyDownPress) spaceship.moveDown();

    if(event.key === "ArrowLeft")   keyLeftPress = true;
    if(keyLeftPress) spaceship.moveLeft();

    if(event.key === "ArrowRight")  keyRightPress = true;
    if(keyRightPress) spaceship.moveRight();
});

document.addEventListener("keyup", (event) => {
    if(event.key === "ArrowUp") {
        keyUpPress = false;
    }

    if(event.key === "ArrowDown") {
        keyDownPress = false;
    }

    if(event.key === "ArrowLeft") {
        keyLeftPress = false;
    }

    if(event.key === "ArrowRight") {
        keyRightPress = false;
    }
});