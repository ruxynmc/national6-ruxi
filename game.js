console.log("OOP Game");

class GameObject {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.x = 0;
    this.y = 0;
    this.generateRef();
  }

  generateRef() {
    this.ref = document.createElement("div");
    this.ref.style.width = `${this.width}px`;
    this.ref.style.height = `${this.height}px`;
    this.ref.style.position = "absolute";
    this.ref.style.top = 0;
    this.ref.style.left = 0;

    document.getElementById("game-scene").appendChild(this.ref);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    this.ref.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  removeRef() {
    this.ref.remove();
  }
}

class Player extends GameObject {
  constructor() {
    super();
    this.ref.style.background = "blue";
    this.move(50, 225);
  }

  moveUp() {
    if (this.y - 25 >= 0) this.move(this.x, this.y - 25);
  }

  moveDown() {
    if (this.y + 25 <= 500 - this.height) this.move(this.x, this.y + 25);
  }
}

class Obstacle extends GameObject {
  constructor() {
    super();
    this.ref.style.background = "red";
    this.move(1060, 25);
  }

  moveLeft() {
    this.move(this.x - 5, this.y);
  }
}

class ObstacleFactory {
  constructor() {
    this.obstacles = [];
  }

  createObstacle() {
    const obstacle = new Obstacle();
    obstacle.move(1060, Math.floor(Math.random() * 450));
    this.obstacles.push(obstacle);
  }

  destroyObstacles() {
    this.obstacles = this.obstacles.filter((obstacle) => {
      if (obstacle.x < -50) {
        obstacle.removeRef();
        return false;
      }

      return true;
    });
  }

  moveObstacles() {
    for (const obstacle of this.obstacles) {
      obstacle.moveLeft();
    }
  }
}

class Lives {
  constructor() {
    this.numberOfLives = 3;
    this.arrayOfLives = [];
    this.renderLives();
  }

  renderLives() {
    for(let i = 0; i < this.numberOfLives; i++) {
      const life = document.createElement("img");
      life.src = "heart.png";
      life.style.width = "30px";
      life.style.height = "30px";
      this.arrayOfLives.push(life);
    }
    this.ref = document.createElement("div");
    this.ref.style.position = "absolute";
    this.ref.style.top = "40px";
    document.body.appendChild(this.ref);
    for(const life of this.arrayOfLives) {
      this.ref.appendChild(life);
    }
  }

  removeLives() {
    const life = this.arrayOfLives.pop();
    life.remove();
  }
}

/// --- User  input

let keyUpPress = false;
let keyDownPress = false;
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    keyUpPress = true;
  }

  if (event.key === "ArrowDown") {
    keyDownPress = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") {
    keyUpPress = false;
  }

  if (event.key === "ArrowDown") {
    keyDownPress = false;
  }
});

/// --- User  input

// -- Collision Detection

function collisionDetection(player, obstacles) {
  for (const obstacle of obstacles) {
    console.log(player.x, player.x + player.width, obstacle.x);

    if (
      (player.x <= obstacle.x &&
        obstacle.x <= player.x + player.width &&
        player.y <= obstacle.y &&
        obstacle.y <= player.y + player.height) ||
      (player.x <= obstacle.x + obstacle.width &&
        obstacle.x + obstacle.width <= player.x + player.width &&
        player.y <= obstacle.y + obstacle.height &&
        obstacle.y + obstacle.height <= player.y + player.height)
    )
      return true;
  }

  return false;
}

const player = new Player();
const obstacleFactory = new ObstacleFactory();
const lives = new Lives();

let count = 0;
// Game Loop
let gameLoop = setInterval(() => {
  console.log(keyUpPress);

  if (keyUpPress) player.moveUp();
  if (keyDownPress) player.moveDown();

  if (count % 10 === 0) obstacleFactory.createObstacle();

  obstacleFactory.moveObstacles();
  if(collisionDetection(player, obstacleFactory.obstacles) && lives.numberOfLives > 1) {
    lives.numberOfLives--;
    lives.removeLives();
  } else if(collisionDetection(player, obstacleFactory.obstacles) && lives.numberOfLives === 1) {
      clearInterval(gameLoop);
      alert("You lost!");
      window.location = "/";
    }

  obstacleFactory.destroyObstacles();
  count++;
}, 50);
