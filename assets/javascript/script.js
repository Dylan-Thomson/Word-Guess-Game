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
