//gamestate
let cards = [];
let hasBlackJack = false;
let isAlive = false;
let nameSaved = false;
let creditSaved = false;
let startCheck = false;
let message = "";
let sum = 0;
let chips = 0;
let currentBet = 0;
let totalBet = 0
//
//DOM ELEMENTS
let welcomeEl = document.getElementById("welcome-el");
let startGameBtn = document.getElementById("startGameEl")
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let dealerEl = document.getElementById("dealer-el");
let playerEl = document.getElementById("player-el");
let gameMenuEl = document.getElementById("gameMenu");
let newGameEl = document.getElementById("newGameEl")
let holdCardBtn = document.getElementById("holdEl");
let splitCardElBtn = document.getElementById("splitCardEl")
let betMenu = document.getElementById("betmenu")
let bet500 = document.getElementById("bet500")
let bet2500 = document.getElementById("bet2500")
let bet5000 = document.getElementById("bet5000")
let allIn = document.getElementById("allin")
let betMsgEl = document.getElementById("betMsg")
let overallBetEl = document.getElementById("overallBet")
let elements = [
  messageEl, 
  sumEl,
  cardsEl,
  dealerEl,
  playerEl,
  gameMenuEl,
  holdCardBtn,
  splitCardElBtn];
document.getElementById("newCardEl").style.display = "none";
//
holdCardBtn.style.display = "none";

elements.forEach((el) => (el.style.display = "none"));
startGameBtn.style.display = "none"
betMenu.style.display = "none"

let dealer = {
  name: "Dealer",
  cards: [],
};

let player = {
  name: "",
  chips: 0,
};

let container = document.createElement("div");
container.id = "form-container";
document.body.appendChild(container);

let nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.placeholder = "Enter your name(4-16 charachter)";
document.body.appendChild(nameInput);

let nameInputSave = document.createElement("button");
nameInput.id = "nameSave-el";
nameInputSave.type = "submit";
nameInputSave.textContent = "SAVE NAME";
nameInputSave.style.margin = "10px auto";
document.body.appendChild(nameInputSave);

let labelCreditInput = document.createElement("label");
labelCreditInput.htmlFor = "creditInput-el";
labelCreditInput.id = "creditLabel";
labelCreditInput.textContent = "Credits you want to bet(1000-20000):";
labelCreditInput.style.margin = "25px";
document.body.appendChild(labelCreditInput);

let creditInput = document.createElement("input");
creditInput.id = "creditInput-el";
creditInput.type = "number";
creditInput.min = "1000";
creditInput.max = "20000";
creditInput.style.width = "200px";
creditInput.style.margin = "auto";
creditInput.style.textAlign = "right";
creditInput.placeHolder = "Amounts of credit you wanna play with";
document.body.appendChild(creditInput);

let creditInputSave = document.createElement("button");
creditInputSave.id = "creditInputSave-el";
creditInputSave.type = "submit";
creditInputSave.textContent = "SAVE CHIPS";
creditInputSave.style.margin = "25px auto";
document.body.appendChild(creditInputSave);

let containerEl = [
  nameInput,
  nameInputSave,
  labelCreditInput,
  creditInput,
  creditInputSave,
];

containerEl.forEach((c) => container.appendChild(c));

function readyCheck() {
  if (nameSaved && creditSaved) {
    startGameBtn.style.display = "inline-block"
    gameMenuEl.style.display = "block";
    newGameEl.style.display = "none"
    betMenu.style.display = "block"
    welcomeEl.textContent = "Press start game, and gamble!!!";
    playerEl.style.display = "block";
    playerEl.textContent = player.name + ": $" + player.chips;
  }
}

