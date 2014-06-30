(function () {
  "use strict";

  // Top-level namespace: ConnectFour
  var ConnectFour = window.ConnectFour = (window.ConnectFour || {});

  var Game = ConnectFour.Game = function () {
    this.board        = new ConnectFour.Board({rows: 6, columns: 7});
    this.currentColor = "red";
  };

  Game.prototype.reset = function () {
    this.board = new ConnectFour.Board({rows: 6, columns: 7});
    this.currentColor = "red";
  }

  Game.prototype.swapTurns = function () {
    this.currentColor = this.currentColor === "red" ? "black" : "red";
    return this.currentColor;
  };

  Game.prototype.makeMove = function (position) {
    return this.board.moveAtPosition({ 
      color  : this.currentColor,
      column : position.column,
      row    : position.row
    });
  };

  Game.prototype.checkIfGameWon = function (position) {
    // To evaluate whether a win condition has been triggered
    // we need only consider the row, column, and diagonals
    // that contain the last played move.
    if (this.columnWinCondition(position) 
          || this.rowWinCondition(position) 
          || this.diagonalWinCondition(position)
          ) {
      return true;
    }

    return false;
  };

  Game.prototype.columnWinCondition = function (position) {
    // Returns true if a connect four has been made vertically
    return this.fourInARow(this.board.columnAtPosition(position));
  };

  Game.prototype.rowWinCondition = function (position) {
    // Returns true if a connect four has been made horizontally
    return this.fourInARow(this.board.rowAtPosition(position));
  };

  Game.prototype.diagonalWinCondition = function (position) {
    // Returns true if a connect four has been made along either
    // of the diagonals.
    var diagonal1 = this.board.diagonal1AtPosition(position);
    var diagonal2 = this.board.diagonal2AtPosition(position);
    return this.fourInARow(diagonal1) || this.fourInARow(diagonal2);
  };

  Game.prototype.fourInARow = function (array) {
    // Returns true if the given array contains four
    // identical items in a row. Otherwise false.
    var lastItem = array[0];
    var seenInARow = 1;

    for (var i = 1; i < array.length; i++) {
      if (array[i] === lastItem && array[i] !== ConnectFour.EMPTY) {
        seenInARow += 1;
        if (seenInARow === 4) {
          return true;
        }
      } else {
        lastItem = array[i];
        seenInARow = 1;
      }
    }

    return false;
  };
})();