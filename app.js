// onDOMContentLoaded(gameInit)
const gameContainer = document.getElementById("game");
const divsBack = document.querySelectorAll('.card__face--back')
const divCards = document.querySelectorAll('.card')

// let's start using immutable data structures at the very least
const initModel = {
  name: 'Player',
  guessCount: 0,
  match: [],
  elementsMatchArr: [],
  gameStart: false,
  gameEnd: false,
  gameWin: false,
}

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

// generates random emojis for backside
function generateRandomEmojis(emojis) {
  const shuffledEmojis = shuffle(emojis);
  const matchingEmojis = [shuffledEmojis[0], shuffledEmojis[0], shuffledEmojis[1], shuffledEmojis[1]]
  const randomEmojis = shuffle([...matchingEmojis, ...shuffledEmojis.slice(4)])
  // console.table(randomEmojis)
  return randomEmojis
}

function generateBackSideEmojis(emojis) { // this works
  // function setTextContent(el, i) { // this works
  //   el.textContent =  emojis[i]
  //   el.id = i // this is working. Look the inspector
  // }
  divsBack.forEach((el, i) => {
    el.textContent = emojis[i]
    el.id = i
  })
}

function removeEventClick(el) {
  el.removeEventListener('click', removeEventClick)
}

function clicked(e, model) {
  let { elementsMatchArr } = model
  let parentEl = e.target.parentElement
  console.log(e.target)
  removeEventClick(parentEl)
  // parentEl.classList.toggle('is-flipped')
  parentEl.classList.add('is-flipped')

  // parentEl.removeEventListener('click', clicked)
  // updatedElementArray = [...elementsMatchArr, parent.children[1].textContent]  why is this not adding elements to the array?
  // console.table(updatedElementArray)
}


for (const divCard of divCards) { 
  divCard.addEventListener('click', (e) => clicked(e, initModel)) // toggle is the FN that allows the cards to "flip and un-flip"
}

generateBackSideEmojis(emojis) // we can see the rendering


// ==============================================================================================================================

// toggles .is-flipped when card_face--front is clicked
// function toggle(e) { // this works 
//   const parent = e.target.parentNode
//   const content = parent.children[1].textContent
//   console.log(content)
//   parent.classList.toggle('is-flipped');
// }
