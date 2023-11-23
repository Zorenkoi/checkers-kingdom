import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import crownImg from "../images/crown.png";

import {
  setActivePawnId,
  setArrO,
  setArrOForQueen,
  resetArrOForQueen,
} from "../redux/reducers/mainReducer";
import { getPawnClassName } from "../helper/helperPawn";

import {
  playChooseSound,
  playCancelSound,
  playMakeQueenSound,
} from "../helper/helperSound/helperSound";

import "../style/pawn.css";

const Pawn = ({ y, x, pawnColor, pawnId, job }) => {
  const dispatch = useDispatch();
  const [isMaybePawn, setIsMaybePawn] = useState(false);

  const { activePawnId, whoIsWalking, arrMaybePawn, isPotok } = useSelector(
    (data) => data.mainReducer
  );
  const { soundOn } = useSelector((data) => data.settingsReducer);

  useEffect(() => {
    if (isPotok) {
      if (activePawnId === pawnId) {
        setIsMaybePawn(true);
        return;
      }

      setIsMaybePawn(false);
      return;
    }

    if (!!arrMaybePawn.find((pawn) => pawn.pawnId === pawnId)) {
      setIsMaybePawn(true);
      return;
    }

    setIsMaybePawn(false);
    return;
  }, [arrMaybePawn, isPotok]);

  useEffect(() => {
    if (job === "queen" && soundOn) {
      if (soundOn) playMakeQueenSound();
    }
  }, [job]);

  ///////////////////////////
  const sbrosArrO = () => {
    dispatch(setArrO({ pawnId: null, pawnColor: null, x: 99, y: 99 }));
    dispatch(resetArrOForQueen());
  };
  const sbrosActivePawnId = () => {
    dispatch(setActivePawnId({ pawnId: null }));
  };
  const fullSbros = () => {
    sbrosArrO();
    sbrosActivePawnId();
  };
  //////////////////////////

  const clickPlainPawn = () => {
    sbrosArrO();
    dispatch(setActivePawnId({ pawnId }));
    dispatch(setArrO({ pawnColor, x, y }));
  };

  const clickQueen = () => {
    sbrosArrO();
    dispatch(setActivePawnId({ pawnId }));
    dispatch(setArrOForQueen({ pawnColor, x, y }));
  };

  const clickPawn = () => {
    if (whoIsWalking !== pawnColor) {
      if (soundOn) playCancelSound();
      fullSbros();
      return;
    }
    if (!isMaybePawn) {
      if (soundOn) playCancelSound();
      fullSbros();
      return;
    }

    if (job === "pawn") {
      if (soundOn) playChooseSound();
      clickPlainPawn();
      return;
    }

    if (job === "queen") {
      playChooseSound();
      clickQueen();
      return;
    }
  };

  const pawnClassName = getPawnClassName({
    pawnId,
    activePawnId,
    pawnColor,
    isMaybePawn,
    job,
  });

  const pawnStyle = {
    top: y * (100 / 8) + "%",
    left: x * (100 / 8) + "%",
  };

  return (
    <div onClick={clickPawn} style={pawnStyle} className={pawnClassName}>
      <div className="pawn-circle">
        {job === "queen" ? (
          <img src={crownImg} alt="queen" draggable={false} />
        ) : null}
      </div>
    </div>
  );
};

export default Pawn;
