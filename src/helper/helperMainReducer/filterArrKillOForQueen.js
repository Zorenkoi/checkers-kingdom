import { getArrOForQueen } from "./getArrO";

export function filterArrKillOForQueen(
  arrKillOForQueen,
  { arrBlackPawn, arrWhitePawn, arrCube }
) {
  const arrKillOForQueenWithNextKill = [];

  arrKillOForQueen.forEach((killOForQueen) => {
    const { pawnColor, x, y, diePawnId } = killOForQueen;

    const newArrBlackPawn = arrBlackPawn.filter(
      (pawn) => pawn.pawnId !== diePawnId
    );
    const newArrWhitePawn = arrWhitePawn.filter(
      (pawn) => pawn.pawnId !== diePawnId
    );

    const { arrKillOForQueen: nextArrKillOForQueen } = getArrOForQueen(
      { arrBlackPawn: newArrBlackPawn, arrWhitePawn: newArrWhitePawn, arrCube },
      { pawnColor, x, y }
    );

    // console.log(nextArrKillOForQueen);
    if (nextArrKillOForQueen.length > 0) {
      arrKillOForQueenWithNextKill.push(killOForQueen);
    }
  });

  if (arrKillOForQueenWithNextKill.length > 0) {
    return arrKillOForQueenWithNextKill;
  }

  return arrKillOForQueen;
}
