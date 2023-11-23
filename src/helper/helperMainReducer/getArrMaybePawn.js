import { getArrO, getArrOForQueen } from "./getArrO";

// возвращяет массив пешек каторые могут походить в данный ход

// arrKillMaybePawn массив пешек которые возможно будут   ХОДИТЬ   в данный ход
// arrMoveMaybePawn массив пешек которые возможно будут   БИТЬ   в данный ход

export function getArrMaybePawn({
  arrBlackPawn,
  arrWhitePawn,
  arrCube,
  whoIsWalking,
}) {
  const arrKillMaybePawn = [];
  const arrMoveMaybePawn = [];

  if (whoIsWalking === "black") {
    arrBlackPawn.forEach(({ pawnId, pawnColor, x, y, job }) => {
      const isPawnCanKill = checkIsPawnCanKill(
        { arrBlackPawn, arrWhitePawn, arrCube },
        { pawnColor, x, y, job }
      );
      const isPawnCanMove = checkIsPawnCanMove(
        { arrBlackPawn, arrWhitePawn, arrCube },
        { pawnColor, x, y, job }
      );

      if (isPawnCanKill) {
        arrKillMaybePawn.push({ pawnId });
      }
      if (isPawnCanMove) {
        arrMoveMaybePawn.push({ pawnId });
      }
    });
  }

  if (whoIsWalking === "white") {
    arrWhitePawn.forEach(({ pawnId, pawnColor, x, y, job }) => {
      const isPawnCanKill = checkIsPawnCanKill(
        { arrBlackPawn, arrWhitePawn, arrCube },
        { pawnColor, x, y, job }
      );
      const isPawnCanMove = checkIsPawnCanMove(
        { arrBlackPawn, arrWhitePawn, arrCube },
        { pawnColor, x, y, job }
      );

      if (isPawnCanKill) {
        arrKillMaybePawn.push({ pawnId });
      }
      if (isPawnCanMove) {
        arrMoveMaybePawn.push({ pawnId });
      }
    });
  }

  if (arrKillMaybePawn.length > 0) {
    return arrKillMaybePawn;
  } else {
    return arrMoveMaybePawn;
  }
}

export function checkIsPawnCanMove(
  { arrBlackPawn, arrWhitePawn, arrCube },
  { pawnColor, x, y, job }
) {
  if (job === "pawn") {
    const { arrMoveO } = getArrO(
      { arrBlackPawn, arrWhitePawn, arrCube },
      { pawnColor, x, y }
    );

    if (arrMoveO.length > 0) {
      return true;
    }
  }

  if (job === "queen") {
    const { arrMoveO } = getArrOForQueen(
      { arrBlackPawn, arrWhitePawn, arrCube },
      { pawnColor, x, y }
    );

    if (arrMoveO.length > 0) {
      return true;
    }
  }

  return false;
}
export function checkIsPawnCanKill(
  { arrBlackPawn, arrWhitePawn, arrCube },
  { pawnColor, x, y, job }
) {
  if (job === "pawn") {
    const { arrKillO } = getArrO(
      { arrBlackPawn, arrWhitePawn, arrCube },
      { pawnColor, x, y }
    );

    if (arrKillO.length > 0) {
      return true;
    }
  }

  if (job === "queen") {
    const { arrKillOForQueen } = getArrOForQueen(
      { arrBlackPawn, arrWhitePawn, arrCube },
      { pawnColor, x, y }
    );

    if (arrKillOForQueen.length > 0) {
      return true;
    }
  }

  return false;
}
