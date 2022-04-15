import React from "react";
import Block from "./Block";

const Board = ({ squares, onClick }) => (
    <div className="outerdiv">
        <div className="board">
            {squares.map((square, i) => (
            <Block key={i} value={square} onClick={() => onClick(i)} />
            ))}
        </div>
    </div>
);

export default Board;
