const API_URL = "https://striveschool-api.herokuapp.com/api/deezer/";
let cardsAlbums = [];
let cardAd = [];
let cardsMore = [];
const hearts = document.getElementsByClassName("like");

// RIFERIMENTI PLAYER
const tracklistRef = document.getElementById("tracklist");
const playerSong = document.getElementById("playerSong");
const playerArtist = document.getElementById("playerArtist");
const songTime = document.getElementById("songTime");
const timeRange = document.getElementById("timeRange");
const playerImg = document.getElementById("playerImg");
const playButton = document.getElementById("playBtn");
const btnNext = document.getElementById("trackNext");
const btnBack = document.getElementById("trackBack");
const iconsRowRef = document.getElementById("iconsRow");
const indiciRowRef = document.getElementById("indici");
let currentTrack;
const volumeControl = document.getElementById("volume");
let audio = document.getElementById("audioReference");

//INIZIO FUNZIONI PLAYER

//play top
const playTop = function () {
  if (albumId) {
    document.getElementById("0").click();
  }
};

//next prev
btnBack.addEventListener("click", function () {
  if (currentTrack != 0) {
    let backId = currentTrack - 1;
    console.log(currentTrack);
    let divBack = document.getElementById(backId);
    console.log(divBack);
    divBack.click();
  } else {
    divCur = document.getElementById(currentTrack);
    divCur.click();
  }
});

btnNext.addEventListener("click", function () {
  if (currentTrack != trackArray.length - 1) {
    let nextId = currentTrack + 1;
    console.log(currentTrack);
    let divNext = document.getElementById(nextId);
    console.log(divNext);
    divNext.click();
  } else {
    divCur = document.getElementById("0");
    divCur.click();
  }
});

timeRange.addEventListener("click", function (event) {
  const pos = (event.pageX - timeRange.offsetLeft) / timeRange.offsetWidth;
  audio.currentTime = pos * audio.duration;
});

playButton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

volumeControl.addEventListener("input", function () {
  let volumeValue = volumeControl.value / 10;
  let percentage = volumeValue * 100;
  audio.volume = volumeValue;
  volumeControl.style.backgroundImage = `linear-gradient(to right, #ffffff ${percentage}%, #808080 ${percentage}%)`;
});

function playFunction(url, title, artist, cover, duration, id) {
  audio.src = url;
  currentTrack = id;
  playerSong.textContent = title;
  playerArtist.textContent = artist;
  playerImg.setAttribute("src", cover);

  audio.addEventListener("loadedmetadata", function () {
    songTime.children[0].textContent = formatTime(0);
    songTime.children[2].textContent = formatTime(Math.round(duration));

    audio.play();
  });

  audio.addEventListener("timeupdate", function () {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    songTime.children[0].textContent = formatTime(Math.round(currentTime));
    const percentage = (currentTime / duration) * 100;
    timeRange.style.backgroundImage = `linear-gradient(to right, #ffffff ${percentage}%, #808080 ${percentage}%)`;
    timeRange.value = percentage;
  });
}

const formatTime = function (time) {
  minuti = Math.round(time / 60);
  secondi = time % 60;
  if (secondi < 10) {
    secondi = "0" + secondi;
  }
  let correctTime = `${minuti}:${secondi}`;
  console.log(correctTime);
  return correctTime;
};

//FINE FUNZIONI PLAYER

const getData = async function (_content, _array) {
  try {
    let response = await fetch(API_URL + _content);
    if (response.ok) {
      data = await response.json();
      // console.log(data);
      _array.push(data);
    } else {
      return new Error("Error while loading data.");
    }
  } catch (error) {
    console.log(error);
  }
};

let printWelcome = async function () {
  await getData("album/384315", cardsAlbums);
  await getData("album/12207770", cardsAlbums);
  await getData("album/75621062", cardsAlbums);
  await getData("album/12047952", cardsAlbums);
  await getData("album/12047958", cardsAlbums);
  await getData("album/109943", cardsAlbums);
  await getData("album/74495", cardsAlbums);
  await getData("album/12047930", cardsAlbums);
  await getData("album/406094377", cardsAlbums);

  document.getElementById("welcomeSpinner").classList.add("d-none");

  for (let i = 0; i < 6; i++) {
    let colRef = document.querySelector("#welcome");
    colRef.innerHTML += ` <a href="albums.html?id=${cardsAlbums[i].id}"><div class="col">
      <div class="card albumCard">
        <div class="row g-0">
          <div class="col-4">
            <img
              class="image-fluid w-100"
              src="${cardsAlbums[i].cover}"
              class="img-fluid rounded-start"
              alt="album cover"
            />
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title">${cardsAlbums[i].title}</h5>
            </div>
          </div>
        </div>
      </div>
    </div></a>`;
  }
};

