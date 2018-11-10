# Word-Guess-Game
This is a hangman style game where the player has to guess a word letter by letter by pressing keys on the keyboard.

The game ends when the player guesses every letter that is in the word, or runs out of guesses altogether.

For my version of the game, I decided to go with common web development acronyms because I am boring. Fortunately, a more interesting person can use wordGame.js to create a game using their own theme with a little work.

I created this as a homework assignment for a web development bootcamp using vanilla Javascript and Bootstrap. This is the first time I've ever written a README for a project, and I apologize if I have no idea what I'm doing.

## wordGame.js
The game logic is handled by the wordGame object.

It stores hints/words as key/value pairs and picks one at random when `newGame()` is called. 

### testGuess()
This is the main function driving the game. It accepts a string, then checks to see if it is a single letter, and that it has not already been guessed.

Should the guess get this far, `testGuess()` tests if the current word includes that letter. If so, it updates the partial word (with the underscores) so that it includes the letter in the correct places. Otherwise, it reduces the guesses the player has remaining.

`testGuess()` then calls a function to check if the game should end, and finally, calls a function to update the display.

## Using wordGame.js
If you wish to use wordGame.js to create a web application with a more interesting theme, there are a few things you need to do.

Refer to script.js to see how I personally used the wordGame object.

### Define your wordlist
Define an object with key/value pairs, with the key being the hint and the value being the word or phrase to be guessed. Values can contain whitespaces and punctuation. However, keep in mind that any character that is not a letter (A-Z lower or uppercase) will not be guessable and will be already displayed in the partial word.

Once you've created your word object, pass it to the wordGame object like this:

```javascript
wordGame.setWordList(words);
```

### Overwrite wordGame.displayState()
By default, wordGame uses console.log for output. If you wish to have the results display on the web page, you'll have to redefine it. 

`displayState()` is called at the end of `newGame()` and `testGuess()`.

The variables in wordGame are as follows:

* words
* currentWord
* hint
* partialWord
* gameState
* wins
* losses
* guessesRemaining
* guesses
* gameRunning

And here is an example of overwriting the default method to write to a web page.

```javascript
wordGame.displayState = function() {
    document.getElementById("wordDisplay").textContent = wordGame.partialWord.toUpperCase();
    document.getElementById("hint").textContent = wordGame.hint;
    document.getElementById("guesses").textContent = wordGame.guesses.join(", ").toUpperCase();
    document.getElementById("guessesRemaining").textContent = wordGame.guessesRemaining;
    document.getElementById("gameStatus").textContent = wordGame.gameState;
    document.getElementById("wins").textContent = wordGame.wins;
    document.getElementById("losses").textContent = wordGame.losses;
}
```

### Setting up and running the game
I'd recommend doing this in `window.onload` or the jQuery equivalent if you are doing any DOM manipulation. 

First, set your wordList as explained above.

Next, whenever you want to play a game with a new word, you'll have to call `wordGame.newGame()`. For my game, I call it immediately after defining the wordList in `window.onload`, but you could wait to call it until the user clicks a button if you wish.

Finally, you'll need some way to pass guesses as strings to `testGuess()`. I did it like this:

```javascript
// User presses a key
document.onkeyup = function(event) {
    // Test guess and update page
    wordGame.testGuess(event.key);
}
```

### Starting a new game
When the player guesses correctly or loses the game, wordGame.js does not immediately start a new one. I'd rather just give the user the option to start a new game.

Simply create some kind of button with an event listener and call `wordGame.newGame()`. Here is an example, again using vanilla JS:

```javascript
document.getElementById("btn-new-game").onclick = function(event){
    // Start a new game and update page
    if(!wordGame.gameRunning) {
        wordGame.newGame();
    }
}
```
