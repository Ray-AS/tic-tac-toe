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
    }

    const updateBoard = function (x, y, value) {
        if (board[y][x] == " ") {
            board[y][x] = value;
            return `${value} placed at position (${x}, ${y})`;
        }
        else {
            return "Position already occupied";
        }
    }

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
        }
        else {

            console.log(`Game in progress...`);
        }

        return winner;
    }

    return { getBoard, updateBoard, checkState };
}();

const Player = function (marker) {
    const getMarker = function () {
        return marker;
    }

    const makeMove = function (x, y, board) {
        board.updateBoard(x, y, marker);
    }

    return { getMarker, makeMove };
}