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

let turn = true; //true = reds turn, false = blacks turn
let redScore = 12;
let blackScore = 12;
let playerPieces;

let selectedPiece = {
  pieceId: -1,
  indexOfBoardPiece: -1,
  isKing: false,
  space7: false,
  space9: false,
  space14: false,
  space18: false,
  space_7: false,
  space_9: false,
  space_14: false,
  space_18: false
}

function givePiecesEventListeners() {
  if (turn==true) {
    for (let i = 0; i < redP.length; i++) {
      redP[i].addEventListener("click", getPlayerPieces);
    }
  } else {
    for (let i = 0; i < blackP.length; i++) {
      blackP[i].addEventListener("click", getPlayerPieces);
    }
  }
}

function getPlayerPieces() {
  if (turn==true) {playerPieces = redP;}
  else {playerPieces = blackP;}
  
  removeCellOnClick();
  resetBorders();
}

function removeCellOnClick() {
  for (let 1 = 0; i < cells.length; i++) {
    cells[i].removeAttribute("onclick");
  }
}

function resetBorders() {
  for (let i = 0; i < playerPieces.length; i++) {
    playerPieces[i].style.border = "1px solid white";
  }
  
  resetSelectedPieceProperties();
  getSelectedPiece();
}

function resetSelectedPieceProperties() {
  selectedPiece.pieceId = -1;
  selectedPiece.isKing = -1;
  selectedPiece.space7 = false;
  selectedPiece.space9 = false;
  selectedPiece.space14 = false;
  selectedPiece.space18 = false;
  selectedPiece.space_7 = false;
  selectedPiece.space_9 = false;
  selectedPiece.space_14 = false;
  selectedPiece.space_18 = false;
}

function getSelectedPiece() {
  selectedPiece.pieceId = parseInt(event.target.id);
  selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
  isPieceKing();
}
