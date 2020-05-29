const GAMETILES = 25 // represents how many game tiles there are on the screen
const delegate = document.getElementById('delegate')
const divsBack = document.querySelectorAll('.card__face--back')
const divsFront = document.querySelectorAll('.card__face--front')

const initModel = {
    name: "Player 1",
    guessCount: 0,
    match: [],
    gamePlay: true,
    gameWin: false,
    element: []
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
    div.setAttribute('id', `f${i.toString()}`)// generates id's for all front-side divs I might not need this
    div.addEventListener('click', (e) => {
      onCardClick(e, model)
    })
  })
}

function removeEventListenersToFrontDiv(divs) {
  divs.forEach((div) => div.removeEventListener('click', onCardClick) )
}

function compare(elementArr) {
  return elementArr[0] === elementArr[1]
}

function onCardClick(e, model) {
  const target  = e.target
  const { guessCount, match, element } = model
  const cardEmoji = target.nextElementSibling.innerText
  target.parentElement.classList.add("is-flipped")
  console.dir(target)

  if (guessCount <= 12 && match.length <= 2) { // see if we can still play the game
    guessCount = guessCount + 1
    element = [...element, cardEmoji] // this might output as an array of array. I'm trying to do element.push(cardEmoji)

    if (element.length === 2) {
      if (compare(element)) {
        match = [...match, compare(element)] // i'm trying to do match.push(true) match.length === 2 means they win
        element = []// CLEAR OUT ELEMENT [] so they can play again (so they can compare again)
      } else {
        setTimeout(() => {
          target.parentElement.classList.remove("is-flipped")
        }, 1500)
      }
    } else {
      element.push(cardEmoji) // pay attention to this
    }
  } else { // game end
    // what has to happen to end the game?
    // there are 2 game states here win and lose
    let message
    removeEventListenersToFrontDiv(divsFront) // remove all eventlistners on the page
    const messageEl = document.getElementById("message")
    // initModel = { } and reset model to initial state

    if (win) { // win has a different state criteria than lose - duh obviously - what does "win" look like?
      message = `🎉Woohoo🍾 ${playerName} good job! Great 🧠`
      messageEl.append(document.createTextNode(message))
    } else {
      message = `🙈Oh no! ${playerName} 🙊Try again! 🙉 And don't listen to the haters! You can do it💪`
      messageEl.append(document.createTextNode(message))
    }
  }

} // end onCardClick()



const emojis = generateRandomEmojis(EMOJIS)
console.table(emojis)
generateBackSideEmojis(emojis)
addEventListenersToFrontDiv(divsFront, initModel)


