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

    pickWord : function() {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        document.getElementById("currentWord").textContent = this.currentWord;

        this.wordDisplay = new Array(this.currentWord.length + 1).join( "_" );
        document.getElementById("wordDisplay").textContent = this.wordDisplay;
    },

    
    newGame : function() {
        curentWord = this.pickWord();
        this.guesses = [];
        this.guessesRemaining = 10;
        document.getElementById("guesses").textContent = "";
        document.getElementById("guessesRemaining").textContent = "10";
        document.getElementById("guess").textContent = "";
    },

    testGuess : function(letter) {
        if(letter.length === 1 && letter.match(/[a-z]/i)) {
            if(!this.guesses.includes(letter)) {
                document.getElementById("guess").textContent = letter;
                this.updateGuesses(letter);
                if(this.guessesRemaining >= 0) {
                    if(this.currentWord.includes(letter)) {
                        //Find every index where letter occurs
                        var indices = [];
                        for(var i = 0; i < this.currentWord.length; i++) {
                            if(this.currentWord[i] === letter) {
                                indices.push(i);
                            }
                        }

                        //Update letters of wordDisplay at these indexes
                        for(var i = 0; i < indices.length; i++) {
                            this.wordDisplay = this.wordDisplay.substr(0, indices[i]) + letter + this.wordDisplay.substr(indices[i] + 1);
                        }
                        document.getElementById("wordDisplay").textContent = this.wordDisplay;

                        //Compare wordDisplay with currentWord to see if we won the game
                        if(this.currentWord === this.wordDisplay) {
                            this.win();
                        }
                    }
                }
                else { // Out of guesses, lose game
                    this.lose();
                }
            }
            
        }
    },

    updateGuesses : function(letter) {
        this.guesses.push(letter);
        this.guessesRemaining--;
        document.getElementById("guesses").textContent = this.guesses;
        document.getElementById("guessesRemaining").textContent = this.guessesRemaining;
    },

    lose : function() {
        alert("You lost!");
        this.newGame();
    },

    win : function() {
        alert("You won!");
        this.newGame();
    }
}

// Wait for everything to load before starting the game
window.onload = function() {
    game.newGame();
    document.onkeyup = function(event) {
        game.testGuess(event.key.toLowerCase());
    }
}
