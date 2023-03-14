const emoji = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const timerDetails = {};
const gameBodyDiv = document.querySelector(".game-body");
let hasGameStarted = false;

loadGame();

function toggleStartButton() {
  const btn = document.querySelector("#start-button");
  if (btn.value == "Start") {
    btn.value = "Stop";
  } else {
    btn.value = "Start";
  }
}

function startTimer() {
  timerDetails.div = document.querySelector(".timer");
  timerDetails.startTime = Date.now();
  timerDetails.id = setInterval(() => {
    timerDetails.div.innerHTML = getTimeDifference(
      timerDetails.startTime,
      Date.now()
    );
  }, 1000);
}

function stopTimer() {
  clearInterval(timerDetails.id);
  timerDetails.id = -1;
  timerDetails.div.innerHTML = "00:00";
  timerDetails.startTime = 0;
}

function getTimeDifference(d1, d2) {
  let t = d2 - d1;
  t = Math.floor(t / 1000);
  let sec = t % 60;
  if (sec < 10) {
    sec = "0" + sec;
  }
  let min = Math.floor(t / 60);
  if (min == 0) {
    min = "00";
  } else if (min < 10) {
    min = "0" + min;
  }

  return `${min}:${sec}`;
}

function loadGame() {
  gameBodyDiv.innerHTML = "";
  let randomEmoji = [...emoji];
  randomEmoji = getRandomEmoji(randomEmoji);
  addAllEmojiToGameBody(randomEmoji);
}

function addAllEmojiToGameBody(arr) {
  for (let i = 0; i < arr.length; i++) {
    const card = getCellCardDOM(getCardCell(arr[i]));
    gameBodyDiv.appendChild(card);
  }
}

function getCellCardDOM(card) {
  return new DOMParser().parseFromString(card, "text/html").body
    .firstElementChild;
}

function getCardCell(id) {
  return `<div class="cell-container" data-cell-id="${id}">
    <img src="./images/${id}.png" alt="" style="display:none" id="img-${id}"/>
  </div>`;
}

// let elementsArray = document.querySelectorAll("whatever");
// elementsArray.forEach(function(elem) {
//     elem.addEventListener("input", function() {
//         //this function does stuff
//     });
// });

function getRandomEmoji(arr) {
  let ra = [];
  while (arr.length > 0) {
    let i = Math.floor(Math.random() * arr.length);
    ra.push(arr[i]);
    arr.splice(i, 1);
  }
  return ra;
}
