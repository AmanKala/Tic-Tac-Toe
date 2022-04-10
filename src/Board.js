import React from "react";
import Square from "./Block";

const Board = ({ squares, onClick }) => (
    <div className="outerdiv">
        <div className="board">
            {squares.map((square, i) => (
            <Square key={i} value={square} onClick={() => onClick(i)} />
            ))}
        </div>
    </div>
);

export default Board;
