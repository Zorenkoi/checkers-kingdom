import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { resetGame } from "../redux/reducers/mainReducer";
import { resetScore } from "../redux/reducers/scoreReducer";
import { closeModal, openModal } from "../redux/reducers/modalReducer";

import victoryImg from "../images/victory.png";
import "../style/modal.css";

const Modal = () => {
  const { isModalOpen, modalBodyId } = useSelector((data) => data.modalReducer);

  const getModalBody = (modalBodyId) => {
    if (!modalBodyId) return null;

    switch (modalBodyId) {
      case "start":
        return <StartModal />;
      case "whitewin":
        return <WinModal text="Перемогли білі" />;
      case "blackwin":
        return <WinModal text="Перемогли чорні" />;
      case "restartmatch":
        return <RestartMatchModal />;
      default:
        break;
    }
  };

  return (
    <div className={isModalOpen ? "modal active" : "modal"}>
      <div className="modal-body">{getModalBody(modalBodyId)}</div>
    </div>
  );
};

// id start
const StartModal = () => {
  const dispatch = useDispatch();
  const [whiteStartGame, setWhiteStartGame] = useState(true);

  const clickPlayer1 = () => {
    setWhiteStartGame(true);
    dispatch(resetGame("white"));
  };
  const clickPlayer2 = () => {
    setWhiteStartGame(false);
    dispatch(resetGame("black"));
  };

  const clickStart = () => {
    dispatch(closeModal());
  };
  return (
    <>
      <h2 className="modal-title text-start">Хто ходить першим?</h2>
      <div className="modal-input-container">
        <label>Білі</label>
        <input
          type="checkbox"
          checked={whiteStartGame}
          onChange={clickPlayer1}
          className="modal-checkbox"
        />
      </div>
      <div className="modal-input-container">
        <label>Чорні</label>
        <input
          type="checkbox"
          checked={!whiteStartGame}
          onChange={clickPlayer2}
          className="modal-checkbox"
        />
      </div>

      <div className="modal-button-container">
        <button className="modal-button" onClick={clickStart}>
          грати
        </button>
      </div>
    </>
  );
};

// id whitewin
// id blackwin
const WinModal = ({ text }) => {
  const dispatch = useDispatch();
  const { whoStartGame } = useSelector((data) => data.mainReducer);

  const clickNext = () => {
    const whoStartGameNext = whoStartGame === "black" ? "white" : "black";

    dispatch(resetGame(whoStartGameNext));
    dispatch(closeModal());
  };

  const clickRestart = () => {
    dispatch(resetScore());
    dispatch(resetGame("white"));
    dispatch(openModal("start"));
  };
  return (
    <>
      <div className="modal-img-container">
        <img src={victoryImg} alt="" />
      </div>
      <h2 className="modal-title">{text}</h2>
      <div className="modal-button-container">
        <div onClick={clickNext} className="modal-button">
          наступна гра
        </div>
        <div onClick={clickRestart} className="modal-button muted">
          нова гра
        </div>
      </div>
    </>
  );
};

// id restartmatch
const RestartMatchModal = () => {
  const dispatch = useDispatch();

  const clickResume = () => {
    dispatch(closeModal());
  };

  const clickNew = () => {
    dispatch(resetScore());
    dispatch(resetGame("white"));
    dispatch(openModal("start"));
  };

  return (
    <>
      <h2 className="modal-title">Ви впевнені що хочете розпочати нову гру?</h2>
      <div className="modal-button-container">
        <div onClick={clickResume} className="modal-button">
          продовжити
        </div>
        <div onClick={clickNew} className="modal-button muted">
          нова гра
        </div>
      </div>
    </>
  );
};

export default Modal;
