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

### **Remove a card by typing cardID then press ENTER**

For example remove the 2 of Clubs by typing 2- then pressing ENTER. Or remove the Ace of Clubs by typing 0- then pressing ENTER.    

Example: 12* then ENTER removes Queen of Hearts
Example: 0/ then ENTER removes 

_Remember, input is optimized for numpad. Input easily without lifting your hand when you use numpad._

### **Add a card by typing + and cardID then pressing ENTER** 

If you accidentally remove the wrong card you can add it back. For example, to add the Ace of Spades back you type +0/ then press enter. Remember the Ace is a unique card in that it is represented by 0.  

Example: +13+ then ENTER adds the King of Diamonds
Example: +8- then ENTER adds the Eight of Clubs

### **Reset the deck by typing 000 then pressing ENTER**

When a round finishes you can reset the deck by typing 000 then press ENTER. The deck will go back to a full deck. Warning, there is no undo option so only do this when you are ready.  

Example: 000 then ENTER resets the deck

### SIDE NOTES
This project was created to see how giving users a photographic memory would improve their game. I am relatively new to programming and set the constraint that the project had to be finished in one day. Success!

If you have any questions or comments please send them to jasonford1 at gmail. Enjoy!
