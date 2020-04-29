const gameContainer = document.getElementById("game");
const divsBack = document.querySelectorAll('.card__face--back')



const divCard = document.querySelector('.card')
console.dir(divCard)


divCard.addEventListener('click', toggle)


// if card match cards will stay face up
// else displayed for one second before flipping over again

function addClass(e) { // this works
  // console.dir(e.target.parentNode)
  const parent = e.target.parentNode
  parent.classList.add('is-flipped')
  // remove class after x seconds per the specs
}

function toggle(e) { // this works 
  const parent = e.target.parentNode
  parent.classList.toggle('is-flipped');
}

const GAMETILES = 25 // represents how many game tiles there are on the screen
const IMAGES = [
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


const randomImages = generateRandomImages(IMAGES) // array of shuffled images

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

function generateRandomImages(images) {
  const shuffledImages = shuffle(images);
  const tempArr = [shuffledImages[0], shuffledImages[0], shuffledImages[1], shuffledImages[1]]
  return shuffle([...tempArr, ...shuffledImages.slice(4)])
}


function generateDivContent() { // this works
  divs.forEach(setTextContent)
}

function setTextContent(el, i) { // this works
  el.textContent = randomImages[i]
  el.id = i
}

generateDivContent()


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForContent(array) {
  for (let color of array) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}

// when the DOM loads
// createDivsForContent(randomImages);


// =============================== Misc code
