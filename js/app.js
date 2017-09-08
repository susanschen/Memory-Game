/*jshint esnext: true */

let openedCards = [],
    matchCounter = 0,
    moveCounter = 0,
    tryCounter = 0,
    starRating = 3,
    timeInt = 0;
const timer = document.createElement(`div`);
timer.className = `timer`;
timer.innerHTML = `00:00`;
const panel = document.getElementsByClassName(`score-panel`);
panel[0].appendChild(timer);
let totalSeconds = 0;

let deck = document.getElementsByClassName(`deck`);
let moves = document.getElementsByClassName(`moves`);

moves[0].innerHTML = 0;

const restart = document.getElementsByClassName(`fa-repeat`);

const symbols = [`anchor`, `bicycle`, `bolt`, `bomb`, `cube`, `diamond`, `leaf`, `paper-plane-o`];
const cards = [...symbols, ...symbols];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

buildCongrats();
restart[0].addEventListener(`click`, reset);
reset();


function reset() {
    openedCards = [];
    matchCounter = 0;
    tryCounter = 0;
    resetTimer();
    resetCounter();
    resetStars();
    clearDeck(deck);
    let shuffledDeck = shuffle(cards);
    createDeckHTML(shuffledDeck);
    hideCongrats();
}

function clearDeck(deck) {
    deck[0].remove();
}

function createDeckHTML(deck) {
    const ul = document.createElement(`ul`);
    ul.className = `deck`;
    const container = document.getElementsByClassName(`container`);
    container[0].appendChild(ul);
    for (let i=0; i<deck.length; i++){
        const li = document.createElement(`li`);
        li.className = `card`;
        const inner = document.createElement(`i`);
        inner.className = `fa fa-${deck[i]}`;
        ul.appendChild(li);
        li.appendChild(inner);
        li.addEventListener(`click`, processClick);
    }
}

function processClick() {
    if (openedCards.length < 2) {

        if (!isSameCard(this)){

            tryCounter++;
            displayCard(this);
            addOpenedList(this);
            incrementCounter();

            if (moveCounter === 1) {
                timeInt = setInterval(startTimer, 1000);
            }

            if(openedCards.length === 2){

                if(openedCards[0] === openedCards[1]){
                    tryCounter = 0;
                    lockMatch();
                    removeOpenedList();

                    if (matchCounter === 16){
                        stopTimer();
                        setTimeout(function() {
                            return displayCongrats();}, 900
                        );
                    }
                } else {
                    setTimeout(function(){
                        return hideCards();}, 1000
                    );
                    setTimeout(function() {
                        return removeOpenedList();}, 1000);

                    if ((moveCounter >= 8) && (tryCounter >= 4) && (starRating > 0)){
                        lowerStars();
                    }
                }
            }
        }
    }
}

function startTimer(){
    ++totalSeconds;
    function addZero(i) {
        return (i < 10) ? `0` + i : i;
    }
    let min = addZero(Math.floor(totalSeconds/60));
    let sec = addZero(totalSeconds - (min*60));
    timer.innerHTML = `${min}:${sec}`;
}

function resetTimer(){
    clearInterval(timeInt);
    totalSeconds = 0;
    timer.innerHTML = `00:00`;
}

function stopTimer(){
    clearInterval(timeInt);
}

function displayCard(item) {
    item.className = `card open show`;
}

function hideCards() {
    let openClass = document.getElementsByClassName(`open`);
    while (openClass.length){
        openClass[0].className = `card`;
    }
}

function isSameCard(item) {
    const isSame = (item.className === `card open show`) ? true : false;
    return isSame;
}

function addOpenedList(item) {
    let inner = item.childNodes;
    for (let i=0; i<inner.length; i++){
        let symbol = inner[i].className;
        symbol = symbol.slice(6);
        openedCards.push(symbol);
    }
}

function incrementCounter() {
    moveCounter++;
    moves[0].innerHTML = moveCounter;
}

function resetCounter() {
    moves[0].innerHTML = moveCounter = 0;
}

function lockMatch() {
    let faSymbol = `fa-${openedCards[0]}`;
    let collection = document.getElementsByClassName(`${faSymbol}`);

    for(let i=0; i<collection.length; i++){
        collection[i].parentElement.className = `card match`;
    }
    matchCounter += 2;
}

function removeOpenedList() {
    openedCards.pop();
    openedCards.pop();
}

function buildCongrats() {
    const page = document.getElementsByClassName(`container`);
    const popup = document.createElement(`div`);
    popup.className = `congratsPopup dimmed`;
    popup.innerHTML = ``;
    page[0].appendChild(popup);
}

function displayCongrats() {
    const popup = document.getElementsByClassName(`congratsPopup`);
    popup[0].className = `congratsPopup`;
    popup[0].innerHTML =
        `<h2 class="congratsHeading" > Congratulations! </h2>
        <h3 class="congratsTagline" > You've won the game! </h3>
        <p class="congratsMove" > ${moveCounter} moves </p>
        <p class="congratsTime" > ${timer.innerHTML} total time </p>
        <p class="congratsStar" > ${starRating} stars </p>
        <p class="congratsPlay" > Play Again </p>`;
    const play = document.getElementsByClassName(`congratsPlay`);
    play[0].addEventListener(`click`,reset);
}

function hideCongrats() {
    const popup = document.getElementsByClassName(`congratsPopup`);
    popup[0].className = `congratsPopup dimmed`;
    popup[0].innerHTML = ``;
}

function lowerStars() {
    starRating--;
    tryCounter = 0;
    const stars = document.getElementsByClassName(`fa-star`);
    stars[starRating].className = `fa fa-star dimmed`;
}

function resetStars() {
    starRating = 3;
    const stars = document.getElementsByClassName(`fa-star`);
    for (let i=0; i<3; i++){
        stars[i].className = `fa fa-star`;
    }
}
