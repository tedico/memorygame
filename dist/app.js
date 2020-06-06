var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var GAMETILES = 25; // represents how many game tiles there are on the screen
var delegate = document.getElementById('delegate');
var divsBack = document.querySelectorAll('.card__face--back');
var divsFront = document.querySelectorAll('.card__face--front');
var messageEl = document.getElementById("message");
var model = {
    name: "Player 1",
    guessCount: 0,
    match: [],
    gamePlay: true,
    gameWin: false,
    element: [],
    message: ''
};
var EMOJIS = [
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
];
function shuffle(array) {
    var counter = GAMETILES; // this is 25
    while (counter > 0) { // While there are elements in the array
        var index = Math.floor(Math.random() * counter);
        counter--;
        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
// generates random emojis for backside
function generateRandomEmojis(emojis) {
    var shuffledEmojis = shuffle(emojis);
    var matchingEmojis = [shuffledEmojis[0], shuffledEmojis[0], shuffledEmojis[1], shuffledEmojis[1]];
    var randomEmojis = shuffle(__spreadArrays(matchingEmojis, shuffledEmojis.slice(4)));
    // console.table(randomEmojis)
    return randomEmojis;
}
function generateBackSideEmojis(emojis) {
    divsBack.forEach(function (el, i) {
        el.textContent = emojis[i];
        el.id = i.toString();
    });
}
function addEventListenersToFrontDiv(divs, model) {
    divs.forEach(function (div, i) {
        div.setAttribute('id', "front-" + i.toString()); // generates id's for all front-side divs I might not need this
        div.addEventListener('click', function (e) {
            onCardClick(e, model);
        });
    });
}
function removeEventListenersToFrontDiv(divs) {
    divs.forEach(function (div) { return div.removeEventListener('click', onCardClick); });
}
function compare(elementArr) {
    return elementArr[0].cardEmoji === elementArr[1].cardEmoji;
}
function onCardClick(e, model) {
    var target = e.target;
    var targetId = target.id;
    var cardEmoji = target.nextElementSibling.innerText;
    target.parentElement.classList.add("is-flipped");
    if ((model.guessCount <= 12) && (model.match.length <= 2)) { // see if we can still play the game
        model.guessCount = model.guessCount + 1;
        model.element.push({ targetId: targetId, cardEmoji: cardEmoji }); // this might output as an array of array. I'm trying to do element.push(cardEmoji)
        if (model.element.length === 2) {
            if (compare(model.element)) { // the two elements matches
                model.match.push(compare(model.element)); // i'm trying to do match.push(true) match.length === 2 means they win
                if ((model.guessCount === 4) && (model.match.length === 2)) { // perfect score. They for surely won!
                    var message = "\uD83C\uDF89Woohoo\uD83C\uDF7E " + model.playerName + " good job! Great \uD83E\uDDE0!";
                    // model.message = "I don't think I need this on the model. I can localize this."
                    messageEl.append(document.createTextNode(message));
                    removeEventListenersToFrontDiv(divsFront); // remove all eventlistners on the page
                    // change class to translate to another "screen"
                    // model.gameWin = true
                    // if (model.gameWin) {
                    // const gameMessageUI = document.getElementById("game-message")
                    // gameMessageUI.classList.add("game-message") scrolls down to different # (it's like an anchor text)
                    // }
                }
                model.element = []; // CLEAR OUT ELEMENT [] so they can play again (so they can compare again)
            }
            else {
                console.log(model.guessCount);
                setTimeout(function () {
                    var prevEl = document.getElementById("" + model.element[0].targetId);
                    var currEl = document.getElementById("" + model.element[1].targetId);
                    prevEl.parentElement.classList.remove("is-flipped");
                    currEl.parentElement.classList.remove("is-flipped");
                    model.element = [];
                }, 1500);
            }
        }
    }
    else if ((model.guessCount > 12) && (model.match.length <= 2)) { // game end
        console.log(model.guessCount);
        console.log("You've technically lost the game. Does your code work?");
        removeEventListenersToFrontDiv(divsFront); // remove all eventlistners on the page
        model.message = "\uD83D\uDE48Oh no! " + model.playerName + ", \uD83D\uDE4ATry again! \uD83D\uDE49 And don't listen to the haters! You can do it\uD83D\uDCAA";
        messageEl.append(document.createTextNode(model.message));
        //  initModel = { } and reset model to initial state
    }
} // end onCardClick()
function Modal() {
    //select DOM elements
    var body = document.getElementsByTagName("body");
    // create DOM elements
    var modalContainer = document.createElement("div");
    var modalContent = document.createElement("div");
    var closeBtn = document.createElement("button");
    var modalH1 = document.createElement("h1");
    var modalForm = document.createElement("form");
    var modalInput = document.createElement("input");
    // set element attributes
    modalContainer.id = "modal-container";
    modalContainer.className = "modal__container";
    modalContent.id = "modal__content";
    closeBtn.className = "modal__close";
    modalH1.className = "welcome__display-text";
    modalForm.id = "form-input";
    modalInput.id = "player-input";
    modalInput.className = "modal__input";
    modalInput.setAttribute("type", "text");
    modalInput.setAttribute("placeholder", "Type your name then press enter...");
    // construct the DOM
    modalContent.appendChild(modalH1);
    modalContent.appendChild(modalForm);
    modalContent.appendChild(closeBtn);
    modalForm.appendChild(modalInput);
    modalContainer.appendChild(modalContent);
    body.prepend(modalContainer); // I'm prepending it to the wrong DOM element
    // does it work?
    console.log(modalContainer);
    // return public API
    return {
        open: function () {
            body.appendChild(modalContainer);
            //write the CSS for it here.
            // I need to make it visible.
        },
        close: function () {
            // I need to hide it from the DOM preferrably than destroy it.
            // I still want this in memory
            body.removeChild(modalContainer); // I think a CSS rule would be better
        }
    };
}
function gameMessage() {
    // DOM elements here
    return {
        winMessage: function () {
        },
        loseMessage: function () {
        },
        resetGame: function () {
        }
    };
}
var modal = Modal();
var emojis = generateRandomEmojis(EMOJIS);
console.table(emojis);
// modal.open()
generateBackSideEmojis(emojis);
addEventListenersToFrontDiv(divsFront, model);
