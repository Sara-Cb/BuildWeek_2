const playerSong = document.getElementById("playerSong");
const playerArtist = document.getElementById("playerArtist");
const songTime = document.getElementById("songTime");
const timeRange = document.getElementById("timeRange");
const playerImg = document.getElementById("playerImg");

function playFunction(url, title, artist, cover, duration) {
  const audio = new Audio(url);

  playerSong.textContent = title;
  playerArtist.textContent = artist;
  playerImg.setAttribute("src", cover);

  audio.addEventListener("loadedmetadata", function () {
    songTime.children[0].textContent = calcDuration(0);
    songTime.children[2].textContent = calcDuration(Math.round(duration));

    timeRange.style.width = "0%";

    audio.play();
  });

  audio.addEventListener("timeupdate", function () {
    songTime.children[0].textContent = calcDuration(
      Math.round(audio.currentTime)
    );
    timeRange.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  });
}

const calcDuration = function (time) {
  minuti = Math.round(time / 60);
  secondi = time % 60;
  if (secondi < 10) {
    secondi = "0" + secondi;
  }
  let correctTime = `${minuti}:${secondi}`;
  console.log(correctTime);
  return correctTime;
};
