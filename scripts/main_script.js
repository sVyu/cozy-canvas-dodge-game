import { GetRandomInitBulletPosition } from './get_random_init_bullet_position.js';
import { Player } from './player.js';

const mainScript = () => {
  const canvas = document.getElementById('gameCanvas');
  const context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // console.log(Player);

  const player = new Player({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    radius: 50,
    color: 'white',
    speed: 10,
    context,
  });

  const bullets = [];

  const draw = () => {
    // 이전 그림 지우기
    context.clearRect(0, 0, canvas.width, canvas.height);
    // player 그리기
    player.Draw();
  };
  setInterval(draw, 5);

  // setInterval(GetRandomInitBulletPosition, 500);

  // 방향키 이동
  const keyCheck = (e) => {
    var code = e.keyCode;
    // console.log('pressed KeyCode :', code);
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
        console.log('spacebar pressed');
      default:
        break;
    }
  };
  window.addEventListener('keydown', keyCheck, false);
};

mainScript();
