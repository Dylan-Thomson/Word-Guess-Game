// Update DOM elements with current game state
function updateDisplay() {
    document.getElementById("currentWord").textContent = game.currentWord;
    document.getElementById("wordDisplay").textContent = game.partialWord;
    document.getElementById("guesses").textContent = game.guesses.join(", ").toUpperCase();
    document.getElementById("guessesRemaining").textContent = game.guessesRemaining;
    document.getElementById("guess").textContent = game.currentGuess;
    document.getElementById("gameStatus").textContent = game.gameState;
    document.getElementById("wins").textContent = game.wins;
    document.getElementById("losses").textContent = game.losses;
}

// Wait for everything to load before starting the game
window.onload = function() {
    game.newGame();
    updateDisplay();

    // User presses a key
    document.onkeyup = function(event) {
        game.testGuess(event);
        updateDisplay();
    }

    // User hits "Play again"
    document.getElementById("btn-play-again").onclick = function(event){
        game.newGame();
        updateDisplay();
    }
}
