/*jshint esnext: true */

let openedCards = [],
    matchedCards = [],
    moveCount = 0,
    starRating = 3,
    startTime = 0,
    endTime = 0;

//let faCollection = document.getElementsByClassName("fa");
//console.log(`faCollection length: ${faCollection.length} -- ${faCollection}`);

 let deck = document.getElementsByClassName("deck");
// console.log(`deck class: ${deck} and deck length: ${deck.length}`);
// deck is a HTMLcollection (array-like) of length 1, holding the entire ul element

let moves = document.getElementsByClassName(`moves`);
console.log(`moves: ${moves} ${moves[0]} ${moves[0].innerHTML}`);
// moves: [object HTMLCollection] [object HTMLSpanElement] 3

moves[0].innerHTML = 0;

/*
 * Create a list that holds all of your cards
 */
const symbols = ['anchor', 'bicycle', 'bolt', 'bomb', 'cube', 'diamond', 'leaf', 'paper-plane-o'];
const cards = [...symbols, ...symbols];
console.log(`Symbol: ${symbols}
cards: ${cards}`);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const shuffledDeck = shuffle(cards);
console.log(`Shuffled: ${shuffledDeck}`);

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

function clearDeck(deck){
    // remove symbols
//    for (let i=0; i<deck.length-1; i++){
//        console.log(`removing ${i}: ${deck[i]}`);
//        deck[i].remove();
//        i--;
//    }

//    for (let i=0; i<deck.length; i++){
        deck[0].remove();
//        console.log(`i ${i} - ${deck[i]}`);
//    }

    //  console.log(`deck[0].length ${deck[0].length}`);
    // deck[0].length is undefined...

    // deck[0].remove();
    // this removes the <ul class='deck'> also....

    // while (table.rows.length > 0) {
    // table.deleteRow(0);

    // while (canvas.firstChild){
    // canvas.removeChild(canvas.firstChild);
}
clearDeck(deck);

function createDeckHTML(deck){
    const ul = document.createElement("ul");
    ul.className = "deck";
    const container = document.getElementsByClassName("container");
    container[0].appendChild(ul);
    for (let i=0; i<deck.length; i++){
        const li = document.createElement("li");
        li.className = "card";
        const inner = document.createElement("i");
        inner.className = `fa fa-${deck[i]}`;
        ul.appendChild(li);
        li.appendChild(inner);
        li.addEventListener("click", processClick);
    }
}
createDeckHTML(shuffledDeck);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function processClick(){
    console.log(`clicked`);
    displayCard(this);
    addOpenedList(this);
    incrementCounter();
    if(openedCards.length === 2){
        console.log(`two cards --`);
        if(openedCards[0] === openedCards[1]){
            lockMatch();
        }else {
            setTimeout(function(){
                return hideCards();}, 1500
            );
            removeOpenedList();
        }
    }
}

function displayCard(item){
    console.log(`display card symbol ${item}`);
    item.className = "card open show";
}

function hideCards(){
    let openClass = document.getElementsByClassName(`open`);
    console.log(`Hiding cards .. openClass: `);
    while (openClass.length){
        //console.log(`   - ${i} : ${openClass[i]} `);
        openClass[0].className = "card";
    }
}

function addOpenedList(item){
    console.log(`adding symbol: ${item} - ${item.tagName}`);
    let inner = item.childNodes;
    console.log(`inner: ${inner}`);
    // inner: [object NodeList]
    for (let i=0; i<inner.length; i++){
        console.log(inner[i]);
        let symbol = inner[i].className;
        console.log(symbol);
        // fa fa-symbol
        symbol = symbol.slice(6);
        console.log(symbol);
        openedCards.push(symbol);
        console.log(`openedCards: ${openedCards}`);
    }
}

function incrementCounter() {
    moveCount++; console.log(`move: ${moveCount}`);
    moves[0].innerHTML = moveCount;
}

function lockMatch(){
    console.log(`locked: `);
}

function removeOpenedList() {
    openedCards.pop();
    console.log(`Removing openedCards: ${openedCards}`);
    openedCards.pop();
    console.log(`Removing openedCards: ${openedCards}`);
}
