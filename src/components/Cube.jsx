import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../style/cube.css";

import {
  setActivePawnId,
  setArrO,
  setArrOAfterKill,
  setArrMaybePawn,
  movePawn,
  killPawn,
  setWalker,
  setQueen,
  resetArrOForQueen,
  setArrOForQueenAfterKill,
} from "../redux/reducers/mainReducer";

import { getNewWalker } from "../helper/helperMainReducer";
import { getCubeClassName } from "../helper/helperCube";

import {
  playMoveSound,
  playKillSound,
} from "../helper/helperSound/helperSound";

const Cube = ({ cubeColor, cubeId, x, y }) => {
  const dispatch = useDispatch();
  const mainReducer = useSelector((data) => data.mainReducer);
  const { arrMoveO, arrKillO, whoIsWalking, arrKillOForQueen } = mainReducer;
  const { soundOn } = useSelector((data) => data.settingsReducer);

  const [isMoveCube, setIsMoveCube] = useState(false);
  const [isKillCube, setIsKillCube] = useState(false);
  const [isKillCubeForQueen, setIsKillCubeForQueen] = useState(false);
  const [killO, setKillO] = useState(null);
  const [killOForQueen, setKillOForQueen] = useState(null);

  useEffect(() => {
    if (!!arrMoveO.find((moveO) => moveO.cubeId === cubeId)) {
      setIsMoveCube(true);
    } else {
      setIsMoveCube(false);
    }
  }, [arrMoveO]);

  useEffect(() => {
    const killO = arrKillO.find((killO) => killO.cubeId === cubeId);

    if (!!killO) {
      setIsKillCube(true);
      setKillO(killO);
    } else {
      setIsKillCube(false);
      setKillO(null);
    }
  }, [arrKillO]);

  useEffect(() => {
    const killOForQueen = arrKillOForQueen.find(
      (killOForQueen) => killOForQueen.cubeId === cubeId
    );

    if (!!killOForQueen) {
      setIsKillCubeForQueen(true);
      setKillOForQueen(killOForQueen);
    } else {
      setIsKillCubeForQueen(false);
      setKillOForQueen(null);
    }
  }, [arrKillOForQueen]);

  ///////////////////////////
  const sbrosArrO = () => {
    dispatch(resetArrOForQueen());
    dispatch(setArrO({ pawnId: null, pawnColor: null, x: 99, y: 99 }));
  };
  const sbrosActivePawnId = () => {
    dispatch(setActivePawnId({ pawnId: null }));
  };
  const fullSbros = () => {
    sbrosArrO();
    sbrosActivePawnId();
  };
  //////////////////////////

  const clickMoveCube = () => {
    dispatch(movePawn({ x, y }));
    dispatch(setQueen({ x, y }));

    fullSbros();

    const newWalker = getNewWalker(whoIsWalking);
    dispatch(setArrMaybePawn({ whoIsWalking: newWalker }));
    dispatch(setWalker({ newWalker }));

    if (soundOn) playMoveSound();
  };

  const clickKillCube = () => {
    const { diePawnId, pawnColor } = killO;

    dispatch(killPawn({ diePawnId }));
    dispatch(movePawn({ x, y }));
    dispatch(setArrOAfterKill({ pawnColor, x, y }));

    if (soundOn) playKillSound();
  };

  const clickKillCubeForQueen = () => {
    const { diePawnId, pawnColor } = killOForQueen;

    dispatch(killPawn({ diePawnId }));
    dispatch(movePawn({ x, y }));
    dispatch(setArrOForQueenAfterKill({ pawnColor, x, y }));

    if (soundOn) playKillSound();
  };

  const clickCube = () => {
    if (isKillCube) {
      clickKillCube();
      return;
    }

    if (isMoveCube) {
      clickMoveCube();
      return;
    }

    if (isKillCubeForQueen) {
      clickKillCubeForQueen();
      return;
    }

    fullSbros();
  };

  const cubeClassName = getCubeClassName({
    isMoveCube,
    isKillCube,
    cubeColor,
    isKillCubeForQueen,
  });

  return (
    <div onClick={clickCube} className={cubeClassName}>
      <div className="border"></div>
    </div>
  );
};

export default Cube;
