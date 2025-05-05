export const checkPlayerHit = ({ player, bullets }) => {
  return bullets.reduce((acc, bullet) => {
    const hit =
      Math.pow(player.radius + bullet.radius, 2) >
      Math.pow(player.x - bullet.x, 2) + Math.pow(player.y - bullet.y, 2);
    return acc | hit;
  }, false);
};
