# HEART HELPER
You get photographic memory when you play hearts.

# UPDATE 2021
Install HeartHelper by downloading Tampermonkey browser extension (Firefox, Chrome, Safari, Opera). Then copy HeartHelper.js into Tampermonkey. Go to Boardgamearena.com and experience HeartHelper for yourself. Enjoy! The remaining information below is depecrated with the old_commandline_app.js.

## Installation
Launch app.js in your favorite JavaScript runtime. Personally I use NodeJS in the terminal on a Mac, but you could just as easily copy the code and run it in the Chrome or Firefox console.

## Key Commands
### Optimized for numpad on your keyboard.
There are three types of input:
 - Remove a card: cardID then ENTER
 - Add a card: +cardID then ENTER
 - Reset the deck: 000 then ENTER

CardID is the numerical face value of the card plus a symbol to represent suit. Symbols for suit are:
 - / Spade
 - \* Heart
 - \- Club
 - \+ Dimaond

Example: 2 of Hearts is 2*
Example: 5 of Diamonds is 5+
__NOTE: Ace is 0 and Jack through Kind are J = 11, Q = 12, and K = 13__

*** Remove a card by typing cardID then press ENTER ***

For example remove the 2 of Clubs by typing 2- then pressing ENTER. Or remove the Ace of Clubs by typing 0- then pressing ENTER.

__Remember, input is optimized for numpad. Everything should be easily input without lifting your hand.__

*** Add a card by typing + and cardID then pressing ENTER *** 

If you accidentally remove the wrong card you can add it back. For example, to add the Ace of Spades back you type +0/ then press enter. Remember the Ace is a unique card in that it is represented by 0. 

*** Reset the deck by typing 000 then pressing ENTER ***

 When a round is over and you need to reset the deck type 000 then press ENTER. The deck will go back to a full deck. Warning, there is no undo option so only do this when you are ready.

## SIDE NOTES
This project was developed for fun as a way to see how giving users a photographic memory would improve their game.

If you have any questions or comments please send them to jasonford1 at gmail.

ENJOY!
