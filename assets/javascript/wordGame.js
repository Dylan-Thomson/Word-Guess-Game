// Define our game object
var wordGame = {
    words : {
        TEST : "test word",
        XMAS : "be sure to drink your ovaltine"
    },
    currentWord : "",
    hint : "",
    partialWord : "",
    currentGuess : "",
    gameState : "",
    wins : 0,
    losses: 0,
    guessesRemaining : 6,
    guesses : [],
    gameRunning: false,

    // Set a new word list and convert words to lowercase
    setWordList(newWords) {
        this.words = {};
        var keys = Object.keys(newWords);
        for(var i = 0; i < keys.length; i++) {
            this.words[keys[i]] = newWords[keys[i]].toLowerCase();
        }
    },

    // Pick a random word with its hint, and set up currentWord, hint, and partialWord variables
    pickWord : function() {
        // Hint is a random key from our words object
        this.hint = Object.keys(this.words)[Math.floor(Math.random() * Object.keys(this.words).length)];
        this.currentWord = this.words[this.hint];

        console.log(this.hint, this.currentWord);

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
        this.guessesRemaining = 6;
        this.gameState = "Press a key to guess a letter!";

        this.displayState();
    },
    
    // Check if a new guess is in current word, and ask if game is over
    testGuess : function(letter) {
        if(this.gameRunning) {
            var letter = letter.toLowerCase();
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

                this.displayState();
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
    },
    
    // Displays current game state in console
    displayState : function() {
        console.log("Game state:", this.gameState);
        console.log("Hint:", this.hint);
        console.log("Partial word:", this.partialWord);
        console.log("Curent guess:", this.guess);
        console.log("Guesses:", this.guesses);
        console.log("Guesses remaining:", this.guessesRemaining);
        console.log("Wins:", this.wins);
        console.log("Losses:", this.losses);
    }
}