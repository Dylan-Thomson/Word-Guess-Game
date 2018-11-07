// Define our game object
var game = {
    words : ["cat", "dog", "potato", "moooo", "orangotang"],
    currentWord : "",
    partialWord : "",
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
        this.partialWord = new Array(this.currentWord.length + 1).join( "_" );
    },
    
    // Pick new word and reset guesses
    newGame : function() {
        this.pickWord();
        this.gameRunning = true;
        this.currentGuess = "";
        this.guesses = [];
        this.guessesRemaining = 10;
        this.gameState = "";

        this.updateDisplay();
    },
    
    // Check if a new guess is in current word, and ask if game is over
    testGuess : function(event) {
        if(this.gameRunning) {
            var letter = event.key.toLowerCase();
            if(letter.length === 1 && letter.match(/[a-z]/i)) {
                if(!this.guesses.includes(letter)) {
                    this.updateGuesses(letter);
                    if(this.currentWord.includes(letter)) {
                        this.updatePartialWord(letter);
                    }
                    this.testGameOver();
                }
                this.updateDisplay();
            }
        }
    },
    
    // Add current letter to guesses, reduces guesses remaining
    updateGuesses : function(letter) {
        this.currentGuess = letter;
        this.guesses.push(letter);
        this.guessesRemaining--;
    },
    
    // Replace '_' with letters at indices matching the current wowrd
    updatePartialWord : function(letter) {
        var indices = [];
        for(var i = 0; i < this.currentWord.length; i++) {
            if(this.currentWord[i] === letter) indices.push(i);
        }
        for(var i = 0; i < indices.length; i++) {
            this.partialWord = this.partialWord.substr(0, indices[i]) + letter + this.partialWord.substr(indices[i] + 1);
        }
    },
    
    // Check to see if game should end by comparing words and looking at remaining guesses
    testGameOver : function() {
        if(this.currentWord === this.partialWord) {
            this.win();
        }
        else if(this.guessesRemaining <= 0) {
            this.lose();
        }
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
    
    // Update text in DOM elements
    updateDisplay() {
        document.getElementById("currentWord").textContent = this.currentWord;
        document.getElementById("wordDisplay").textContent = this.partialWord;
        document.getElementById("guesses").textContent = this.guesses.join(", ").toUpperCase();
        document.getElementById("guessesRemaining").textContent = this.guessesRemaining;
        document.getElementById("guess").textContent = this.currentGuess;
        document.getElementById("gameStatus").textContent = this.gameState;
        document.getElementById("wins").textContent = this.wins;
        document.getElementById("losses").textContent = this.losses;
    }
}

// Wait for everything to load before starting the game
window.onload = function() {
    game.newGame();

    // User presses a key
    document.onkeyup = function(event) {
        game.testGuess(event);
    }

    // User hits "Play again"
    document.getElementById("btn-play-again").onclick = function(event){
        game.newGame();
    }
}
