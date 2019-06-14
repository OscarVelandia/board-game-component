import React, { useState } from "react";
// import PropTypes from "prop-types";

import "./GameBoard.css";

const GameBoard = () => {
  const width = 8;
  const height = 8;
  const slotsInBoard = [...Array(width * height).keys()];

  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [piece, setPiece] = useState("🙂");
  const [usedPiece] = useState(() => new Map());
  // En este hook se deberia hacer la lógica del juego
  // const [gameWinner, setGameWinner] = useState(undefined);

  function handlePieceClick(selectedPiece, selectedSlot) {
    usedPiece.set(selectedSlot, selectedPiece);
    setPiece(selectedPiece === "🙂" ? "🙃" : "🙂");

    /* Cuando llega a 4 piezas usadas, muestra el botón para reiniciar el juego, 
    pero podria mostrarse cuando hay un ganador */
    if (usedPiece.size === 4) {
      setGameIsFinished(true);
    }
  }

  function handleNewGame() {
    usedPiece.clear();
    setGameIsFinished(false);
  }

  // TODO permitir que se pueda jugar con el teclado.
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
              /* Niego el selectedSlot para que se pierda la referencia del estado anterior y 
                  asi no se pueda cambiar la pieza una vez puesto */
              onClick={() => !selectedSlot && handlePieceClick(piece, slot)}
            >
              {selectedSlot}
            </div>
          );
        })}
      </main>
      {gameIsFinished && (
        <button
          id="reset"
          type="button"
          onClick={handleNewGame}
          tabIndex="0"
          onKeyPress={handleKeyPress}
        >
          Volver a iniciar
        </button>
      )}
    </React.StrictMode>
  );
};

export default GameBoard;
