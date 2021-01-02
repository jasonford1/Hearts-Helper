// Heart Helper User Script //
// Use with Tampermonkey    //
// V 1.0.0                  //
// BY JASON FORD            //

// ==UserScript==
// @name         Heart Helper
// @description  Gives you perfect information in BGA Hearts
// @namespace    https://github.com/jasonford1/heart-helper
// @author       https://github.com/jasonford1
// @version      0.1
// @include      *boardgamearena.com/*
// @grant        none
// ==/UserScript==

//System variables - don't edit
const isInsideGame = /\?table=[0-9]*/.test(window.location.href);
const enableLogging = true;
let hh;

// Create a suit of cards
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
        return `${this.symbol} ${this.stringOfRemainingCards} ${this.symbol}`;
    }

    // Remove card. Send error if card cannot be removed. Return true if card removed successfully.
    remove(card) {
        card = Math.floor(card);
        if (card === 10) {
            if (this.remainingCards[14-card] === '__') { return error(`      ${this.symbol}${card}${this.symbol} ALREADY REMOVED`) }
            else this.remainingCards[14-card] = '__';
        } else if (card > 1 && card < 15) {
            if (this.remainingCards[14-card] === '_') { return error(`      ${this.symbol}${card}${this.symbol} ALREADY REMOVED`) }
            else this.remainingCards[14-card] = '_';
        } else { return error(`    INVALID ENTRY - TRY AGAIN`) }
        this.count--;
        this.stringOfRemainingCards = this.remainingCards.join(' ');
        //return refreshDisplay();
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

// Main Heart Helper object
class HeartHelper {
    constructor () {
        this.isStarted = false;
        this.isFinished = false;
        this.dojo = null;
        this.game = null;
        this.mainPlayer = {} ;
        this.leftPlayer = {};
        this.acrossPlayer = {};
        this.rightPlayer = {};
        this.leadSuit = null;
        this.onTable = {};
        this.deck = {};
    }

    // Init Heart Helper
    init () {
        this.isStarted = true;
        // Check if the site was loaded correctly
        if (!window.parent || !window.parent.dojo || !window.parent.gameui.gamedatas ||
            !window.parent.gameui.gamedatas.playerorder || !window.parent.gameui.gamedatas.playerorder[0]) {
            return;
        }
        this.dojo = window.parent.dojo;
        this.game = window.parent.gameui.gamedatas;
        let playerOrder = this.game.playerorder;
        let players = this.game.players;
        
        // Main Player
        this.mainPlayer.id = playerOrder[0];
        this.mainPlayer.name = players[`${playerOrder[0]}`].name;
        this.mainPlayer.hand = JSON.parse(JSON.stringify(this.game.hand));
        this.mainPlayer.score = players[`${playerOrder[0]}`].score;

        // Left of Main Player
        this.leftPlayer.id = playerOrder[1];
        this.leftPlayer.name = players[`${playerOrder[1]}`].name;
        this.leftPlayer.voidSuits = [];
        this.leftPlayer.hand = {};
        this.leftPlayer.score = players[`${playerOrder[1]}`].score;

        // Across from Main Player
        this.acrossPlayer.id = playerOrder[2];
        this.acrossPlayer.name = players[`${playerOrder[2]}`].name;
        this.acrossPlayer.voidSuits = [];
        this.acrossPlayer.hand = {};
        this.acrossPlayer.score = players[`${playerOrder[2]}`].score;

        // Right of Main Player
        this.rightPlayer.id = playerOrder[3];
        this.rightPlayer.name = players[`${playerOrder[3]}`].name;
        this.rightPlayer.voidSuits = [];
        this.rightPlayer.hand = {};
        this.rightPlayer.score = players[`${playerOrder[3]}`].score;

        // Cards and their point value on the table
        this.onTable.cards = [];
        this.onTable.points = 0;

        // Build deck
        // Build card deck
        this.deck.spades = new Suit('\u2660');
        this.deck.hearts = new Suit('\u2665');
        this.deck.clubs = new Suit('\u2663');
        this.deck.diamonds = new Suit('\u2666');

        // Connect event handlers and record game events
        this.dojo.subscribe("giveCards", function(data) {
            // data properties
            // data.args.cards === {0: "cardid", 1: "cardid", 2: "cardid"}
    
            if(enableLogging) console.log('GIVE CARDS NOTIFICATION');
            if(enableLogging) console.log(data);

            // Remove cards from hand 
            delete hh.mainPlayer.hand[`${data.args.cards[0]}`]
            delete hh.mainPlayer.hand[`${data.args.cards[1]}`]
            delete hh.mainPlayer.hand[`${data.args.cards[2]}`]
            console.log(hh.mainPlayer.hand)
        });
        this.dojo.subscribe("takeCards", function(data) {
            // data properties
            // data.args.cards === {'id': {id:'id', type:'suit', type_arge:'face_value'}}
            
            console.log('TAKE CARDS NOTIFICATION');
            console.log(data);

            // Add cards to hand
            for(let card in data.args.cards) {
                hh.mainPlayer.hand[`${card}`] = {};
                hh.mainPlayer.hand[`${card}`].type = data.args.cards[`${card}`].type;
                hh.mainPlayer.hand[`${card}`].type_arg = data.args.cards[`${card}`].type_arg;
                hh.mainPlayer.hand[`${card}`].id = data.args.cards[`${card}`].id;
            }
            if(enableLogging)  console.log(hh.mainPlayer.hand);
            return hh.renderDeckRemaining();
        });
        this.dojo.subscribe("newHand", function(data) {
            // data properties
            
            // Reset deck
            // Reset player(s) hand(s)
            // Reset 
            console.log('NEW HAND NOTIFICATION');
            console.log(data);

            hh.deck.spades.reset();
            hh.deck.hearts.reset();
            hh.deck.clubs.reset();
            hh.deck.diamonds.reset();
            return hh.renderDeckRemaining();
        });
        this.dojo.subscribe("playCard", function(data) {
            // data properties
            // data.args.color === suit (1: spade, 2: heart, 3: club, 4: diamond)
            // data.args.player_id === id of player who played card
            // data.args.value === card face value (11: jack, 12: queen, 13: king, 14:ace)
    
            // Log if a player did not follow suit (set voidSuits)
            // Pop card played out of the deck
            // If card played is a point card, add points to hand so they can be added on recordTrickWin()
            console.log('PLAY CARD NOTIFICATION');
            console.log(data);

            if(data.args.color === '1') hh.deck.spades.remove(data.args.value)
            if(data.args.color === '2') hh.deck.hearts.remove(data.args.value)
            if(data.args.color === '3') hh.deck.clubs.remove(data.args.value)
            if(data.args.color === '4') hh.deck.diamonds.remove(data.args.value)
            
            if(enableLogging) console.log(hh.deck.spades.log());
            if(enableLogging) console.log(hh.deck.hearts.log());
            if(enableLogging) console.log(hh.deck.clubs.log());
            if(enableLogging) console.log(hh.deck.diamonds.log());
            return hh.renderDeckRemaining();
        });
        this.dojo.subscribe("trickWin", this, "recordTrickWin");
        this.dojo.subscribe("newScores", this, "recordNewScores");

        this.renderHeartHelperContainers();

        if(enableLogging) console.log("Heart Helper ready!")
        if(enableLogging) console.log(heartHelper)
        return this;
    }

    recordPlayCard (data) {
        // data properties
        // data.args.color === suit (1: spade, 2: heart, 3: club, 4: diamond)
        // data.args.player_id === id of player who played card
        // data.args.value === card face value (11: jack, 12: queen, 13: king, 14:ace)

        // Log if a player did not follow suit (set voidSuits)
        // Pop card played out of the deck
        // If card played is a point card, add points to hand so they can be added on recordTrickWin()
        console.log('PLAY CARD NOTIFICATION');
        console.log(data);
    }

    recordTrickWin (data) {
        // data properties
        // data.args.player_id === id of player who won the trick
        
        // Log points for player who won the trick
        // Reset cards on table
        console.log('TRICK WIN NOTIFICATION');
        console.log(data);
    }

    recordNewScores (data) {
        // data properties
        // data.args.newScores === {playerID: newScore}

        // Confirm scores are correct. Log error if not.
        console.log('NEW SCORES NOTIFICATION');
        console.log(data);
    }

    renderHeartHelperContainers() {
        if(!this.dojo.byId('deck_remaining')) {
            this.dojo.place(
                "<div id='deck_remaining' class='whiteblock'></div>", "player_boards", "after"
            );
            this.renderDeckRemaining();
        }
    }

    renderDeckRemaining() {
        const container = this.dojo.byId('deck_remaining');
        this.dojo.empty(container);
        this.dojo.place(
            "<p>" + this.deck.spades.log() + "<br>"
            + "<span style='color:red'>" + this.deck.hearts.log() + "</span><br>"
            + this.deck.clubs.log() + "<br>"
            + "<span style='color:red'>" + this.deck.diamonds.log() + "</span></p>", container, "inside"
        )
    }
};

// Everything starts here
window.onload = function() {
    if (isInsideGame) {
        setTimeout(3000); // Wait for BGA to load dojo and Hearts scripts
        if (!window.parent || !window.parent.gameui || !window.parent.gameui.game_name ||
            window.parent.gameui.game_name != "hearts") {
            return;
        }

        // Prevent multiple launches
        if (window.parent.isHeartHelperStarted) {
            return;
        } else {
            if (enableLogging) console.log("Heart Helper: I have come to serve you");
            window.parent.isHeartHelperStarted = true;
            window.parent.heartHelper = new HeartHelper;
            hh = window.parent.heartHelper;
            window.parent.heartHelper.init();
        }
    }
};