import Square from "./Square";
import React from "react";

class Board extends React.Component {
                    
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  createSquare(){
      let grid_num = this.props.grid_num
      let allow = this.props.allow
      
      if (allow == true) {
          let board = []
          let temp = 0
          for (let i = 0; i < grid_num; i++) {
            let each_row = []
            for(let j = 0; j< grid_num; j++){
              each_row.push(this.renderSquare(temp))          //push each column into each row
              temp += 1                                       //keep track of the index
            }
            board.push(<div className="Board-row">{each_row}</div>)     //seperate rows
          }
          return board
      }
      else{
          return 
      }
  }

  render() {  
      return (
        <div>
          {this.createSquare()}
        </div>
      );
  }
}

export default Board;