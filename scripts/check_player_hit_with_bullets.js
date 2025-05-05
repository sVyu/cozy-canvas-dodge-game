import { CheckHit } from './check_hit.js';

export const checkPlayerHitWithBullets = ({ player, bullets }) => {
  return bullets.reduce((acc, bullet) => {
    return (
      acc |
      CheckHit({
        x1: player.GetX(),
        y1: player.GetY(),
        radius1: player.GetRadius(),
        x2: bullet.GetX(),
        y2: bullet.GetY(),
        radius2: bullet.GetRadius(),
      })
    );
  }, false);
};
