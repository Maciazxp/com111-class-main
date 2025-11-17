function rollDice() {
    // Generate random numbers between 1 and 6 for both players
    const player1Roll = Math.floor(Math.random() * 6) + 1;
    const player2Roll = Math.floor(Math.random() * 6) + 1;

    // Update the image of the dice
    document.querySelector('.img1').src = `images/dice${player1Roll}.png`;
    document.querySelector('.img2').src = `images/dice${player2Roll}.png`;


const winner = document.getElementById("winner");
if (player1Roll > player2Roll) {
    winner.textContent = "Player 1 Wins!";
} else if (player2Roll > player1Roll) {
    winner.textContent = "Player 2 Wins!";
} else {
    winner.textContent = "It's a Tie!";
}
}