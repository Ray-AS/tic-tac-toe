const Gameboard = (function () {
  const combos = [
    // Check row combos
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Check column combos
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Check diagonal combos
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  const getBoard = function () {
    return board;
  };

  const updateBoard = function (row, col, value) {
    if (board[row][col] == " ") {
      board[row][col] = value;
      return true;
    } else {
      return false;
    }
  };

  const checkState = function () {
    let winner = " ";

    combos.forEach(function (combo) {
      const [a, b, c] = combo;
      let cellA = board[a[0]][a[1]];
      let cellB = board[b[0]][b[1]];
      let cellC = board[c[0]][c[1]];

      if (cellA === cellB && cellB === cellC && cellA != " ") {
        winner = cellA;
      }
    });

    if (winner === " " && board.flat().every((cell) => cell != " ")) {
      winner = "D";
    }

    return winner;
  };

  const resetBoard = function () {
    board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
  };

  return { getBoard, updateBoard, checkState, resetBoard };
})();

const Player = function (name, marker) {
  const getName = function () {
    return name;
  };

  const getMarker = function () {
    return marker;
  };

  const makeMove = function (row, col, board) {
    return board.updateBoard(row, col, marker);
  };

  return { getName, getMarker, makeMove };
};

const DisplayController = (function () {
  const createBoard = function (board, callback) {
    const container = document.getElementById("board");
    container.innerHTML = "";
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = board[row][col];
        cell.dataset.row = row;
        cell.dataset.col = col;

        cell.addEventListener("click", callback);

        container.appendChild(cell);
      }
    }
  };

  const updateBoard = function (board) {
    const cells = document.querySelectorAll(".cell");
    let currentBoard = board.flat();

    cells.forEach((cell, index) => {
      cell.textContent = currentBoard[index];
    });
  };

  const displayMessage = function (message) {
    document.getElementById("message").textContent = message;
  };

  const displayTurn = function (playerName) {
    document.getElementById("turn").textContent = `Current Turn: ${playerName}`;
  };

  const updateScore = function (p1Wins, p2Wins, draws) {
    document.getElementById("score").textContent =
      `Player 1: ${p1Wins} | Player 2: ${p2Wins} | Draws: ${draws}`;
  };

  return { createBoard, updateBoard, displayMessage, displayTurn, updateScore };
})();

const Game = function () {
  const board = Gameboard;
  const display = DisplayController;
  const p1 = new Player("Player 1", "X");
  const p2 = new Player("Player 2", "O");
  let currentPlayer = [p1, p2][Math.floor(Math.random() * 2)];
  let gameActive = true;
  let scores = { p1: 0, p2: 0, draws: 0 };

  const resetGame = function () {
    setTimeout(() => {
      board.resetBoard();
      display.updateBoard(board.getBoard());
      display.displayMessage("");
      currentPlayer = [p1, p2][Math.floor(Math.random() * 2)];
      display.displayTurn(currentPlayer.getName());
      gameActive = true;
    }, 2000);
  };

  const playTurn = function (event) {
    const cell = event.currentTarget;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    currentPlayer.makeMove(row, col, board);

    display.updateBoard(board.getBoard());

    state = board.checkState();

    if (state === "D") {
      display.displayMessage("The game ended in a draw");
      resetGame();
    } else if (state != " ") {
      display.displayMessage(
        `The game has ended! Winner: ${currentPlayer.getName()}`,
      );
      resetGame();
    }

    currentPlayer = currentPlayer === p1 ? p2 : p1;
  };

  const playGame = function () {
    display.createBoard(board.getBoard(), playTurn);
  };

  return { playGame };
};

const tictactoe = new Game();

tictactoe.playGame();
