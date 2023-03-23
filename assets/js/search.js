let tracksArray = [];
let cardsMore = [];
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const tracksDiv = document.getElementById("tracksDiv");
const albumsDiv = document.getElementById("albumsDiv");
const artistsDiv = document.getElementById("artistsDiv");

// RIFERIMENTI PLAYER
const tracklistRef = document.getElementById("tracklist");
const playerSong = document.getElementById("playerSong");
const playerArtist = document.getElementById("playerArtist");
const songTime = document.getElementById("songTime");
const timeRange = document.getElementById("timeRange");
const playerImg = document.getElementById("playerImg");
const playButton = document.getElementById("playbutton");
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

const printEverything = function () {
  document.getElementById("braniH2").classList.remove("d-none");
  document.getElementById("albumH2").classList.remove("d-none");
  document.getElementById("artistiH2").classList.remove("d-none");

  for (let i = 0; i < tracksArray.length; i++) {
    let track = tracksArray[i];
    let album = track.album;
    let artist = track.artist;

    const trackCard = document.createElement("div");
    trackCard.setAttribute("class", "card");
    const albumCard = document.createElement("div");
    albumCard.setAttribute("class", "col-3");
    const artistCard = document.createElement("div");
    artistCard.setAttribute("class", "col-3");

    trackCard.innerHTML = `<a href="albums.html?id=${
      album.id
    }"><div class='row'><div class="col-1"><img class="image-fluid trackCardImg" src="${
      album.cover_big
    }"  alt="Album cover"/></div><div class="col"><div class='card-body'><h4>${
      track.title
    }</h4><p>${artist.name} </p></div></div><div class="col-2"><p>${formatTime(
      track.duration
    )}</p></div></div></a>`;
    albumCard.innerHTML = `<div class"card><a href="albums.html?id=${album.id}"> <img class="image-fluid albumCardImg" src="${album.cover_big}"  alt="Album cover"/></a>
 <div class='card-body'> <h4>${album.title}</h4><p><a href="artists.html?id=${artist.id}>${artist.name}</a></p></div>`; //non compare il p???
    artistCard.innerHTML = `<div class"card><a href="artists.html?artistId=${artist.id}"><div class= card-img-top"> <img class="image-fluid artistCardImg" src="${artist.picture_big}"  alt="Artist pic"/> </div> <div class="col"> <div class='card-body'><h4>${artist.name}</h4><p>Artista</p> <a/></div></div>`;

    tracksDiv.appendChild(trackCard);
    albumsDiv.appendChild(albumCard);
    artistsDiv.appendChild(artistCard);
  }
};

const fetchEverything = async (keyword) => {
  tracksDiv.innerHTML = "";
  albumsDiv.innerHTML = "";
  artistsDiv.innerHTML = "";
  tracksArray = [];
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${keyword}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    let arrayTracce = data.data;
    for (let i = 0; i < arrayTracce.length; i++) {
      let track = data.data[i];
      tracksArray.push(track);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
  console.log(tracksArray);
  printEverything();
};

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const research = searchInput.value;
  fetchEverything(research);
  searchInput.value = "";
});

//FUNZIONE RIEMPIMENTO NAVBAR
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
  let ulRef = document.getElementById("myUl");
  for (let i = cardsMore.length - 1; i > -1; i--) {
    ulRef.innerHTML += `<a class="my-1" href="albums.html?id=${cardsMore[i].id}"> <li><p class="card-title">${cardsMore[i].title}</p></li> </a> `;
  }
};
printMore();
