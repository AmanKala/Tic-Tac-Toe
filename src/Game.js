import React, { useState } from "react";
import { whoistheWinner } from "./Decider";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = whoistheWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    // return if won or occupied
    if (winner || squares[i]) return;

    // select block
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const allMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Back to #${move}` : "Start Again";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>Tic Tac Toe </h1>
      <div className="wrapper">
      <div>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      </div>
      <div className="timeline-wrapper">
        <div>
          <h3>Timeline</h3>
          {allMoves()}
        </div>
        <span className={`winner-${winner}`}>{winner ? "Winner: " + winner : " "}</span>
        <h3>{winner ? "Game Over " : "Next Player: " + xO}</h3>
      </div>
      </div>
    </>
  );
};

export default Game;
