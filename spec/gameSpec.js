describe("Connect4.Game", function () {
  var o = ConnectFour.MARKERS.empty;
  var r = ConnectFour.MARKERS.red;
  var b = ConnectFour.MARKERS.black;

  describe("Gameover conditions", function () {
    describe("if there are no more moves available", function () {
      var board, game;

      beforeEach(function () {
        var col1 = [b, r, b, r, b, r];
        var col2 = [r, b, r, b, r, b];
        var boardWithNoMoves = [col1, col2, col1, col2, col1, col2, col1];
        board = new ConnectFour.Board({cells: boardWithNoMoves});
        game  = new ConnectFour.Game({board: board});
      });

      it("the board has no available moves", function () {
        expect(board.availableMovesCount()).toEqual(0);
      });

      it("the game is over", function () {
        expect(game.isGameOver()).toBe(true);
      });
    });
  });

  describe("#isGameOver", function () {
    describe("horizontal connect4", function () {


      it("returns true if horizontal connect4 by player one", function () {
        // o o o o o o o
        // o o o o o o o
        // o o o o o o o
        // o o o o o o o
        // r r r o o o o
        // b b b b o o o

        var col1 = [b, r, o, o, o, o];
        var col2 = [b, o, o, o, o, o];
        var emptyCol = [o, o, o, o, o, o];
        var boardWithHorizontalConnect4 = [col1, col1, col1, col2, emptyCol, emptyCol, emptyCol];
        var board = new ConnectFour.Board({ cells: boardWithHorizontalConnect4 });
        var game = new ConnectFour.Game({ board: board });

        expect(game.isGameOver()).toBe(true);
      });

      it("returns true if horizontal connect4 by player two", function () {
        // o o o o o o o
        // o o o o o o o
        // o o o o o o o
        // o o o o o o o
        // o o o r r r r
        // o o b r b b b

        var col1 = [r, b, o, o, o, o];
        var col2 = [r, r, o, o, o, o];
        var col3 = [b, o, o, o, o, o];
        var emptyCol = [o, o, o, o, o, o];
        var boardWithHorizontalConnect4 = [emptyCol, emptyCol, col3, col2, col1, col1, col1];
        var board = new ConnectFour.Board({ cells: boardWithHorizontalConnect4 });
        var game = new ConnectFour.Game({ board: board });

        expect(game.isGameOver()).toBe(true);
      });

    });

    describe("vertical connect4", function () {
      it("returns true if vertical connect4 by player 1", function () {
        // o o o o o o o
        // o b o o o o o
        // o b r o o o o
        // o b r o o o o
        // o b r o o o o
        // o r b o o o o
        
        var empty = [o, o, o, o, o, o, o];
        var col1 = [r, b, b, b, b, o];
        var col2 = [b, r, r, r, o, o];
        var boardWithVerticalConnect4 = [empty, col1, col2, empty, empty, empty, empty];
        var board = new ConnectFour.Board({ cells: boardWithVerticalConnect4 });
        var game = new ConnectFour.Game({ board: board });

        expect(game.isGameOver()).toBe(true);
      });

      it("returns true if vertical connect4 by player 2", function () {
        // u u u u u u u
        // u u r u u u u
        // u b r u u u u
        // u b r u u u u
        // u b r u u u u
        // u r b u u u u
        
        var empty = [o, o, o, o, o, o, o];
        var col1 = [b, r, r, r, r, o];
        var col2 = [r, b, b, b, o, o];
        var boardWithVerticalConnect4 = [empty, col1, col2, empty, empty, empty, empty];
        var board = new ConnectFour.Board({ cells: boardWithVerticalConnect4 });
        var game = new ConnectFour.Game({ board: board });

        expect(game.isGameOver()).toBe(true);
      });

      it("returns true if vertical connect4 in last column", function () {
        // o o o o o o o
        // o o o o o o o
        // o b o o o o r
        // o b o o o o r
        // o b o o o o r
        // o r b o o o r
        
        var empty = [o, o, o, o, o, o, o];
        var col1 = [r, r, r, r, o, o];
        var col2 = [r, b, b, b, o, o];
        var boardWithVerticalConnect4 = [empty, empty, col2, empty, empty, empty, col1];
        var board = new ConnectFour.Board({ cells: boardWithVerticalConnect4 });
        var game = new ConnectFour.Game({ board: board });

        expect(game.isGameOver()).toBe(true);
      });

      it("returns true if vertical connect4 in first column", function () {
        // o o o o o o o
        // o o o o o o o
        // o b o o o o r
        // o b o o o o r
        // o b o o o o r
        // o r b o o o r
        
        var empty = [o, o, o, o, o, o, o];
        var col1 = [r, r, r, r, o, o];
        var col2 = [r, b, b, b, o, o];
        var boardWithVerticalConnect4 = [col1, col2, empty, empty, empty, empty, empty];
        var board = new ConnectFour.Board({ cells: boardWithVerticalConnect4 });
        var game = new ConnectFour.Game({ board: board });

        expect(game.isGameOver()).toBe(true);
      });
    });
  });
});