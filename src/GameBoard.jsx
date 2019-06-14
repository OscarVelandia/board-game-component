import React, { useState } from "react";

import "./GameBoard.css";
/* TODO
 * Hacer focus() en un elemento específico según su tabindex.
 * Moverse dentro de la grilla con las arrow keys
 */
const GameBoard = () => {
  const width = 4;
  const height = 4;
  const slotsInBoard = [...Array(width * height).keys()];

  const [gameIsFinished, setGameIsFinished] = useState(false);
  const [piece, setPiece] = useState("🙂");
  const [usedPiece] = useState(() => new Map());
  // En este hook se deberia hacer la lógica del juego
  // const [gameWinner, setGameWinner] = useState(undefined);

  function handlePieceClick(selectedPiece, selectedSlot) {
    usedPiece.set(selectedSlot, selectedPiece);
    setPiece(selectedPiece === "🙂" ? "🙃" : "🙂");
    /* Cuando llega a 4 piezas usadas muestra el botón para borrar el estado del juego, 
    pero la condición podria ser cualquiera. */
    if (usedPiece.size === 4) {
      setGameIsFinished(true);
    }
  }

  function handleNewGame() {
    usedPiece.clear();
    setGameIsFinished(false);
  }

  function handleKeyPress(e) {
    // console.log(e);
    if (e.key === "n") {
      handleNewGame();
    }
  }

  return (
    <React.StrictMode>
      <main tabIndex="-1">
        {slotsInBoard.map(slot => {
          const selectedSlot = usedPiece.get(slot);
          // console.log(selectedSlot, slot, usedPiece.size);
          return (
            <button
              key={slot}
              type="button"
              className="slots"
              onKeyDown={handleKeyPress}
              tabIndex={slot + 1}
              /* Niego el selectedSlot para que se pierda la referencia del estado anterior y 
                  asi no se pueda cambiar la pieza una vez puesto */
              onClick={() => !selectedSlot && handlePieceClick(piece, slot)}
            >
              {selectedSlot}
            </button>
          );
        })}
      </main>
      {gameIsFinished && (
        <button id="reset" type="button" onClick={handleNewGame}>
          Volver a iniciar
        </button>
      )}
    </React.StrictMode>
  );
};

export default GameBoard;
