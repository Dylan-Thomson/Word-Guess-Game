// Press any key to start
// Display Wins
// Pick a word from list
// Display word like _ _ _ _
// As user guesses reveal letters
// Number of guesses remaining
// Display letters already guessed
// After win or loss pick new word and play again

var game = {
    words : [],
    currentWord : "",
    wordDisplay : "",
    wins : 0,
    guessesRemaining : 0,
    guesses : [],
    pickWord : function() {},

    // Pick a new word, reset guesses
    newGame : function() {
        curentWord = this.pickWord();
        this.guesses = [];
        this.guessesRemaining = 10;
        // this.wordDisplay = ("_ ").repeat(this.currentWord.length);
    },
    testGuess : function() {},
    revealLetter : function() {},
    updateGuesses : function() {},
    gameOver : function() {}
}

game.newGame();