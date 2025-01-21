var TicTacToc = /** @class */ (function () {
    function TicTacToc(statusElement, resetButton) {
        var _this = this;
        this.board = [];
        this.currentPlayer = "X";
        this.isGameOver = false;
        this.initializeGame = function () {
            var boardContainer = document.querySelectorAll(".grid-item");
            boardContainer.forEach(function (cell, index) {
                cell.addEventListener("click", function () { return _this.handleMove(index); });
            });
            _this.renderBoard();
            _this.statusElement.textContent = "Turno: ".concat(_this.currentPlayer);
            _this.resetButton.addEventListener("click", function () { return _this.reset(); });
        };
        this.renderBoard = function () {
            var boardContainer = document.querySelectorAll(".grid-item");
            boardContainer.forEach(function (cell, index) {
                cell.textContent = _this.board[index];
            });
        };
        this.handleMove = function (index) {
            console.log("1 le di click a la celda: ".concat(index));
            if (_this.board[index] !== null || _this.isGameOver) {
                return;
            }
            console.log("2 le di click a la celda: ".concat(index));
            console.log(_this.currentPlayer);
            _this.board[index] = _this.currentPlayer;
            _this.renderBoard();
            if (_this.checkWinner()) {
                //ganador
                _this.statusElement.textContent = "Ganador: ".concat(_this.currentPlayer);
                _this.isGameOver = true;
            }
            else if (_this.board.every(function (cell) { return cell !== null; })) {
                //empate
                _this.statusElement.textContent = "Empate!";
                _this.isGameOver = true;
            }
            else {
                // juego sigue
                _this.currentPlayer = _this.currentPlayer === "X" ? "O" : "X";
                _this.statusElement.textContent = "Turno: ".concat(_this.currentPlayer);
            }
        };
        this.checkWinner = function () {
            var winningCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            for (var i = 0; i < winningCombinations.length; i++) {
                var _a = winningCombinations[i], a = _a[0], b = _a[1], c = _a[2];
                if (_this.board[a] && _this.board[a] === _this.board[b] && _this.board[a] === _this.board[c]) {
                    return true;
                }
            }
            return false;
        };
        this.reset = function () {
            _this.board.forEach(function (_, index) {
                _this.board[index] = null;
            });
            _this.currentPlayer = "X";
            _this.isGameOver = false;
            _this.statusElement.textContent = "Turno: ".concat(_this.currentPlayer);
            _this.renderBoard();
        };
        console.log("Objeto creado");
        this.statusElement = statusElement;
        this.resetButton = resetButton;
        for (var i = 0; i < 9; i++) {
            this.board.push(null);
        }
        this.initializeGame();
    }
    return TicTacToc;
}());
var main = function () {
    console.log("Se ejecuto el main");
    var statusElement = document.getElementById("game-status");
    var resetButton = document.getElementById("reset-button");
    new TicTacToc(statusElement, resetButton);
};
main();
