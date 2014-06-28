describe("Connect4.Board", function () {
  var game_width  = 8;
  var game_height = 6;
  var board;

  beforeEach(function () {
    board = new ConnectFour.Board(game_width, game_height);
  });

  describe("Setting up the board", function () {
    it("has the correct number of rows", function () {
      expect(board.rows().length).toEqual(game_height);
    });

    it("has the correct number of columns", function () {
      expect(board.columns().length).toEqual(game_width);
    });
    
    it("can be accessed row-wise", function () {
      expect(board.rows()).toBeTruthy();
    });

    it("can be accessed column-wise", function () {
      expect(board.columns()).toBeTruthy();
    });
  });

  describe("Board#getValueAt", function () {
    it("returns the value at a given position", function () {
      var position = {row: 4, column: 3};
      expect(board.getValueAt(position)).toBe(ConnectFour.DEFAULT_VALUE);
    });
  });

  describe("Board.setValueAt", function () {
    it("changes the value at a position on the board", function () {
      var position = {row: 4, column: 3};
      board.setValueAt(position, 1);
      expect(board.getValueAt(position)).toBe(1);
    });

    it("returns the value set", function () {
      var position = {row: 3, column: 3};
      expect(board.setValueAt(position, 1)).toEqual(1);
    });

    it("throws an error if the position is not empty", function () {
      var position = {row: 4, column: 3};
      board.setValueAt(position, 1);
      expect( function () { return board.setValueAt(position, 1); }).toThrow();
    });
  });

  describe("Board#isEmptyAt", function () {
    it("returns true if a position is open", function () {
      expect(board.isEmptyAt({row: 0, column: 0})).toBe(true);
    });

    it("returns false if a position is not open", function () {
      var position = {row: 2, column: 2};
      board.setValueAt(position, 1);
      expect(board.isEmptyAt(position)).toBe(false);
    });
  });
  
});