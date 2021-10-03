const getNumberButton = document.getElementById("getNumberButton");
const startGameButton = document.getElementById("startGameButton");

const playerDiv = document.getElementById("playerDiv");
const pcDiv = document.getElementById("pcDiv");
const myNodelist = document.querySelectorAll("div.box");

let bingoNumbers = [];
let arrayNumbersHalf = [];
let arrayNumbersAnotherHalf = [];
let arrayOfNumbers = [];

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));


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

const removeElement = (arr, val) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == val) {
      arr.splice(i, 1);
    }
  }
  return arr.length;
};


const startGame = () => {
  getNumberButton.disabled = false;
  numberDiv.innerHTML = " ";
  playerDiv.innerHTML = " ";
  pcDiv.innerHTML = " ";
  bingoNumbers = range(1,90,1);
  arrayNumbersHalf = generateNumbers();
  arrayNumbersAnotherHalf = generateNumbers();
  arrayOfNumbers = arrayNumbersHalf.concat(arrayNumbersAnotherHalf);

  for (let index in myNodelist) {
    if (myNodelist[index].innerHTML) {
      myNodelist[index].innerHTML = arrayOfNumbers[index];
      myNodelist[index].style.color = "black";
      myNodelist[index].style.textDecoration = "none";
    }
  }
}


const pickNumber = () => {
  //cada numero aleatorio solo puede salir una vez, si ya ha salido coger otro
  const indice = randomIntFromInterval(1, bingoNumbers.length-1);
  let randomNumber = bingoNumbers[indice];

    const numberDiv = document.getElementById("numberDiv");
    numberDiv.innerHTML = randomNumber;
  
    removeElement(bingoNumbers, randomNumber);

  for (let element of myNodelist) {
    if (element.innerHTML == numberDiv.innerHTML) {
      element.style.color = "red";
      element.style.textDecoration = "line-through";
      removeElement(arrayNumbersHalf, element.innerHTML);
      removeElement(arrayNumbersAnotherHalf, element.innerHTML);

      if (arrayNumbersHalf.length == 0 && arrayNumbersAnotherHalf.length == 0) {
        pcDiv.innerHTML = "Empate";
        playerDiv.innerHTML = "Empate";
        getNumberButton.disabled = true;
      } else if (arrayNumbersAnotherHalf.length == 0) {
        pcDiv.innerHTML = "Ganador PC";
        getNumberButton.disabled = true;
      } else if (arrayNumbersHalf.length == 0) {
        playerDiv.innerHTML = "Ganador Jugador";
        getNumberButton.disabled = true;
      }
    }
  }
}

startGameButton.addEventListener("click", startGame);

getNumberButton.addEventListener("click", pickNumber);
