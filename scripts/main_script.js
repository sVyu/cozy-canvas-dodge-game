import { CheckHit } from './check_hit.js';
import { checkPlayerHitWithBullets } from './check_player_hit_with_bullets.js';
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
      bomb_cnt: 5,
      bomb_radius: 300,
    });
    $bombCnt.innerText = `💣`.repeat(player.GetBombCnt());

    const startTime = new Date();
    let elapsedTime = 0;
    let deletedBulletCntsWithBomb = 0;

    let bullets = [];
    const intervals = [];

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      player.DrawPlayer();
      bullets.map((bullet) => {
        bullet.Draw();
        bullet.Move();
      });
    };

    const getScore = () => elapsedTime / 1000 + deletedBulletCntsWithBomb;

    const gameOverAndReturnScore = () => {
      intervals.map((interval) => clearInterval(interval));
      window.removeEventListener('keydown', keyCheck, false);
      resolve(getScore());
    };

    const drawInterval = setInterval(draw, 10);
    const gerateBulletInterval = setInterval(
      () => GenerateBullet({ bullets, context, player }),
      500
    );

    const setScoreInterval = setInterval(() => {
      elapsedTime = new Date() - startTime;
      $currScore.innerText = `curr Score : ${getScore().toFixed(3)}`;
    }, 10);
    const checkPlayerHitInterval = setInterval(() => {
      const isPlayerHit = checkPlayerHitWithBullets({ player, bullets });
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
          if (player.GetBombCnt() <= 0) break;
          player.UseBomb();
          const bulletsCntBeforeBomb = bullets.length;
          const filterdBullets = bullets.filter(
            (bullet) =>
              !CheckHit({
                x1: player.GetX(),
                y1: player.GetY(),
                radius1: player.GetBombRadius(),
                x2: bullet.GetX(),
                y2: bullet.GetY(),
                radius2: bullet.GetRadius(),
              })
          );

          const bulletCntsAfterBomb = filterdBullets.length;
          const deletedBulletCnts = bulletsCntBeforeBomb - bulletCntsAfterBomb;
          deletedBulletCntsWithBomb += deletedBulletCnts;

          bullets = filterdBullets;
          $bombCnt.innerText = `💣`.repeat(player.GetBombCnt());
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', keyCheck, false);
  });
};
