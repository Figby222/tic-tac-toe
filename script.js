const Gameboard = (function () {
    let board = [];
    const rows = 3;
    const columns = 3;
    let currentTurn = 1;
    let players = [];
    const grid = document.querySelector('.grid-container')

    const getGrid = () => grid;

    const addGridNode = (node) => {
        grid.appendChild(node);
    }

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
        board[x][y].setMark(getTurn());
    }
    
    const getTurn = () => players[currentTurn % 2];

    const changeTurn = () => {
        currentTurn++;
    }


    const checkCellAvailability = (xPos, yPos) => {
        if(
            (!board[xPos][yPos].marker) &&
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
                return row.every((column) => column.marker == playerMarker);
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
                if (board.every((row) => row[column].marker == playerMarker)) {
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
                if (board[row][column].marker != playerMarker) {
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
                if (board[row][column].marker != playerMarker) {
                    return false;
                }

                if (row == 2 && column == 0) {
                    return true;
                }

                row++;
                column--;
            }
        };

        const checkDraw = () => {
            return !board.some((row) => {
                return row.some((column) => !column.marker); 
            });
        }

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
        } else if (checkDraw()) {
            return "Draw" 
        } else {
            console.log(board[0][0]);
            return false;
        }
    }

    return {
        getGrid,
        addGridNode,
        addPlayer,
        setBoard,
        getBoard,
        addMarker,
        getTurn,
        changeTurn,
        checkCellAvailability,
        checkWin,
    }
})();

function Cell() {
    this.marker;
    this.node;
}

Cell.prototype.setMarker = function (marker) { this.marker = marker; };
Cell.prototype.getMarker = function () { return this.marker };
Cell.prototype.setNode = function (node) { this.node = node; }
Cell.prototype.getNode = function () { return this.node }
Cell.prototype.createNode = function () {
    const win = document.querySelector(".win");
    this.node = document.createElement("div");
        this.node.classList.add("cell");
        this.node.addEventListener('click', () => {
            if (!this.node.textContent) {
                this.node.textContent = Gameboard.getTurn().marker;
                this.setMarker(Gameboard.getTurn().marker);
                Gameboard.changeTurn();
                win.textContent = "Winner: " + Gameboard.checkWin();
            }
        })
    Gameboard.addGridNode(this.node);
}

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.wins = 0;
    Gameboard.addPlayer(this);
}

function playRound() {
    setGame();
    function setGame() {
        Gameboard.setBoard();

        Gameboard.getGrid().textContent = "";
            Gameboard.getBoard().forEach((row) => {
                row.forEach((cell) => {
                    cell.createNode();
                })
            }) 
    }
    const reset = document.querySelector('.reset');

    reset.addEventListener('click', setGame);
    
}

const Controller = (function () {
    const playerX = new Player("Player One", "X");
    const playerO = new Player("Player Two", "O");
    console.log("hi");
    
    
    playRound();
    let newGame = true;
    // while(newGame) {
    //     playRound();

    //     newGame = confirm("Would you like to start a new game?", false);
    // }
    return {
        playerX,
        playerO,
    }
})();
