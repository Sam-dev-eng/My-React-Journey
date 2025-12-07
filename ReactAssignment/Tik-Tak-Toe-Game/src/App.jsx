import {useState} from "react"

function Square({value , onSquareClick}){
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board(){
  const [hasX,setHasX] = useState(true);
  const [squares,setSquares] = useState(Array(9).fill(null));

  function handleClick(index){
    if(calculateWinner(squares) || squares[index]) return;

    const nextSquare = squares.slice();
    if (hasX){
      nextSquare[index] = "X";
    }else{
      nextSquare[index] = "O";
    }
    
    setSquares(nextSquare);
    setHasX(!hasX);
  }

    let winner = calculateWinner(squares);
    let status = "";
    if (winner){
      status = "Winner is "+ winner;
    }else{
      status = "Next player is "+ (hasX ? "X" : "O");
    }


    return(
        <>
        <div className="status">{status}</div>
        <div className="board-Row" >
        <Square value={squares[0]} onSquareClick = {()=> handleClick(0)}/>
        <Square value={squares[1]} onSquareClick = {()=> handleClick(1)}/>
        <Square value={squares[2]} onSquareClick = {()=> handleClick(2)}/>
        </div>

        <div className="board-Row">
        <Square value={squares[3]} onSquareClick = {()=> handleClick(3)}/>
        <Square value={squares[4]} onSquareClick = {()=> handleClick(4)}/>
        <Square value={squares[5]} onSquareClick = {()=> handleClick(5)}/>
        </div>
        
        <div className="board-Row">
          <Square value={squares[6]} onSquareClick = {()=> handleClick(6)}/>
          <Square value={squares[7]} onSquareClick = {()=> handleClick(7)}/>
          <Square value={squares[8]} onSquareClick = {()=> handleClick(8)}/>
        </div>
        </>
    )

    function calculateWinner(squares){
      const line = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];
      for(let count = 0; count < line.length; count++){
          const [a,b,c] = line[count];
          if(squares[a] && squares[a]=== squares[b] && squares[a]=== squares[c]){
            return squares[a];
          }
      }
      return null;
      
    }

    
}