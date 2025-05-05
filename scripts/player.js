export const Player = function (options) {
  this.x = options.x;
  this.y = options.y;
  this.radius = options.radius;
  this.color = options.color;
  this.speed = options.speed;
  this.context = options.context;

  this.MoveRight = () => {
    this.x += this.speed;
  };
  this.MoveLeft = () => {
    this.x -= this.speed;
  };
  this.MoveUp = () => {
    this.y -= this.speed;
  };
  this.MoveDown = () => {
    this.y += this.speed;
  };

  this.Draw = () => {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fillStyle = this.color;
    this.context.fill();
  };
};
