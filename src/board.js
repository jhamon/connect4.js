(function () {
  "use strict";

  // Top-level namespace: ConnectFour
  var ConnectFour = window.ConnectFour = (window.ConnectFour || {});

  ConnectFour.WIDTH  = 7;
  ConnectFour.HEIGHT = 6;

  ConnectFour.MARKERS = {
    black : "r",
    red   : "b",
  }

  var Board = ConnectFour.Board = function (options) {
    if (options.cells) {
      // Allow dependency injection for testing purposes
      this.cells = options.cells; 
      return;
    }

    this.cells = [];
    for (var i = 0; i < ConnectFour.WIDTH; i++) { 
      this.cells.push([]);
    }

    return this;
  };

  Board.prototype.print = function () {
    var lines = []
    for (var h = ConnectFour.HEIGHT+1; h > 1; h--) {
      var line = "";
      this.cells.map(function (col) {
        console.log("Mapping with h: " + h);
        console.log("Column is: " + col)
        var currentEl = col[h];
        var show = currentEl === undefined ? "x" : currentEl;
        line += show;
      });
      lines.push(line);
    }

    console.log(lines.join("\n"));
  };

  Board.prototype.moveAtPosition = function (options) {
    // Returns position of move marked on board, or 
    // undefined if a move is unavailable.  The loop in this
    // method has the effect of finding the lowest unoccupied
    // position in the selected column. 

    var color          = options.color;
    var columnIndex    = options.position.column;
    var columnContents = this.cells[columnIndex];

    if (columnContents.length < ConnectFour.HEIGHT) {
      var rowIndex = columnContents.push(ConnectFour.MARKERS[color]);
      return { column: columnIndex, row: rowIndex };
    }

    return undefined;
  };

  Board.prototype.getColorAt = function (position) {
    return this.cells[position.column][position.row];
  };

  Board.prototype.columnAtPosition = function (position) {
    return this.cells[position.column];
  };

  Board.prototype.rowAtPosition = function (position) {
    var targetRowIndex = position.row;

    return this.cells.map( function (column) {
      return column[targetRowIndex];
    });
  };

  Board.prototype._diagonalCount = function (column, column_incrementer) {
    // Counts the connected elements along a slope passing through the last
    // move of the given column.
    //
    // column should be the index of the column to start with.
    //
    // column_incrementer is a function that should take the column index and
    // increment or decrement depending on which diagonal direction we are counting.
    var startIndex = this.cells[column].length - 1;
    var startColor = this.cells[column][startIndex];
    var count      = 0;

    var colIndex = column;
    var rowIndex = this.cells[column].length-1;

    while (validRow(rowIndex) && validColumn(colIndex)) {

      if (this.cells[colIndex][rowIndex] === startColor) {
        count += 1;
        colIndex = column_incrementer(colIndex);
        rowIndex -= 1;
      } else {
        // if we reach a color different than the one we began with, we break.
        // We're only interested in the number of connected components.
        break;
      }
    }

    return count;
  };

  function validRow(rowIndex) {
    return rowIndex < ConnectFour.HEIGHT && rowIndex >= 0;
  }

  function validColumn(colIndex) {
    return colIndex < ConnectFour.WIDTH && colIndex >= 0;
  }

  Board.prototype.firstDiagonalCount = function (column) {
    // Counts the connected components along the negative slope 
    // diagonal beginning at the top of the given column.
    //
    // For the board below:
    //    firstDiagonalCount(3) // 2
    //    firstDiagonalCount(1) // 3 
    //    firstDiagonalCount(0) // 1
    //    firstDiagonalCount(6) // 2
    //
    // r b r b     r
    // r b b r b r b
    // r b r b b r r
    // 0 1 2 3 4 5 6 <--- column
    return this._diagonalCount(column, function (c) { return c += 1; })
  }

  Board.prototype.secondDiagonalCount = function (column) {
    // Counts the connected components along the positive slope 
    // diagonal beginning at the top of the given column.
    //
    // For the board below:
    //    secondDiagonalCount(3) // 3
    //    secondDiagonalCount(1) // 1 
    //    secondDiagonalCount(0) // 1
    //    secondDiagonalCount(6) // 2
    //
    // r b r b     r
    // r b b r b r b
    // r b r b b r r
    // 0 1 2 3 4 5 6 <--- column
    return this._diagonalCount(column, function (c) { return c -= 1; });
  }

  Board.prototype.columnCount = function (column) {
    // Count the places connected columnwise to the last move in a given column.
    //
    // For the board below:
    //    columnCount(0) // 1 (one red)
    //    columnCount(1) // 3 (three black)
    //    columnCount(4) // 2 (two black)
    //
    // r b r   b r 
    // b b r r b r
    // b b b r r b
    // 0 1 2 3 4 5 6 <--- column
    var col          = this.cells[column];
    var currentIndex = col.length - 1;
    var count        = 0;

    while (validRow(currentIndex) && col[currentIndex] === col[-1]) {
      count++;
      currentIndex--;
    }

    return count;
  }

  Board.prototype.rowCount = function (column) {
    // Count the places connected row-wise to the last move in a given column
    // For the board below:
    //    rowCount(0) // 3 (three red)
    //    rowCount(1) // 3 (three red)
    //    rowCount(3) // 2 (two red)
    //    rowCount(4) // 1 (one black)
    //
    // r r r   b r 
    // b b r r b r
    // b b b r r b
    // 0 1 2 3 4 5 6 <--- column
    var rowIndex = this.cells[column].length - 1;
    var row      = this.cells.map( function (col) { return col[rowIndex] });
    var count    = 0;

    var colIndex = column;
    // First count to the left
    while (validColumn(colIndex) && row[colIndex] === row[column]) {
      count++;
      colIndex--;
    }

    colIndex = column + 1;
    // Then count to the right
    while (validColumn(colIndex) && row[colIndex] === row[column]) {
      count++;
      colIndex++;
    }

    return count;
  }

  Board.prototype.availableMovesCount = function () {
    var emptySpaces = 0;

    return this.cells.reduce( function (sum, column) {
      return sum + (ConnectFour.HEIGHT - column.length);
   }, 0);
  };
})();