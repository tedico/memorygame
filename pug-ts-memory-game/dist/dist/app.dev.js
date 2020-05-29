"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var GAMETILES = 25; // represents how many game tiles there are on the screen

var divCards = document.querySelectorAll('.card');
var divsBack = document.querySelectorAll('.card__face--back');
var initModel = {
  name: "Player 1",
  guessCount: 0,
  match: [],
  gamePlay: true,
  gameWin: false,
  element: []
};
var EMOJIS = ['🤘', '🚀', '🐶', '🐻', '🎉', '🙈', '💅', '😍', '😽', '💸', '🏛', '💫', '💥', '😎', '🥞', '🍣', '🚗', '🧲', '🎤', '💻', '📖', '🎧', '💩', '🌮', '🙊'];

function shuffle(array) {
  // Helper fn: Fisher Yates Shuffle Algo
  var counter = GAMETILES; // this is 25

  while (counter > 0) {
    // While there are elements in the array
    var index = Math.floor(Math.random() * counter);
    counter--; // And swap the last element with it

    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
} // generates random emojis for backside


function generateRandomEmojis(emojis) {
  var shuffledEmojis = shuffle(emojis);
  var matchingEmojis = [shuffledEmojis[0], shuffledEmojis[0], shuffledEmojis[1], shuffledEmojis[1]];
  var randomEmojis = shuffle([].concat(matchingEmojis, _toConsumableArray(shuffledEmojis.slice(4)))); // console.table(randomEmojis)

  return randomEmojis;
}

function addCardClass(e) {
  e.target.parentNode.classList.add('.is-flipped');
}

function generateBackSideEmojis(emojis) {
  // this works
  divsBack.forEach(function (el, i) {
    el.parentNode.addEventListener('click', function (e) {
      addCardClass(e);
    });
    el.textContent = emojis[i];
    el.id = i.toString();
  });
} // while (initModel.guessCount <= 12 && initModel.match.length <= 2) {
//   initModel.gamePlay = true
//   else {
//     initModel.gamePlay = false
//   }
// }


var emojis = generateRandomEmojis(EMOJIS);
console.table(emojis);
generateBackSideEmojis(emojis); // we can see the rendering
// const _click = (e) => {
// }
// element.addEventListner("click", function _click() {
//   element.removeEventListener("click", _click, false)
// }, false)