export const Player = function (options) {
  this.x = options.x;
  this.y = options.y;
  this.radius = options.radius;
  this.color = options.color;
  this.speed = options.speed;
  this.context = options.context;

  this.bomb_cnt = options.bomb_cnt;
  this.bomb_radius = options.bomb_radius;
  // this.bombInfos = []; // x, y, generatedTime

  this.GetX = () => this.x;
  this.GetY = () => this.y;
  this.GetRadius = () => this.radius;
  this.GetBombRadius = () => this.bomb_radius;

  this.MoveRight = () => {
    if (this.x >= this.context.canvas.width - this.radius) return;
    this.x += this.speed;
  };
  this.MoveLeft = () => {
    if (this.x <= this.radius) return;
    this.x -= this.speed;
  };
  this.MoveUp = () => {
    if (this.y <= this.radius) return;
    this.y -= this.speed;
  };
  this.MoveDown = () => {
    if (this.y >= this.context.canvas.height - this.radius) return;
    this.y += this.speed;
  };

  this.UseBomb = () => {
    if (this.bomb_cnt <= 0) return;
    this.bomb_cnt -= 1;
  };

  this.GetBombCnt = () => {
    return this.bomb_cnt;
  };

  this.DrawPlayer = () => {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fillStyle = this.color;
    this.context.fill();
  };
};
