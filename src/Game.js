import React, { useState } from "react";
import { whoistheWinner } from "./Decider";
import Board from "./Board";

const Game = () => {
  //An array for all the steps.
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = whoistheWinner(history[stepNumber]);
  const [player1,setPlayer1] = useState("");
  const [player2,setPlayer2] = useState("");
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {

    // Performed Steps in the game.
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    // Return if won or occupied
    if (winner || squares[i]) return;

    // Select block
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const travelBackTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const allMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Back to #${move}` : "Start Again";
      return (
        <li key={move}>
          <button onClick={() => travelBackTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>Tic Tac Toe </h1>
      <div className="players">
        <input type="text" 
          placeholder="Player 1" 
          value={player1}
          onChange={(e)=>setPlayer1(e.target.value)}
        />
        <input type="text" 
          placeholder="Player 2" 
          value={player2}
          onChange={(e)=>setPlayer2(e.target.value)}
        />
      </div>
      <div className="wrapper"> 
        <Board squares={history[stepNumber]} onClick={handleClick} />
        <div className="timeline-wrapper">
          <div>
            <h3>Timeline</h3>
            {allMoves()}
          </div>
          <div className="winnerdiv">
            <span className={`winner-${winner}`}>
              {
                winner ? "Winner: " + ( winner === "X" ? (player1 === "" ? "X" : player1) : (player2 === "" ? "O" : player2)) : " "
              }
            </span>
          </div>
          <div>
          <h3>{winner ? "Game Over " : "Next Player: " + xO}</h3></div>
        </div>
      </div>
    </>
  );
};

export default Game;
