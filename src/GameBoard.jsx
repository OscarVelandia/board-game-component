import React, { useState, useRef, useEffect, createRef } from "react";

import GamePiece from "./GamePiece";
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

  useEffect(() => {
    refs.current[slotFocus].current.focus();
  }, [slotFocus]);

  function handlePieceClick(selectedPiece, selectedSlot) {
    usedPiece.set(selectedSlot, selectedPiece);
    setPiece(selectedPiece === "🙂" ? "🙃" : "🙂");

    if (usedPiece.size === 4) {
      setGameIsFinished(true);
    }
  }

  function handleNewGame() {
    usedPiece.clear();
    setGameIsFinished(false);
  }

  function setMove(pressKey) {
    let moveNumber = 0;

    if (pressKey === "ArrowUp" && slotFocus >= width) {
      moveNumber -= width;
    }

    if (pressKey === "ArrowRight" && slotFocus < slotsInBoard.length - 1) {
      moveNumber += 1;
    }

    if (pressKey === "ArrowDown" && slotFocus < height * width - width) {
      moveNumber += width;
    }

    if (pressKey === "ArrowLeft" && slotFocus > 0) {
      moveNumber -= 1;
    }

    setSlotFocus(slotFocus + moveNumber);
  }

  function handleKeyPress(e) {
    const arrowKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

    if (arrowKeys.includes(e.key)) {
      setMove(e.key);
    }

    if (e.key === "n") {
      handleNewGame();
    }
  }

  return (
    <React.StrictMode>
      <main>
        {slotsInBoard.map((slot, index) => {
          const selectedSlot = usedPiece.get(slot);

          return (
            <GamePiece
              key={slot}
              onKeyDown={handleKeyPress}
              onClick={() => {
                handlePieceClick(piece, slot);
              }}
              pieceRef={refs.current[index]}
              piecePosition={slot + 1}
              selectedPiece={selectedSlot}
            />
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
