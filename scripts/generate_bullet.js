import { Bullet } from './bullet.js';

export const GenerateBullet = ({ bullets, context, player }) => {
  bullets.push(
    new Bullet({ context, targetX: player.GetX(), targetY: player.GetY() })
  );
};
