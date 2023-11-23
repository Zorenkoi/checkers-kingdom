import { useSelector } from "react-redux";
import { useEffect } from "react";

import Footer from "../components/Footer.jsx";
import ScoreBoard from "../components/ScoreBoard.jsx";
import Modal from "../components/Modal.jsx";
import Cube from "../components/Cube.jsx";
import Pawn from "../components/Pawn.jsx";

function App() {
  const { arrCube, arrWhitePawn, arrBlackPawn } = useSelector(
    (data) => data.mainReducer
  );

  useEffect(() => {
    resizeCubeContainer();
    window.addEventListener("resize", resizeCubeContainer);

    return () => {
      window.removeEventListener("resize", resizeCubeContainer);
    };
  }, []);

  return (
    <div className="wrapper">
      <ScoreBoard />
      <Modal />

      <div className="cubes-container">
        {arrCube.map((cubeObj) => (
          <Cube key={cubeObj.cubeId} {...cubeObj} />
        ))}

        {arrWhitePawn.map((pawnObj) => (
          <Pawn key={pawnObj.pawnId} {...pawnObj} />
        ))}

        {arrBlackPawn.map((pawnObj) => (
          <Pawn key={pawnObj.pawnId} {...pawnObj} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

function resizeCubeContainer() {
  const cubeContainer = document.querySelector(".cubes-container");
  const width = cubeContainer.offsetWidth;
  cubeContainer.style.height = width + "px";
}

export default App;
