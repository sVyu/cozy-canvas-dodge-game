export const GetRandomInitBulletPosition = () => {
  const wall_number = Math.floor(Math.random() * 4);

  let x = 0,
    y = 0;

  switch (wall_number) {
    case 0: // up
      x = Math.floor(Math.random() * window.innerWidth);
      y = 0;
      break;
    case 1: // left
      x = 0;
      y = Math.floor(Math.random() * window.innerHeight);
      break;
    case 2: // right
      x = window.innerWidth;
      y = Math.floor(Math.random() * window.innerHeight);
      break;
    case 3: // down
      x = Math.floor(Math.random() * window.innerWidth);
      y = window.innerHeight;
      break;
    default:
      break;
  }

  // console.log(wall_number, [x, y]);
  return [x, y];
};
