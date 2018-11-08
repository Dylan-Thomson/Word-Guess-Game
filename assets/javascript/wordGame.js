// Define our game object
var wordGame = {
    words : ["cat", "dog", "potato", "moooo", "orangotang"],
    currentWord : "",
    partialWord : "",
    currentGuess : "",
    gameState : "",
    wins : 0,
    losses: 0,
    guessesRemaining : 12,
    guesses : [],
    gameRunning: false,

    // Set a new word list and convert words to lowercase
    set wordList(arr) {
        this.words = [];
        for(var i = 0; i < arr.length; i++) {
            this.words.push(arr[i].toLowerCase());
        }
    },

    // Pick a random word
    pickWord : function() {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];   
        this.partialWord = [];
        for(var i = 0; i < this.currentWord.length; i++) {
            if(this.currentWord[i].match(/[a-z]/i)) {
                this.partialWord.push("_");
            }
            else {
                this.partialWord.push(this.currentWord[i]);
            }
        }
        this.partialWord = this.partialWord.join("");
    },
    
    // Pick new word and reset guesses
    newGame : function() {
        this.pickWord();
        this.gameRunning = true;
        this.currentGuess = "";
        this.guesses = [];
        this.guessesRemaining = 12;
        this.gameState = "";
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
                    else {
                        this.guessesRemaining--;
                    }
                    this.testGameOver();
                }
            }
        }
    },
    
    // Add current letter to guesses
    updateGuesses : function(letter) {
        this.currentGuess = letter;
        this.guesses.push(letter);
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
    }
    
}