/*
  Permban funksionet ndihumuese te tabeles, kontrollo fituesin, kopjimi i tabeles, kolonat e mbushura:
  FAJLLI ESHTE I NDARE NE TRE PJESE TE NDRYSHME:
    1) Kontrollo fituesin kur nje rresht apo kolon eshte prekur gjate lojes
    2) Kontrollo fituesin pergjate AI's minimax algorithm
    3) Permbajtja e funksionit shtese, kolonat e mbushura, tabela e kopjuar, dhe tabela e rifreskuar
  Me algoritmin ne fjale eshte e nevojshme qe te kerkohet e gjithe tabela

*/

const numOfCols = 7;
const numOfRows = 6;
const maxPossibleEntriesInDiagonal = 6;

// ------------------------------------------------------------------------------
// PART 1
// Funksioni ndihmues per checkWinner() per kontrollim column 4-in-a-rows
function specificCheckColWinner(board, row, col) {
  // if index out of bounds, return false
  if (row + 3 > numOfRows - 1) return false;

  // Kontrollo nese eshte nj 4-in-a-row downwards
  if (
    board[row][col] != null &&
    board[row][col] === board[row + 1][col] &&
    board[row][col] === board[row + 2][col] &&
    board[row][col] === board[row + 3][col]
  ) {
    return true;
  }
  return false;
}

// Funksioni ndihmues per checkWinner() per kontrollim row 4-in-a-rows
function specificCheckRowWinner(board, row, col) {
  // check if there is a 4-in-a-row in the following row
  for (let currCol = 0; currCol < numOfCols - 3; currCol++) {
    if (
      board[row][currCol] != null &&
      board[row][currCol] === board[row][currCol + 1] &&
      board[row][currCol] === board[row][currCol + 2] &&
      board[row][currCol] === board[row][currCol + 3]
    ) {
      return true;
    }
  }
  return false;
}

/* Funksioni per checkDiagonalWinner() per te filluar rreshtin,kolonen indeksi i diagonales */
function findStartIndexOfDiagonalA(row, col) {
  while (row !== 0 && col !== 0) {
    row--;
    col--;
  }
  return [row, col];
}
/* Funksioni per checkDiagonalWinner() per te filluar row,col indeksin e diagonales B  */
function findStartIndexOfDiagonalB(row, col) {
  while (row !== numOfRows - 1 && col !== 0) {
    row++;
    col--;
  }
  return [row, col];
}

/* Funksioni per checkDiagonalWinner() per te kontrolluar nese rreshti,kolona treguesi eshte ne varg */
function indexInRange(row, col) {
  return row < numOfRows && row >= 0 && col < numOfCols && col >= 0;
}

/* Funksioni per checkDiagonalWinner() per te kontrolluar per 4-in-a-rows ne boolean varg */
function checkFourInARow(booleanArray) {
  let booleanCounter = 0;

  for (let i = 0; i < maxPossibleEntriesInDiagonal; i++) {
    if (booleanArray[i] === true) {
      booleanCounter++;
    } else {
      booleanCounter = 0;
    }

    if (booleanCounter >= 4) return true;
  }

  return false;
}

//Funksioni per checkWinner() per kontrollim diagonal 4-in-a-rows
function specificCheckDiagonalWinner(board, row, col) {
  /* Array boolean per te gjetur ngjyrat qe perputhen per diagonalen A (lart-majtas ne poshte-djathtas drejtimin) 
     dhe diagonalen B (poshte-majtas ne lart-djathtas) */
  const diagonalA = [];
  const diagonalB = [];

  /* sakte per diagonalA nese ngjyra pershtatet ne currRow,currCol me ngjyren ne rresht,kolon*/
  let currRow = findStartIndexOfDiagonalA(row, col)[0];
  let currCol = findStartIndexOfDiagonalA(row, col)[1];

  for (let index = 0; index < maxPossibleEntriesInDiagonal; index++) {
    if (
      indexInRange(currRow, currCol) &&
      board[row][col] === board[currRow][currCol]
    ) {
      diagonalA.push(true);
    } else {
      diagonalA.push(false);
    }
    currRow++;
    currCol++;
  }

  /* sakte per diagonalB nese ngjyra perputhet me currRow,currCol me ngjyren ne row,col*/
  currRow = findStartIndexOfDiagonalB(row, col)[0];
  currCol = findStartIndexOfDiagonalB(row, col)[1];

  for (let index = 0; index < maxPossibleEntriesInDiagonal; index++) {
    if (
      indexInRange(currRow, currCol) &&
      board[row][col] === board[currRow][currCol]
    ) {
      diagonalB.push(true);
    } else {
      diagonalB.push(false);
    }
    currRow--;
    currCol++;
  }

  //kontrollo nese 4-in-a-row eshte shfaq ne diagonalen A ose B 
  return checkFourInARow(diagonalA) || checkFourInARow(diagonalB);
}

