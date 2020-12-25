# HEART HELPER
Gain photographic memory when you play hearts.

## Installation
Launch app.js in your favorite JavaScript runtime. Personally I use NodeJS in the terminal on a Mac, but you could just as easily copy the code and run it in the Chrome or Firefox console.

## Key Commands  
### Actions
There are three actions:
 - Remove a card
   - Type cardID then ENTER
 - Add a card
   - Type +cardID then ENTER
 - Reset the deck
   - Type 000 then ENTER

### Card ID
The way Heart Helper knows what card to remove/add is by the cardID you type. Develop quick muscle memory by remembering cardID equals face value plus suit symbol. Symbols are:
 - / Spade
 - \* Heart
 - \- Club
 - \+ Dimaond  

 Example: Two of Hearts is 2*  
 Example: Ace of Diamonds is 0+  

 _NOTE: Ace is 0 and Jack through King are J = 11, Q = 12, and K = 13_  

### **Remove a card: type cardID then press ENTER**
When a card is played you will want to remove it from the deck. For example, to remove the 2 of Clubs type 2- then press ENTER. To remove the Ace of Clubs type 0- then press ENTER.  

 Example: 12* then ENTER removes Queen of Hearts  
 Example: 0/ then ENTER removes Ace of Spades  

 _NOTE: Input is optimized for numpad. When you use numpad you never have to lift you hand._  

### **Add a card: type + and cardID then press ENTER** 
If you accidentally remove a card add it back. For example, type +0/ then ENTER to add the Ace of Spades.

 Example: +13+ then ENTER adds the King of Diamonds  
 Example: +8- then ENTER adds the Eight of Clubs  

### **Reset the deck: type 000 then press ENTER**

When a round finishes you can reset the deck by typing 000 then press ENTER. The deck will go back to a full deck. Warning, there is no undo option so only do this when you are ready.  

 Example: 000 then ENTER resets the deck

## Tips
Use your numpad for optimal experience. You never have to lift your hand.

### SIDE NOTES
This project was created to see how giving users a photographic memory would improve their game. I am relatively new to programming and set the constraint that the project had to be finished in one day. Success!

If you have any questions or comments please send them to jasonford1 at gmail. Enjoy!
