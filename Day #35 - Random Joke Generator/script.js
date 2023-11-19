

let joke = document.querySelector(".joke");
let emoji = document.querySelector(".emoji");
let getJokeBtn = document.querySelector(".refresh");
let copyBtn = document.querySelector(".copy");
let copyIcon = document.querySelector(".copy i");
let copyText = document.querySelector(".copy span");

const url =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

let getJoke = () => {
  joke.innerHTML = "loading...";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      joke.innerHTML = data.joke;
    });
  getEmoji();
};

let getEmoji = () => {
  let emojis = ["&#x1f600;", "&#x1f601;", "&#x1f606;", "&#x1f602;"];
  let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.innerHTML = randomEmoji;
};

let copyJoke = () => {
  navigator.clipboard.writeText(joke.textContent);
  copyIcon.style.display = "none";
  copyText.style.display = "block";
  setTimeout(() => {
    copyIcon.style.display = "block";
    copyText.style.display = "none";
  }, 500);
};

copyBtn.addEventListener("click", copyJoke);
getJokeBtn.addEventListener("click", getJoke);
getEmoji();
getJoke();
