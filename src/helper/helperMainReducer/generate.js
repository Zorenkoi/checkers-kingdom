import uniqid from "uniqid";

import { getArrMaybePawn } from "./getArrMaybePawn";

export function generateArrCube() {
  const arrCubes = [];

  for (let y = 0; y <= 7; y++) {
    for (let x = 0; x <= 7; x++) {
      const cubeColor = (x + y) % 2 === 0 ? "black" : "white";

      arrCubes.push({
        y,
        x,
        cubeColor,
        cubeId: uniqid(),
      });
    }
  }

  return arrCubes;
}
export function generateArrWhitePawn() {
  const arrWhitePawn = [];

  for (let y = 0; y <= 7; y++) {
    for (let x = 0; x <= 7; x++) {
      const cubeColor = (x + y) % 2 === 0 ? "black" : "white";

      if (cubeColor === "black") {
        if (y >= 0 && y <= 2) {
          arrWhitePawn.push({
            y,
            x,
            pawnColor: "white",
            pawnId: uniqid(),
            job: "pawn",
          });
        }
      }
    }
  }

  return arrWhitePawn;
}
export function generateArrBlackPawn() {
  const arrBlackPawn = [];

  for (let y = 0; y <= 7; y++) {
    for (let x = 0; x <= 7; x++) {
      const cubeColor = (x + y) % 2 === 0 ? "black" : "white";

      if (cubeColor === "black") {
        if (y >= 5 && y <= 7) {
          arrBlackPawn.push({
            y,
            x,
            pawnColor: "black",
            pawnId: uniqid(),
            job: "pawn",
          });
        }
      }
    }
  }

  return arrBlackPawn;
}

export function generateInitialState(whoIsWalking) {
  const whoStartGame = whoIsWalking;
  const arrBlackPawn = generateArrBlackPawn();
  const arrWhitePawn = generateArrWhitePawn();
  const arrCube = generateArrCube();
  const arrMaybePawn = getArrMaybePawn({
    arrBlackPawn,
    arrWhitePawn,
    arrCube,
    whoIsWalking,
  });

  /////////////////////////////////////////////

  return {
    arrCube,
    arrWhitePawn,
    arrBlackPawn,
    ////////////////////
    isPotok: false,
    whoIsWalking,
    activePawnId: null,
    arrMoveO: [],
    arrKillO: [],
    arrKillOForQueen: [],
    arrMaybePawn,
    whoStartGame,
  };
}
