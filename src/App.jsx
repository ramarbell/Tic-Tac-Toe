import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <div className="cell" onClick={onSquareClick}>
      {value}
    </div>
  );
}

export default function App() {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  return (
    <div>
      <h1>
        {winner === "Draw"
          ? "Game Over: Draw!"
          : winner
          ? "Winner: " + winner
          : "Next Player: " + player}
      </h1>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>

      <Board board={board} onClick={handleClick} />
    </div>
  );

  function handleClick(i) {
    if (board[i] !== null || winner) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = player;
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (newBoard.every((square) => square !== null)) {
      setWinner("Draw");
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
  }

  function Board({ board }) {
    return (
      <div className="container">
        <div className="board">
          <Square value={board[0]} onSquareClick={() => handleClick(0)} />
          <Square value={board[1]} onSquareClick={() => handleClick(1)} />
          <Square value={board[2]} onSquareClick={() => handleClick(2)} />
          <Square value={board[3]} onSquareClick={() => handleClick(3)} />
          <Square value={board[4]} onSquareClick={() => handleClick(4)} />
          <Square value={board[5]} onSquareClick={() => handleClick(5)} />
          <Square value={board[6]} onSquareClick={() => handleClick(6)} />
          <Square value={board[7]} onSquareClick={() => handleClick(7)} />
          <Square value={board[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    );
  }
  function resetGame() {
    setBoard(Array(9).fill(null));
    setWinner(null);
  }
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
