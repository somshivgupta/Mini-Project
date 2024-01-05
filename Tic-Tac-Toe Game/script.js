let boxes = document.querySelectorAll(".box");
let rstbtn = document.querySelector("#reset");
let newGamebtn = document.querySelector('#new-game');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true;
let turnX = false;
let count = 0;

const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const restGame = () => {
    count = 0;
    turnO = true;
    enableBtn();
    msgContainer.classList.add("hide");

};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            box.classList.remove('x');
            box.classList.add('o');
            turnO = false;
        }

        else {
            box.innerText = "X";
            box.classList.remove('o');
            box.classList.add('x');
            turnO = true;
        }
        count++;
        box.disabled = true;
        
        let boole = checkWinner();
        console.log(boole);
        if (count === 9 && boole != true) {
            matchDraw();
        }

    });
});

const disBtn = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBtn = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation! the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disBtn();
};

const matchDraw = () => {
    msg.innerText = `Match Draw`;
    msgContainer.classList.remove("hide");
}

const checkWinner = () => {
    for(let pattern of winpattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != "") {
            if(pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
};

newGamebtn.addEventListener("click", () => {
    restGame();
})

rstbtn.addEventListener("click", () => {
    restGame();
})