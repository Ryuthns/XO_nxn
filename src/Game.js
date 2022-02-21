import Board from "./Board"
import React from "react";
import { paste } from "@testing-library/user-event/dist/paste";

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(3).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
          grid_num : 0,
          allow: false,
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    calculateWinner(squares) {
      let length = this.state.grid_num
      let needed = length-1
      let X = 0
      let O = 0
  
      //horizontal
      for (let i = 0; i < length*length-length; i+=length) {
          for (let j = i+1; j < i+length; j++){
            if(squares[i] === squares[j]){
              if(squares[i]=="X"){
                X+=1
              }
              else if(squares[i]=="O"){
                O+=1
              }
            }
          }
      }

      //vertical
      for (let i = 0; i < length; i++) {
        
      }
  
      //diagonal upper left - lower right
      for (let i = 0; i < length; i++) {
         
      }
  
      //diagonal lower left - upper right
       for (let i = 0; i < length; i++) {
      
      }
    
      if(X == needed){
        return 'X' 
      }
      else if(O == needed){
        return 'O'
      }
      return null;
    }

    handleInput(e){
        this.setState({...this.state,
          history: [{
            squares: Array(e.target.value*e.target.value).fill(null)
          }],
          stepNumber: 0,
          xIsNext: true,
          grid_num: e.target.value,
          allow: false
        })
        
    }

    handleButton(){
        this.setState({...this.state,
          history: [{
            squares: Array(this.state.grid_num*this.state.grid_num).fill(null)
          }],
          stepNumber: 0,
          xIsNext: true,
          allow: true
        })
    }
   
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
            <li>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });

        let status;
        if (winner) {
        status = 'Winner: ' + winner;
        } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
              <div className="input">
                <input
                  type="number"
                  name="inputField"
                  onChange={this.handleInput}
                  min={3}
                  // ref={node => (this.inputNode = node)}
                />
                <button onClick={this.handleButton} className="btn btn-success">
                  Create
                </button>
              </div>
              <div className="game-board">
                <Board
                  squares={current.squares}
                  grid_num={this.state.grid_num}
                  allow={this.state.allow}
                  onClick={(i) => this.handleClick(i)}
                />
              </div>
              <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
              </div>
            </div>
        );
    }
  }

export default Game;