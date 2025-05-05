import { GetRandomInitBulletPosition } from './get_random_init_bullet_position.js';

export const Bullet = function (options) {
  const [init_x, init_y] = GetRandomInitBulletPosition();
  // console.log(init_x, init_y);

  this.x = init_x;
  this.y = init_y;
  this.radius = 25;
  this.color = 'blue';
  this.speed = 3;
  this.context = options.context;

  this.deltaX = (options.targetX - init_x) / (this.speed * 100);
  this.deltaY = (options.targetY - init_y) / (this.speed * 100);
  // TODO : 분모에 *100 이 아닌 frame별 조정

  this.Draw = () => {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fillStyle = this.color;
    this.context.fill();
  };

  this.GetX = () => this.x;
  this.GetY = () => this.Y;
  this.GetRadius = () => this.Radius;

  this.Move = () => {
    this.x += this.deltaX;
    this.y += this.deltaY;
  };
};
