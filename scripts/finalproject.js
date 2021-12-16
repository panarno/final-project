/*
* assignment:   final project
* class:        comp 2132 (thurs.)
* term:         fall 2021
* student:      arno princeston pan
* id:           a00823325
* ver:          12/09/2021
*/


// Buttons
const   buttonStart     =   document.getElementById("button-one");
buttonStart.style.backgroundColor = "green";

const   buttonEnd       =   document.getElementById("button-two");
buttonEnd.style.backgroundColor = "babyblue";


// Image
var     diceNumber  =   0; // default dice-0.png
var     imageSource =   `images/dice-${diceNumber}.png`;

const   diceImageOne    =   document.getElementById("dice-image-one");
const   $diceImageOne   =   $("#dice-image-one");
const   diceImageTwo    =   document.getElementById("dice-image-two");
const   $diceImageTwo   =   $("#dice-image-two");
diceImageOne.src        =   imageSource;
$diceImageOne.attr('src', imageSource);
diceImageTwo.src        =   imageSource;
$diceImageOne.attr('src', imageSource);

const   diceImageThree  =   document.getElementById("dice-image-three");
const   $diceImageThree =   $("#dice-image-three");
const   diceImageFour   =   document.getElementById("dice-image-four");
const   $diceImageFour  =   $("#dice-image-four");
diceImageThree.src      =   imageSource;
$diceImageThree.attr('src', imageSource);
diceImageFour.src       =   imageSource;
$diceImageFour.attr('src', imageSource);
 

// Game Limits
    // Rounds
var     roundCount      =   0;  // count towards roundMax
const   roundMax        =   3;  // max 3 rounds
const   roundDisplay    =   document.getElementById("round-display");
roundDisplay.textContent    =   `ROUND`;

    // Score
var     computerScoreTotal          =   0; // total score of computer
const   computerScoreTotalDisplay   =   document.getElementById("computers-score-total"); 
computerScoreTotalDisplay.textContent   =   `Computer's Total Score: ${computerScoreTotal}`;

var     playerScoreTotal            =   0;   // total score of player
const   playerScoreTotalDisplay     =   document.getElementById("players-score-total");
playerScoreTotalDisplay.textContent     =   `Player's Total Score: ${playerScoreTotal}`;

var     computerScoreNow            =   0;   // score of computer currently
const   computerScoreNowDisplay     =   document.getElementById("computers-score-now");
computerScoreNowDisplay.textContent =   `Computer's Current Score: ${computerScoreNow}`;

var     playerScoreNow              =   0;     // score of player currently
const   playerScoreNowDisplay       =   document.getElementById("players-score-now");
playerScoreNowDisplay.textContent   =   `Player's Current Score: ${playerScoreNow}`;

    // Score Cases
var     hasOneOne;          // boolean to check if only 1 of the dice has the # 1
var     hasPair;            // boolean to check if rolled dices are the same #

    // Magic Numbers
const   theOne      =   1;  // check for # 1, you have it your score is cleared

    // Score Modifiers
const   doubleScore =   2;  // multiply by this to double the score, when hasPair 
const   clearScore  =   0;  // clear score, when hasOneOne; remember it is score = (# + #)*clearScore

    // Dice
var     computerDiceOne;    // computer's dice 1 #
var     computerDiceTwo;    // computer's dice 2 #
var     playerDiceOne;      // player's dice 1 #
var     playerDiceTwo;      // player's dice 2 #

    // Results Feedback
const   winningSound = `https://www.myinstants.com/media/sounds/homer-woohoo.mp3`;
const   losingSound  = `https://www.myinstants.com/media/sounds/070-challenge-lose.mp3`;
const   tieSound     = `https://www.myinstants.com/media/sounds/shocked.mp3`;

// Player Object

class Player
{
    // Constructor to create scoreNow, scoreTotal
    constructor(playerName, scoreNow, scoreTotal)
    {
        this.setPlayerName(playerName);
        this.setScoreNow(scoreNow);
        this.setScoreTotal(scoreTotal);
    }

    // Setters

    // Use this method to set playerName (i.e. "COMP", "PLAYER")
    setPlayerName(playerName)
    {
        if(playerName != null)
        {
            if(typeof playerName == 'string')
            {
                this.playerName = playerName;
            }
            else
            {
                console.log("ERROR: Check playerName Input.");
            }
        }
    }

