const Gameboard = function () {
    const combos = [
        // Check row combos
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Check column combos
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Check diagonal combos
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
    ]

    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ]

    const getBoard = function () {
        return board;
    };

    const updateBoard = function (x, y, value) {
        if (board[y][x] == " ") {
            board[y][x] = value;
            return true;
        }
        else {
            return false;
        }
    };

    const checkState = function () {
        let winner = " ";

        combos.forEach(function (combo) {
            const [a, b, c] = combo;
            let cellA = board[a[1]][a[0]];
            let cellB = board[b[1]][b[0]];
            let cellC = board[c[1]][c[0]];

            if (cellA === cellB && cellB === cellC && cellA != " ") {
                winner = cellA;
            }
        });

        if (board.flat().every(cell => cell != " ")) {
            winner = "D";
        }

        return winner;
    };

    return { getBoard, updateBoard, checkState };
}();

const Player = function (marker) {
    const getMarker = function () {
        return marker;
    };

    const makeMove = function (x, y, board) {
        return board.updateBoard(x, y, marker);
    };

    return { getMarker, makeMove };
}

const DisplayController = function () {
    const displayBoard = function (board) {
        console.log(board.getBoard());
    };

    const displayMessage = function (message) {
        console.log(message);
    };

    const getValues = function () {
        let x = parseInt(prompt("Enter column: "));
        let y = parseInt(prompt("Enter row: "));

        return { x, y };
    }; 0

    return { displayBoard, displayMessage, getValues };
}();

const Game = function () {
    const board = Gameboard;
    const display = DisplayController;
    const p1 = new Player("X");
    const p2 = new Player("O");
    let currentPlayer = [p1, p2][Math.floor(Math.random() * 2)];

    const playTurn = function (player) {
        display.displayBoard(board);

        let result;
        let x, y;

        do {
            ({ x, y } = display.getValues());
            result = player.makeMove(x, y, board);

            if (!result) display.displayMessage(`Position (${x},${y}) already occupied.`);
        } while (!result);

        display.displayMessage(`${player.getMarker()} placed at position (${x}, ${y})`);
    };

    const playGame = function () {
        let state;

        do {
            currentPlayer = currentPlayer === p1 ? p2 : p1;
            playTurn(currentPlayer);

            state = board.checkState();

            if (state === "D") {
                display.displayMessage("The game ended in a draw");
                return;
            }
            else if (state === " ") display.displayMessage("Game in progress...");
        } while (state === " ");

        display.displayMessage(`The game has ended! Winner: ${currentPlayer.getMarker()}`);
    };

    return { playGame };
};

const tictactoe = new Game();

tictactoe.playGame();