let count = 0;
let delay = 1500;
let firstGuess = '';
let secondGuess = '';
previousTarget = null;

let totalMatched = 0;
let totalMoves = 0;

var grid = document.querySelectorAll('.grid-item');
var success = document.getElementById('success');
var wrap = document.getElementById('game');

//to shuffle the grid cells
window.onload = shuffle();

document.getElementById('play-again').addEventListener('click', shuffle);



function shuffle() {
	success.classList.remove('show');
	success.style.display="none";
	wrap.style.display="block";
	totalMoves = 0;
	totalMatched = 0;
	document.getElementById("totalMoves").innerHTML = totalMoves;

	
	grid.forEach(card => {
		let random = Math.floor(Math.random() * 12);
		card.style.order = random;
		card.classList.remove('match','flip');
//		add click listerner to select the grid item
		card.addEventListener('click', checkForMatch);
	});


};


var match = function match() {
	var selected = document.querySelectorAll('.flip');
	selected.forEach(function (card) {
		card.classList.add('match');
		card.removeEventListener('click', checkForMatch);
	});
	if(totalMatched === 6) {
		document.getElementById("finalMove").innerHTML = totalMoves;
		success.classList.add('show');
		success.style.display="block";
		wrap.style.display="none";
	}
};

var resetGuesses = function resetGuesses() {
	firstGuess = '';
	secondGuess = '';
	count = 0;
	previousTarget = null;
	var selected = document.querySelectorAll('.flip');
	selected.forEach(function (card) {
		card.classList.remove('flip');
	});

};


function checkForMatch () {
	let clicked = this;
	
	if (clicked.nodeName === 'SECTION' || clicked === previousTarget) {
		return; 
	}
	if (count < 2) {
		totalMoves++;
		document.getElementById("totalMoves").innerHTML = totalMoves;
		clicked.classList.toggle('flip');
		count++;
		if(count == 1) {
			firstGuess = clicked.dataset.id;
		} else {
			secondGuess = clicked.dataset.id;
		}

		if (firstGuess !== '' && secondGuess !== '') {

			if(firstGuess === secondGuess) {
				totalMatched++;
				setTimeout(match, delay)
				setTimeout(resetGuesses, delay)
			} else {
				setTimeout(resetGuesses, delay)
			}

		}

		previousTarget = clicked;
	}
};