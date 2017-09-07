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
    console.log(`moves: ${moves} ${moves[0]} ${moves[0].innerHTML}`);
    // moves: [object HTMLCollection] [object HTMLSpanElement] 3

moves[0].innerHTML = 0;

const restart = document.getElementsByClassName(`fa-repeat`);
    console.log(`restart: ${restart} ${restart[0]} ${restart[0].nodeValue}`);
    //restart: [object HTMLCollection] [object HTMLDivElement]

const symbols = [`anchor`, `bicycle`, `bolt`, `bomb`, `cube`, `diamond`, `leaf`, `paper-plane-o`];
const cards = [...symbols, ...symbols];
    console.log(`Symbol: ${symbols}
    cards: ${cards}`);

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
        console.log(`Shuffled: ${shuffledDeck}`);
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
    console.log(`clicked`);
    tryCounter++;
    displayCard(this);
    addOpenedList(this);
    incrementCounter();
    if (moveCounter === 1) {
        timeInt = setInterval(startTimer, 1000);
    }

    if(openedCards.length === 2){
        console.log(`two cards are opened`);
        if(openedCards[0] === openedCards[1]){
            console.log(`two cards match!`);
            tryCounter = 0;
            lockMatch();
            removeOpenedList();
            console.log(`move: ${moveCounter} -- try: ${tryCounter} -- star: ${starRating}`);
        } else {
            setTimeout(function(){
                return hideCards();}, 1000
            );
            removeOpenedList();
            console.log(`move: ${moveCounter} -- try: ${tryCounter} -- star: ${starRating}`);
            if ((moveCounter >= 8) && (tryCounter >= 4) && (starRating > 0)){
                lowerStars();
            }
        }
    }



    if (matchCounter === 16){
        stopTimer();
        displayCongrats();
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
    console.log(`reset time`);
    clearInterval(timeInt);
    totalSeconds = 0;
    timer.innerHTML = `00:00`;
}

function stopTimer(){
    console.log(`Stop time`);
    clearInterval(timeInt);
    console.log(`Time stop at: ${timer.innerHTML}`);
}

function displayCard(item) {
    console.log(`display card symbol ${item}`);
    item.className = `card open show`;
}

function hideCards() {
    let openClass = document.getElementsByClassName(`open`);
    console.log(`Hiding cards .. openClass: `);
    while (openClass.length){
        //console.log(`   - ${i} : ${openClass[i]} `);
        openClass[0].className = `card`;
    }
}

function addOpenedList(item) {
    console.log(`adding symbol: ${item} - ${item.tagName}`);
    let inner = item.childNodes;
    console.log(`inner: ${inner}`);
    // inner: [object NodeList]
    for (let i=0; i<inner.length; i++){
        console.log(inner[i]);
        let symbol = inner[i].className;
        console.log(symbol); // fa fa-symbol
        symbol = symbol.slice(6);
        console.log(symbol);
        openedCards.push(symbol);
        console.log(`openedCards: ${openedCards}`);
    }
}

function incrementCounter() {
    moveCounter++; console.log(`move: ${moveCounter}`);
    moves[0].innerHTML = moveCounter;
}

function resetCounter() {
    moves[0].innerHTML = moveCounter = 0;
}

function lockMatch() {
    let faSymbol = `fa-${openedCards[0]}`;
    console.log(`Locking.. faSymbol: ${faSymbol}`);

    let collection = document.getElementsByClassName(`${faSymbol}`);
    console.log(`symbol ${collection}`); //[object HTMLCollection]

    for(let i=0; i<collection.length; i++){

        console.log(`loop ${i}: ${collection[i]} - parent ${collection[i].parentElement}`);
        //loop 1: [object HTMLElement] - parent [object HTMLLIElement]

        collection[i].parentElement.className = `card match`;
    }

    matchCounter += 2; console.log(`match counter: ${matchCounter}`);
}

function removeOpenedList() {
    openedCards.pop();
    console.log(`Removing openedCards: ${openedCards}`);
    openedCards.pop();
    console.log(`Removing openedCards: ${openedCards}`);
}

function buildCongrats() {
    // Build popup once & Hide it
    console.log(`buiding popup`);
    const page = document.getElementsByClassName(`container`);

    const popup = document.createElement(`div`);
    popup.className = `congratsPopup dimmed`;
    popup.innerHTML = ``;
    page[0].appendChild(popup);
}

function displayCongrats() {
    console.log(`You won!`);
    const popup = document.getElementsByClassName(`congratsPopup`);
    console.log(`${popup} ${popup[0]}`);
    popup[0].className = `congratsPopup`;
    popup[0].innerHTML =
        `<h2 class="congratsHeading" > Congratulations! </h2>
        <h3 class="congratsTagline" > You've won the game! </h3>
        <p class="congratsMove" > ${moveCounter} moves </p>
        <p class="congratsTime" > ${timer.innerHTML} total time </p>
        <p class="congratsStar" > ${starRating} stars </p>
        <p class="congratsPlay" > Play Again </p>`;
    const play = document.getElementsByClassName(`congratsPlay`);
    console.log(`-- ${play} ${play[0]}`);
    play[0].addEventListener(`click`,reset);
}

function hideCongrats() {
    console.log(`Hide popup`);
    const popup = document.getElementsByClassName(`congratsPopup`);
    console.log(`-- ${popup}`);
    popup[0].className = `congratsPopup dimmed`;
    popup[0].innerHTML = ``;
}

function lowerStars() {
    starRating--;
    tryCounter = 0;
    console.log(`Lowering stars to: ${starRating}`);
    const stars = document.getElementsByClassName(`fa-star`);
    console.log(`get stars: ${stars} -- star[0]: ${stars[0]}`);
    stars[starRating].className = `fa fa-star dimmed`;
}

function resetStars() {
    starRating = 3;
    const stars = document.getElementsByClassName(`fa-star`);
    for (let i=0; i<3; i++){
        stars[i].className = `fa fa-star`;
    }
}
