import React from "react";

import "./GameBoard.css";

const GamePiece = ({
  onClick,
  onKeyDown,
  pieceRef,
  piecePosition,
  selectedPiece
}) => (
  <button
    className="piece"
    type="button"
    onClick={() => onClick()}
    onKeyDown={onKeyDown}
    ref={pieceRef}
    tabIndex={piecePosition}
  >
    {selectedPiece}
  </button>
);

export default GamePiece;
