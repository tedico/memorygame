// onDOMContentLoaded(gameInit)
const gameContainer = document.getElementById("game");
const divsBack = document.querySelectorAll('.card__face--back')
const divCards = document.querySelectorAll('.card')
const GAMETILES = 25 // represents how many game tiles there are on the screen
const EMOJIS = [
  '🤘',
  '🚀',
  '🐶',
  '🐻',
  '🎉',
  '🙈',
  '💅',
  '😍',
  '😽',
  '💸',
  '🏛',
  '💫',
  '💥',
  '😎',
  '🥞',
  '🍣',
  '🚗',
  '🧲',
  '🎤',
  '💻',
  '📖',
  '🎧',
  '💩',
  '🌮',
  '🙊',
]



function shuffle(array) { // Helper fn: Fisher Yates Shuffle Algo
  let counter = GAMETILES; // this is 25

  while (counter > 0) { // While there are elements in the array
    let index = Math.floor(Math.random() * counter);
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// generates random images for backside
// ([]) => []
function generateRandomEmojis(emojis) {
  const shuffledEmojis = shuffle(emojis);
  const tempArr = [shuffledEmojis[0], shuffledEmojis[0], shuffledEmojis[1], shuffledEmojis[1]]
  return shuffle([...tempArr, ...shuffledEmojis.slice(4)])
}

function setTextContent(el, i) { // this works
  el.textContent =  generateRandomEmojis(EMOJIS)[i]
  el.id = i
}
function generateDivContent() { // this works
  divsBack.forEach(setTextContent)
}


// if card match cards will stay face up
// else displayed for one second before flipping over again
function addClass(e) { // this works
  // console.dir(e.target.parentNode)
  const parent = e.target.parentNode
  parent.classList.add('is-flipped')
  // remove class after x seconds per the specs
}

// toggles .is-flipped when card_face--front is clicked
function toggle(e) { // this works 
  console.dir(e.target)
  const parent = e.target.parentNode
  parent.classList.toggle('is-flipped');
}


for (const divCard of divCards) {
  divCard.addEventListener('click', toggle)
}
function gameInit() {
  // shuffle cards
  // generate random emojis for .card__face--back
  // set text content for each .card__face--back div
  // render div w text-content
  generateDivContent()
}

gameInit()
