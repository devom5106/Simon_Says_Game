let game_Seq = [];
let user_Seq = [];
let level = 0;
let colors = ["blue", "green", "red", "yellow"];

let started = false;

let start_btn = document.querySelector(".btn");
let color_btns = document.querySelectorAll(".color-box");
let h3 = document.querySelector("h3");
let h5 = document.querySelector("h5");

start_btn.addEventListener("click", function () {
  if (started == false) {
    // hide the start button
    start_btn.classList.add("start-btn-hide");
    started = true;

    // Running levelUp function
    levelUp();
  }
});

function levelUp() {
  user_Seq = [];
  level++;
  h3.innerText = `Level ${level}`;
  h5.innerText = `Currrent Score : ${level-1}`;

  // running game_flash function and creating game_sequence array.
  let randomindex = Math.floor(Math.random() * 3);
  let randomcolor = colors[randomindex];
  game_Seq.push(randomcolor);
  console.log(game_Seq);
  let btn = document.querySelector(`.${randomcolor}`);
  game_flash(btn);
}

function game_flash(btn) {
  btn.classList.add("game-flash");
  setTimeout(function () {
    btn.classList.remove("game-flash");
  }, 250);
}

function check_answer(idx) {
  if (user_Seq[idx] === game_Seq[idx]) {
    if (user_Seq.length == game_Seq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over! You forgot the correct sequence! Your final score is <b>${level-1}</b>`;
    reset();
  }
}

function user_click(btn) {
  btn.classList.add("user-click");
  setTimeout(function () {
    btn.classList.remove("user-click");
  }, 250);
}

function btn_press() {
  let btn = this;
  user_click(btn);

  // Adding the color to user_seq
  let usercolor = btn.getAttribute("id");
  user_Seq.push(usercolor);

  check_answer((user_Seq.length) - 1);
}

for (let color_btn of color_btns) {
  color_btn.addEventListener("click", btn_press);
}

function reset() {
    started = false;
    game_Seq = [];
    user_Seq = [];
    level = 0;
    start_btn.classList.remove("start-btn-hide");
    start_btn.innerText = "Restart Game";
}
