// onDOMContentLoaded(gameInit)
const gameContainer = document.getElementById("game");
const divsBack = document.querySelectorAll('.card__face--back')
const divCards = document.querySelectorAll('.card')
// let's start using immutable data structures at the very least
const initModel = {
  name: 'Player',
  guess: 0,
  gameStart: false,
  win: false,
  match: [],
  clicks: []
}
let clicks = []
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

const emojis = generateRandomEmojis(EMOJIS)
console.table(emojis)
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
function generateRandomEmojis(emojis) {
  const shuffledEmojis = shuffle(emojis);
  const tempArr = [shuffledEmojis[0], shuffledEmojis[0], shuffledEmojis[1], shuffledEmojis[1]]
  const randomEmojis = shuffle([...tempArr, ...shuffledEmojis.slice(4)])
  // console.table(randomEmojis)
  return randomEmojis
}


function setTextContent(el, i) { // this works
  el.textContent =  emojis[i]
  el.id = i // this is working. Look the inspector
}
function generateDivContent() { // this works
  divsBack.forEach(setTextContent)
}

// if card match cards will stay face up
// else displayed for one second before flipping over again
function addClass(e) { // this works
  // console.dir(e.target.parentNode)
  const parent = e.target.parentNode
  parent.classList.add('is-flipped') // I need to use toggle?
  // remove class after x seconds per the specs
}

function isMatched(clicks) {
  return clicks[0] === clicks[1]
}

function isClicked(e) {
  const parent = e.target.parentNode
  clicks =[...clicks, parent.children[1].textContent]
  parent.classList.toggle('is-flipped');
  console.log(clicks)
  
  if (clicks.length === 2) {
    if (!isMatched(clicks)) {
      clicks = []
    } else {
      console.log("Yay!🌮")
      clicks = []
    }
  }
}

// toggles .is-flipped when card_face--front is clicked
function toggle(e) { // this works 
  const parent = e.target.parentNode
  const content = parent.children[1].textContent
  console.log(content)
  parent.classList.toggle('is-flipped');
}


for (const divCard of divCards) { 
  divCard.addEventListener('click', isClicked) // toggle is the FN that allows the cards to "flip and un-flip"
}



function gameInit() {
  console.log("I am gameInit being called")
  // shuffle cards: done
  // generate random emojis for .card__face--back: done
  // set text content for each .card__face--back div: done
  // render div w text-content: done
  generateDivContent() // we can see the rendering
}


// interactions with view


gameInit()


// when I click on two consecutive cards I check if they match
// they match they stay face up
// if they don't match
  // they stay face up for 1 second then face down again


// check()
  // match()

function check(e, model) {
  // match()
 
}

function match() {

}
