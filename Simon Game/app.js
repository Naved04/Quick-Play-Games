const boxes = document.querySelectorAll('.box');
const scoreDisplay = document.querySelector('#score');
const StartBtn = document.querySelector('#start');
const quitButton = document.querySelector('#quit');

let sequence = [];
let playerSequence = [];
let score = 0;
let isGameOver = false;
let turn = true;

// Generate a random color
function addToSequence() {
    const colors = ['red', 'yellow', 'blue', 'green'];
    const randomColor = colors[Math.floor(Math.random() * 4)];
    // console.log(randomColor);
    sequence.push(randomColor);
}

// Highlight a color
function highlightColor(randomColor) {
   const button = document.querySelector(`.box[style="background-color: ${randomColor};"]`);
   button.classList.add('highlight'); 
   setTimeout(() => {
       button.classList.remove('highlight');
   }, 500);
};

// Highlight a color in the sequence
function playSequence() {
    isGameOver = true;
    let i = 0;
    const interval = setInterval(() => {
        highlightColor(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            isGameOver = false;
        }
    }, 1000);
}

//Player turn 
let playerturn = boxes.forEach(box => {
    box.addEventListener('click', () => {
        const color = box.style.backgroundColor;
        highlightColor(color);
        handleInput(color);
    });
});

// Handle user input and check if it matches the sequence
function handleInput(color) {
    if (!isGameOver) {
        playerSequence.push(color);
        checkSequence();
    }
}

// Check if the player's sequence matches the current sequence
function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            gameOver();
            return;
        }
    }
    if (playerSequence.length === sequence.length) {
        playerSequence = [];
        addToSequence();
        playSequence();
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }
}

// Game over
function gameOver() {
    alert(`Game Over! Your score is ${score}.`);
    resetGame();
}

// Reset the game
function resetGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    turn = true;
}


// Start the Game
StartBtn.addEventListener('click', () => {
    if (turn === true) {
    addToSequence();
    playSequence();
    turn = false;
    } else {
        playerturn();
        turn = true;
    }
})

// Quit button
quitButton.addEventListener('click', () => {
    alert(`You quit the game. Your final score is ${score}.`);
    resetGame();
});