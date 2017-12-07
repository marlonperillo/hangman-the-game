
//	var gameInstance = new HangmanGame("star wars", maxWrongGuesses);
//	var actionResult = makeGuess(gameInstance,letter);
//	toGuess
// 	totalGuesses
// 	correctGuessesCount
// 	guessedLettersList
// 	correctGuessedLetters
// 	countToWin
// 	countToLose
// 	playerVisibility
//	var status = isGameOver(gameInstance)

function HangmanGame(word, countToLose, mask){
	this.mask = mask;
	word = word.toUpperCase();

	//make letters unique logic
	var regx = /[a-z]/gi;
	var lettersOnly = word.match(regx);
	var unique = lettersOnly.join('').split('').filter(
		function(item, i, ar){ 
			return ar.indexOf(item) === i; 
		}
	).join('');
	//letters count
	var countToWin = unique.length;

	//make game object
	this.toGuess = word;
	this.totalGuesses = 0;
	this.correctGuessesCount=0;
	this.guessedLettersList=[];
	this.correctGuessedLetters=[];
	this.countToWin = countToWin;
	this.countToLose = countToLose;
	this.playerVisibility = getPlayerVisibility(word, [], mask);
}

//0 correct guess
//1 incorrect guess
//-1 invalid input
function makeGuess(hangmanGame, letter){
	letter = letter.toUpperCase();

	//single letter check
	if(letter.length > 1){
		return -1;
	}

	//not a letter check
	if(!letter.match(/[a-z]/gi)){
		return -1;
	}
	
	//already guessed before
	if(hangmanGame.guessedLettersList.includes(letter)){
			return -1;
	}

	//make guess
	hangmanGame.guessedLettersList.push(letter);
	hangmanGame.totalGuesses++;
	hangmanGame.playerVisibility = getPlayerVisibility(hangmanGame.toGuess, hangmanGame.guessedLettersList, hangmanGame.mask)

	//correct guess
	if(hangmanGame.toGuess.indexOf(letter) >= 0 ){
		hangmanGame.correctGuessesCount++;
		hangmanGame.correctGuessedLetters.push(letter)
		return 0;
	}

	//incorrect guess
	if(hangmanGame.toGuess.indexOf(length) < 0) {
		return 1;
	}
}

//0 win
//1 lose
//-1 not yet game over
function isGameOver(hangmanGame){
	if(hangmanGame.correctGuessesCount >= hangmanGame.countToWin)
		return 0;
	
	if(hangmanGame.totalGuesses - hangmanGame.correctGuessesCount >= hangmanGame.countToLose)
		return 1;

	return -1;
}


function getPlayerVisibility(word, guessedLettersList, mask){
		var playerVisibility = "";
		for(i = 0; i < word.length; i++){
			if(guessedLettersList.includes(word.charAt(i))){
				playerVisibility += word.charAt(i);
			}else if(!word.charAt(i).match(/[a-z]/gi)){
				playerVisibility += word.charAt(i);
			}else{
				playerVisibility += mask;
			}
		}
		return playerVisibility;
	}