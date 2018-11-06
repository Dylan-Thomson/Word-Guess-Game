// Define our game object
var game = {
    words : ["cat", "dog", "potato", "moooo", "orangotang"],
    currentWord : "",
    wordDisplay : "",
    wins : 0,
    losses: 0,
    guessesRemaining : 0,
    guesses : [],
    gameRunning: false,

    // Pick a random word
    pickWord : function() {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        document.getElementById("currentWord").textContent = this.currentWord;

        this.wordDisplay = new Array(this.currentWord.length + 1).join( "_" );
        document.getElementById("wordDisplay").textContent = this.wordDisplay;
    },

    // Pick a new word, clear guesses and update guesses remaining
    newGame : function() {
        this.gameRunning = true;
        curentWord = this.pickWord();
        this.guesses = [];
        this.guessesRemaining = 10;
        document.getElementById("gameStatus").textContent = "";
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
            if(this.guessesRemaining > 0) {
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
        this.displayGuesses();
    },
    
    displayGuesses : function() {
        document.getElementById("guesses").textContent = this.guesses.join(" ").toUpperCase();
        document.getElementById("guessesRemaining").textContent = this.guessesRemaining;
    },

    lose : function() {
        // alert("You lost! The word was: " + this.currentWord);
        document.getElementById("gameStatus").textContent = "You lost!";
        this.losses++;
        document.getElementById("losses").textContent = this.losses;
        // this.newGame();
        this.gameRunning = false;
    },

    win : function() {
        // alert("You won! The word was: " + this.currentWord);
        document.getElementById("gameStatus").textContent = "Winner!";
        this.wins++;
        document.getElementById("wins").textContent = this.wins;
        // this.newGame();
        this.gameRunning = false;
    }
}

// Wait for everything to load before starting the game
window.onload = function() {
    game.newGame();
    document.onkeyup = function(event) {
        if(game.gameRunning) {
            var letter = event.key.toLowerCase();
            if(letter.length === 1 && letter.match(/[a-z]/i)) {
                game.testGuess(letter);
            }
        }
    }

    document.getElementById("btn-play-again").onclick = function(event){
        game.newGame();
    }
}
