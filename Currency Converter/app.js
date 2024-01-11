const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const msg1 = document.querySelector(".msg1");

for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }

        if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

//Main Code To Calculate the amount from one currency to another 
const updateRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {
        amount.value = "1";
        amtVal = 1;
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let respone = await fetch(URL);
    let data = await respone.json();
    let rate = data[toCurr.value.toLowerCase()];
    rate = rate.toFixed(2);

    let final = amtVal * rate;
    let finalAmount = final.toFixed(2);

    msg.innerText = `1 ${fromCurr.value} = ${rate} ${toCurr.value}`;
    msg1.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


const updateFlag = (element) => {
    let currCode = element.value;
    let country = countryList[currCode];
    let imgSrc = `https://flagsapi.com/${country}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = imgSrc; 
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateRate();
})

window.addEventListener("load", () => {
    updateRate();
});

