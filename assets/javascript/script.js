// Define words/hints used in game
var words = {
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
};


// Update DOM elements with current wordGame state
function updateDisplay() {
    document.getElementById("wordDisplay").textContent = wordGame.partialWord.toUpperCase();
    document.getElementById("hint").textContent = wordGame.hint;
    document.getElementById("guesses").textContent = wordGame.guesses.join(", ").toUpperCase();
    document.getElementById("guessesRemaining").textContent = wordGame.guessesRemaining;
    document.getElementById("guess").textContent = wordGame.currentGuess;
    document.getElementById("gameStatus").textContent = wordGame.gameState;
    document.getElementById("wins").textContent = wordGame.wins;
    document.getElementById("losses").textContent = wordGame.losses;
}

// Wait for everything to load before starting the game
window.onload = function() {
    // First we need to set the word list
    wordGame.setWordList(words);

    //Start a new game and update page
    wordGame.newGame();
    updateDisplay();

    // User presses a key
    document.onkeyup = function(event) {
        // Test guess and update page
        wordGame.testGuess(event);
        updateDisplay();
    }

    // User hits "Play again"
    document.getElementById("btn-play-again").onclick = function(event){
        // Start a new game and update page
        wordGame.newGame();
        updateDisplay();
    }
}
