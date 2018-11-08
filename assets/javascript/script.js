// Update DOM elements with current wordGame state
function updateDisplay() {
    document.getElementById("currentWord").textContent = wordGame.currentWord;
    document.getElementById("wordDisplay").textContent = wordGame.partialWord.toUpperCase();
    document.getElementById("guesses").textContent = wordGame.guesses.join(", ").toUpperCase();
    document.getElementById("guessesRemaining").textContent = wordGame.guessesRemaining;
    document.getElementById("guess").textContent = wordGame.currentGuess;
    document.getElementById("gameStatus").textContent = wordGame.gameState;
    document.getElementById("wins").textContent = wordGame.wins;
    document.getElementById("losses").textContent = wordGame.losses;
}

// Wait for everything to load before starting the game
window.onload = function() {
    wordGame.wordList = [
        "Orange",
        "Apple",
        "Banana",
        "Grapefruit",
        "Blueberry",
        "Raspberry",
        "Rotten Apple",
        "Fruit is very good for you!",
        "Fruit juice is meh..."
    ];

    wordGame.newGame();
    updateDisplay();

    // User presses a key
    document.onkeyup = function(event) {
        wordGame.testGuess(event);
        updateDisplay();
    }

    // User hits "Play again"
    document.getElementById("btn-play-again").onclick = function(event){
        wordGame.newGame();
        updateDisplay();
    }
}
