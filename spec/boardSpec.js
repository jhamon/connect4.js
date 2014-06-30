describe("Connect4.Board", function () {
  var game_width  = 8;
  var game_height = 6;
  var board;

  beforeEach(function () {
    board = new ConnectFour.Board({columns: game_width, rows: game_height});
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

  describe("Board#getColorAt", function () {
    it("returns the color at a given position", function () {
      var position = {row: 4, column: 3};
      expect(board.getColorAt(position)).toBe(ConnectFour.EMPTY);
    });
  });

  describe("Board#setColorAt", function () {
    it("changes the color at a position on the board", function () {
      var position = {row: 4, column: 3};
      board.setColorAt(position, "red");
      expect(board.getColorAt(position)).toBe(ConnectFour.RED);
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
  
});