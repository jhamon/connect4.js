(function () {
  "use strict";

  // Top-level namespace: ConnectFour
  var ConnectFour = window.ConnectFour = (window.ConnectFour || {});

  ConnectFour.MARKERS = {
    black: 1,
    red: -1,
    empty: 0
  }

  var Board = ConnectFour.Board = function (options) {
    var col;
    this.width  = options.columns;
    this.height = options.rows;
    this.cells = [];

    for (var x = 0; x < this.width; x++) {
      col = [];
      for (var y = 0; y < this.height; y++) {
        col.push(ConnectFour.EMPTY);
      }
      this.cells.push(col);
    }
  };

  Board.prototype.columns = function () {
    return this.cells;
  };

  Board.prototype.rows = function () {
    var numberColumns = this.cells[0].length;
    var columns = [];

    function addRow (row) {
      columns[r].push(row[r]);
    }

    for (var r = 0; r < numberColumns; r++) {
      columns.push([]);
      this.cells.forEach(addRow);
    }

    return columns;
  };

  Board.prototype.moveAtPosition = function (options) {
    // Returns position of move marked on board, or 
    // undefined if a move is unavailable in the selected column.
    var color = options.color;
    var columnArr = this.columns()[options.column];

    for (var i = columnArr.length-1; i >= 0; i--) {
      if (columnArr[i] === ConnectFour.EMPTY) {
        columnArr[i] = ConnectFour.MARKERS[color];
        return {column: options.column, row: i};
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
    if (currentValue !== ConnectFour.EMPTY) {
      throw "That position is already taken.";
    }

    if (color === "red") {
      this.cells[position.row][position.column] = ConnectFour.MARKERS.red;
    } else {
      this.cells[position.row][position.column] = ConnectFour.MARKERS.black;
    }

    return color;
  };

  Board.prototype.columnAtPosition = function (position) {
    return this.columns()[position.column];
  };

  Board.prototype.rowAtPosition = function (position) {
    return this.rows()[position.row];
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

  Board.prototype.availableMoves = function () {
    var emptySpaces = 0;

    this.cells.forEach( function (cell) {
      if (cell === ConnectFour.EMPTY) {
        emptySpaces += 1;
      }
    });
      return emptySpaces;
  }
})();