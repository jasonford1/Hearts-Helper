// CLI HEART HELPER //
// V 1.0.0          //
// BY JASON FORD    //

// System messages
const header = '\u2660\u2665H E A R T  H E L P E R  C L I\u2663\u2666\n---------------------------------';

class Suit {
    constructor(symbol) {
        this.remainingCards = ['A','K','Q','J','10','9','8','7','6','5','4','3','2'];
        this.count = 13;
        this.symbol = symbol;
        this.stringOfRemainingCards = this.remainingCards.join(' ');
    }

    // Reset the deck to full.
    reset() {
        this.remainingCards = ['A','K','Q','J','10','9','8','7','6','5','4','3','2'];
        this.count = 13;
    }

    // Output card count, symbol, and every card remaining in the suit.
    log() {
        let stringCount = (this.count < 10) ? `${this.count} ` : `${this.count}`;
        this.stringOfRemainingCards = this.remainingCards.join(' ');
        console.log(`${stringCount} ${this.symbol} ${this.stringOfRemainingCards} ${this.symbol}`);
    }

    // Remove card. Send error if card cannot be removed. Return true if card removed successfully.
    remove(card) {
        card = Math.floor(card);
        if (card === 0) {
            if (this.remainingCards[card] === ' ') { return error(`      ${this.symbol}${card}${this.symbol} ALREADY REMOVED`) }
            else this.remainingCards[card] = ' ';
        } else if (card === 10) {
            if (this.remainingCards[14-card] === '  ') { return error(`      ${this.symbol}${card}${this.symbol} ALREADY REMOVED`) }
            else this.remainingCards[14-card] = '  ';
        } else if (card > 1 && card < 14) {
            if (this.remainingCards[14-card] === ' ') { return error(`      ${this.symbol}${card}${this.symbol} ALREADY REMOVED`) }
            else this.remainingCards[14-card] = ' ';
        } else { return error(`    INVALID ENTRY - TRY AGAIN`) }
        this.count--;
        this.stringOfRemainingCards = this.remainingCards.join(' ');
        return refreshDisplay();
    }

    // Add card. Send error if card cannot be added. Return true if card added successfully.
    add(card) {
        card = Math.floor(card);
        if (card === 0) {
            if (this.remainingCards[card] !== ' ') { return error(`      ${this.symbol}${card}${this.symbol} ALREADY PRESENT`) }
            else this.remainingCards[card] = 'A';
        } else if (card === 13) {
            if (this.remainingCards[14-card] !== ' ') { return error(`      ${this.symbol}${card}${this.symbol} ALREADY PRESENT`) }
            else this.remainingCards[14-card] = 'K';
        } else if (card === 12) {
            if (this.remainingCards[14-card] !== ' ') { return error(`      ${this.symbol}${card}${this.symbol} ALREADY PRESENT`) }
            else this.remainingCards[14-card] = 'Q';
        } else if (card === 11) {
            if (this.remainingCards[14-card] !== ' ') { return error(`      ${this.symbol}${card}${this.symbol} ALREADY PRESENT`) }
            else this.remainingCards[14-card] = 'J';
        } else if (card === 10) {
            if (this.remainingCards[14-card] !== '  ') { return error(`      ${this.symbol}${card}${this.symbol} ALREADY PRESENT`) }
            else this.remainingCards[14-card] = `${card}`;
        } else if (card < 11 && card > 1) {
            if (this.remainingCards[14-card] !== ' ') { return error(`      ${this.symbol}${card}${this.symbol} ALREADY PRESENT`) }
            else this.remainingCards[14-card] = `${card}`;
        } else { return error(`    INVALID ENTRY - TRY AGAIN`) }
        this.count++;
        this.stringOfRemainingCards = this.remainingCards.join(' ');
        return refreshDisplay();
    }
}

// Build card deck
const spades = new Suit('\u2660');
const hearts = new Suit('\u2665');
const clubs = new Suit('\u2663');
const diamonds = new Suit('\u2666');

// Enable command line input
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

// Send errors to display
function error(err) {
    return refreshDisplay(err);
}

// Process user input. Options are reset deck or add / remove card. Send error if input is invalid.
function processInput(string) {
    let suit = string[string.length-1];
    let card = string.substring(0,string.length-1);
    if (suit === '/') {
        if (card[0] === '+') { spades.add(card.substring(1)) }
        else { spades.remove(card) }
    } else if (suit === '*') {
        if (card[0] === '+') { hearts.add(card.substring(1)) }
        else { hearts.remove(card) }
    } else if (suit === '-') {
        if (card[0] === '+') { clubs.add(card.substring(1)) }
        else { clubs.remove(card) }
    } else if (suit === '+') {
        if (card[0] === '+') { diamonds.add(card.substring(1)) }
        else { diamonds.remove(card) }
    } else if (suit === '0' && card === '00') {
        spades.reset();
        hearts.reset();
        clubs.reset();
        diamonds.reset();
        return refreshDisplay('           Deck reset');
    } else { return error('    INVALID ENTRY - TRY AGAIN'); }
    return true;
}

// Prompt user for input
function getUserInput() {
    readline.question(': ', string => {
        processInput(string);
    })
}

// Render app
function refreshDisplay(msg) {
    console.clear();
    console.log(header);
    spades.log();
    hearts.log();
    clubs.log();
    diamonds.log();
    if(msg) { console.log(`! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! !\n${msg}`) }
    getUserInput();
}

// Launch app
(function start() {
    refreshDisplay();
})();