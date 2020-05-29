"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// onDOMContentLoaded(gameInit)
var divCards = document.querySelectorAll('.card');
var divsBack = document.querySelectorAll('.card__face--back'); // let's start using immutable data structures at the very least

var initModel = {
  name: 'Player',
  guessCount: 0,
  match: [],
  elementsMatchArr: [],
  gameStart: false,
  gameEnd: false,
  gameWin: false
};
var GAMETILES = 25; // represents how many game tiles there are on the screen

var EMOJIS = ['🤘', '🚀', '🐶', '🐻', '🎉', '🙈', '💅', '😍', '😽', '💸', '🏛', '💫', '💥', '😎', '🥞', '🍣', '🚗', '🧲', '🎤', '💻', '📖', '🎧', '💩', '🌮', '🙊'];
var emojis = generateRandomEmojis(EMOJIS);
console.table(emojis);

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

function generateBackSideEmojis(emojis) {
  // this works
  // function setTextContent(el, i) { // this works
  //   el.textContent =  emojis[i]
  //   el.id = i // this is working. Look the inspector
  // }
  divsBack.forEach(function (el, i) {
    el.textContent = emojis[i];
    el.id = i;
  });
}

function removeEventClick(el) {
  el.removeEventListener('click', removeEventClick);
}

function clicked(e, model) {
  var elementsMatchArr = model.elementsMatchArr;
  var parentEl = e.target.parentElement; // parentEl.classList.toggle('is-flipped')

  parentEl.classList.add('is-flipped'); // parentEl.removeEventListener('click', clicked)
  // updatedElementArray = [...elementsMatchArr, parent.children[1].textContent]  why is this not adding elements to the array?
  // console.table(updatedElementArray)
}

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = divCards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var divCard = _step.value;
    divCard.addEventListener('click', function (e) {
      return clicked(e, initModel);
    }); // toggle is the FN that allows the cards to "flip and un-flip"
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

generateBackSideEmojis(emojis); // we can see the rendering
// ==============================================================================================================================
// toggles .is-flipped when card_face--front is clicked
// function toggle(e) { // this works 
//   const parent = e.target.parentNode
//   const content = parent.children[1].textContent
//   console.log(content)
//   parent.classList.toggle('is-flipped');
// }