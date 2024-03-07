let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

let turn = true; // playerX, playerO
let count = 0;
let ifwin = false;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn === true) {
            box.innerText = "0";
            box.style.color = "#ced4da";
            turn = false;
        } else {
            box.innerText = "X";
            box.style.color = "#f72585";
            turn = true;
        }
        box.disabled = true;
        checkWinner();
        count++;
        // console.log(count);
        if (ifwin === false){
        draw();
        }
    });
});

const draw = () => {
    if (count === 9) {
        // console.log("draw called")
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
    }
};


const checkWinner = () => {
    console.log("checkWinner called")
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                ifwin = true;
                return;
            }
        }
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes ) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes ) {
        box.disabled = false;
        box.innerText = "";
    }
}

const reset_new_Game = () => {
    turn = true;
    count = 0;
    ifwin = false;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click",reset_new_Game);
resetBtn.addEventListener("click",reset_new_Game);