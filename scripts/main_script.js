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
      radius: 35,
      color: 'orange',
      speed: 5,
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
    const pressingKeys = [];

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      player.DrawPlayer();
      bullets.map((bullet) => {
        bullet.Draw();
        bullet.Move();
      });
    };

    const onKeyUp = (e) => (pressingKeys[e.keyCode] = false);
    const onKeyDown = (e) => {
      pressingKeys[e.keyCode] = true;
      if (e.keyCode == 32 && player.GetBombCnt() > 0) {
        // SpaceBar for Bomb
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
      }
    };

    // 방향키
    const moveCheck = () => {
      if (pressingKeys[37]) player.MoveLeft();
      if (pressingKeys[38]) player.MoveUp();
      if (pressingKeys[39]) player.MoveRight();
      if (pressingKeys[40]) player.MoveDown();
    };

    const getScore = () => elapsedTime / 1000 + deletedBulletCntsWithBomb;
    const gameOverAndReturnScore = () => {
      intervals.map((interval) => clearInterval(interval));
      window.removeEventListener('keydown', onKeyDown, false);
      window.removeEventListener('keyup', onKeyUp, false);
      resolve(getScore());
    };

    const drawInterval = setInterval(draw, 10);
    const gerateBulletInterval = setInterval(
      () => GenerateBullet({ bullets, context, player }),
      500
    );
    const setScoreInterval = setInterval(() => {
      elapsedTime = new Date() - startTime;
      $currScore.innerHTML = `curr score<br/> ${getScore().toFixed(3)}`;
    }, 10);
    const checkPlayerHitInterval = setInterval(() => {
      const isPlayerHit = checkPlayerHitWithBullets({ player, bullets });
      if (isPlayerHit) {
        gameOverAndReturnScore();
      }
    }, 10);
    const checkPressingKeys = setInterval(() => moveCheck(), 10);

    intervals.push(
      drawInterval,
      gerateBulletInterval,
      setScoreInterval,
      checkPlayerHitInterval,
      checkPressingKeys
    );

    window.addEventListener('keydown', onKeyDown, false);
    window.addEventListener('keyup', onKeyUp, false);
  });
};
