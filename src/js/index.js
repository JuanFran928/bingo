const buttonBingo = document.getElementById("buttonBingo");

const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

const pickNumber = () => {
    let randomNumber = randomIntFromInterval(1, 90);

    const numberDiv = document.getElementById("numberDiv");

    console.log(randomNumber);
    numberDiv.innerHTML = randomNumber;
}

buttonBingo.addEventListener("click", pickNumber);