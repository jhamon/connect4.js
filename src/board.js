(function () {
  "use strict";

  // Top-level namespace: ConnectFour
  var ConnectFour = window.ConnectFour = (window.ConnectFour || {});

  ConnectFour.MARKERS = {
    black : 1,
    red   : -1,
    empty : 0
  }

  var Board = ConnectFour.Board = function (options) {
    var col;
    this.width  = options.columns;
    this.height = options.rows;

    if (options.cells) {
      // Allow dependency injection for testing purposes
      this.cells = options.cells; 
      return;
    }

    this.cells = [];

    for (var x = 0; x < this.width; x++) {
      col = [];
      for (var y = 0; y < this.height; y++) {
        col.push(ConnectFour.MARKERS.empty);
      }
      this.cells.push(col);
    }
  };

  Board.prototype.moveAtPosition = function (options) {
    // Returns position of move marked on board, or 
    // undefined if a move is unavailable.  The loop in this
    // method has the effect of finding the lowest unoccupied
    // position in the selected column. 

    var color    = options.color;
    var position = options.position;

    var columnArr = this.cells[position.column];

    for (var i = columnArr.length-1; i >= 0; i--) {
      if (columnArr[i] === ConnectFour.MARKERS.empty) {
        columnArr[i] = ConnectFour.MARKERS[color];
        return {column: position.column, row: i};
      }
    }

    return undefined;
  };

  Board.prototype.isEmptyAt = function (position) {
    return this.getColorAt(position) === ConnectFour.MARKERS.empty;
  };

  Board.prototype.getColorAt = function (position) {
    return this.cells[position.column][position.row];
  };

  Board.prototype.setColorAt = function (position, color) {
    var currentValue = this.getColorAt(position);
    if (currentValue !== ConnectFour.MARKERS.empty) {
      throw "That position is already taken.";
    }

    if (color === "red") {
      this.cells[position.column][position.row] = ConnectFour.MARKERS.red;
    } else {
      this.cells[position.column][position.row] = ConnectFour.MARKERS.black;
    }

    return color;
  };

  Board.prototype.columnAtPosition = function (position) {
    return this.cells[position.column];
  };

  Board.prototype.rowAtPosition = function (position) {
    var targetRowIndex = position.row;
    var targetRow = [];

    this.cells.forEach( function (column) {
      targetRow.push(column[targetRowIndex]);
    });

    return targetRow;
  };

  Board.prototype.diagonal1AtPosition = function (position) {
    // Returns an array of elements along the "positive slope"
    // diagonal passing through a given position.
    var upAndToRight = [this.getColorAt(position)];
    var downAndToLeft = [];

    var x = position.column;
    var y = position.row;

    while (x < this.width-1 && y > 0) {
      x += 1;
      y -= 1;
      upAndToRight.push(this.getColorAt({column: x, row: y}));
    }

    x = position.column;
    y = position.row;

    while (x > 0 && y < this.height-1) {
      x -= 1;
      y += 1;
      downAndToLeft.unshift( this.getColorAt({column: x, row: y}) );
    }

    var joined = downAndToLeft.concat(upAndToRight);
    return joined;
  };

  Board.prototype.diagonal2AtPosition = function (position) {
    // Returns an array of elements along the "negative slope"
    // diagonal passing through a given position.
    var upAndToLeft = [this.getColorAt(position)];
    var downAndToRight = [];

    var x = position.column;
    var y = position.row;

    while (x > 0 && y > 0) {
      x -= 1;
      y -= 1;
      upAndToLeft.push(this.getColorAt({column: x, row: y}));
    }

    x = position.column;
    y = position.row;

    while (x < this.width-1 && y < this.height-1) {
      x += 1;
      y += 1;
      downAndToRight.unshift( this.getColorAt({column: x, row: y}) );
    }

    var joined = downAndToRight.concat(upAndToLeft);
    return joined;
  };

  Board.prototype.availableMovesCount = function () {
    var emptySpaces = 0;
    debugger;
    this.cells.forEach( function (column) {
      column.forEach( function (cell) {
        if (cell === ConnectFour.MARKERS.empty) {
          emptySpaces += 1;
        }
      });
    });

    return emptySpaces;
  }
})();