nameInputSave.addEventListener("click", () => {
  if (nameInput.value.trim().length < 5 || nameInput.value.trim().length > 16) {
    let charWarning = document.createElement("p");
    charWarning.style.color = "red";
    charWarning.textContent =
      "Your name must be more than 4 and 16 charachters long at least";
    nameInput.value = "";
    document.body.append(charWarning);
    setTimeout(() => {
      charWarning.style.opacity = "0";
      setTimeout(() => {
        charWarning.style.display = "none";
      }, 3000);
    }, 3000);
    return;
  }
  player.name = nameInput.value;
  nameInput.value = "";
  nameInput.style.display = "none";
  nameInputSave.style.display = "none";
  let nameCheck = document.createElement("p");
  nameCheck.id = "nameCheck";
  nameCheck.textContent = `${player.name} has been set as your name`;
  document.body.appendChild(nameCheck);
  setTimeout(() => {
    nameCheck.style.opacity = "0";
    setTimeout(() => {
      nameCheck.style.display = "none";
    }, 2000);
  }, 2000);
  nameSaved = true;
  readyCheck();
});


creditInputSave.addEventListener("click", () => {
  let creditValue = parseInt(creditInput.value);
  if (isNaN(creditValue) || creditValue < 1000 || creditValue > 20000) {
    let creditWarning = document.createElement("p");
    creditWarning.style.color = "red";
    creditWarning.textContent = "Your chips must be between 1000 and 20000";
    creditWarning.style.transition = "opacity is ease";
    creditInput.value = "";
    container.appendChild(creditWarning);
    setTimeout(() => {
      creditWarning.style.opacity = 0;
      setTimeout(() => {
        creditWarning.style.display = "none";
      }, 2000);
    }, 2000);
    return;
  }
  player.chips = parseInt(creditInput.value);
  labelCreditInput.style.display = "none";
  creditInput.style.display = "none";
  creditInputSave.style.display = "none";
  let creditCheck = document.createElement("p");
  creditCheck.id = "creditCheck";
  creditCheck.textContent = `${player.chips} chips has been set`;
  document.body.appendChild(creditCheck);
  if (parseInt(creditInput.value) < 0) {
    creditInput.value = "";
    player.chips != creditInput.value;
  }
  setTimeout(() => {
    creditCheck.style.opacity = "0";
    setTimeout(() => {
      creditCheck.style.display = "none";
    }, 2000);
  }, 2000);
  creditSaved = true;
  readyCheck();
});



function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

holdCardBtn.addEventListener("click", async () => {
  if (sum < 21) {
    let dealerSum = dealer.cards.reduce((acc, card) => acc + card, 0);
    while (dealerSum < sum && dealerSum <= 21) {
      await sleep(1000);

      let newDealerCard = getRandomCard();
      dealer.cards.push(newDealerCard);
      dealerSum += newDealerCard;

      dealerEl.innerHTML = `Dealer <br>Cards: ${dealer.cards.join(
        ", "
      )}<br>Sum: ${dealerSum}`;
    }

    if (dealerSum > 21 || dealerSum < sum) {
      messageEl.textContent = "You win! Dealer lost!";
      player.chips += totalBet * 2
      playerEl.textContent = `${player.name}: $${player.chips}`
      currentBet = 0;
      newGameEl.style.display = "inline-block"
    } else if (dealerSum === sum) {
      messageEl.textContent = "Its a draw!";
      player.chips += totalBet
      playerEl.textContent = `${player.name}: $${player.chips}`
      currentBet = 0;
      newGameEl.style.display = "inline-block"
    } else if (dealerSum === 21) {
      messageEl.textContent = "Dealer has blackjack, you lost";
      newGameEl.style.display = "inline-block"
    } else {
      messageEl.textContent = "You lost! Dealer has higher cards";
      newGameEl.style.display = "inline-block"
    }

    document.getElementById("newCardEl").style.display = "none";
  }
});


//betting

bet500.addEventListener("click", () => {
  if(player.chips >= 500){
    currentBet += 500
    player.chips -= 500;
    playerEl.textContent = `${player.name}: $${player.chips}`;
    betMsgEl.textContent = `You placed a $${currentBet} bet`
  }
  else{
    betMsgEl.textContent = 'Not enough chips for a $500 bet'
  }
})

bet2500.addEventListener("click", () => {
  if(player.chips >= 2500){
    currentBet += 2500
    player.chips -= 2500;
    playerEl.textContent = `${player.name}: $${player.chips}`;
    betMsgEl.textContent = `You placed a $${currentBet} bet`
  }
  else{
    betMsgEl.textContent = 'Not enough chips for a $2500 bet'
  }
})

