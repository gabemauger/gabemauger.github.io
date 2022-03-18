const squares = document.querySelectorAll('.board div');
const winner = document.querySelector('#winner');
const current = document.querySelector('#current');

var playNum = 1;



var socket = io();
socket.on('movement', function(move) {
    console.log(move);

    if (move.currentPlayer == 2) {
        squares[move.i].classList.add('taken');
        squares[move.i].classList.add('pl-red');
        currentPlayerText = 'Yellow\'s Turn';
        currentPlayer = 2;
        current.innerHTML = currentPlayerText;
    }

    else if (move.currentPlayer == 1) {
        squares[move.i].classList.add('taken');
        squares[move.i].classList.add('pl-yellow');
        currentPlayerText = 'Red\'s Turn';
        currentPlayer = 1;
        current.innerHTML = currentPlayerText;
    } 

    

    if (winningCond == 1) {
        alert("Red Wins! Click to reset");
        winningCond = 0;
        document.location.reload(false);
    }
    if (winningCond == 2) {
        alert("Yellow Wins! Click to reset");
        winningCond = 0;
        document.location.reload(false);
    }

    checkWin();

});

socket.on('turnNum', function(turn) {
    playNum = turn;
});



let currentPlayerText = 'Red\'s Turn';
let currentPlayer = 1;
let winningCond = 0;


function checkWin() {
    for (let y = 0; y < 39; y++) {

        // check for verticals
        if (y < 21) {

            const squares1 = squares[y];
            const squares2 = squares[y + 7];
            const squares3 = squares[y + 14];
            const squares4 = squares[y + 21];


            if (
                squares1.classList.contains('pl-red') &&
                squares2.classList.contains('pl-red') &&
                squares3.classList.contains('pl-red') &&
                squares4.classList.contains('pl-red')
            ) {
                current.innerHTML = 'Red Wins - Vertical!';
                winningCond = 1;

            } 

            if (
                squares1.classList.contains('pl-yellow') &&
                squares2.classList.contains('pl-yellow') &&
                squares3.classList.contains('pl-yellow') &&
                squares4.classList.contains('pl-yellow')
            ) {
                current.innerHTML = 'Yellow Wins - Vertical!';
                winningCond = 2;
            }
        }

        //check the Horizontals
        if (
            (y >= 0 && y <= 3) ||
            (y >= 7 && y <= 10) ||
            (y >= 14 && y <= 17) ||
            (y >= 21 && y <= 24) ||
            (y >= 28 && y <= 31) ||
            (y >= 35 && y <= 38)
        ) {
            const squares1 = squares[y];
            const squares2 = squares[y + 1];
            const squares3 = squares[y + 2];
            const squares4 = squares[y + 3];


            if (
                squares1.classList.contains('pl-red') &&
                squares2.classList.contains('pl-red') &&
                squares3.classList.contains('pl-red') &&
                squares4.classList.contains('pl-red')
            ) {
                current.innerHTML = 'Red Wins - Horizontal!';
                winningCond = 1;
            } 

            if (
                squares1.classList.contains('pl-yellow') &&
                squares2.classList.contains('pl-yellow') &&
                squares3.classList.contains('pl-yellow') &&
                squares4.classList.contains('pl-yellow')
            ) {
                current.innerHTML = 'Yellow Wins - Horizontal!';
                winningCond = 2;
            }
        }

        // check the diagonal lefts
        if (
            (y >= 0 && y <= 3) ||
            (y >= 7 && y <= 10) ||
            (y >= 14 && y <= 17)
        ) {
            const squares1 = squares[y];
            const squares2 = squares[y + 8];
            const squares3 = squares[y + 16];
            const squares4 = squares[y + 24];

            if (
                squares1.classList.contains('pl-red') &&
                squares2.classList.contains('pl-red') &&
                squares3.classList.contains('pl-red') &&
                squares4.classList.contains('pl-red')
            ) {
                current.innerHTML = 'Red Wins! - Left Diagonal!';
                winningCond = 1;
            } 

            if (
                squares1.classList.contains('pl-yellow') &&
                squares2.classList.contains('pl-yellow') &&
                squares3.classList.contains('pl-yellow') &&
                squares4.classList.contains('pl-yellow')
            ) {
                current.innerHTML = 'Yellow Wins - Left Diagonal!';
                winningCond = 2;
            }
        }

        // check the diagonal rights
        if (
            (y >= 3 && y <= 6) ||
            (y >= 10 && y <= 13) ||
            (y >= 17 && y <= 20)
        ) {
            const squares1 = squares[y];
            const squares2 = squares[y + 6];
            const squares3 = squares[y + 12];
            const squares4 = squares[y + 18];

            if (
                squares1.classList.contains('pl-red') &&
                squares2.classList.contains('pl-red') &&
                squares3.classList.contains('pl-red') &&
                squares4.classList.contains('pl-red')
            ) {
                current.innerHTML = 'Red Wins - Right Diagonal!';
                winningCond = 1;
            } 

            if (
                squares1.classList.contains('pl-yellow') &&
                squares2.classList.contains('pl-yellow') &&
                squares3.classList.contains('pl-yellow') &&
                squares4.classList.contains('pl-yellow')
            ) {
                current.innerHTML = 'Yellow Wins - Right Diagonal!';
                winningCond = 2;
            }
        }

    }

    if (winningCond == 1) {
        alert("Red Wins! Click to reset");
        winningCond = 0;
        document.location.reload(false);
    }
    else if (winningCond == 2) {
        alert("Yellow Wins! Click to reset");
        winningCond = 0;
        document.location.reload(false);
    }

}


for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {

        
        if (playNum != currentPlayer) {
            alert("Not Your Turn");
            return;
        }
        

        //if the lower square is taken, you can place a chip
        if (squares[i + 7].classList.contains('taken') && !squares[i].classList.contains('taken')) {
            if (currentPlayer == 1) {
                squares[i].classList.add('taken');
                squares[i].classList.add('pl-red');
                currentPlayerText = 'Yellow\'s Turn';
                currentPlayer = 2;
                current.innerHTML = currentPlayerText;
            } else if (currentPlayer == 2) {
                squares[i].classList.add('taken');
                squares[i].classList.add('pl-yellow');
                currentPlayerText = 'Red\'s Turn';
                currentPlayer = 1;
                current.innerHTML = currentPlayerText;
            } 


            console.log("click listener:" + playNum);
            socket.emit('movement', {i:i, currentPlayer:currentPlayer, currentPlayerText:currentPlayerText, playNum:playNum});


            

        } else alert('Can\'t place chip here');

        

        checkWin();

        
    }

}

socket.emit('whatPlayer');
