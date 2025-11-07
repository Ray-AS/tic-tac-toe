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
            console.log(`${value} placed at position (${x}, ${y})`);
            return true;
        }
        else {
            console.log("Position already occupied");
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

        if (winner != " ") {
            console.log(`The game has ended! Winner: ${winner}`);
        }
        else if (board.flat().every(cell => cell != " ")) {
            console.log("The game ended in a draw");
            winner = "D";
        }
        else {

            console.log(`Game in progress...`);
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

const TicTacToe = function () {
    const gameboard = Gameboard;
    const p1 = Player("X");
    const p2 = Player("O");
    let turn = 0;

    const playGame = function () {
        while (gameboard.checkState() === " ") {
            console.log(gameboard.getBoard());
            if (turn % 2 == 0) {
                console.log(`Player ${p1.getMarker()}'s turn.`);

                let result = false;

                while (!result) {
                    let x = parseInt(prompt("Choose column: "));
                    let y = parseInt(prompt("Choose row: "));

                    result = p1.makeMove(x, y, gameboard);
                }

                turn += 1;
            }
            else {
                console.log(`Player ${p2.getMarker()}'s turn.`);

                let result = false;

                while (!result) {
                    let x = parseInt(prompt("Choose column: "));
                    let y = parseInt(prompt("Choose row: "));

                    result = p2.makeMove(x, y, gameboard);
                }

                turn += 1;
            }
        }
    };

    return { playGame }
};

const game = TicTacToe();
game.playGame();