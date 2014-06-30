(function () {
  "use strict";

  // Top-level namespace: ConnectFour
  var ConnectFour = window.ConnectFour = (window.ConnectFour || {});

  var View = ConnectFour.View = function () {
    this.game = new ConnectFour.Game();

    // Cache DOM elements.
    this.$modal     = $("#modal");
    this.$dialogBox  = $("#dialog");
    this.$scoreboard = $("#scoreboard");
    
    // Scoreboard
    this.scores      = {"red": 0, "black": 0};
  };

  View.prototype.markMove = function (position) {
    var selector = "[data-column="+position.column+"] [data-row="+position.row+"]";
    var cell = $(selector);
    cell.addClass(this.game.currentColor);
  };

  View.prototype.updatePlayerNotice = function () {
    var playerNotices = {
      "red"   : "Red's turn",
      "black" : "Black's turn"
    }

    this.$dialogBox.text(playerNotices[this.game.currentColor]);
  }

  View.prototype.setColumnListeners = function () {
    var view = this;

    $(".column").on("click", function (event) {
      var clickedPosition = $(event.currentTarget).data();
      var lastMove = view.game.makeMove(clickedPosition);
      if ( lastMove !== undefined ) {
        view.markMove(lastMove);
        view.checkWinConditions(lastMove);
        // view.game.checkIfGameOver();
        view.game.swapTurns();
        view.updatePlayerNotice();
      }
    });
  };

  View.prototype.checkWinConditions = function (lastMove) {
    if (this.game.checkIfGameWon(lastMove)) { 
      this.flashModal( this.game.currentColor + " wins!");
      this.updateScores();
      this.displayScores();
      // this.reset();
    };
  }

  View.prototype.updateScores = function () {
    // Increase the score of the current color.
    if (this.game.currentColor === "red") {
      this.scores.red += 1;
    } else {
      this.scores.black += 1;
    }
  }

  View.prototype.displayScores = function () {
    // Update the DOM to reflect the current scores.
    this.$scoreboard.find('.red-score').text(this.scores.red);
    this.$scoreboard.find('.black-score').text(this.scores.black);
  }

  View.prototype.reset = function () {
    this.game.reset();
    $('.black').removeClass('black');
    $('.red').removeClass('red');
  }

  View.prototype.flashModal = function (str) {
    var view = this;
    view.$modal.hide();
    view.$modal.text(str);
    view.$modal.slideDown(300);
    
    // Hide the win notice after a few seconds
    window.setTimeout( function () {
      view.$modal.slideUp();
      view.reset();
    }, 2000);
  }

  $(document).ready( function () {
    var view = new ConnectFour.View();
    view.setColumnListeners();
    console.log('This is ConnectFour by Jen Hamon, jen@hamon.io. You should probably hire me ;)')
  });

  })();