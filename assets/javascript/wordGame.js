// Define our game object
var wordGame = {
    // words : ["cat", "dog", "potato", "moooo", "orangotang"],
    words : {
        AJAX : "asynchronous javascript and xml",
        API : "application programming interface",
        CMS : "content management system",
        CSS : "cascading style sheets",
        CRON : "command run on",
        CRUD : "create read update delete",
        DOM : "document object model",
        FTP : "file transfer protocol",
        GIF : "graphics interchange format",
        HTML : "hypertext markup language",
        HTTP : "hypertext transfer protocol",
        HTTPS : "hypertext transfer protocol secure",
        JPEG : "joint photographic experts group",
        JS : "javascript",
        JSON : "javascript object notation",
        LAMP : "linux apache mysql php",
        MVC : "model view controller",
        NaN : "not a number",
        OAuth : "open authentication",
        OOP : "object oriented programming",
        OSS : "open source software",
        PDF : "portable document format",
        PNG : "portable network graphics",
        QA : "quality assurance",
        REST : "representational state transfer",
        SEO : "search engine optimization",
        SQL : "structure query language",
        SVG : "scalable vector graphics",
        URL : "uniform resource locator",
        UTF : "unicode transmission format",
        UX : "user experience",
        VCS : "version control system",
        WWW : "world wide web",
        WYSIWYG : "what you see is what you get",
        XML : "extensible markup language",
    },
    currentWord : "",
    hint : "",
    partialWord : "",
    currentGuess : "",
    gameState : "",
    wins : 0,
    losses: 0,
    guessesRemaining : 12,
    guesses : [],
    gameRunning: false,
    
    // Set a new word list and convert words to lowercase
    // TODO REDO
    set wordList(arr) {
        this.words = [];
        for(var i = 0; i < arr.length; i++) {
            this.words.push(arr[i].toLowerCase());
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