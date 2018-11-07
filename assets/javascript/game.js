// Define our game object
var game = {
    words : ["cat", "dog", "potato", "moooo", "orangotang"],
    currentWord : "",
    wordDisplay : "",
    currentGuess : "",
    gameState : "",
    wins : 0,
    losses: 0,
    guessesRemaining : 0,
    guesses : [],
    gameRunning: false,

    // Pick a random word
    pickWord : function() {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];   
        this.wordDisplay = new Array(this.currentWord.length + 1).join( "_" );
    },
    
    // Pick new word and reset guesses
    newGame : function() {
        this.gameRunning = true;
        this.curentWord = this.pickWord();
        this.currentGuess = "";
        this.guesses = [];
        this.guessesRemaining = 10;
        this.gameState = "";
    },
    
    // TODO: REFACTOR AND FIX CASE WHERE USER LOSES DESPITE PICKING FINAL LETTER ON LAST GUESS
    testGuess : function(letter) {
        // If we haven't already guessed this letter, update guesses and test
        if(!this.guesses.includes(letter)) {
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
        this.currentGuess = letter;
        this.guesses.push(letter);
        this.guessesRemaining--;
    },
    
    lose : function() {
        this.losses++;
        this.gameState = "You lost. The word you were trying to guess is: " + this.currentWord;
        this.gameRunning = false;
    },
    
    win : function() {
        this.wins++;
        this.gameState = "You won! The word you were trying to guess is: " + this.currentWord;
        this.gameRunning = false;
    },
    
    updateDisplay() {
        document.getElementById("currentWord").textContent = this.currentWord;
        document.getElementById("wordDisplay").textContent = this.wordDisplay;
        document.getElementById("guesses").textContent = this.guesses.join(" ").toUpperCase();
        document.getElementById("guessesRemaining").textContent = this.guessesRemaining;
        document.getElementById("guess").textContent = this.currentGuess;
        document.getElementById("wordDisplay").textContent = this.wordDisplay;
        document.getElementById("gameStatus").textContent = this.gameState;
        document.getElementById("wins").textContent = this.wins;
        document.getElementById("losses").textContent = this.losses;
    }
}

// Wait for everything to load before starting the game
window.onload = function() {
    game.newGame();
    game.updateDisplay();

    // User presses a key
    document.onkeyup = function(event) {
        if(game.gameRunning) {
            var letter = event.key.toLowerCase();
            if(letter.length === 1 && letter.match(/[a-z]/i)) {
                game.testGuess(letter);
                game.updateDisplay();
            }
        }
    }

    // User hits "Play again"
    document.getElementById("btn-play-again").onclick = function(event){
        game.newGame();
        game.updateDisplay();
    }
}
