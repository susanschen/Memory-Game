/*jshint esnext: true */

let openedCards = [],
    matchCounter = 0,
    moveCounter = 0,
    tryCounter = 0,
    starRating = 3,
    startTime = 0,
    endTime = 0;


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

restart[0].addEventListener(`click`, reset);
reset();

function reset() {
    openedCards = [];
    matchCounter = 0;
    tryCounter = 0;
    starRating = 3;
    startTime = 0;
    endTime = 0;
    resetCounter();
    clearDeck(deck);
    let shuffledDeck = shuffle(cards);
        console.log(`Shuffled: ${shuffledDeck}`);
    createDeckHTML(shuffledDeck);
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
                return hideCards();}, 1500
            );
            removeOpenedList();
            console.log(`move: ${moveCounter} -- try: ${tryCounter} -- star: ${starRating}`);
            if ((moveCounter >= 8) && (tryCounter >= 4) && (starRating > 0)){
                lowerStars();
            }
        }
    }



    if (matchCounter === 16){
        displayCongrats();
    }
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

function displayCongrats() {
    console.log(`You won!`);
    // create div to hold pop-up congrats message
    // 1: time to win
    // 2. star rating
    // 3. Play again
    const page = document.getElementsByClassName(`container`);

    const popup = document.createElement(`div`);
    popup.className = `congratsPopup`;
    popup.innerHTML =
        `<h2 class="congratsHeading" > Congratulations! </h2>
        <h3 class="congratsTagline" > You've won the game! </h3>
        <p class="congratsMove" > ${moveCounter} moves </p>
        <p class="congratsTime" > total time </p>
        <p class="congratsStar" > ${starRating} stars </p>
        <p class="congratsPlay" > Play Again </p>`;
    page[0].appendChild(popup);
}

function lowerStars() {
    starRating--;
    tryCounter = 0;
    console.log(`Lowering stars to: ${starRating}`);
    const stars = document.getElementsByClassName(`fa-star`);
    console.log(`get stars: ${stars} -- star[0]: ${stars[0]}`);
    stars[starRating].className = `fa fa-star dimmed`;
}
