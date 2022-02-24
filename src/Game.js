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
        this.calculateWinner = this.calculateWinner.bind(this);
    }

    calculateWinner(squares) {
      let n = parseInt(this.state.grid_num)
      let patterns = []
     
      //horizontal
      for(let i=0; i<(n*n); i=i+n){
        let temp = []
        temp = squares.slice(i, i+n)
        patterns.push(temp)
      }

      //vertical
      for(let i=0; i<n; i++){
        let temp = []
        for(let j=0; j<n; j++){
          temp.push(patterns[j][i])
        }
        patterns.push(temp)
      }

      //diagonal
      let temp = []
      for(let i=0; i<n; i++){
        temp.push(patterns[i][i])
      }
      patterns.push(temp)

      //anti-diagonal
      temp = []
      for(let i=0; i<n; i++){
        temp.push(patterns[i][n-i-1])
      }
      patterns.push(temp)

      //debug
      console.log(patterns.length)             //2*n+2
      for(let i=0; i<patterns.length; i++){
        console.log(patterns[i])
      }

      //check winner
      for(let i=0; i<patterns.length; i++){
        let emptyboard = patterns[i].every(val => val==null)
        let winnerIsX = patterns[i].every(val => val=="X")
        let winnerIsO = patterns[i].every(val => val=="O")
        if(winnerIsX){
          if(emptyboard){
            return null
          }
          return("X")
        }
        else if(winnerIsO){
          if(emptyboard){
            return null
          }
          return("O")
        }
      }
      return null
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
                  value={this.state.grid_num}
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