import { checkPlayerHit } from './check_player_hit.js';
import { GenerateBullet } from './generate_bullet.js';
import { Player } from './player.js';

export const mainScript = async () => {
  return new Promise((resolve) => {
    const canvas = document.getElementById('gameCanvas');
    const $currScore = document.getElementById('currScore');
    const $bombCnt = document.getElementById('bombCnt');

    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const player = new Player({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      radius: 50,
      color: 'white',
      speed: 15,
      context,
    });
    $bombCnt.innerText = `💣`.repeat(player.GetBombCnt());

    const startTime = new Date();
    let elapsedTime = 0;
    const bullets = [];
    const intervals = [];

    const draw = () => {
      // 이전 그림 지우기
      context.clearRect(0, 0, canvas.width, canvas.height);
      // player, bullets 그리기
      // player Move는 별도
      player.DrawPlayer();
      bullets.map((el) => el.Draw());
      bullets.map((el) => el.Move());
    };

    const gameOverAndReturnScore = () => {
      intervals.map((interval) => clearInterval(interval));
      window.removeEventListener('keydown', keyCheck, false);
      resolve(elapsedTime);
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
    const checkPlayerHitInterval = setInterval(() => {
      const isPlayerHit = checkPlayerHit({ player, bullets });
      if (isPlayerHit) {
        gameOverAndReturnScore();
      }
    }, 10);
    intervals.push(
      drawInterval,
      gerateBulletInterval,
      setScoreInterval,
      checkPlayerHitInterval
    );

    // 방향키
    const keyCheck = (e) => {
      const code = e.keyCode;
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
        case 32: // Space Bar Key
          player.UseBomb();

          let cnts = bullets.map((bullet) => bullet.GetX(), bullet.GetY());

          $bombCnt.innerText = `💣`.repeat(player.GetBombCnt());
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', keyCheck, false);
  });
};
