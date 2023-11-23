import { playMakeQueenSound } from "../helperSound/helperSound";
export function makeQueen({ arrBlackPawn, arrWhitePawn, activePawnId, y }) {
  const activePawn = findActivePawn({
    arrBlackPawn,
    arrWhitePawn,
    activePawnId,
  });

  const activePawnO = {
    pawnColor: activePawn.pawnColor,
    job: activePawn.job,
    y,
  };

  if (checkIsQueen(activePawnO)) {
    const { newArrBlackPawn, newArrWhitePawn } = makeQueen2({
      arrBlackPawn,
      arrWhitePawn,
      pawnId: activePawnId,
    });

    // playMakeQueenSound();

    return { newArrBlackPawn, newArrWhitePawn };
  }

  return { newArrBlackPawn: arrBlackPawn, newArrWhitePawn: arrWhitePawn };
}

export function makeQueen2({ arrBlackPawn, arrWhitePawn, pawnId }) {
  const newArrBlackPawn = arrBlackPawn.map((pawn) => {
    if (pawn.pawnId === pawnId) {
      return { ...pawn, job: "queen" };
    }

    return pawn;
  });

  const newArrWhitePawn = arrWhitePawn.map((pawn) => {
    if (pawn.pawnId === pawnId) {
      return { ...pawn, job: "queen" };
    }

    return pawn;
  });

  return { newArrBlackPawn, newArrWhitePawn };
}

export function checkIsQueen({ y, pawnColor, job }) {
  if (job === "pawn") {
    if (pawnColor === "black" && y === 0) return true;
    if (pawnColor === "white" && y === 7) return true;
  }

  return false;
}

export function findActivePawn({ activePawnId, arrBlackPawn, arrWhitePawn }) {
  const blackActivePawn = arrBlackPawn.find(
    (pawn) => pawn.pawnId === activePawnId
  );
  if (!!blackActivePawn) return blackActivePawn;

  const whiteActivePawn = arrWhitePawn.find(
    (pawn) => pawn.pawnId === activePawnId
  );
  if (!!whiteActivePawn) return whiteActivePawn;

  return false;
}
