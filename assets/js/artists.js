const API_URL = "https://striveschool-api.herokuapp.com/api/deezer/";

let artistId = new URLSearchParams(window.location.search).get("artistId");
let thisArtist = [];
let myArtists = [];
let artistTracks = [];
let albumsArray = [];
let cardsMore = [];

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

const getData = async function (_content, _array) {
  try {
    let response = await fetch(API_URL + _content);
    if (response.ok) {
      data = await response.json();
      //console.log(data);
      _array.push(data);
    } else {
      return new Error("Error while loading data.");
    }
  } catch (error) {
    console.log(error);
  }
};

const getArtistAlbums = async function () {
  try {
    let response = await fetch(API_URL + `artist/${artistId}/albums`);
    if (response.ok) {
      data = await response.json();
      //console.log(data);
      albumsArray.push(data);
    } else {
      return new Error("Error while loading data.");
    }
  } catch (error) {
    console.log(error);
  }
};

let printArtist = async function () {
  await getData(`artist/${artistId}`, thisArtist);
  for (let i = 0; i < thisArtist.length; i++) {
    let artistRef = document.querySelector("#artist");
    artistRef.innerHTML = ` <div id=artistCoverSpace class="col mb-5">
    <div class="h-100 d-flex flex-column justify-content-end">
      <h2>${thisArtist[i].name}</h2>
      <p>${thisArtist[i].nb_fan} ascoltatori mensili</p>
    </div>
    `;
    const artistCoverSpace = document.getElementById("artistCoverSpace");
    artistCoverSpace.style.backgroundImage = `url('${thisArtist[i].picture_xl}')`;
  }
  await getData(`artist/${artistId}/top?limit=20&index=0`, artistTracks);
  //console.log(artistTracks);
  for (let i = 0; i < 5; i++) {
    console.log(artistTracks[0].data[i]);
    let preview = artistTracks[0].data[i].preview;
    let songTitle = artistTracks[0].data[i].title;
    let songArtist = artistTracks[0].data[i].artist.name;
    let songCover = artistTracks[0].data[i].album.cover_big;
    let songTime = artistTracks[0].data[i].duration;
    let reproductions = artistTracks[0].data[i].rank;
    let id = i;
    let artistRef = document.querySelector("#artist");
    artistRef.innerHTML += ` 
      <div class="row">
      <div id="${id}" onclick="playFunction(\'${preview}\', \'${songTitle}\', \'${songArtist}\',\'${songCover}\', \'${songTime}\',${id})" class="col d-flex">
      <span class="align-self-center mx-3 fs-3">${i + 1}</span>
      <span class="d-flex flex-column justify-content-around">
      <h4 class="my-0 ">${songTitle}</h4>
      <p class="fs-5 my-0 ">${artistTracks[0].data[i].album.title}<p></span>
    </div>
    <div class="col-2 d-flex">
    <h4 class="align-self-center">${reproductions}</h4>
  </div>
  <div class="col-2 d-flex">
  <h4 class="align-self-center">${songTime}</h4>
</div>
    </div>`;
  }
  await getArtistAlbums();
  console.log(albumsArray);
  for (let i = 0; i < 5; i++) {
    console.log(albumsArray[0]);
    let artistRef = document.querySelector("#artist");
    artistRef.innerHTML += ` <div class="col-2 justify-content-between"><a href="albums.html?id=${albumsArray[0].data[i].id}"> <div class="card">
    <img src="${albumsArray[0].data[i].cover_big}" class="card-img-top" alt="album cover" />
    </a></div>
    <div class="card-body">
      <p class="card-text">${albumsArray[0].data[i].title}</p>
    </div>
  </div>`;
  }
};

let printArtists = async function () {
  await getData("artist/7979", myArtists);
  await getData("artist/4527", myArtists);
  await getData("artist/86918012", myArtists);
  await getData("artist/75618", myArtists);
  await getData("artist/1155242", myArtists);
  await getData("artist/3305", myArtists);
  //console.log(myArtists);
  for (let i = 0; i < myArtists.length; i++) {
    let artistRef = document.querySelector("#artist");
    artistRef.innerHTML += ` 
    <div class="col-3">
          <img
            class="image-fluid w-100"
            src="${myArtists[i].picture_big}"
            alt="Artist cover"
          />
        </div>
        <div class="col-9">
          <div>
            <span>artist</span>
            <h2>${myArtists[i].name}</h2>
            <p>${myArtists[i].nb_album} albums</p>
            <p>${myArtists[i].nb_fan} ascoltatori</p>
          </div>
        </div>`;
  }
};

function playFunction(url, title, artist, cover, duration, id) {
  audio.src = url;
  currentTrack = id;
  playerSong.textContent = title;
  playerArtist.textContent = artist;
  playerImg.setAttribute("src", cover);

  audio.addEventListener("loadedmetadata", function () {
    songTime.children[0].textContent = formatTime(0);
    songTime.children[2].textContent = formatTime(Math.round(duration));

    timeRange.style.width = "0%";

    audio.play();
  });

  audio.addEventListener("timeupdate", function () {
    songTime.children[0].textContent = formatTime(Math.round(audio.currentTime));
    timeRange.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  });
}
document.getElementById("closeRight").addEventListener("click", function () {
  document.querySelector(".mainRight").classList.add("d-none");
});
if (artistId) {
  console.log(artistId);
  printArtist();
} else {
  printArtists();
}

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

//getData("search?q=liberato");
//http://127.0.0.1:5500/artists.html?artistId=7979
