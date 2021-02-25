
import { heuristic1Evaluation } from "./mainProb";
const BoardFunctions = require("./BoardHelperFunctions.js");

// Dimensionet e tabeles
const numOfCols = 7;

// Funksioni qe mundeson AI per te bere nje levizje bazuar ne Minimax Algorithm, niveli i veshtiresise prezanton thellesin e minimax algorithm
function aiTurn(currentBoard, difficultyLevel) {
  currentBoard = BoardFunctions.copyOfBoard(currentBoard);

  // Nga minimax rezultati, merr kolonen e zhvendosjes me te mire
  const minimaxResult = alphabeta(
    currentBoard,
    difficultyLevel,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    true
  );
  const bestColumn = minimaxResult[0];

  // Kthen (row,col) indeksin qe kthehet prej alphabeta()
  return [0, bestColumn];
}

// Funksioni qe ndihmon per alphabeta per te marr listen e te gjitha kolonave te pa mbushura
function availableColumns(currentBoard) {
  let availableCols = [];
  for (let col = 0; col < numOfCols; col++) {
    if (!BoardFunctions.isColFilled(currentBoard, col)) {
      availableCols.push(col);
    }
  }
  return availableCols;
}

/*Te zgjedh random nje kolon*/
function randomAvailableCol(currentBoard) {
  const availableCols = availableColumns(currentBoard);

  // no available col case
  if (availableCols.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * availableCols.length);
  return availableCols[randomIndex];
}

// minimax algorithm me alpha beta pruning i implemetuar; kthen kolonen me te mire me score me te mire
function alphabeta(currentBoard, depth, a, b, maximizingPlayer) {
  // Rasti krysor 1: fitues
  // nese lojtari fiton
  if (BoardFunctions.generalWinner(currentBoard, "red")) {
    return [null, Number.NEGATIVE_INFINITY];
  }
  // Nese roboti fiton
  if (BoardFunctions.generalWinner(currentBoard, "yellow")) {
    return [null, Number.POSITIVE_INFINITY];
  }

  // Rasti 2: Nuk ka levizje
  if (BoardFunctions.isBoardFilled(currentBoard)) {
    return [null, 0];
  }

  // Rasti 3: thelesia == 0
  if (depth === 0) {
    return [
      null,
      heuristic1Evaluation(currentBoard, "yellow") -
        heuristic1Evaluation(currentBoard, "red")
    ];
  }

  // nese roboti
  if (maximizingPlayer) {
    let bestVal = Number.NEGATIVE_INFINITY;
    let bestColumn = randomAvailableCol(currentBoard);
    for (let col = 0; col < numOfCols; col++) {
      if (!BoardFunctions.isColFilled(currentBoard, col)) {
        const topRow = BoardFunctions.topRowFilledInCol(currentBoard, 0, col);
        let updatedBoard = BoardFunctions.copyOfBoard(currentBoard);
        updatedBoard = BoardFunctions.updateBoard(
          updatedBoard,
          topRow,
          col,
          -1
        );
        let newVal = alphabeta(updatedBoard, depth - 1, a, b, false)[1];
        if (newVal > bestVal) {
          bestVal = newVal;
          bestColumn = col;
        }

        // alpha beta pruning
        a = Math.max(a, bestVal);
        if (a >= b) {
          break;
        }
      }
    }
    return [bestColumn, bestVal];
  }

  // Nese lojtari do luaj
  if (!maximizingPlayer) {
    let bestVal = Number.POSITIVE_INFINITY;
    let bestColumn = randomAvailableCol(currentBoard);

    for (let col = 0; col < numOfCols; col++) {
      if (!BoardFunctions.isColFilled(currentBoard, col)) {
        // rifresko tabelen me(topRow,col) te mbushura
        const topRow = BoardFunctions.topRowFilledInCol(currentBoard, 0, col);
        let updatedBoard = BoardFunctions.copyOfBoard(currentBoard);
        updatedBoard = BoardFunctions.updateBoard(
          updatedBoard,
          topRow,
          col,
          +1
        );
        let newVal = alphabeta(updatedBoard, depth - 1, a, b, true)[1];
        if (newVal < bestVal) {
          bestVal = newVal;
          bestColumn = col;
        }

        // alpha beta pruning
        b = Math.min(b, bestVal);
        if (a >= b) {
          break;
        }
      }
    }
    return [bestColumn, bestVal];
  }
}
export { aiTurn};
