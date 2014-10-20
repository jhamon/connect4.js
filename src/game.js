(function () {
  "use strict";

  // Top-level namespace: ConnectFour
  var ConnectFour = window.ConnectFour = (window.ConnectFour || {});

  var Game = ConnectFour.Game = function (options) {
    // Dependency injection: options.board
    var options       = options || {};
    this.board        = options.board || new ConnectFour.Board({rows: 6, columns: 7});
    this.currentColor = "red";
  };

  Game.prototype.reset = function () {
    this.board        = new ConnectFour.Board({rows: 6, columns: 7});
    this.currentColor = "red";
  }

  Game.prototype.swapTurns = function () {
    this.currentColor = this.currentColor === "red" ? "black" : "red";
    return this.currentColor;
  };

  Game.prototype.makeMove = function (position) {
    return this.board.moveAtPosition({ 
      color    : this.currentColor,
      position : position
    });
  };

  Game.prototype.checkIfGameWon = function (position) {
    // To evaluate whether a win condition has been triggered
    // we need only consider the row, column, and diagonals
    // that contain the last played move.
    if (this._columnWinCondition(position) 
          || this._rowWinCondition(position) 
          || this._diagonalWinCondition(position)
          ) {
      return true;
    }

    return false;
  };

  Game.prototype.isGameOver = function () {
    return this.board.availableMovesCount() === 0;
  }

  Game.prototype._columnWinCondition = function (position) {
    // Returns true if a connect four has been made vertically
    return this._fourInARow(this.board.columnAtPosition(position));
  };

  Game.prototype._rowWinCondition = function (position) {
    // Returns true if a connect four has been made horizontally
    return this._fourInARow(this.board.rowAtPosition(position));
  };

  Game.prototype._diagonalWinCondition = function (position) {
    // Returns true if a connect four has been made along either
    // of the diagonals.
    var diagonal1 = this.board.diagonal1AtPosition(position);
    if (this._fourInARow(diagonal1)) {
      return true;
    }

    var diagonal2 = this.board.diagonal2AtPosition(position);
    if (this._fourInARow(diagonal2)) {
      return true;
    }

    return false;
  };

  Game.prototype._fourInARow = function (array) {
    // Returns true if the given array contains four
    // identical items in a row. Otherwise false.
    var lastItem = array[0];
    var seenInARow = 1;

    for (var i = 1; i < array.length; i++) {
      if (array[i] === lastItem && array[i] !== ConnectFour.MARKERS.empty) {
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