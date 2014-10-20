describe("Connect4.Board", function () {
  var game_width  = 8;
  var game_height = 6;
  var board;

  beforeEach(function () {
    board = new ConnectFour.Board({columns: game_width, rows: game_height});
  });

  // describe("Setting up the board", function () {
  //   it("has the correct number of rows", function () {
  //     expect(board.rows().length).toEqual(game_height);
  //   });

  //   it("has the correct number of columns", function () {
  //     expect(board.columns().length).toEqual(game_width);
  //   });
    
  //   it("can be accessed row-wise", function () {
  //     expect(board.rows()).toBeTruthy();
  //   });

  //   it("can be accessed column-wise", function () {
  //     expect(board.columns()).toBeTruthy();
  //   });
  // });

  describe("Board#isEmptyAt", function () {
    it("returns true if a position is open", function () {
      expect(board.isEmptyAt({row: 0, column: 0})).toBe(true);
    });

    it("returns false if a position is not open", function () {
      var position = {row: 2, column: 2};
      board.setColorAt(position, "red");
      expect(board.isEmptyAt(position)).toBe(false);
    });
  });

  describe("Board#getColorAt", function () {
    it("returns the color at a given position", function () {
      board.cells[0][0] = ConnectFour.MARKERS.red;
      expect(board.getColorAt({row: 0, column: 0})).toBe(ConnectFour.MARKERS.red)
    });

    it("returns empty if no moves has been made at that position", function () {
      var position = {row: 4, column: 3};
      expect(board.getColorAt(position)).toBe(ConnectFour.MARKERS.empty);
    });
  });

  describe("Board#setColorAt", function () {
    it("changes the color at a position on the board", function () {
      var position = {row: 4, column: 3};
      board.setColorAt(position, "red");
      expect(board.getColorAt(position)).toBe(ConnectFour.MARKERS.red);
    });

    it("returns the color set", function () {
      var position = {row: 3, column: 3};
      expect(board.setColorAt(position, "red")).toEqual("red");
    });

    it("throws an error if the position is not empty", function () {
      var position = {row: 4, column: 3};
      board.setColorAt(position, "black");
      expect( function () { return board.setColorAt(position, "red"); }).toThrow();
    });
  });

  describe("Board#moveAtPosition", function () {
    var position;

    beforeEach(function () {
      position = {row: 2, column: 3};
    });

    it("returns the board position that has been marked", function () {
      var bottomRowPosition = {column: position.column, row: game_height-1};
      expect(board.moveAtPosition({position: position, color: "red"})).toEqual(bottomRowPosition);
    });

    it("selects the lowest available position in the position's column", function () {
      board.moveAtPosition({position: position, color: "red"});
      board.moveAtPosition({position: position, color: "black"});
      var expectedBlackPosition = {column: position.column, row: game_height-2};
      expect(board.getColorAt(expectedBlackPosition)).toEqual(ConnectFour.MARKERS.black);
    });

    it("marks a board position with a particular color", function () {
      var bottomRowPosition = {column: position.column, row: game_height-1};
      board.moveAtPosition({position: position, color: "red"});
      expect(board.getColorAt(bottomRowPosition)).toBe(ConnectFour.MARKERS.red)
    })
  });

  describe("Board#columnAtPosition", function () {
    var position, filledColumn, board, boardCells;

    beforeEach( function () {
      blankColumn  = new Array(game_height);  // array of undefineds
      filledColumn = [];
      for (var i = 0; i < game_height; i++) {
        filledColumn.push(10); // arbitrary value that isn't undefined
      }
    });

    it("returns a the column containing a particular position", function () {
      position   = {row: 2, column: 1};
      boardCells = [blankColumn, filledColumn, blankColumn, blankColumn, blankColumn];
      board      = new ConnectFour.Board({cells: boardCells});

      expect(board.columnAtPosition(position)).toBe(filledColumn);
    });
  });

  describe("Board#rowAtPosition", function () {
    var position, column, boardCells, column;

    beforeEach( function () {
      column = new Array(game_height);  // array of undefineds
      position   = {row: 3, column: 1};
      column[3]  = 1; // arbitrary non-undefined value
    });

    it("returns the row containing the specified position", function () {
      boardCells = [column, column, column, column, column];
      board      = new ConnectFour.Board({cells: boardCells});

      expect(board.rowAtPosition(position)).toEqual([1, 1, 1, 1, 1]);
    });
  });

  xdescribe("Board#diagonal1AtPosition", function () {

  });

  xdescribe("Board#diagonal2AtPosition", function () {

  });

  describe("Board#availableMovesCount", function () {
    it("should initially equal number of spaces on the board", function () {
      expect(board.availableMovesCount()).toEqual(game_width*game_height);
    });

    it("should be zero if there are no moves left", function () {
        var col1 = [1, -1, 1, -1, 1, -1];
        var col2 = [-1, 1, -1, 1, -1, 1];
        var boardWithNoMoves = [col1, col2, col1, col2, col1, col2, col1];
        board = new ConnectFour.Board({cells: boardWithNoMoves});
        expect(board.availableMovesCount()).toEqual(0);
    });
  });
});