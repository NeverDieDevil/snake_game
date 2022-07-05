// 1. Na Canvasie [400/400]
// 2. Snake
// 3. Wejście w ściane nie zabija tylko przechodzi się na drugą stronę
// 4. Po zdobyciu 5 punktów pojawia się pierwszy bonus
// 5. Pierwszy bonus przyspiesza na określony czas
// 6. 10 punktów - kolejny bonus, spowalnia snake'a.
// 7. 15 punktów - kolejny bonus, zmniejsza snake'a.
// 8. 20 punktów - powiększa snake'a. Punky nie równają się długości.
// 9. Przegrana po wejściu w własne ciało.
// *10. 10 losowych wariantów gry (plansz)

let keyboardEvent = document.createEvent('KeyboardEvent');

const canvas = document.getElementById('canvas');

class Game {
  canvas;
  gameField;
  movingId;
  previouseKey;
  currentKey;
  score;
  food = {
    exist: false,
    pos: [],
  };
  constructor(canvas, snake) {
    this.canvas = canvas;
    this.gameField = this.canvas.getContext('2d');
    this.snake = snake;
    this.previouseKey = 39;
    this.gameField.fillStyle = 'white';
    this.moveSnake(keyboardEvent);
    this.food.exist = false;
    this.generateFood();
    this.score = 0;
  }

  generateFood() {
    if (this.food.exist === true) {
      console.log('generate food');
      return;
    } else {
      // console.log('generate food')
      this.food.exist = true;
      this.food.pos = [
        Math.floor(Math.random() * 40) * 10,
        Math.floor(Math.random() * 40) * 10,
      ];
      console.log(this.food.pos);
      this.gameField.fillRect(
        this.food.pos[0],
        this.food.pos[1],
        this.snake.width,
        this.snake.height
      );
    }
  }

  moveSnake(event) {
    if (this.movingId != undefined) {
      clearInterval(this.movingId);
    }
    if (
      this.previouseKey == event.keyCode - 2 ||
      this.previouseKey == event.keyCode + 2
    ) {
      this.currentKey = this.previouseKey;
    } else {
      this.currentKey = event.keyCode;
    }
    event.preventDefault();
    switch (this.currentKey) {
      case 37:
        this.direction = [-10, 0];
        break;
      case 38:
        this.direction = [0, -10];
        break;
      case 39:
        this.direction = [10, 0];
        break;
      case 40:
        this.direction = [0, 10];
        break;
      default:
        this.direction = [10, 0];
        break;
    }
    this.previouseKey = this.currentKey;
    this.movingId = setInterval(() => {
      this.updateSnakePos(this.direction);
    }, 200);
  }
  updateSnakePos(direction) {
    this.gameField.clearRect(
      this.snake.head[0],
      this.snake.head[1],
      this.snake.width,
      this.snake.height
    );
    this.snake.head[0] += direction[0];
    this.snake.head[1] += direction[1];
    if (this.snake.head[0] > this.canvas.width - 10) {
      this.snake.head[0] = 0;
    }
    if (this.snake.head[0] < 0) {
      this.snake.head[0] = 390;
    }
    if (this.snake.head[1] > this.canvas.height - 10) {
      this.snake.head[1] = 0;
    }
    if (this.snake.head[1] < 0) {
      this.snake.head[1] = 390;
    }
    this.gameField.fillRect(
      this.snake.head[0],
      this.snake.head[1],
      this.snake.width,
      this.snake.height
    );

    this.snake.length.forEach((element, id) => {
      if (id === 0) {
        this.gameField.clearRect(
          element[0],
          element[1],
          this.snake.width,
          this.snake.height
        );
        element[0] = this.snake.head[0] - direction[0];
        element[1] = this.snake.head[1] - direction[1];
        if (element[0] > this.canvas.width - 10) {
          element[0] = 0;
        }
        if (element[0] < 0) {
          element[0] = 390;
        }
        if (element[1] > this.canvas.height - 10) {
          element[1] = 0;
        }
        if (element[1] < 0) {
          element[1] = 390;
        }
        this.gameField.fillRect(
          element[0],
          element[1],
          this.snake.width,
          this.snake.height
        );
      }
      //rysowanie ogona
      else {
        this.gameField.clearRect(
          element[0],
          element[1],
          this.snake.width,
          this.snake.height
        );
        element[0] = this.snake.length[id - 1][0];
        element[1] = this.snake.length[id - 1][1];
        if (element[0] > this.canvas.width - 10) {
          element[0] = 0;
        }
        if (element[0] < 0) {
          element[0] = 390;
        }
        if (element[1] > this.canvas.height - 10) {
          element[1] = 0;
        }
        if (element[1] < 0) {
          element[1] = 390;
        }
        this.gameField.fillRect(
          element[0],
          element[1],
          this.snake.width,
          this.snake.height
        );
      }
    });
    if (
      this.snake.head[0] === this.food.pos[0] &&
      this.snake.head[1] === this.food.pos[1]
    ) {
      this.snake.length.push([this.food.pos[0], this.food.pos[1]]);
      console.log(this.snake.length);
      this.food.exist = false;
      this.generateFood();
      this.score += 1;
      console.log(this.score);
    }
  }
}

class Snake {
  head;
  width;
  height;
  length = [];
  speed;
  direction = [];
  constructor() {
    this.head = [10, 10];
    this.width = 10;
    this.height = 10;
    this.speed = 1;
    this.direction = [10, 0];
  }
}
const snake = new Snake();
const game = new Game(canvas, snake);

document.addEventListener('keydown', function (event) {
  if (event.repeat) return;
  game.moveSnake(event);
  // your magic code here
});
