const Gameboard = (function () {
    let board = [];
    const rows = 3;
    const columns = 3;
    let currentTurn;

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

    return {
        getBoard,
        addMarker,
        getTurn,
        changeTurn,
    }
})();

function Cell() {
    this.marker;

    const setMark = (player) => this.marker = player;

    const getMark = () => marker;

    // return {
    //     setMark,
    //     getMark
    // }
}

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
}

function playRound(player) {
    let currentCell = prompt("Choose a cell to mark");
    currentCell = currentCell.split(" ");

    while ((currentCell[0] > 2 || currentCell[0] < 0) || (currentCell[1] > 2 || currentCell[1] < 0) || isNaN(currentCell[0]) || isNaN(currentCell[1])) {
        currentCell = prompt("Choose a proper cell");
        currentCell.split(" ");
    }

    Gameboard.addMarker(currentCell[0], currentCell[1]);
    console.table(Gameboard.getBoard());
    
}

const Controller = (function () {
    const playerX = new Player("Player One", "X");
    const playerO = new Player("Player Two", "O");
    
    Gameboard.changeTurn(playerX);

    while (true)
        {playRound(Gameboard.currentTurn);

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
