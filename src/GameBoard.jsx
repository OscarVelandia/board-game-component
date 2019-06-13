import React, { useState } from "react";
// import PropTypes from "prop-types";

import "./GameBoard.css";

const GameBoard = () => {
  const width = 6;
  const height = 6;
  const slotsInBoard = [...Array(width * height).keys()];
  // const gameIsFinished = false;
  const [piece, setPiece] = useState("🙂");
  const [usedPiece] = useState(() => new Map());
  // En este hook se deberia hacer la lógica del juego
  // const [gameWinner, setGameWinner] = useState(undefined);

  function handlePieceClick(selectedPiece, selectedSlot) {
    usedPiece.set(selectedSlot, selectedPiece);
    setPiece(selectedPiece === "🙂" ? "🙃" : "🙂");
  }

  function handleNewGame() {
    // console.log(usedPiece);
    usedPiece.clear();
    // console.log(usedPiece);

    // setGameWinner(undefined);
  }

  function handleKeyPress(e) {
    if (e.key === " ") {
      // console.log("espacio");
      handlePieceClick();
    }

    if (e.key === "n") {
      // console.log("n");
      handleNewGame();
    }
  }

  return (
    <React.StrictMode>
      <main>
        {slotsInBoard.map(slot => {
          const selectedSlot = usedPiece.get(slot);
          return (
            <div
              key={slot}
              onKeyPress={handleKeyPress}
              role="button"
              tabIndex="0"
              onClick={() => !selectedSlot && handlePieceClick(piece, slot)}
            >
              {selectedSlot}
            </div>
          );
        })}
      </main>
      {true && (
        <button id="reset" type="button" onClick={handleNewGame}>
          Volver a iniciar
        </button>
      )}
    </React.StrictMode>
  );
};

export default GameBoard;
