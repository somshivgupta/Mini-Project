let userScore = 0;
let compScore = 0;
let msg = document.querySelector("#msg");
let userWin = document.querySelector("#user-score");
let serverWin = document.querySelector("#comp-score");
let rstBtn = document.querySelector(".rstBtn");

const choice = document.querySelectorAll(".choice");

const matchDraw = () => {
    console.log("Match Draw");
    msg.innerText = "Match Draw";
    msg.style.backgroundColor = "grey";
}

let userCount = 0, serverCount = 0;

rstBtn.addEventListener("click", () => {
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "darkgreen";
    userCount = 0;
    serverCount = 0;
    userWin.innerText = 0;
    serverWin.innerText = 0;
});


const showWinner = (winner, userChoice, serGen) => {
    if(winner === true) {
        console.log("Congratulation! You Won");
        msg.innerText = `Congratulation! You Won, your ${userChoice} beats ${serGen}`;
        msg.style.backgroundColor = "green";
        userCount++;
        userWin.innerText = userCount;
    }

    else {
        console.log("Sorry! You Loss");
        msg.innerText = `Sorry! You Loss, ${serGen} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        serverCount++;
        serverWin.innerText = serverCount;
    }
}
const serChoice = () => {
    const option = ["rock", "paper", "scissors"];
    let gen = Math.floor(Math.random() * 3);
    console.log(option[gen], " is generated");
    return option[gen];
}

const playgame = (userChoice) => {
    console.log("User choices", userChoice);

    const serGen = serChoice();
    console.log("Server Choices = ", serGen);
    if(serGen === userChoice)
        matchDraw();

    else {
        let userWin = true;
        if(userChoice === "rock") {
            userWin = serGen === "scissors" ? true : false;
        }

        else if(userChoice === "scissors") {
            userWin = serGen === "paper" ? true : false;
        }

        else {
            userWin = serGen === "rock" ? true : false;
        } 

        showWinner(userWin, userChoice, serGen);
    }
}

choice.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        console.log(userChoice, " was clicked");
        playgame(userChoice);  
    })
})