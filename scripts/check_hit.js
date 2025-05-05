export const CheckHit = ({ x1, y1, radius1, x2, y2, radius2 }) => {
  return (
    Math.pow(radius1 + radius2, 2) > Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
  );
};
