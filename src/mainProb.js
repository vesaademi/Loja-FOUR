//Dimensionet e tabeles
const numOfCols = 7;
const numOfRows = 6;

//Katrorat ne tabele
export const heuristic1ScoreTable = [
  // row 1
  [3, 4, 5, 7, 5, 4, 3],

  // row 2
  [4, 6, 8, 10, 8, 6, 4],

  // row 3
  [5, 8, 11, 13, 11, 8, 5],

  // row 4
  [5, 8, 11, 13, 11, 8, 5],

  // row 5
  [4, 6, 8, 10, 8, 6, 4],

  // row 6
  [3, 4, 5, 7, 5, 4, 3]
];

//Funksion qe rrit numrin e pikave per "te kuqe" ose "te verdhe"
export function heuristic1Evaluation(board, color) {
  let matchKey = color;
  let totalColorScore = 0;

  for (let row = 0; row < numOfRows; row++) {
    for (let col = 0; col < numOfCols; col++) {
      if (board[row][col] === matchKey)
        totalColorScore += heuristic1ScoreTable[row][col];
    }
  }

  return totalColorScore;
}
