/*jshint esnext: true */

//let faCollection = document.getElementsByClassName("fa");
//console.log(`faCollection length: ${faCollection.length} -- ${faCollection}`);

 let deck = document.getElementsByClassName("deck");
// console.log(`deck class: ${deck} and deck length: ${deck.length}`);
// deck is a HTMLcollection (array-like) of length 1, holding the entire ul element

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
