const getNumberButton = document.querySelector("#getNumberButton");
const startGameButton = document.querySelector("#startGameButton");

const playerDiv = document.querySelector("#playerDiv");
const pcDiv = document.querySelector("#pcDiv");
const boxDivlist = document.querySelectorAll("div.box");

let bingoNumbers = [];
let bingoCard = [];
let anotherBingoCard = [];
let joinedCards = [];

const range = (start, stop, step) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
}

const randomIntFromInterval = (min, max) => {

  let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
}

const generateNumbers = () => {
  let arr = [];
  while (arr.length < 15) {
    let r = randomIntFromInterval(1, 90);
    if (arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }
  return arr;
}

//renombrar nombres de variables para que se entiendan
const removeElement = (arr, val) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == val) {
      arr.splice(i, 1);
    }
  }
  return arr.length;
};

//renombrar variables para que se entiendan
const startGame = () => {
  getNumberButton.disabled = false;
  numberDiv.innerHTML = " ";
  playerDiv.innerHTML = " ";
  pcDiv.innerHTML = " ";
  bingoNumbers = range(1, 90, 1);
  bingoCard = generateNumbers();
  anotherBingoCard = generateNumbers();
  joinedCards = bingoCard.concat(anotherBingoCard);

  for (let index in boxDivlist) {
    if (boxDivlist[index].innerHTML) {
      boxDivlist[index].innerHTML = joinedCards[index];
      //boxDivlist[index].classList.add("number");
    }
  }
}


const pickNumber = () => {
  const indice = randomIntFromInterval(1, bingoNumbers.length - 1);
  let randomNumber = bingoNumbers[indice];

  const numberDiv = document.querySelector("#numberDiv");
  numberDiv.innerHTML = randomNumber;

  removeElement(bingoNumbers, randomNumber);

  for (let element of boxDivlist) {
    if (element.innerHTML == numberDiv.innerHTML) {
      element.classList.add("line-through");
      removeElement(bingoCard, element.innerHTML);
      removeElement(anotherBingoCard, element.innerHTML);

      if (bingoCard.length == 0 && anotherBingoCard.length == 0) {
        pcDiv.innerHTML = "Empate";
        playerDiv.innerHTML = "Empate";
        getNumberButton.disabled = true;
      } else if (anotherBingoCard.length == 0) {
        pcDiv.innerHTML = "Ganador PC";
        getNumberButton.disabled = true;
      } else if (bingoCard.length == 0) {
        playerDiv.innerHTML = "Ganador Jugador";
        getNumberButton.disabled = true;
      }
    }
  }
}

startGameButton.addEventListener("click", startGame);

getNumberButton.addEventListener("click", pickNumber);
