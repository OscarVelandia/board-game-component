import React, { useState, useRef, useEffect, createRef } from "react";

import "./GameBoard.css";

const GameBoard = () => {
  const width = 4;
  const height = 4;
  const slotsInBoard = [...Array(width * height).keys()];

  const refs = useRef(slotsInBoard.map(() => createRef()));
  const [slotFocus, setSlotFocus] = useState(0);
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

  // TODO: Hay que usar esta función para hacer el movimiento.
  function setMove(moveNumber) {
    setSlotFocus(slotFocus + moveNumber);
  }

  function handleKeyPress(e) {
    if (e.key === "ArrowUp" && slotFocus < width) {
      setMove(1);
    }

    if (e.key === "ArrowRight" && slotFocus + 1 < width) {
      setMove(1);
    }

    if (e.key === "ArrowDown" && slotFocus < width) {
      // setMove(1);
    }

    if (e.key === "ArrowLeft" && slotFocus + 1 < width) {
      setMove(-1);
    }

    if (e.key === "n") {
      handleNewGame();
    }
  }

  useEffect(() => {
    refs.current[slotFocus].current.focus();
  }, [slotFocus]);

  return (
    <React.StrictMode>
      <main>
        {slotsInBoard.map((slot, index) => {
          const selectedSlot = usedPiece.get(slot);
          // console.log(selectedSlot, slot, usedPiece.size);
          return (
            <button
              key={slot}
              type="button"
              className="slots"
              ref={refs.current[index]}
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
