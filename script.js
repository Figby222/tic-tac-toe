const Gameboard = (function () {
    let board = [];
    const rows = 3;
    const columns = 3;

    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let column = 0; column < columns; column++) {
            board[row].push (Cell());
        }
    }
    
    const getBoard = () => board;
    
    

    return {
        getBoard,
    }
})();

function Cell() {
    let marker;

    const markCell = (player) => marker = player;

    const getMark = () => marker;

    return {
        markCell,
        getMark,
    }
}

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

function playRound(player) {
    let currentCell = prompt("Choose a cell to mark");
    currentCell = currentCell.split(" ");
    while ((currentCell[0] > 2 || currentCell[0] < 0) || (currentCell[1] > 2 || currentCell[1] < 0)) {
        currentCell = prompt("Choose a proper cell");
        currentCell.split(" ");
    }
    Gameboard.markCell(player, currentCell[0], currentCell[1]);
}

const Controller = (function () {
    const playerX = new Player("Player One", "X");
    const playerO = new Player("Player Two", "O");

    playRound(playerX);

    return {
        playerX,
        playerO,
    }
})();
