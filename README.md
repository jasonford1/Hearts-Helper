# HEART HELPER
Gain photographic memory when you play hearts.

## Installation
Launch app.js in your favorite JavaScript runtime. Personally I use NodeJS in the terminal on a Mac, but you could just as easily copy the code and run it in the Chrome or Firefox console.

## Key Commands
_Input via numpad for optimal experience_

There are three types of input:
 - Remove a card
   - Type cardID then ENTER
 - Add a card
   - Type +cardID then ENTER
 - Reset the deck
   - Type 000 then ENTER

**CardID** is numerical face value plus a symbol to represent suit. Symbols for suit are:
 - / Spade
 - \* Heart
 - \- Club
 - \+ Dimaond  

CardID Example: Two of Hearts is 2*  
CardID Example: Ace of Diamonds is 0+  

_NOTE: Ace is 0 and Jack through King are J = 11, Q = 12, and K = 13_  

**Remove a card by typing cardID then press ENTER**

For example remove the 2 of Clubs by typing 2- then pressing ENTER. Or remove the Ace of Clubs by typing 0- then pressing ENTER.

_Remember, input is optimized for numpad. Input easily without lifting your hand when you use numpad._

**Add a card by typing + and cardID then pressing ENTER** 

If you accidentally remove the wrong card you can add it back. For example, to add the Ace of Spades back you type +0/ then press enter. Remember the Ace is a unique card in that it is represented by 0. 

**Reset the deck by typing 000 then pressing ENTER**

When a round finishes you can reset the deck by typing 000 then press ENTER. The deck will go back to a full deck. Warning, there is no undo option so only do this when you are ready.

## SIDE NOTES
This project was a fun one day build created to see how giving users a photographic memory would improve their game.

If you have any questions or comments please send them to jasonford1 at gmail.

ENJOY!
