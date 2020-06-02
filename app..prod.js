const GAMETILES = 25 // represents how many game tiles there are on the screen
const delegate = document.getElementById('delegate')
const divsBack = document.querySelectorAll('.card__face--back')
const divsFront = document.querySelectorAll('.card__face--front')
const messageEl = document.getElementById("message")

const model = {
    name: "Player 1",
    guessCount: 0,
    match: [],
    gamePlay: true,
    gameWin: false,
    element: [],
    message: ''
}

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

// generates random emojis for backside
function generateRandomEmojis(emojis) {
  const shuffledEmojis = shuffle(emojis);
  const matchingEmojis = [shuffledEmojis[0], shuffledEmojis[0], shuffledEmojis[1], shuffledEmojis[1]]
  const randomEmojis = shuffle([...matchingEmojis, ...shuffledEmojis.slice(4)])
  // console.table(randomEmojis)
  return randomEmojis
}

function generateBackSideEmojis(emojis) { // this works
  divsBack.forEach((el, i) => {
    el.textContent = emojis[i]
    el.id = i.toString()
  })
}

function addEventListenersToFrontDiv(divs, model) {
  divs.forEach((div, i) => {
    div.setAttribute('id', `front-${i.toString()}`)// generates id's for all front-side divs I might not need this
    div.addEventListener('click', (e) => {
      onCardClick(e, model)
    })
  })
}

function removeEventListenersToFrontDiv(divs) {
  divs.forEach((div) => div.removeEventListener('click', onCardClick) )
}

function compare(elementArr) {
  return elementArr[0].cardEmoji === elementArr[1].cardEmoji
}

function onCardClick(e, model) {
  const target  = e.target
  const targetId = target.id
  const cardEmoji = target.nextElementSibling.innerText
  target.parentElement.classList.add("is-flipped")

  if ((model.guessCount <= 12) && (model.match.length <= 2)) { // see if we can still play the game
    model.guessCount = model.guessCount + 1
    model.element.push({targetId, cardEmoji})// this might output as an array of array. I'm trying to do element.push(cardEmoji)

    if (model.element.length === 2) {
      if (compare(model.element)) { // the two elements matches
        model.match.push(compare(model.element)) // i'm trying to do match.push(true) match.length === 2 means they win
        if ((model.guessCount === 4) && (model.match.length === 2)) { // perfect score. They for surely won!
          const message =`🎉Woohoo🍾 ${model.playerName} good job! Great 🧠!`
          // model.message = "I don't think I need this on the model. I can localize this."
          messageEl.append(document.createTextNode(message))
          removeEventListenersToFrontDiv(divsFront) // remove all eventlistners on the page
          // change class to translate to another "screen"
            // model.gameWin = true
            // if (model.gameWin) {
              // const gameMessageUI = document.getElementById("game-message")
              // gameMessageUI.classList.add("game-message") scrolls down to different # (it's like an anchor text)
              // }
        }
        model.element = []// CLEAR OUT ELEMENT [] so they can play again (so they can compare again)
      } else {
        console.log(model.guessCount)
        setTimeout(() => {
          const prevEl = document.getElementById(`${model.element[0].targetId}`)
          const currEl = document.getElementById(`${model.element[1].targetId}`)
          prevEl.parentElement.classList.remove("is-flipped")
          currEl.parentElement.classList.remove("is-flipped")
          model.element = []
        }, 1500)
      }
    }
  } else if ((model.guessCount > 12) && (model.match.length <= 2)) { // game end
      console.log(model.guessCount)
      console.log("You've technically lost the game. Does your code work?")
      removeEventListenersToFrontDiv(divsFront) // remove all eventlistners on the page
      model.message = `🙈Oh no! ${model.playerName}, 🙊Try again! 🙉 And don't listen to the haters! You can do it💪`
      messageEl.append(document.createTextNode(model.message))
      //  initModel = { } and reset model to initial state
  }
} // end onCardClick()



const emojis = generateRandomEmojis(EMOJIS)
console.table(emojis)
generateBackSideEmojis(emojis)
addEventListenersToFrontDiv(divsFront, model)


