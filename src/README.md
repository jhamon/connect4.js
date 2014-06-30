# Yelp ConnectFour Coding Challenge

This project is the work of **Jen Hamon**. You can reach me at ***jen@hamon.io***

## Object-oriented game design

All of my code is namespaced under `ConnectFour`.  In the namespace, there are three important classes:

- **`ConnectFour.Board`**: This class maintains the representation of the board state, and has several methods for querying and changing that state.
- **`ConnectFour.Game`**: This class is responsible for tracking whose turn it is, making moves on the board, and checking win/lose conditions.
- **`ConnectFour.View`**: This class is responsible for listening to user inputs and updating the DOM as game state changes.

## Third-party tools and libraries

This project uses [jQuery](http://jquery.com/) library to set click event listeners and add CSS classes to appropriate DOM elements as the game progresses. 

The [Jasmine BDD testing framework](http://jasmine.github.io/2.0/introduction.html) is used to test the board and game logic.  To view tests, just open the `SpecRunner.html` file in your browser.

I have also used the [Sass CSS preprocessor](http://sass-lang.com/) to build my stylesheets.  Sass gives us the ability to define variables and compute properties, which is very useful in experimenting with the layout of a geometric game board.  

The production stylesheet is compiled using the sass command line program. To have changes in `styles.scss` reflected in the final project, I must compile with `sass styles.scss styles.css`.  In a longer-term project, I would automate this compilation process with a [grunt](http://gruntjs.com/) or [gulp](http://gruntjs.com/) task.