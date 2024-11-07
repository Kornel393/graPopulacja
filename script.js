const body = document.querySelector("body")


const h1 = document.createElement("h1")
h1.textContent = "ZGADNIJ POPULACJE";
h1.style.fontSize = "40px";
h1.style.marginBottom = "20px";
h1.style.textAlign = "center";

const divleft = document.createElement("div")
divleft.style.height = "270px"
divleft.style.width = "110px"
divleft.style.display = "flex"
/*div.style.flexDirection = "row"
div.style.justifyContent = "center"*/

const divright = document.createElement("div")
divright.style.height = "270px"
divright.style.width = "110px"
divright.style.display = "flex"


const punktacja = document.createElement("ul")
punktacja.textContent = "Punktacja"

let poprawne = 0;
let niepoprawne = 0;

let pop = document.createElement("li")
pop.textContent = "Poprawne:" + poprawne;

let niepop = document.createElement("li")
niepop.textContent = "Niepoprawne:" + niepoprawne;

//divpkt.appendChild(punktacja);
punktacja.appendChild(pop);
punktacja.appendChild(niepop);

const divpkt = document.createElement("div")
divpkt.style.height = "270px"
divpkt.style.width = "110px"

const button = document.createElement("button")


const imgLeft = document.createElement("img");
imgLeft.style.width = "400px";
imgLeft.style.height = "200px";
imgLeft.style.marginTop = "20px";

const imgRight = document.createElement("img");
imgRight.style.width = "400px";
imgRight.style.height = "200px";
imgRight.style.marginTop = "20px";

let h2left = document.createElement("h2");
let h2right = document.createElement("h2");

async function getData() {
    const dane = await fetch("https://restcountries.com/v3.1/region/europe");
    const json = await dane.json();
    return json;
    }

let currentCapital = "";

    async function losujKrajLeft() {

        
const data = await getData();
let rand = Math.floor(Math.random() * data.length);
currentCapital = data[rand].capital ? data[rand].capital[0] : "";
imgLeft.setAttribute("src", data[rand].flags.png);

        
h2left.textContent = data[rand].name.common;
h2left.style.fontSize = "20px";
        
divleft.innerHTML = "";
divleft.appendChild(h2left);


        
        
        
        }


async function losujKrajRight() {

        
    const data = await getData();
    let rand = Math.floor(Math.random() * data.length);
    currentCapital = data[rand].capital ? data[rand].capital[0] : "";
    imgRight.setAttribute("src", data[rand].flags.png);
            
                    
    h2right.textContent = data[rand].name.common;
    h2right.style.fontSize = "20px";
                    
    divright.innerHTML = "";
    divright.appendChild(h2right);
        
            
                    
                    
                    
        }

        

        losujKrajLeft();
        losujKrajRight();

        
        
        body.appendChild(h1);
        body.appendChild(imgLeft);
        body.appendChild(imgRight)
       // body.appendChild(button)
        body.appendChild(divleft)
        body.appendChild(divright)
        body.appendChild(divpkt);
      




        
