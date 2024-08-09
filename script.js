// Select all boxes and turn boxes
const boxes = document.querySelectorAll(".box-align");
const turnBoxes = document.querySelectorAll(".turn-box");

let turn = "X";
let isGameOver = false;

// Initialize the game
boxes.forEach(box => {
    box.innerHTML = "";
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            if (!isGameOver) {
                changeTurn();
            }
        }
    });
});

// Change the turn between X and O and update turn indicators
function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    updateTurnDisplay();
}

// Update the turn indicator display
function updateTurnDisplay() {
    turnBoxes.forEach(box => {
        box.classList.remove('active');
    });

    const activeBox = turn === "X" ? turnBoxes[0] : turnBoxes[1];
    activeBox.classList.add('active');
    
    const bgElement = document.querySelector(".bg");
    if (bgElement) {
        bgElement.style.left = turn === "X" ? "0" : "85px";
    }
}

// Check for a winning condition
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        const v0 = boxes[a].innerHTML;
        const v1 = boxes[b].innerHTML;
        const v2 = boxes[c].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = `${turn} wins`;
            document.querySelector("#play-again").style.display = "inline";
            // Highlight winning boxes
            condition.forEach(index => {
                boxes[index].style.backgroundColor = "#08D9D6";
            });
            break; // Exit loop early as we have a winner
        }
    }
}

// Check for a draw condition
function checkDraw() {
    if (!isGameOver) {
        const isDraw = Array.from(boxes).every(box => box.innerHTML !== "");
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

// Reset the game on "Play Again" button click
document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "#fff";
    });

    updateTurnDisplay(); // Reset the turn display
});

// Initialize turn display
updateTurnDisplay();
