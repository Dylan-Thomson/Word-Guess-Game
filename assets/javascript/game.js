// Press any key to start
// Display Wins
// Pick a word from list
// Display word like _ _ _ _
// As user guesses reveal letters
// Number of guesses remaining
// Display letters already guessed
// After win or loss pick new word and play again

// Define our game object
var game = {
    words : ["cat", "dog", "potato", "moooo"],
    currentWord : "",
    wordDisplay : "",
    wins : 0,
    guessesRemaining : 0,
    guesses : [],

    // Pick a random word
    pickWord : function() {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        document.getElementById("currentWord").textContent = this.currentWord;

        this.wordDisplay = new Array(this.currentWord.length + 1).join( "_" );
        document.getElementById("wordDisplay").textContent = this.wordDisplay;
    },

    // Pick a new word, clear guesses and update guesses remaining
    newGame : function() {
        curentWord = this.pickWord();
        this.guesses = [];
        this.guessesRemaining = 10;
        document.getElementById("guesses").textContent = "";
        document.getElementById("guessesRemaining").textContent = this.guessesRemaining;
        document.getElementById("guess").textContent = "";
    },

    testGuess : function(letter) {
        // If we haven't already guessed this letter, update guesses and test
        if(!this.guesses.includes(letter)) {
            document.getElementById("guess").textContent = letter;
            this.updateGuesses(letter);

            // If we haven't already run out of guesses
            if(this.guessesRemaining >= 0) {
                // If current word contains our guess
                if(this.currentWord.includes(letter)) {
                    //Find every index where letter occurs
                    var indices = [];
                    for(var i = 0; i < this.currentWord.length; i++) {
                        if(this.currentWord[i] === letter) {
                            indices.push(i);
                        }
                    }

                    //Update letters of wordDisplay at these indexes and display revealed letters
                    for(var i = 0; i < indices.length; i++) {
                        this.wordDisplay = this.wordDisplay.substr(0, indices[i]) + letter + this.wordDisplay.substr(indices[i] + 1);
                    }
                    document.getElementById("wordDisplay").textContent = this.wordDisplay;

                    //Compare new wordDisplay with currentWord to see if we won the game
                    if(this.currentWord === this.wordDisplay) {
                        this.win();
                    }
                }
            }
            // Out of guesses, lose game
            else {
                this.lose();
            }
        }
    },

    // Add current letter to guesses, reduces guesses remaining
    updateGuesses : function(letter) {
        this.guesses.push(letter);
        this.guessesRemaining--;
        document.getElementById("guesses").textContent = this.guesses;
        document.getElementById("guessesRemaining").textContent = this.guessesRemaining;
    },

    lose : function() {
        alert("You lost! The word was: " + this.currentWord);
        this.newGame();
    },

    win : function() {
        alert("You won! The word was: " + this.currentWord);
        this.newGame();
    }
}

// Wait for everything to load before starting the game
window.onload = function() {
    game.newGame();
    document.onkeyup = function(event) {
        var letter = event.key.toLowerCase();
        if(letter.length === 1 && letter.match(/[a-z]/i)) {
            game.testGuess(letter);
        }
    }
}
