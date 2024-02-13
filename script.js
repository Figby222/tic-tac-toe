const Gameboard = (function () {
    let board = [];
    const rows = 3;
    const columns = 3;
    let currentTurn = 1;
    let players = [];
    // let availableCells;

    const addPlayer = (player) => {
        players.push(player);
    }
    const setBoard = function() { 
        for (let row = 0; row < rows; row++) {
            board[row] = [];
            for (let column = 0; column < columns; column++) {
                board[row].push(new Cell());
            }
        }
    };

    const getBoard = () => board;

    const addMarker = (x, y) => {
        board[x][y] = getTurn().marker;
    }
    
    const getTurn = () => players[currentTurn % 2];

    const changeTurn = () => {
        currentTurn++;
    }

    // const getAvailableCells = () => {
    //     availableCells = board;
    //     availableCells = availableCells.map((row, index) => {
    //         let newRow = row.filter((cell, index) => !(cell instanceof Cell));
    //         console.log(newRow);
    //         return newRow;
    //     });
    //     console.table(availableCells);
    // }

    const checkCellAvailability = (xPos, yPos) => {
        if(
            (board[xPos][yPos] instanceof Cell) &&
            (xPos <= 2 && xPos >= 0) &&
            (yPos <= 2 && yPos >= 0) &&
            !(isNaN(xPos)) &&
            !(isNaN(yPos))
        ) {
                return true;
        } else {
                return false;
        }
    }

    const checkWin = () => {
        const winRow = function (playerMarker) {
            return board.some((row) => {
                return row.every((column) => column == playerMarker);
            });
        };

        // const winRowO = board.some((row) => {
        //     return row.every((column) => column == "O");
        // });

        // const winColumnX = function (playerMarker) {
        //     for (let column = 0; column < 3; column++) {
        //         if (board.every((row) => row[column] == playerMarker)) {
        //             return true;
        //         }
        //     }
        //     return false;
        // };

        const winColumn = function(playerMarker) {
            for (let column = 0; column < 3; column++) {
                if (board.every((row) => row[column] == playerMarker)) {
                    return true;
                }
            }
            return false;
        };

        const winDiagonal = function(playerMarker) {
            // top start
            let row = 0;
            let column = 0;

            while(row <= 2 && column <= 2) {
                if (board[row][column] != playerMarker) {
                    break;
                }
                

                if (row == 2 && column == 2) {
                    return true;
                }
                row++;
                column++;
            }

            //bottom start
            row = 0;
            column = 2;
            
            while (row <= 2 && column >= 0) {
                if (board[row][column] != playerMarker) {
                    return false;
                }

                if (row == 2 && column == 0) {
                    return true;
                }

                row++;
                column--;
            }
        };

        // const winDiagonalTopX = (function () {
        //     for (let row = 0; row < 3; row++) {
        //         if (board.every((column) => ))
        //     }
        // })();



        // const winColumnX = board.some((column) => {
        //     console.log("debug");
        //     return board.every((row) => {
        //         console.log(row[column]);
        //         return row[column] == "X";
        //     });
        // });
            

        // const winColumnX = 
        //     board.every((row) => {
        //         return row[0] == "X";
        //     }) ? true :
        //     board.every((row) => {
        //         return row[1] == "X";
        //     }) ? true:
        //     board.every((row) => {
        //         return row[2] == "X";
        //     }) ? true :
        //     false;

        // let column0 = false;
        //     if (
        //         board[0][2] == "X" &&
        //         board[1][2] == "X" &&
        //         board[2][2] == "X"
        //     ) {
        //         column0 = true;
        //     } else {
        //         column0 = false;
        //     }
        // let row0 =
        //     (board[0].every("X")) ? true :
        //     (board[0].every("Y")) ? true :
        //     false;
        // let row1;
        // let row2

        if (winRow(players[0].marker)) {
            players[0].wins++;
            return players[0].marker;
        } else if (winRow(players[1].marker)) {
            players[1].wins++;
            return players[1].marker;
        } else if (winColumn(players[0].marker)) {
            players[0].wins++;
            return players[0].marker;
        } else if (winColumn(players[1].marker)) {
            players[1].wins++;
            return players[1].marker;
        } else if (winDiagonal(players[0].marker)) {
            players[0].wins++;
            return players[0].marker;
        } else if (winDiagonal(players[1].marker)) {
            players[1].wins++;
            return players[1].marker; 
        } else {
            return false;
        }
    }

    return {
        addPlayer,
        setBoard,
        getBoard,
        addMarker,
        getTurn,
        changeTurn,
        checkCellAvailability,
        checkWin,
        // getAvailableCells,
    }
})();

function Cell() {
    this.marker;
}

Cell.prototype.setMark = (player) => this.marker = player;
Cell.prototype.getMark = () => marker;

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.wins = 0;
    Gameboard.addPlayer(this);
}

function playRound() {
    while (!Gameboard.checkWin()) {
        let currentCell = prompt("Choose a cell to mark");
        currentCell = currentCell.split(" ");

        while (!(Gameboard.checkCellAvailability(currentCell[0], currentCell[1]))) {
            currentCell = prompt("Choose a different cell");
            currentCell = currentCell.split(" ");
        }

        Gameboard.addMarker(currentCell[0], currentCell[1]);
        console.table(Gameboard.getBoard());
        console.log("Winner: ", Gameboard.checkWin());
        Gameboard.changeTurn();
    }
}

const Controller = (function () {
    const playerX = new Player("Player One", "X");
    const playerO = new Player("Player Two", "O");
    
    let newGame = true;
    while(newGame) {
        Gameboard.setBoard();

        playRound();

        newGame = confirm("Would you like to start a new game?", false);
    }
    return {
        playerX,
        playerO,
    }
})();
