const body = document.querySelector("body");

body.style.padding = "20px";
body.style.maxWidth = "600px";
body.style.margin = "20px auto";
body.style.backgroundColor = "#e0f7fa";


body.style.fontFamily = "Arial, sans-serif";
body.style.color = "#37474f";



const h1 = document.createElement("h1");
h1.textContent = "KTÓRY KRAJ MA WIĘKSZĄ POPULACJĘ";
h1.style.fontSize = "40px";
h1.style.marginBottom = "20px";
h1.style.textAlign = "center";
h1.style.color = "#37474f";


const divFlags = document.createElement("div");
divFlags.style.display = "flex";
divFlags.style.justifyContent = "center";
divFlags.style.gap = "20px";
divFlags.style.marginBottom = "20px";



const divLeft = document.createElement("div");
divLeft.style.display = "flex";
divLeft.style.flexDirection = "column";
divLeft.style.alignItems = "center";
divLeft.style.border = "2px solid #4fc3f7"; 
divLeft.style.borderRadius = "10px";
divLeft.style.padding = "10px";

divLeft.style.width = "200px";
divLeft.style.height = "200px";
divLeft.style.display = "flex";
divLeft.style.justifyContent = "center";
divLeft.style.alignItems = "center";

const imgLeft = document.createElement("img");
imgLeft.style.width = "180px";
imgLeft.style.height = "90px";
imgLeft.style.cursor = "pointer";


let h2Left = document.createElement("h2");
h2Left.style.fontSize = "20px";
h2Left.style.marginTop = "10px";


let populationLeft = document.createElement("p");
populationLeft.style.display = "none";
populationLeft.style.fontSize = "16px"; 
populationLeft.style.marginTop = "10px";
populationLeft.style.whiteSpace = "nowrap"; 


const divRight = document.createElement("div");
divRight.style.display = "flex";
divRight.style.flexDirection = "column";
divRight.style.alignItems = "center";
divRight.style.border = "2px solid #4fc3f7"; 
divRight.style.borderRadius = "10px";
divRight.style.padding = "10px";
divRight.style.width = "200px";
divRight.style.height = "200px";
divRight.style.display = "flex";
divRight.style.justifyContent = "center";

divRight.style.alignItems = "center";

const imgRight = document.createElement("img");
imgRight.style.width = "180px";
imgRight.style.height = "90px";
imgRight.style.cursor = "pointer";

let h2Right = document.createElement("h2");
h2Right.style.fontSize = "20px";
h2Right.style.marginTop = "10px";

let populationRight = document.createElement("p");
populationRight.style.display = "none";
populationRight.style.fontSize = "16px"; 
populationRight.style.marginTop = "10px";
populationRight.style.whiteSpace = "nowrap"; 



const controlsDiv = document.createElement("div");
controlsDiv.style.display = "flex";
controlsDiv.style.flexDirection = "column";
controlsDiv.style.alignItems = "center";
controlsDiv.style.marginTop = "20px";


const nextButton = document.createElement("button");

nextButton.textContent = "Dalej";
nextButton.style.display = "none";

nextButton.style.padding = "10px";
nextButton.style.fontSize = "16px";
nextButton.style.marginBottom = "10px";
nextButton.onclick = () => {
    resetUI();
    losujKraje();
};


const scoreBox = document.createElement("div");

scoreBox.style.borderRadius = "10px";
scoreBox.style.padding = "10px";
scoreBox.style.width = "100%";
scoreBox.style.marginBottom = "20px";
scoreBox.style.backgroundColor = "lightblue";
scoreBox.style.textAlign = "center";


let correct = 0;
let incorrect = 0;
const correctDisplay = document.createElement("p");
correctDisplay.textContent = `Poprawne: ${correct}`;
correctDisplay.style.fontSize = "18px";
correctDisplay.style.marginBottom = "10px";

const incorrectDisplay = document.createElement("p");
incorrectDisplay.textContent = `Niepoprawne: ${incorrect}`;
incorrectDisplay.style.fontSize = "18px";