    // Use this method to set the scoreNow
    setScoreNow(scoreNow)
    {
        if(scoreNow != null)
        {
            if(typeof scoreNow == 'number')
            {
                this.scoreNow = scoreNow;
            }
            else
            {
                console.log("ERROR: Check scoreNow Input.");
            }
        }
    }

    // Use this method to set the scoreTotal
    setScoreTotal(scoreTotal)
    {
        if(scoreTotal != null)
        {
            if(typeof scoreTotal == 'number')
            {
                this.scoreTotal = scoreTotal;
            }
            else
            {
                console.log("ERROR: Check scoreTotal Input.");
            }
        }
    }

    // Getters
    getPlayerName()
    {
        return(this.playerName);
    }

    getScoreNow()
    {
        return(this.scoreNow);
    }

    getScoreTotal()
    {
        return(this.scoreTotal);
    }

}


// Dice Object

class Dice
{
    // Constructor to set diceOne and diceTwo
    constructor(diceOne, diceTwo)
    {
        this.setDiceOne(diceOne);
        this.setDiceTwo(diceTwo);
    }

    // Setters

    setDiceOne(diceOne)
    {
        if(diceOne != null)
        {
            if(typeof diceOne == "number")
            {
                this.diceOne = diceOne;
            }
            else
            {
                console.log("ERROR: Check diceOne Input.");
            }
        }
    }

    setDiceTwo(diceTwo)
    {
        if(diceTwo != null)
        {
            if(typeof diceTwo == "number")
            {
                this.diceTwo = diceTwo;
            }
            else
            {
                console.log("ERROR: Check diceTwo Input.");
            }
        }
    }

    // Getters

    getDiceOne()
    {
        console.log(`DiceOne: ${this.diceOne}`);
        return(this.diceOne);
    }

    getDiceTwo()
    {
        console.log(`DiceTwo: ${this.diceTwo}`);
        return(this.diceTwo);
    }


}

// Dice Prototypes

    // rolls BOTH diceOne and diceTwo
Dice.prototype.rollDice = function()
{
    var randomNumber    = Math.floor( ( Math.random() * 6) + 1 );
    this.setDiceOne(randomNumber);

    randomNumber        = Math.floor( ( Math.random() * 6) + 1 );
    this.setDiceTwo(randomNumber); 

    console.log("Dice Rolled");
}

    // display BOTH diceOne and diceTwo
Dice.prototype.displayFirstPair = function()
{
    $diceImageOne.fadeIn();
    diceNumber  =   this.getDiceOne();
    imageSource =   `images/dice-${diceNumber}.png`;
    $diceImageOne.attr('src', imageSource);

    diceNumber  =   this.getDiceTwo();
    imageSource =   `images/dice-${diceNumber}.png`;
    $diceImageTwo.attr('src', imageSource);
}

Dice.prototype.displaySecondPair = function()
{
    diceNumber  =   this.getDiceOne() + 6;
    imageSource =   `images/dice-${diceNumber}.png`;
    // diceImageThree.src = imageSource;
    $diceImageThree.attr('src', imageSource);

    diceNumber  =   this.getDiceTwo() + 6;
    imageSource =   `images/dice-${diceNumber}.png`;
    // diceImageFour.src = imageSource;
    $diceImageFour.attr('src', imageSource);
}

    // check BOTH diceOne and diceTwo
Dice.prototype.checkDice = function()
{
    if(this.getDiceOne() == theOne || this.getDiceTwo() == theOne)
    {
        hasOneOne = true;
        if(this.getDiceOne() == this.getDiceTwo())
        {
            console.log("Double 1s.");
        }
    }
    else
    {
        hasOneOne = false;
    }

    if(this.getDiceOne() != theOne && this.getDiceTwo != theOne)
    {
        if(this.getDiceOne() == this.getDiceTwo())
        {
            hasPair = true;
            hasOneOne = false;
        }
        else
        {
            hasPair = false;
        }
    }

    if(hasPair)
    {
        return( (this.getDiceTwo() + this.getDiceTwo() )*doubleScore );
    }else if(!hasPair && !hasOneOne)
    {
        return( (this.getDiceOne() + this.getDiceTwo() ) );
    }

    if(hasOneOne)
    {
        return( clearScore );
    }

    console.log(`Calculation Complete.`);
}


// Functions
function playAudio(link){
    var sound = new Audio(link);
    sound.play();
};

