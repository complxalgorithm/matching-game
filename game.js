// game.js

var timeLeft = 60; // seconds
var timer;
var score = 0;
var card = [
    {
        label: 'A'
    },
    {
        label: 'B'
    },
    {
        label: 'C'
    },
    {
        label: 'D'
    }
];

// List of functions that out game does
//startGame
function startGame() {
    // Hide the header and button, and show score
    document.querySelector("#playButton").style.display = 'none';
    document.querySelector("#header").style.display = 'none';
    document.querySelector('#drop').style.display = 'none';
    document.querySelector("#score").style.display = '';

    // Start timer
    timer = setInterval(function () {
      score = score - 10;
      document.querySelector('#score').innerHTML = score;
    }, 750);

    // create 16 cards
    var fullSetOfCards = [];
    card.forEach(function (card) {
        fullSetOfCards.push(card);
        fullSetOfCards.push(card);
        fullSetOfCards.push(card);
        fullSetOfCards.push(card);
    });
    console.log('All cards = ', fullSetOfCards);

    shuffleCards(fullSetOfCards);

    // show those 16 cards
    var count = 1;
    fullSetOfCards.forEach(function (card) {
        document.querySelector('#game').innerHTML += '<div class="col-md-3"><button id="card' + count + '" type="button" name="button" class="btn white  btn-lg btn-primary orangeshade-bg card" onclick="showCard(this, \'' + card.label + '\', ' + count + ')">?</button></div>';
        count++;
    });
    // start the timer
    // update the game score
}
var choice1 = null;
var choice2 = null;
var i;
// showCard
function showCard(cardElement, cardLabel, cardID) {
    cardElement.innerHTML = cardLabel;
    if (choice1 === null) {
        choice1 = cardLabel;
        card1 = cardID;
    } else if (choice2 === null && card1 !== cardID) {
        choice2 = cardLabel;
        card2 = cardID;
        if (choice1 === choice2) {
            addPoints();
            document.querySelector('#card' +card1).onClick = null;
            document.querySelector('#card' +card2).onClick = null;
        } else {
            subtractPoints();
            var cardsToHide = [card1, card2];
            setTimeout(function () {
            hideCard(cardsToHide[0]);
            hideCard(cardsToHide[1]);
          }, 100);
        }
        choice1 = null;
        choice2 = null;
    }
}
// shuffleCards
/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffleCards(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
// hideCards
function hideCard(cardID) {
  // This would grap the button with e.g. id = "card12"
  var cardElement = document.querySelector('#card' + cardID);
  cardElement.innerHTML = '?';
}
// addPoints
var matchedItems = 0;
function addPoints() {
  score = score + 500;
  document.querySelector('#score').innerHTML = score;
  matchedItems++;
  if (matchedItems === 8) {
    clearInterval(timer);
    document.querySelector('#drop').style.display = '';
  }
}
// subtractPoints
function subtractPoints() {
  score = score - 250;
  document.querySelector('#score').innerHTML = score;
}
