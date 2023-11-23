export function getCubeClassName({
  isMoveCube,
  isKillCube,
  isKillCubeForQueen,
  cubeColor,
}) {
  let cubeClassName = `cube  ${cubeColor}`;

  if (isKillCubeForQueen || isKillCube) {
    cubeClassName += " kill";
  } else if (isMoveCube) {
    cubeClassName += " move";
  }

  return cubeClassName;
}
