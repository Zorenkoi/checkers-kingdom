import { findPawnByPos } from ".";
import { findCubeByPos } from ".";

// возвращает массив обектов moveO и возвращает массив обектов killO

export function getArrO(
  { arrBlackPawn, arrWhitePawn, arrCube },
  { pawnColor, x: startX, y: startY }
) {
  let arrMoveO = [];
  let arrKillO = [];

  const arrVector = getAllVector();

  if (pawnColor === "black") {
    for (let i = 0; i < arrVector.length; i++) {
      const vector = arrVector[i];
      const pos = { x: startX + vector.x, y: startY + vector.y };

      // фильтруем ходы
      if (!checkPosition(pos)) continue;
      if (findPawnByPos(arrBlackPawn, pos)) continue;

      // вариант боя
      if (findPawnByPos(arrWhitePawn, pos)) {
        const nextPos = getNextPosition(pos, vector);

        if (!checkPosition(nextPos)) continue;
        if (findPawnByPos(arrBlackPawn, nextPos)) continue;
        if (findPawnByPos(arrWhitePawn, nextPos)) continue;

        const diePawn = findPawnByPos(arrWhitePawn, pos);
        const cube = findCubeByPos(arrCube, nextPos);

        const killO = { diePawnId: diePawn.pawnId, pawnColor, ...cube };
        arrKillO.push(killO);

        continue;
      }

      // вариант хода
      if (checkVector({ pawnColor, vector })) {
        const cube = findCubeByPos(arrCube, pos);
        const moveO = { ...cube };
        arrMoveO.push(moveO);
      }
    }
  }

  if (pawnColor === "white") {
    for (let i = 0; i < arrVector.length; i++) {
      const vector = arrVector[i];
      const pos = { x: startX + vector.x, y: startY + vector.y };

      // фильтруем ходы
      if (!checkPosition(pos)) continue;
      if (findPawnByPos(arrWhitePawn, pos)) continue;

      // вариант боя
      if (findPawnByPos(arrBlackPawn, pos)) {
        const nextPos = getNextPosition(pos, vector);

        if (!checkPosition(nextPos)) continue;
        if (findPawnByPos(arrBlackPawn, nextPos)) continue;
        if (findPawnByPos(arrWhitePawn, nextPos)) continue;

        const diePawn = findPawnByPos(arrBlackPawn, pos);
        const cube = findCubeByPos(arrCube, nextPos);

        const killO = { diePawnId: diePawn.pawnId, pawnColor, ...cube };
        arrKillO.push(killO);

        continue;
      }

      // вариант хода
      if (checkVector({ pawnColor, vector })) {
        const cube = findCubeByPos(arrCube, pos);
        const moveO = { ...cube };
        arrMoveO.push(moveO);
      }
    }
  }

  if (arrKillO.length > 0) {
    return { arrMoveO: [], arrKillO };
  }

  if (arrKillO.length === 0) {
    return { arrMoveO, arrKillO: [] };
  }
}

export function getAllVector() {
  return [
    { y: -1, x: -1 },
    { y: -1, x: 1 },
    { y: 1, x: -1 },
    { y: 1, x: 1 },
  ];
}

function getNextPosition(nowPosition, vector) {
  return {
    x: nowPosition.x + vector.x,
    y: nowPosition.y + vector.y,
  };
}

function checkVector({ pawnColor, vector }) {
  if (pawnColor === "black" && vector.y === 1) return false;
  if (pawnColor === "white" && vector.y === -1) return false;

  return true;
}

function checkPosition(position) {
  if (
    position.x >= 0 &&
    position.x <= 7 &&
    position.y >= 0 &&
    position.y <= 7
  ) {
    return true;
  }

  return false;
}

////////////////////////////////////////////

export function getArrOForQueen(
  { arrBlackPawn, arrWhitePawn, arrCube },
  { pawnColor, x: startX, y: startY }
) {
  let arrMoveO = [];
  let arrKillOForQueen = [];

  const arrVector = getAllVector();

  for (let i = 0; i < arrVector.length; i++) {
    const vector = arrVector[i];
    const startPosition = { x: startX, y: startY };
    if (pawnColor === "black") {
      vectorRecursionBlack(vector, startPosition, null);
      continue;
    }
    if (pawnColor === "white") {
      vectorRecursionWhite(vector, startPosition, null);
      continue;
    }
  }

  function vectorRecursionBlack(vector, startPosition, prevDiePawnId) {
    const nowPosition = getNextPosition(startPosition, vector);

    if (!checkPosition(nowPosition)) return;
    if (findPawnByPos(arrBlackPawn, nowPosition)) return;

    if (findPawnByPos(arrWhitePawn, nowPosition)) {
      const nextPosition = getNextPosition(nowPosition, vector);
      if (prevDiePawnId) return;
      if (!checkPosition(nextPosition)) return;
      if (findPawnByPos(arrBlackPawn, nextPosition)) return;
      if (findPawnByPos(arrWhitePawn, nextPosition)) return;

      const diePawn = findPawnByPos(arrWhitePawn, nowPosition);
      const diePawnId = diePawn.pawnId;
      const cube = findCubeByPos(arrCube, nextPosition);

      const killOForQueen = { diePawnId, pawnColor, ...cube };
      arrKillOForQueen.push(killOForQueen);

      vectorRecursionBlack(vector, nowPosition, diePawnId);
      return;
    }

    const cube = findCubeByPos(arrCube, nowPosition);

    if (prevDiePawnId) {
      arrKillOForQueen.push({ diePawnId: prevDiePawnId, pawnColor, ...cube });
      vectorRecursionBlack(vector, nowPosition, prevDiePawnId);
      return;
    }

    const moveO = { ...cube };
    arrMoveO.push(moveO);
    vectorRecursionBlack(vector, nowPosition);
    return;
  }

  function vectorRecursionWhite(vector, startPosition, prevDiePawnId) {
    const nowPosition = getNextPosition(startPosition, vector);

    if (!checkPosition(nowPosition)) return;
    if (findPawnByPos(arrWhitePawn, nowPosition)) return;

    if (findPawnByPos(arrBlackPawn, nowPosition)) {
      const nextPosition = getNextPosition(nowPosition, vector);
      if (prevDiePawnId) return;
      if (!checkPosition(nextPosition)) return;
      if (findPawnByPos(arrBlackPawn, nextPosition)) return;
      if (findPawnByPos(arrWhitePawn, nextPosition)) return;

      const diePawn = findPawnByPos(arrBlackPawn, nowPosition);
      const diePawnId = diePawn.pawnId;
      const cube = findCubeByPos(arrCube, nextPosition);

      const killOForQueen = { diePawnId, pawnColor, ...cube };
      arrKillOForQueen.push(killOForQueen);

      vectorRecursionWhite(vector, nowPosition, diePawnId);
      return;
    }

    const cube = findCubeByPos(arrCube, nowPosition);

    if (prevDiePawnId) {
      arrKillOForQueen.push({ diePawnId: prevDiePawnId, pawnColor, ...cube });
      vectorRecursionWhite(vector, nowPosition, prevDiePawnId);
      return;
    }

    const moveO = { ...cube };
    arrMoveO.push(moveO);
    vectorRecursionWhite(vector, nowPosition);
    return;
  }

  if (arrKillOForQueen.length > 0) {
    return { arrMoveO: [], arrKillOForQueen };
  }

  if (arrKillOForQueen.length === 0) {
    return { arrMoveO, arrKillOForQueen: [] };
  }
}

/////////////////////////////////////////////////////////////////////
