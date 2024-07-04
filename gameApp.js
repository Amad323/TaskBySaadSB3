let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let winningMsg = document.querySelector(".winning-msg");
let msg = document.querySelector("#msg");
let twoPlayer = document.querySelector("#two-player-btn");
let singlePlayer = document.querySelector("#single-player-btn");


let twoPlayerTurn = true;
let singlePlayerTurn = false;
let winnerPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (twoPlayerTurn) {
            box.innerText = "O";
            twoPlayerTurn = false;
        } else {
            box.innerText = "X";
            twoPlayerTurn = true;
        }
        box.disabled = true;
        checkWinner();
        if (singlePlayerTurn && !twoPlayerTurn) {
            setTimeout(computerMove);
        }
    });
});


function checkWinner() {
    for (const pattern of winnerPatterns) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if (position1 != "" && position2 != "" && position3 != "") {
            if (position1 === position2 && position2 === position3) {
                showWinner(position1);
                return;
            }
        }
    }

    if ([...boxes].every(box => box.innerText !== "")) {
        showWinner("No one, it's a draw");
    }
}

function showWinner(winner) {
    msg.innerText = `Congratulation! The winner is ${winner}`;
    winningMsg.classList.remove("hide");
    disabledWinnerBox();
}

function disabledWinnerBox() {
    for (const box of boxes) {
        box.disabled = true;
    }
}

function enabledWinnerBox() {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

function resetGame() {
    twoPlayerTurn = true;
    enabledWinnerBox();
    winningMsg.classList.add("hide");
}

function computerMove() {
    let availableBoxes = [...boxes].filter(box => box.innerText === "");
    if (availableBoxes.length > 0) {
        let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        randomBox.innerText = "X";
        randomBox.disabled = true;
        twoPlayerTurn = true;
        checkWinner();
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

twoPlayer.addEventListener("click", () => {
    singlePlayerTurn = false;
    resetGame();
});

singlePlayer.addEventListener("click", () => {
    singlePlayerTurn = true;
    resetGame();
});