let printAd = async function () {
  await getData("track/1509449772", cardAd);
  //console.log(cardAd);

  document.getElementById("adSpinner").classList.add("d-none");

  for (let i = 0; i < cardAd.length; i++) {
    let adRef = document.querySelector("#ad");
    adRef.innerHTML = `<div class="col-3">
    <img
      class="image-fluid w-100"
      src="${cardAd[i].album.cover_big}"
      alt="Album cover"
    />
  </div>
  <div class="col d-flex flex-column justify-content-between">
    <div class="d-flex flex-row justify-content-between">
      <span>Brano</span>
      <span onclick="hideAd()" class="text-secondary">nascondi annuncio</span>
    </div>
    <div>
      <h1 class="fs-0">${cardAd[i].title}</h1>
      <p><a href="./artists.html?artistId=${cardAd[i].artist.id}">${cardAd[i].artist.name}</a></p>
      <p>Ascolta il nuovo singolo di ${cardAd[i].artist.name}</p>
      <div class="d-flex">
        <a class="align-self-center me-3  ms-0" onclick="playFunction(\'${cardAd[i].preview}\', \'${cardAd[i].title}\', \'${cardAd[i].artist.name}\',\'${cardAd[i].album.cover}\', \'${cardAd[i].duration}\')""><i
                  class="myPlay bi bi-play-circle-fill"></i></a>
        <span class="align-self-center me-3"><i class="bi bi-heart like"></i></span>
        <span class="align-self-center me-3"><i class="bi bi-arrow-down-circle"></i></span>
        <span class="align-self-center me-3"><i class="bi bi-three-dots"></i></span>
      </div>
    </div>
  </div>`;
  }
};

//FUNZIONE RIEMPIMENTO NAVBAR E SEZIONE ALBUMS
let printMore = async function () {
  await getData("album/316555317", cardsMore);
  await getData("album/405622007", cardsMore);
  await getData("album/288437072", cardsMore);
  await getData("album/205447462,", cardsMore);
  await getData("album/361734707", cardsMore);
  await getData("album/137556512", cardsMore);
  await getData("album/119606", cardsMore);
  await getData("album/15483710", cardsMore);
  await getData("album/314664567", cardsMore);

  document.getElementById("moreSpinner").classList.add("d-none");

  for (let i = 0; i < 6; i++) {
    let colRef = document.querySelector("#more");
    colRef.innerHTML += ` <div class="col-2 justify-content-between"><a href="albums.html?id=${cardsMore[i].id}"> <div class="card">
    <img src="${cardsMore[i].cover_big}" class="card-img-top" alt="album cover" />
    </a></div>
    <div class="card-body">
      <p class="card-text">${cardsMore[i].title}</p>
      <p class="card-text"><a href="./artists.html?artistId=${cardsMore[i].artist.id}">${cardsMore[i].artist.name}</a></p>
    </div>
  </div>`;
  }
  /*
  let ulRef = document.getElementById("myUl");
  for (let i = cardsMore.length - 1; i > -1; i--) {
    ulRef.innerHTML += `<a class="my-1" href="albums.html?id=${cardsMore[i].id}"> <li><p class="card-title">${cardsMore[i].title}</p></li> </a> `;
  }*/ //NAVBAR IN HTML
};

let hideAd = function () {
  document.getElementById("ad").classList.add("d-none");
};

let printAll = async function () {
  await printAd();
  await printWelcome();
  await printMore();
};

printAll();

//LIKE FUNCTION
for (let i = 0; i < hearts.length; i++) {
  hearts[i].addEventListener("click", function (e) {
    e.target.classList.toggle("bi-heart");
    e.target.classList.toggle("bi-heart-fill");
  });
}
