// отфильтровывает позиции вне поля
export function filterArrMovePos(arrMovePos) {
  return arrMovePos.filter(
    (movePos) =>
      movePos.x >= 0 && movePos.x <= 7 && movePos.y >= 0 && movePos.y <= 7
  );
}

// возвращяет массив с измененной позицией активного елемента
export function changeActivePawnPos({ arrPawn, activePawnId, x, y }) {
  return arrPawn.map((pawnObj) => {
    if (pawnObj.pawnId === activePawnId) {
      return { ...pawnObj, x, y };
    }
    return pawnObj;
  });
}

export function findCubeByPos(arrCube, position) {
  const cube = arrCube.find((cubePosition) =>
    isPositionEquel(cubePosition, position)
  );

  return cube;
}

export function findPawnByPos(arrPawn, position) {
  const pawn = arrPawn.find((pawnPosition) =>
    isPositionEquel(pawnPosition, position)
  );

  return pawn;
}

export function getNewWalker(whoIsWalking) {
  return whoIsWalking === "black" ? "white" : "black";
}

function isPositionEquel(position1, position2) {
  if (position1.x === position2.x && position1.y === position2.y) return true;

  return false;
}