bet5000.addEventListener("click", () => {
  if(player.chips >= 5000){
    currentBet += 5000
    player.chips -= 5000;
    playerEl.textContent = `${player.name}: $${player.chips}`;
    betMsgEl.textContent = `You placed a $${currentBet} bet`
  }
  else{
    betMsgEl.textContent = 'Not enough chips for a $5000 bet'
  }
})

allIn.addEventListener("click", () => {
  if(player.chips >= 0){
    currentBet += player.chips
    player.chips -= currentBet;
    playerEl.textContent = `${player.name}: $${player.chips}`;
    betMsgEl.textContent = `You bet all your chips`
  }
})

function getRandomCard() {
  let randomCard = Math.floor(Math.random() * 13) + 1;
  if (randomCard === 1) {
    return 11;
  } else if (randomCard > 10) {
    return 10;
  } else {
    return randomCard;
  }
}

function initGame() {
  totalBet = currentBet
  isAlive = true;
  startCheck = true;
  hasBlackJack = false;
  cards = [];

  betMsgEl.style.display = "none";
  betMenu.style.display = "none"
  elements.forEach((el) => (el.style.display = "block"));
  splitCardElBtn.style.display = "inline-block"
  playerEl.textContent = player.name + ": $" + player.chips;
  overallBetEl.textContent = `Your total bet is: $${currentBet}`
  dealer.cards = [getRandomCard()];
  dealerEl.innerHTML = `Dealer <br>Cards:${dealer.cards}`;
  setTimeout(() => {
    let firstCard = getRandomCard();
    cards = [firstCard];
    sum = firstCard;
    renderGame();
  }, 1000);

  setTimeout(() => {
    let secondCard = getRandomCard();
    cards.push(secondCard);
    sum += secondCard;
    renderGame();
  }, 1500);

  document.getElementById("newCardEl").style.display = "inline";
  document.getElementById("holdEl").style.display = "inline";
  renderGame();
}

function startGame(){
  document.getElementById("startGameEl").style.display = "none"
  initGame();
}


function resetBet(){
  currentBet = 0;
  totalBet = 0;
  betMenu.style.display = "block"; 
  betMsgEl.style.display = "block";
  betMsgEl.textContent = `You placed a $${currentBet} bet`
  overallBetEl.textContent = `Your total bet is: $${currentBet}` 
}


function newGame(){
  newGameEl.style.display = "none"
  isAlive = false;
  hasBlackJack = false;
  sum = 0;
  cards = [];
  elements.forEach((el) => (el.style.display = "none"));
  document.getElementById("newCardEl").style.display = "none";
  holdCardBtn.style.display = "none";
  resetBet();
  startGameBtn.style.display = "inline-block"
  playerEl.style.display = "block";
  playerEl.textContent = player.name + ": $" + player.chips;
  welcomeEl.textContent = "Press start game, and gamble!!!"
}

function renderGame() {
  document.getElementById("startGameEl").style.display = "none";
  messageEl.style.display = "block";

  sum = calculateSum(cards);

  cardsEl.textContent = "Cards: ";
  for (i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
  sumEl.textContent = "Sum: " + sum;
  

  if (sum <= 20) {
    message = "Do you want to draw a new card?";
  } 
  else if (sum === 21) {
    message = "You've got blackjack! :D";
    hasBlackJack = true;
    player.chips += totalBet * 2
    playerEl.textContent = `${player.name}: $${player.chips}`
    currentBet = 0;
    newGameEl.style.display = "inline-block"
  } else {
    message = "You lost :(";
    isAlive = false;
    newGameEl.style.display = "inline-block"
  }

  messageEl.textContent = message;
}

function calculateSum(cards) {
  let sum = 0;
  let aces = 0;

  for (let i = 0; i < cards.length; i++){
    if (cards[i] === 11){
      aces += 1;
    }
    sum += cards[i]
  }


while (sum > 21 && aces > 0){
  sum -= 10;
  aces -=1
}

return sum;
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    cards.push(card);
    renderGame();
  }
}


