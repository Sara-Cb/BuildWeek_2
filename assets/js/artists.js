const API_URL = "https://striveschool-api.herokuapp.com/api/deezer/";

let artistId = new URLSearchParams(window.location.search).get("artistId");
let thisArtist = [];
let myArtists = [];
let artistTracks = [];
let albumsArray = [];

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
    artistRef.innerHTML = ` 
    <div class="col-3 mb-5">
    <img
      class="image-fluid w-100"
      src="${thisArtist[i].picture_xl}"
      alt="Album cover"
    />
  </div>
  <div class="col mb-5">
    <div class="h-100 d-flex flex-column justify-content-end">
      <h2>${thisArtist[i].name}</h2>
      <p>${thisArtist[i].nb_fan} ascoltatori mensili</p>
    </div>
    `;
  }
  await getData(`artist/${artistId}/top?limit=20&index=0`, artistTracks);
  //console.log(artistTracks);
  for (let i = 0; i < 5; i++) {
    let artistRef = document.querySelector("#artist");
    artistRef.innerHTML += ` 
      <div class="row">
      <div  onclick="playFunction(\'${artistTracks[0].data[i].preview}\')" class="col d-flex">
      <span class="align-self-center mx-3 fs-3">${i + 1}</span>
      <span class="d-flex flex-column justify-content-around">
      <h4 class="my-0 ">${artistTracks[0].data[i].title}</h4>
      <p class="fs-5 my-0 ">${artistTracks[0].data[i].album.title}<p></span>
    </div>
    <div class="col-2 d-flex">
    <h4 class="align-self-center">${artistTracks[0].data[i].rank}</h4>
  </div>
  <div class="col-2 d-flex">
  <h4 class="align-self-center">${artistTracks[0].data[i].duration}</h4>
</div>
    </div>`;
  }
  await getArtistAlbums();
  console.log(albumsArray);
  for (let i = 0; i < 5; i++) {
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
let audio;
const playBtn = document.getElementById("playbutton");
const progressEl = document.querySelector('input[type="range"]');
const playFunction = function (_song) {
  //console.log(_song);
  if (audio) {
    audio.pause();
  }
  audio = new Audio(_song);
  audio.paused ? audio.play() : audio.pause();
  playBtn.textContent = audio.paused ? "▶️" : "⏸️";
  playBtn.click();
  console.log("click su play");
};

let mouseDownOnSlider = false;
if (audio) {
  audio.addEventListener("loadeddata", () => {
    progressEl.value = 0;
  });
  audio.addEventListener("timeupdate", () => {
    if (!mouseDownOnSlider) {
      progressEl.value = (audio.currentTime / audio.duration) * 100;
    }
  });
  audio.addEventListener("ended", () => {
    playBtn.textContent = "▶️";
  });

  playBtn.addEventListener("click", () => {
    console.log("ciao");
    audio.paused ? audio.play() : audio.pause();
    playBtn.textContent = audio.paused ? "▶️" : "⏸️";
  });

  progressEl.addEventListener("change", () => {
    const pct = progressEl.value / 100;
    audio.currentTime = (audio.duration || 0) * pct;
  });
  progressEl.addEventListener("mousedown", () => {
    mouseDownOnSlider = true;
  });
  progressEl.addEventListener("mouseup", () => {
    mouseDownOnSlider = false;
  });
}
if (artistId) {
  console.log(artistId);
  printArtist();
} else {
  printArtists();
}

//getData("search?q=liberato");
//http://127.0.0.1:5500/artists.html?artistId=7979
