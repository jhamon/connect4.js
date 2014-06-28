(function () {
  "use strict";

  // Top-level namespace: ConnectFour
  var ConnectFour = window.ConnectFour = (window.ConnectFour || {});

  ConnectFour.DEFAULT_VALUE = 0;

  var Board = ConnectFour.Board = function (width, height) {
    var row;
    this.cells = [];

    for (var y = 0; y < height; y++) {
      row = [];
      for (var x = 0; x < width; x++) {
        row.push(ConnectFour.DEFAULT_VALUE);
      }
      this.cells.push(row);
    }
  };

  Board.prototype.rows = function () {
    return this.cells;
  };

  Board.prototype.columns = function () {
    var numberColumns = this.cells[0].length;
    var columns = [];

    for (var c = 0; c < numberColumns; c++) {
      columns.push([]);
      this.cells.forEach( function (row) {
        columns[c].push(row[c]);
      });
    }

    return columns;
  };

  Board.prototype.isEmptyAt = function (position) {
    return this.getValueAt(position) === ConnectFour.DEFAULT_VALUE;
  }

  Board.prototype.getValueAt = function (position) {
    return this.cells[position.row][position.column];
  }

  Board.prototype.setValueAt = function (position, value) {
    var currentValue = this.getValueAt(position);
    if (currentValue !== ConnectFour.DEFAULT_VALUE) {
      throw "That position is already taken."
    }

    this.cells[position.row][position.column] = value;
    return value;
  }

  Board.prototype.columnAtPosition = function (position) {

  }

  Board.prototype.rowAtPosition = function (position) {

  }

  Board.prototype.diagonal1AtPosition = function (position) {

  }

  Board.prototype.diagonal2AtPosition = function (position) {

  }
})();