//kontrollo nese ka fitues
function specificCheckWinner(board, row, col) {
  return (
    specificCheckColWinner(board, row, col) ||
    specificCheckRowWinner(board, row, col) ||
    specificCheckDiagonalWinner(board, row, col)
  );
}
// ------------------------------------------------------------------------------
// 2)
// kontrollo tere tabelen per column 4-in-a-row
function generalRowWinner(board, color) {
  for (let row = 0; row < numOfRows; row++) {
    for (let col = 0; col < numOfCols - 3; col++) {
      if (
        indexInRange(row, col) &&
        indexInRange(row, col + 1) &&
        indexInRange(row, col + 2) &&
        indexInRange(row, col + 3) &&
        board[row][col] === color &&
        board[row][col + 1] === color &&
        board[row][col + 2] === color &&
        board[row][col + 3] === color
      )
        return true;
    }
  }
  return false;
}

// kontrollo tere tabelen per row 4-in-a-row
function generalColWinner(board, color) {
  for (let col = 0; col < numOfCols; col++) {
    for (let row = 0; row < numOfRows - 3; row++) {
      if (
        indexInRange(row, col) &&
        indexInRange(row + 1, col) &&
        indexInRange(row + 2, col) &&
        indexInRange(row + 3, col) &&
        board[row][col] === color &&
        board[row + 1][col] === color &&
        board[row + 2][col] === color &&
        board[row + 3][col] === color
      )
        return true;
    }
  }
  return false;
}

/* Funksioni per generalDiagonalWinner() per diagonalet me kend negativ */
function generalNegativeDiagonalWinner(board, color) {
  for (let col = 0; col < numOfCols - 3; col++) {
    for (let row = 0; row < numOfRows - 3; row++) {
      if (
        indexInRange(row, col) &&
        indexInRange(row + 1, col + 1) &&
        indexInRange(row + 2, col + 2) &&
        indexInRange(row + 3, col + 3) &&
        board[row][col] === color &&
        board[row + 1][col + 1] === color &&
        board[row + 2][col + 2] === color &&
        board[row + 3][col + 3] === color
      )
        return true;
    }
  }
  return false;
}

/* Funksioni per generalDiagonalWinner() per diagonalet me kend pozitiv */
function generalPositiveDiagonalWinner(board, color) {
  for (let col = 0; col < numOfCols - 3; col++) {
    for (let row = numOfRows - 3; row < numOfRows; row++) {
      if (
        indexInRange(row, col) &&
        indexInRange(row - 1, col + 1) &&
        indexInRange(row - 2, col + 2) &&
        indexInRange(row - 3, col + 3) &&
        board[row][col] === color &&
        board[row - 1][col + 1] === color &&
        board[row - 2][col + 2] === color &&
        board[row - 3][col + 3] === color
      )
        return true;
    }
  }
  return false;
}
// Kontrollon tere tabelen per 4-in-a-row
function generalDiagonalWinner(board, color) {
  return (
    generalPositiveDiagonalWinner(board, color) ||
    generalNegativeDiagonalWinner(board, color)
  );
}

function generalWinner(board, color) {
  return (
    generalColWinner(board, color) ||
    generalRowWinner(board, color) ||
    generalDiagonalWinner(board, color)
  );
}
// ------------------------------------------------------------------------------
// 3)
//Funksioni per checkFilled qe kthen nese nje kolon eshte mbushur
function isColFilled(board, col) {
  if (board[0][col] != null) return true;
  return false;
}

//kontrollo nese nje katror eshte mbushur
function isBoardFilled(board) {
  for (let col = 0; col < numOfCols; col++) {
    if (!isColFilled(board)) return false;
  }
  return true;
}

// Funksioni qe kontrollon nese rreshti i larte eshte i mbushur ne kolon
function topRowFilledInCol(board, row, col) {
  let currRow;

  for (currRow = 0; currRow < numOfRows; currRow++) {
    if (board[currRow][col]) {
      return currRow;
    }
  }

  return currRow;
}

// funksioni qe kthen nje kopje te tabeles
function copyOfBoard(board) {
  return board.map(function(arr) {
    return arr.slice();
  });
}

/*Funksioni qe rifreskon ngjyrn e nje katrori ne tabele */
function updateBoard(board, topRow, col, color) {
  // update currentBoard array element color
  if (color === 1) {
    board[topRow - 1][col] = "red";
  } else if (color === -1) {
    board[topRow - 1][col] = "yellow";
  } else {
    board[topRow - 1][col] = null;
  }
  return board;
}

module.exports = {
  specificCheckWinner,
  isColFilled,
  isBoardFilled,
  generalWinner,
  topRowFilledInCol,
  copyOfBoard,
  updateBoard
};
