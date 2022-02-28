//constructing the board
const board = [
  null, 0, null, 1, null, 2, null, 3,
  4, null, 5, null, 6, null, 7, null,
  null, 8, null, 9, null, 10, null, 11,
  null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null,
  12, null, 13, null, 14, null, 15, null,
  null, 16, null, 17, null, 18, null, 19,
  20, null, 21, null, 22, null, 23, null
]

const cells = document.querySelectorAll("td");
let redP = document.querySelectorAll("p");
let blackP = document.querySelectorAll("span");
const redTurnText = document.querySelectorAll("reds-turn");
const blackTurnText = document.querySelectorAll("blacks-turn");

let turn = true;
let redScore = 12;
let blackScore = 12;
let playerPieces;
