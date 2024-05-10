let step = "";
let spanWho = document.getElementById("spanWho");
let winner = "";

let blockWinner = document.getElementById("blockWinner");
let spanWin = document.getElementById("spanWin");
let btnNewGame = document.getElementById("btnNewGame");
let blockArea = document.getElementById("blockArea");


const who = () => {
  if (step == "circle") {
    step = "krest";
    spanWho.innerText = "Крестики";
  } else {
    step = "circle";
    spanWho.innerText = "Нолики";
  }
};

who();

let blockItem = document.querySelectorAll(".blockItem");
let counter = 0;

blockItem.forEach((item) => {
  item.addEventListener("click", () => {
    if (
      !item.classList.contains("circle") &&
      !item.classList.contains("krest")
    ) {
      item.classList.add(step);
      if (step == "krest") {
        item.innerText = "X";
        circleWin();
      }
      if (step == "circle") {
        item.innerText = "0";
        krestWin();
      }
      counter++;
      who();
      noWin();
    }
  });
  btnNewGame.addEventListener("click", () => {
    winner = "";
    spanWin.innerText = "";
    counter = 0;
    console.log(counter);
    document.querySelector('.TextWin').style.display = ('none');
    for (var i = 0; i < blockItem.length; i++) {
      blockArea.style.pointerEvents = "auto";
      blockItem[i].innerHTML = "";
      blockItem[i].classList.remove("winColor");
      blockItem[i].classList.remove("circle");
      blockItem[i].classList.remove("krest");
    };
  });
});
let stat = {
    'x': 0,
    'o': 0,
    'd': 0
}

let win = [
  [0, 1, 2],
  [0, 4, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

let circleWin = () => {
  for (let i = 0; i < win.length; i++) {
    if (
      blockItem[win[i][0]].classList.contains("circle") &&
      blockItem[win[i][1]].classList.contains("circle") &&
      blockItem[win[i][2]].classList.contains("circle")
    ) {
      blockItem[win[i][0]].classList.add("winColor");
      blockItem[win[i][1]].classList.add("winColor");
      blockItem[win[i][2]].classList.add("winColor");
      winner = "Нолики";
      endGame(winner);
    }
  }
};

let krestWin = () => {
  for (let k = 0; k < win.length; k++) {
    if (
      blockItem[win[k][0]].classList.contains("krest") &&
      blockItem[win[k][1]].classList.contains("krest") &&
      blockItem[win[k][2]].classList.contains("krest")
    ) {
      blockItem[win[k][0]].classList.add("winColor");
      blockItem[win[k][1]].classList.add("winColor");
      blockItem[win[k][2]].classList.add("winColor");
      winner = "Крестики";
      endGame(winner);
    }
  }
};

let noWin = () => {
  if (!krestWin() && !circleWin() && (counter >= 9)) {
    winner = "Ничья";
    endGame(winner);
  }
};

let endGame = (winner) => {
  document.querySelector('.TextWin').style.display = ('block');
  blockArea.style.pointerEvents = "none";
  spanWin.innerText = winner;
  switch (winner) {
    case "Нолики":
        stat.o += 1;
      break;
    case "Крестики":
        stat.x += 1;
      break;
      case "Ничья":
        stat.d += 1;
      break;
  }
  updateStat();
};

function updateStat() {
  document.getElementById("sX").innerHTML = stat.x;
  document.getElementById("sO").innerHTML = stat.o;
  document.getElementById("sD").innerHTML = stat.d;
}
btnResetStat.addEventListener("click", () => {
  window.location.reload();
});
