import { GenerateBullet } from './generate_bullet.js';
import { Player } from './player.js';

export const mainScript = async () => {
  return new Promise((resolve) => {
    const canvas = document.getElementById('gameCanvas');
    const $currScore = document.getElementById('currScore');

    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // console.log(Player);

    const player = new Player({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      radius: 50,
      color: 'white',
      speed: 15,
      context,
    });
    const startTime = new Date();
    let elapsedTime = 0;
    const bullets = [];
    const intervals = [];

    const draw = () => {
      // 이전 그림 지우기
      context.clearRect(0, 0, canvas.width, canvas.height);
      // player 그리기
      player.Draw();

      bullets.map((el) => el.Draw());
      bullets.map((el) => el.Move());
    };

    const drawInterval = setInterval(draw, 10);
    const gerateBulletInterval = setInterval(
      () => GenerateBullet({ bullets, context, player }),
      500
    );
    const setScoreInterval = setInterval(() => {
      elapsedTime = new Date() - startTime;
      $currScore.innerText = `curr Score : ${(elapsedTime / 1000).toFixed(3)}`;
    }, 10);
    intervals.push(drawInterval, gerateBulletInterval, setScoreInterval);

    const gameOverAndReturnScore = () => {
      intervals.map((interval) => clearInterval(interval));
      window.removeEventListener('keydown', keyCheck, false);
      resolve(elapsedTime);
      // return;
    };

    // 방향키
    const keyCheck = (e) => {
      var code = e.keyCode;
      switch (code) {
        case 37: //Left key
          player.MoveLeft();
          break;
        case 38: //Up key
          player.MoveUp();
          break;
        case 39: //Right key
          player.MoveRight();
          break;
        case 40: //Down key
          player.MoveDown();
          break;
        case 32:
          // bomb
          console.log('spacebar pressed');
        case 13:
          console.log('enter pressed');
          gameOverAndReturnScore();
        default:
          break;
      }
    };
    window.addEventListener('keydown', keyCheck, false);
  });
};
