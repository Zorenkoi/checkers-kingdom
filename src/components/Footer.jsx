import { useDispatch } from "react-redux";
import { useState } from "react";

import soundOffImg from "../images/sound-off.png";
import soundOnImg from "../images/sound-on.png";
import restartImg from "../images/restart.png";

import { setSound } from "../redux/reducers/settingsReducer";
import { openModal } from "../redux/reducers/modalReducer";
import { playCancelSound } from "../helper/helperSound/helperSound";

import "../style/footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-row">
          <div className="settings-container">
            <SoundButton />
            <RestartButton />
          </div>
        </div>
      </footer>
    </>
  );
};

const SoundButton = () => {
  const dispatch = useDispatch();
  const [soundOn, setSoundOn] = useState(true);

  const click = () => {
    playCancelSound();
    setSoundOn((state) => {
      dispatch(setSound(!state));
      return !state;
    });
  };

  const srcImg = soundOn ? soundOnImg : soundOffImg;
  return (
    <button onClick={click} className="settings-button">
      <div className="settings-button-img-container">
        <img src={srcImg} alt="" draggable={false} />
      </div>
    </button>
  );
};

const RestartButton = () => {
  const dispatch = useDispatch();

  const click = () => {
    dispatch(openModal("restartmatch"));
  };

  return (
    <button onClick={click} className="settings-button">
      <div className="settings-button-img-container">
        <img src={restartImg} alt="" draggable={false} />
      </div>
    </button>
  );
};

export default Footer;
