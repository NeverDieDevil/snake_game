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

const canvas = document.getElementById('canvas');

class Game {
  canvas;
  gameField;
  constructor(canvas, snake) {
    this.canvas = canvas;
    this.gameField = this.canvas.getContext('2d');
    this.snake = snake;
    this.gameField.fillStyle = 'white';
    this.updateSnakePos([0, 0]);
  }
  moveSnake(event) {
    clearInterval(idInterval);
    let previousKey = 28;
    let idInterval =setInterval(function(){
      console.log(this);
      if(!previousKey === event.keyCode){
        previousKey = event.keyCode;
      } 
      switch (previousKey) {
        case 37:
          console.log(event.keyCode);
          this.updateSnakePos([-10, 0]);
          break;
        case 38:
          console.log(event.keyCode);
          this.updateSnakePos([0, -10]);
          break;
        case 39:
          console.log(event.keyCode);
          this.updateSnakePos([10, 0]);
          break;
        case 40:
          console.log(event.keyCode);
          this.updateSnakePos([0, 10]);
          break;
      } 
    }.bind(this), 1000)
  }

  updateSnakePos(direction) {
    this.gameField.clearRect(
      this.snake.posX,
      this.snake.posY,
      this.snake.width,
      this.snake.height
    );
    this.snake.posX += direction[0];
    this.snake.posY += direction[1];
    this.gameField.fillRect(
      this.snake.posX,
      this.snake.posY,
      this.snake.width,
      this.snake.height
    );
  }
}

class Snake {
  posX;
  posY;
  width;
  height;
  lenght = [];
  speed;
  constructor() {
    this.posX = 10;
    this.posY = 10;
    this.width = 10;
    this.height = 10;
    this.speed = 1;
  }
}
const snake = new Snake();
const game = new Game(canvas, snake);

document.addEventListener('keydown', (event) => game.moveSnake(event));