function playRound()
{
    if(roundCount >= roundMax)
    {
        return;
    }
    // COMP
    someDice.rollDice();
    someDice.displayFirstPair();
    computerPlayer.setScoreNow(someDice.checkDice());
    computerScoreNowDisplay.textContent     = `Computer's Current Score: ${computerPlayer.getScoreNow()}`; 
    computerPlayer.setScoreTotal(computerPlayer.getScoreNow() + computerPlayer.getScoreTotal());
    computerScoreTotalDisplay.textContent   = `Computer's Total Score: ${computerPlayer.getScoreTotal()}`; 

    // PLAYER
    someDice.rollDice();
    someDice.displaySecondPair();
    playerPlayer.setScoreNow(someDice.checkDice());
    playerScoreNowDisplay.textContent       = `Player's Current Score: ${playerPlayer.getScoreNow()}`;
    playerPlayer.setScoreTotal(playerPlayer.getScoreNow() + playerPlayer.getScoreTotal());
    playerScoreTotalDisplay.textContent     = `Player's Total Score: ${playerPlayer.getScoreTotal()}`; 

    roundCount++;
    if(roundCount < roundMax)
    {
        roundDisplay.textContent                    =   `ROUND: ${roundCount}`;
    }
    else
    {
        buttonStart.style.backgroundColor           =   'maroon';
        roundDisplay.textContent                    =   `ROUND 3: GAME OVER`;
        if(playerPlayer.getScoreTotal() > computerPlayer.getScoreTotal())
        {
            playerScoreNowDisplay.textContent       =   `!!!PLAYER WINS!!! \\ (o￣∇￣o) / `; 
            computerScoreNowDisplay.textContent     =   `(; TT o TT)`; 
            $diceImageThree.fadeTo("slow", 0.5);
            $diceImageFour.fadeTo("slow", 0.5);
            playAudio(winningSound);
        }else if(playerPlayer.getScoreTotal() < computerPlayer.getScoreTotal())
        {
            playerScoreNowDisplay.textContent       =   `(TT o TT ;)`; 
            computerScoreNowDisplay.textContent     =   `\\ (o￣∇￣o) / !!!COMPUTER WINS!!!`; 
            $diceImageOne.fadeTo("slow", 0.5);
            $diceImageTwo.fadeTo("slow", 0.5);
            playAudio(losingSound);
        }
        else
        {
            playerScoreNowDisplay.textContent       =   `RARE TIE (・o・ )`; 
            computerScoreNowDisplay.textContent     =   `( ・o・)RARE TIE`; 
            $diceImageOne.fadeTo("slow", 0.5);
            $diceImageTwo.fadeTo("slow", 0.5);
            $diceImageThree.fadeTo("slow", 0.5);
            $diceImageFour.fadeTo("slow", 0.5);
            playAudio(tieSound);
        }
    }
}

function resetGame()
{
    roundCount = 0;
    buttonStart.style.backgroundColor = 'green';
    playerPlayer.setScoreNow(0);
    playerPlayer.setScoreTotal(0);
    computerPlayer.setScoreNow(0);
    computerPlayer.setScoreTotal(0);

    roundDisplay.textContent                =   `ROUND RESET`;
    playerScoreNowDisplay.textContent       =   `Player's Current Score: ${playerPlayer.getScoreNow()}`;
    playerScoreTotalDisplay.textContent     =   `Player's Total Score: ${playerPlayer.getScoreTotal()}`;
    computerScoreNowDisplay.textContent     =   `Computer's Current Score: ${computerPlayer.getScoreNow()}`;
    computerScoreTotalDisplay.textContent   =   `Computer's Total Score:  ${computerPlayer.getScoreTotal()}`;

    diceNumber  =   0; // default dice-0.png
    imageSource =   `images/dice-${diceNumber}.png`;
    diceImageOne.src    = imageSource;
    diceImageTwo.src    = imageSource;
    diceImageThree.src  = imageSource;
    diceImageFour.src   = imageSource;
    $diceImageOne.fadeTo("fast", 1);
    $diceImageTwo.fadeTo("fast", 1);
    $diceImageThree.fadeTo("fast", 1);
    $diceImageFour.fadeTo("fast", 1);
    
}


// Test
var computerPlayer = new Player("Computer", 0, 0);
var playerPlayer = new Player("Player", 0, 0);

var someDice = new Dice(); // we need to initialize this before we can comp or player roll

buttonStart.addEventListener("click", function(){
    playRound();
});

buttonEnd.addEventListener("click", function(){
    resetGame();
});