const endMessage = document.createElement("h2");
endMessage.style.display = "none";
endMessage.style.marginTop = "20px";




const replayButton = document.createElement("button");
replayButton.textContent = "Zagraj ponownie";
replayButton.style.display = "none";
replayButton.style.padding = "10px";
replayButton.style.fontSize = "16px";
replayButton.onclick = () => {


    correct = 0;
    incorrect = 0;

    correctDisplay.textContent = `Poprawne: ${correct}`;


    incorrectDisplay.textContent = `Niepoprawne: ${incorrect}`;
    endMessage.style.display = "none";
    replayButton.style.display = "none";
    resetUI();
    losujKraje();
};


let currentCountries = {};

let usedCountries = []; 


function resetUI() {


    populationLeft.style.display = "none";
    populationRight.style.display = "none";
    nextButton.style.display = "none";
}


async function getData() {

    const response = await fetch("https://restcountries.com/v3.1/region/europe");
    const data = await response.json();



    return data;
}


async function losujKraj() {
    const data = await getData();
    const remainingCountries = data.filter(country => !usedCountries.includes(country.name.common));
    if (remainingCountries.length === 0) {
        return null; 

    }
    const rand = Math.floor(Math.random() * remainingCountries.length);
    const country = remainingCountries[rand];
    usedCountries.push(country.name.common); 
    return country;
}


async function losujKraje() {
    const countryLeft = await losujKraj();
    const countryRight = await losujKraj();

    if (!countryLeft || !countryRight) {
        endMessage.textContent = "Brak krajów do losowania! Gra zakończona.";
        endMessage.style.display = "block";
        replayButton.style.display = "block";
        return;
    }

    currentCountries.left = countryLeft;
    currentCountries.right = countryRight;

    imgLeft.setAttribute("src", countryLeft.flags.png);

    imgRight.setAttribute("src", countryRight.flags.png);

    h2Left.textContent = countryLeft.name.common;
    h2Right.textContent = countryRight.name.common;

    
    resetUI();

    
    imgLeft.onclick = () => handleGuess("left");
    imgRight.onclick = () => handleGuess("right");

}


function handleGuess(selected) {


    const selectedCountry = currentCountries[selected];
    const otherCountry = selected === "left" ? currentCountries.right : currentCountries.left;

    populationLeft.textContent = `Populacja: ${currentCountries.left.population.toLocaleString()} osób`;
    populationRight.textContent = `Populacja: ${currentCountries.right.population.toLocaleString()} osób`;


    populationLeft.style.display = "block";
    populationRight.style.display = "block";

   
    if (
        (selected === "left" && currentCountries.left.population > currentCountries.right.population) ||
        (selected === "right" && currentCountries.right.population > currentCountries.left.population)

    ) {
        correct++;
        correctDisplay.textContent = `Poprawne: ${correct}`;
    } else {
        incorrect++;
        incorrectDisplay.textContent = `Niepoprawne: ${incorrect}`;
    }

    
    if (correct >= 5) {

        endMessage.textContent = "Wygrałeś!";
        endMessage.style.display = "block";
        replayButton.style.display = "block";


        return;
    }

    if (incorrect >= 5) {
        endMessage.textContent = "Przegrałeś, spróbuj ponownie!";
        endMessage.style.display = "block";
        replayButton.style.display = "block";
        return;
    }

    nextButton.style.display = "block";
}


divLeft.appendChild(imgLeft);
divLeft.appendChild(h2Left);
divLeft.appendChild(populationLeft);
divRight.appendChild(imgRight);
divRight.appendChild(h2Right);
divRight.appendChild(populationRight);
divFlags.appendChild(divLeft);
divFlags.appendChild(divRight);
scoreBox.appendChild(correctDisplay);
scoreBox.appendChild(incorrectDisplay);
controlsDiv.appendChild(scoreBox);
controlsDiv.appendChild(nextButton);
controlsDiv.appendChild(endMessage);
controlsDiv.appendChild(replayButton);
body.appendChild(h1);
body.appendChild(divFlags);
body.appendChild(controlsDiv);






losujKraje();
