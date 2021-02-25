import React from "react";
import ReactDOM from "react-dom";
import Title from "./components/titulli";
import Board from "./components/tabela";
import GameButton from "./components/butonat";
import GameLevel from "./components/niveliPerRobot";
import "./styles.css";
const AI = require("./AI.js");
const BoardFunctions = require("./BoardHelperFunctions.js");

class Game extends React.Component {
  constructor(props) {
    super(props);

    /*Ne konstante jane specifikuar dimensionet e tabeles*/
    this.numOfCols = 7;
    this.numOfRows = 6;
    this.maxPossibleEntriesInDiagonal = 6;
    const colArr = Array(this.numOfCols).fill(null);

    this.state = {
      // Secila pike fillestare ne varg eshte nje state i tabeles
      history: [
        {
          currentBoard: Array(this.numOfRows)
            .fill(null)
            .map(() => colArr.slice())
        }
      ],
      //Variablat ne vazhdim tregojne se cili e ka radhen, cili ka fituar lojen, cili eshte i lidhur, cila pike duhet te shfaqet
      //a eshte loja duke i zhvilluar me robotin dhe e fundit per te zgjedhur nivelin e veshtiresise
      //Per te fundit eshte zgjedhur niveli i veshtiresise - duke ndryshuar thellesin e minimax algoritmit (lehte:2, normal:4, veshtire:7)
      isRedTurn: true,
      isGameWon: false,
      isGameTied: false,
      historyIndex: 0,
      isCPUMode: true,
      difficultyLevel: 4
    };
  }

  updateHistory(currentBoard) {
    const historyIndex = this.state.historyIndex;
    const historyLength = this.state.history.length;
    var history = this.state.history;
    if (historyIndex < historyLength - 1) {
      history = this.state.history.splice(0, historyIndex + 1);
    }

    return history.concat([{ currentBoard: currentBoard }]);
  }

  /*Funksioni qe rifreskon statusin e lojes (fituar, lidhur, vazhdim)
    te marra nga fillimi i rreshtit ose kolones atu ku katrori eshte shtuar
  */
  updateGameStatus(topRow, col) {
    let currentBoard = this.state.history[this.state.historyIndex].currentBoard;
    if (
      BoardFunctions.generalWinner(currentBoard, "red") ||
      BoardFunctions.generalWinner(currentBoard, "yellow")
    ) {
      this.setState({ isGameWon: true });
    }
    else if (BoardFunctions.isBoardFilled(currentBoard)) {
      this.setState({ isGameTied: true });
    }
    else {
      const isRedTurn = !this.state.isRedTurn;
      this.setState({ isRedTurn: isRedTurn }, function() {
        if (this.state.isCPUMode && !isRedTurn) {
          const AIIndex = AI.aiTurn(currentBoard, this.state.difficultyLevel);
          this.squareClicked(AIIndex[0], AIIndex[1]);
        }
      });
    }
  }

  // Rifresko state kur katrori eshte prekur
  squareClicked(row, col) {
    if (
      this.state.history[this.state.historyIndex].currentBoard[row][col] !=
        null ||
      this.state.isGameWon ||
      this.state.isGameTied
    )
      return;

    let currentBoard = this.state.history[this.state.historyIndex].currentBoard;
    currentBoard = BoardFunctions.copyOfBoard(currentBoard);
    const topRow = BoardFunctions.topRowFilledInCol(currentBoard, row, col);

    // ngjyrat qe perdoren ne UpdateBoard ne katror kuqe (+1), verdhe (-1), ose null (0)
    let color;
    if (this.state.isRedTurn) {
      color = +1;
    } else if (!this.state.isRedTurn) {
      color = -1;
    }

    const updatedBoard = BoardFunctions.updateBoard(
      currentBoard,
      topRow,
      col,
      color
    );
    const history = this.updateHistory(updatedBoard);

    this.setState(
      {
        history: history,
        historyIndex: this.state.historyIndex + 1
      },

      () => this.updateGameStatus(topRow, col)
    );
  }

  jumpBackwards() {
    const historyIndex = this.state.historyIndex - 1;
    if (historyIndex < 0 || this.state.isGameWon || this.state.isGameTied)
      return;

    this.setState({
      historyIndex: this.state.historyIndex - 1,
      isRedTurn: !this.state.isRedTurn
    });
  }

  jumpForwards() {
    const historyIndex = this.state.historyIndex + 1;
    if (
      historyIndex > this.state.history.length - 1 ||
      this.state.isGameWon ||
      this.state.isGameTied
    )
      return;

    this.setState({
      historyIndex: this.state.historyIndex + 1,
      isRedTurn: !this.state.isRedTurn
    });
  }

  // function for HistoryButton to allow user to reset game
  reset() {
    const colArr = Array(this.numOfCols).fill(null);
    this.setState({
      history: [
        {
          currentBoard: Array(this.numOfRows)
            .fill(null)
            .map(() => colArr.slice())
        }
      ],
      isRedTurn: true,
      isGameWon: false,
      isGameTied: false,
      historyIndex: 0
    });
  }

  // Funksioni per gameModeButton per te lejuar perdoruesin te vacktoj modin e CPU
  selectCPUMode() {
    this.setState({ isCPUMode: true });
    this.reset();
  }

  //Funksioni qe lejon per te zgjedhur lojen me dy lojtar
  selectTwoPlayerMode() {
    this.setState({ isCPUMode: false });
    this.reset();
  }

  // Funksioni per ndryshim te nivelit te veshiresise
  changeGameLevel(difficultyLevel) {
    this.setState({ difficultyLevel: difficultyLevel });
    this.reset();
  }

  render() {
    const history = this.state.history;
    const currentBoard = history[this.state.historyIndex].currentBoard;
    return (
      <div className="game">
        <Title
          isRedTurn={this.state.isRedTurn}
          isGameWon={this.state.isGameWon}
          isGameTied={this.state.isGameTied}
        />
        <Board
          currentBoard={currentBoard}
          history={this.state.history}
          historyIndex={this.state.historyIndex}
          isGameWon={this.state.isGameWon}
          isRedTurn={this.state.isRedTurn}
          squareClicked={(row, col) => this.squareClicked(row, col)}
        />
        
          <div style={{height:"48px",  maxWidth: "450px", margin:'auto',opacity:0.5,border: "solid #add8e6 2px",borderBottom:'0px' ,backgroundImage:"url('https://www.helpfulgames.com/bilder/spel/4-i-rad.png')"}}></div>
        <GameButton
          jumpBackwards={() => this.jumpBackwards()}
          jumpForwards={() => this.jumpForwards()}
          reset={() => this.reset()}
          selectCPUMode={() => this.selectCPUMode()}
          selectTwoPlayerMode={() => this.selectTwoPlayerMode()}
        />
         <GameLevel
          changeToEasy={() => this.changeGameLevel(2)}
          changeToNormal={() => this.changeGameLevel(4)}
          changeToHard={() => this.changeGameLevel(7)}
          isCPUMode={this.state.isCPUMode}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);
