/*global $, console */
(function () {
    'use strict';
    
    var computerScore = 0,
        humanScore = 0,
        /* Here we create a ruleBook object which acts like a dictionary of
        ** all of the valid plays in the game.  We will consult this later when
        ** attempting to determine a winner */
        ruleBook = {
            'rock-rock': 'draw',
            'paper-paper': 'draw',
            'scissors-scissors': 'draw',
            'rock-scissors': 'rock',
            'scissors-rock': 'rock',
            'paper-rock': 'paper',
            'rock-paper': 'paper',
            'scissors-paper': 'scissors',
            'paper-scissors': 'scissors'
        };
    
    /* A function to simulate a computer player
    ** Don't worry about the implementation.  I've commented it just incase you are 
    ** interested in the breakdown of how it works */
    function simulateComputerPlayer() {
        /* Generate a random number between 1 & 3 
        ** Math is a built in JavaScript library that has utility functions to do math stuff
        ** e.g. Round numbers both up and down, Generate Random Numbers, etc
        ** The next line of code uses these functions by executing 
        ** a) Math.random() //Generates a random number between zero and one i.e. it has lots of numbers after the decimial place 0.34156865
        ** b) Math.random() * 2 // Multiplies the random number by 2 with all those digits after the decimal place
        ** c) Math.round(result from the previous two ) //Rounds the number generated to a whole number i.e. gets rid of the decimal part
        ** d) (result of the previous 3) plus 1 - if we didn't do this we would have a random number between 0 and 2
        */
        var randNum = (Math.round(Math.random() * 2)) + 1;

        /* Let 1 equal Rock 
        ** Let 2 equal Paper 
        ** Let 3 equal Scissors */
        if (randNum === 1) {
            return 'rock';
        } else if (randNum === 2) {
            return 'paper';
        } else if (randNum === 3) {
            return 'scissors';
        }
    }

    /* We have refactored our determineWinner function to consult the ruleBook object defined above.
    ** The deference operator is used to lookup the rule book by creating a key e.g.
    ** humanSelection.toLowerCase() + '-' + computerSelection.toLowerCase() creates a string like
    ** 'rock-paper' which is then looked up in the ruleBook and the result 'paper' returned.  Using 
    ** the toLowerCase() method on the string is not relevant but would ensure that if we changed the
    ** values passed in to 'Paper', 'Rock' or 'ROCK', 'PAPER' the rule book would still give us the correct
    ** result.
    */
    function determineWinner(humanSelection, computerSelection) {
        var result = ruleBook[humanSelection.toLowerCase() + '-' + computerSelection.toLowerCase()];
        
        if (result === humanSelection) {
            $('#results h4').html('You Win - ' + humanSelection + ' beats ' + computerSelection);
            humanScore += 1;
        } else if (result === computerSelection) {
            $('#results h4').html('You Loose - ' + computerSelection + ' beats ' + humanSelection);
            computerScore += 1;
        } else {
            $('#results h4').html('Draw - Play again - ' + computerSelection + ' cancels ' + humanSelection);
        }

        $('#results').show();
    }
    
    /* We know that our scoreboard is a table with two td elements.  The first is the humanScore and the 
    ** second is the computer score.  Using the array index we can eliminate having to put id's or
    ** classes in our markup and only hit up the DOM once to get both elements*/
    function updateScoreboard() {
        var cells = $('.scoreboard td');
        
        /* Use jQuery to make the cells into jQuery elements so we can use the .text() function*/
        $(cells[0]).text(humanScore);
        $(cells[1]).text(computerScore);
    }
    
    /* Here we select all a tags under the element with the class of inputs and call our determineWinner function */
    $('.inputs a').click(function (e) {
        /* We now need to extract out the hash from the href attribute of the a (anchor) and replace the '#'
        ** with an empty string which will mean that we will either have rock, paper or scissors in the
        ** humanPlayerDecision variable */
        var humanPlayerDecision = this.hash.replace('#', ''),
            computerPlayersDecision = simulateComputerPlayer();
        
        /* Write out an information message to the console - useful for debugging purposes but should be removed when site goes live*/
        console.log('Human has chosen ', humanPlayerDecision);
        console.log('Computer has chosen ', computerPlayersDecision);

        
        determineWinner(humanPlayerDecision, computerPlayersDecision);
        
        updateScoreboard();
    });

    
}());