const alreadyFound = [];

let currentOpen = null;
let secondOpen = null;

let totalMoves = 0;

function startGame(event) {
  toggleStartButton();
  if (hasGameStarted) {
    stopGame();
    hasGameStarted = false;
    return;
  }
  loadGame();
  startTimer();
  hasGameStarted = true;
}

function stopGame(params) {
  loadGame();
  alreadyFound.length = 0;
  currentOpen = null;
  secondOpen = null;
  totalMoves = 0;
  updateTotalMoves();
  stopTimer();
}

function checkIfCorrect(event) {
  //   debugger;
  // if click on already one images
  if (!hasGameStarted) {
    alert("Please click on start button to start game");
    return;
  }
  if (event.target.className == "game-body") {
    return;
  }
  if (event.target.src !== undefined) {
    return;
  }
  if (secondOpen !== null) {
    return;
  }

  showImg(event);
  totalMoves++;
  updateTotalMoves();
  // if even number of image are open
  if (currentOpen === null) {
    currentOpen = event.target;
    return;
  } else if (event.target.dataset.cellId == currentOpen.dataset.cellId) {
    alreadyFound.push(currentOpen.dataset.cellId);
    currentOpen = null;
    if (alreadyFound.length == 8) {
      debugger;
      youWon();
      stopGame();
    }
  } else {
    // console.log(currentOpen);
    secondOpen = event.target;
    setTimeout(() => {
      hideImg();
      currentOpen = null;
      secondOpen = null;
    }, 500);
  }
}

function hideImg() {
  currentOpen.firstElementChild.style.display = "none";
  secondOpen.firstElementChild.style.display = "none";
}

function showImg(event) {
  event.target.firstElementChild.style.display = "block";
}

function youWon() {
  alert(`Congratulation!,you won.
    You have used ${totalMoves}.`);
  loadGame();
}

function updateTotalMoves() {
  document.querySelector(".total-moves").innerHTML =
    "Total Moves: " + totalMoves;
}
