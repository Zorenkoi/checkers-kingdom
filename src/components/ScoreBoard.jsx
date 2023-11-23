import { useSelector, useDispatch } from "react-redux";

import { whiteWin, blackWin } from "../redux/reducers/scoreReducer";
import { playWinSound } from "../helper/helperSound/helperSound";

import { openModal } from "../redux/reducers/modalReducer";
import { useEffect } from "react";

import "../style/score-board.css";

const ScoreBoard = () => {
  const dispatch = useDispatch();

  const { soundOn } = useSelector((data) => data.settingsReducer);

  const { arrMaybePawn, whoIsWalking } = useSelector(
    (data) => data.mainReducer
  );
  const { whiteScore, blackScore } = useSelector((data) => data.scoreReducer);

  useEffect(() => {
    if (arrMaybePawn.length === 0) {
      if (soundOn) playWinSound();

      //білі виграли
      if (whoIsWalking === "black") {
        dispatch(openModal("whitewin"));
        dispatch(whiteWin());
      }

      //чорні виграли
      if (whoIsWalking === "white") {
        dispatch(openModal("blackwin"));
        dispatch(blackWin());
      }
    }
  }, [arrMaybePawn, whoIsWalking]);

  return (
    <div className="score-board">
      <div className="score-container score-container-1">
        <div className="score-text">Білі</div>
        <div className="devider"></div>
        <div className="score-count">{whiteScore}</div>
      </div>
      <div className="score-container score-container-2">
        <div className="score-count">{blackScore}</div>
        <div className="devider"></div>
        <div className="score-text">Чорні</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
