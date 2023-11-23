import { createSlice } from "@reduxjs/toolkit";

import { generateInitialState } from "../../helper/helperMainReducer/generate.js";
import { filterArrKillOForQueen } from "../../helper/helperMainReducer/filterArrKillOForQueen.js";

import {
  getNewWalker,
  changeActivePawnPos,
} from "../../helper/helperMainReducer";

import { getArrMaybePawn } from "../../helper/helperMainReducer/getArrMaybePawn";
import {
  getArrO,
  getArrOForQueen,
} from "../../helper/helperMainReducer/getArrO";
import {
  checkIsQueen,
  findActivePawn,
  makeQueen,
} from "../../helper/helperMainReducer/makeQueen";

////////////////////////////////////////////////////////////////////////////////////

const initialState = generateInitialState("white");

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setActivePawnId: (state, action) => {
      const { pawnId } = action.payload;

      return { ...state, activePawnId: pawnId };
    },
    setArrO: (state, action) => {
      const { arrBlackPawn, arrWhitePawn, arrCube } = state;
      const { pawnColor, x, y } = action.payload;

      const { arrMoveO, arrKillO } = getArrO(
        { arrBlackPawn, arrWhitePawn, arrCube },
        { pawnColor, x, y }
      );

      return { ...state, arrMoveO, arrKillO };
    },
    setArrOAfterKill: (state, action) => {
      const {
        arrBlackPawn,
        arrWhitePawn,
        arrCube,
        whoIsWalking,
        activePawnId,
      } = state;

      const { pawnColor, x, y } = action.payload;

      const activePawn = findActivePawn({
        activePawnId,
        arrBlackPawn,
        arrWhitePawn,
      });

      const newState = { ...state };

      ////////////////////////////////////////////
      const newWalker = getNewWalker(whoIsWalking);

      const { arrMoveO, arrKillO } = getArrO(
        { arrBlackPawn, arrWhitePawn, arrCube },
        { pawnColor, x, y }
      );

      if (arrKillO.length === 0) {
        const newArrMaybePawn = getArrMaybePawn({
          arrBlackPawn,
          arrWhitePawn,
          arrCube,
          whoIsWalking: newWalker,
        });

        newState.arrMaybePawn = newArrMaybePawn;
        newState.arrMoveO = [];
        newState.arrKillO = [];
        newState.activePawnId = null;
        newState.whoIsWalking = newWalker;
        newState.isPotok = false;
      }

      if (arrKillO.length > 0) {
        const newArrMaybePawn = getArrMaybePawn({
          arrBlackPawn,
          arrWhitePawn,
          arrCube,
          whoIsWalking,
        });

        newState.arrMaybePawn = newArrMaybePawn;
        newState.arrMoveO = [];
        newState.arrKillO = arrKillO;
        newState.isPotok = true;
      }

      //////////////////////////////////////////////

      if (
        checkIsQueen({
          y,
          pawnColor: activePawn.pawnColor,
          job: activePawn.job,
        })
      ) {
        const { newArrBlackPawn, newArrWhitePawn } = makeQueen({
          arrBlackPawn,
          arrWhitePawn,
          activePawnId,
          y,
        });

        const newArrMaybePawn = getArrMaybePawn({
          arrBlackPawn,
          arrWhitePawn,
          arrCube,
          whoIsWalking: newWalker,
        });

        newState.arrBlackPawn = newArrBlackPawn;
        newState.arrWhitePawn = newArrWhitePawn;
        newState.arrMaybePawn = newArrMaybePawn;
        newState.whoIsWalking = newWalker;
        newState.activePawnId = null;
        newState.arrKillO = [];
        newState.arrMoveO = [];
        newState.isPotok = false;
      }

      return newState;
    },
    setArrMaybePawn: (state, action) => {
      const { arrBlackPawn, arrWhitePawn, arrCube } = state;
      const { whoIsWalking } = action.payload;

      const arrMaybePawn = getArrMaybePawn({
        arrBlackPawn,
        arrWhitePawn,
        arrCube,
        whoIsWalking,
      });

      return { ...state, arrMaybePawn };
    },
    movePawn: (state, action) => {
      const { activePawnId, arrWhitePawn, arrBlackPawn } = state;
      const { x, y } = action.payload;

      const newArrWhitePawn = changeActivePawnPos({
        arrPawn: arrWhitePawn,
        activePawnId,
        x,
        y,
      });
      const newArrBlackPawn = changeActivePawnPos({
        arrPawn: arrBlackPawn,
        activePawnId,
        x,
        y,
      });

      return {
        ...state,
        arrWhitePawn: newArrWhitePawn,
        arrBlackPawn: newArrBlackPawn,
      };
    },
    killPawn: (state, action) => {
      const { arrWhitePawn, arrBlackPawn } = state;
      const { diePawnId } = action.payload;

      const newArrWhitePawn = arrWhitePawn.filter(
        ({ pawnId }) => pawnId !== diePawnId
      );
      const newArrBlackPawn = arrBlackPawn.filter(
        ({ pawnId }) => pawnId !== diePawnId
      );

      return {
        ...state,
        arrWhitePawn: newArrWhitePawn,
        arrBlackPawn: newArrBlackPawn,
      };
    },
    toggleWalker: (state, action) => {
      const { whoIsWalking } = state;

      const newWalker = getNewWalker(whoIsWalking);
      return {
        ...state,
        whoIsWalking: newWalker,
      };
    },
    setWalker: (state, action) => {
      const { newWalker } = action.payload;
      return {
        ...state,
        whoIsWalking: newWalker,
      };
    },
    setQueen: (state, action) => {
      const { arrBlackPawn, arrWhitePawn, activePawnId } = state;
      const { y } = action.payload;

      const { newArrBlackPawn, newArrWhitePawn } = makeQueen({
        arrBlackPawn,
        arrWhitePawn,
        activePawnId,
        y,
      });

      return {
        ...state,
        arrBlackPawn: newArrBlackPawn,
        arrWhitePawn: newArrWhitePawn,
      };
    },
    setArrOForQueen: (state, action) => {
      const { arrBlackPawn, arrWhitePawn, arrCube } = state;
      const { pawnColor, x, y } = action.payload;

      let { arrMoveO, arrKillOForQueen } = getArrOForQueen(
        { arrBlackPawn, arrWhitePawn, arrCube },
        { pawnColor, x, y }
      );

      arrKillOForQueen = filterArrKillOForQueen(arrKillOForQueen, {
        arrBlackPawn,
        arrWhitePawn,
        arrCube,
      });

      return { ...state, arrMoveO, arrKillOForQueen };
    },
    resetArrOForQueen: (state) => {
      return { ...state, arrKillOForQueen: [] };
    },
    setArrOForQueenAfterKill: (state, action) => {
      const {
        arrBlackPawn,
        arrWhitePawn,
        arrCube,
        whoIsWalking,
        activePawnId,
      } = state;

      const { pawnColor, x, y } = action.payload;

      const newWalker = getNewWalker(whoIsWalking);

      const newState = { ...state };
      ///////////////////////////////////////////////////////

      let { arrMoveO, arrKillOForQueen } = getArrOForQueen(
        { arrBlackPawn, arrWhitePawn, arrCube },
        { pawnColor, x, y }
      );
      arrKillOForQueen = filterArrKillOForQueen(arrKillOForQueen, {
        arrBlackPawn,
        arrWhitePawn,
        arrCube,
      });

      if (arrKillOForQueen.length > 0) {
        const newArrMaybePawn = getArrMaybePawn({
          arrBlackPawn,
          arrWhitePawn,
          arrCube,
          whoIsWalking: whoIsWalking,
        });

        newState.arrMaybePawn = newArrMaybePawn;
        newState.arrKillOForQueen = arrKillOForQueen;
        newState.isPotok = true;
      }

      if (arrKillOForQueen.length === 0) {
        const newArrMaybePawn = getArrMaybePawn({
          arrBlackPawn,
          arrWhitePawn,
          arrCube,
          whoIsWalking: newWalker,
        });

        newState.arrMaybePawn = newArrMaybePawn;
        newState.whoIsWalking = newWalker;
        newState.arrKillOForQueen = [];
        newState.activePawnId = null;
        newState.isPotok = false;
      }

      newState.arrMoveO = [];
      newState.arrKillO = [];

      return newState;
    },
    setPotok: (state, action) => {
      return { ...state, isPotok: action.payload };
    },
    resetGame: (state, action) => {
      const whoIsWalking = action.payload;
      return generateInitialState(whoIsWalking);
    },
  },
});

////////////////////////////////////////////////////
const mainReducer = mainSlice.reducer;
export const {
  setActivePawnId,
  setArrO,
  setArrOAfterKill,
  setArrMaybePawn,
  movePawn,
  killPawn,
  toggleWalker,
  setWalker,
  setQueen,
  setArrOForQueen,
  resetArrOForQueen,
  setArrOForQueenAfterKill,
  resetGame,
} = mainSlice.actions;
export default mainReducer;
