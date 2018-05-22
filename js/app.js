//GLOBAL VARIABLES
let maxMonstersAmount = 3;
let playerTime = 60;

const boxSizeY = 83;
const boxSizeX = 101;

const canvasWidth = 808;
const canvasHeight = 560;

//randomNumber GENERATOR
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// ENEMIES PLAYERS MUST AVOID(class)
class Enemy {
  constructor(startPosition, speed, type = 'bug') {
    this.sprite = `images/enemy-bug.png`;
    this.startPosition = [startPosition[0] - 30, startPosition[1]];
    this.speed = speed;
    this.x = this.startPosition[0];
    this.y = this.startPosition[1];
  }

  // Update the enemy's position and time remaining, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x += this.speed * dt;
    if (this.x > 808) {
      this.x = this.startPosition[0];
      this.y = this.startPosition[1];
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
}

//PLAYER(class)
class Player {
  constructor(time) {
    this.time = time;
    this.sprite = `images/char-boy.png`;
    this.startPoint = [404, 560];
    [this.x, this.y] = this.startPoint;
  }

  //Players render
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

//Player can't move offscreen
move(x,y) {
  this.x += x;
  this.y += y;
  if (this.x >= canvasHeight
  || this.x <= -80
  || this.y >= canvasHeight
  || this.y <= -200) {
    this.x -= x;
    this.y -= y;
  }
}


  //Players control
  handleInput(key) {
    if (key === 'up') {
      this.move(0, -boxSizeY);
    } else if (key === 'down') {
      this.move(0, boxSizeY);
    } else if (key === 'left') {
      this.move(-boxSizeX, 0);
    } else if (key === 'right') {
      this.move(boxSizeX, 0);
    }
  }
}

//GENERATING ENEMIES
function generateEnemies(amount) {
  const enemiesCurrent = new Set();
  const enemyLanes = [1, 2, 3];
  for (let i = 0; i < amount; i++) {
    const startPointX = randomNumber(100, 300) * (-1);
    const startPointY = boxSizeY * enemyLanes[randomNumber(0, 3)] - 25;

    enemiesCurrent.add(new Enemy([startPointX, startPointY], randomNumber(100, 500)));
  }

  return enemiesCurrent;
}

//CREATING ENTITIES
const allEnemies = generateEnemies(6);
let player = new Player();

//Creating enemies until amount reaches maxMonstersAmount
const updateEnemies = setInterval(() => {
  if (allEnemies.size < maxMonstersAmount) {
    const enemiesUnit = generateEnemies(2);
    for (const enemy of enemiesUnit)
      allEnemies.add(enemy)
  }
  player.time -= 1;
}, 1000)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

document.querySelector('#start-game').addEventListener('click', function(e) {
  e.preventDefault();
  player = new Player(playerTime);
})
