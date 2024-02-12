const Gameboard = (function () {
    let board = [];
    const rows = 3;
    const columns = 3;
    let currentTurn;
    let availableCells;

    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let column = 0; column < columns; column++) {
            board[row].push(new Cell());
        }
    }
    
    const getBoard = () => board;

    const addMarker = (x, y) => {
        board[x][y] = currentTurn.marker;
    }
    
    const getTurn = () => currentTurn;

    const changeTurn = (player) => {
        currentTurn = player;
    }

    const getAvailableCells = () => {
        availableCells = board;
        availableCells = availableCells.map((row, index) => {
            let newRow = row.filter((cell, index) => !(cell instanceof Cell));
            console.log(newRow);
            return newRow;
        });
        console.table(availableCells);
    }

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
    

    return {
        getBoard,
        addMarker,
        getTurn,
        changeTurn,
        checkCellAvailability,
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
}

function playRound(player) {
    let currentCell = prompt("Choose a cell to mark");
    currentCell = currentCell.split(" ");

    while (!(Gameboard.checkCellAvailability(currentCell[0], currentCell[1]))) {
        currentCell = prompt("Choose a different cell");
        currentCell = currentCell.split(" ");
    }

    Gameboard.addMarker(currentCell[0], currentCell[1]);
    console.table(Gameboard.getBoard());
}

const Controller = (function () {
    const playerX = new Player("Player One", "X");
    const playerO = new Player("Player Two", "O");
    
    Gameboard.changeTurn(playerX);

    while (true)
        {playRound(Gameboard.getTurn());

        if (Gameboard.getTurn() == playerX) {
            Gameboard.changeTurn(playerO);
        } else {
            Gameboard.changeTurn(playerX);
        }
    }

    return {
        playerX,
        playerO,
    }
})();
