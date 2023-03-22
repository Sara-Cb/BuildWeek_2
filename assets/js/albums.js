const API_URL = "https://striveschool-api.herokuapp.com/api/deezer/";
let thisAlbum = [];
let albumId = new URLSearchParams(window.location.search).get("id");
let song;
let myAlbums = [];
const getData = async function (_content, _array) {
  try {
    let response = await fetch(API_URL + _content);
    if (response.ok) {
      data = await response.json();
      console.log(data);
      _array.push(data);
    } else {
      return new Error("Error while loading data.");
    }
  } catch (error) {
    console.log(error);
  }
};

let printAlbum = async function () {
  await getData(`album/${albumId}`, thisAlbum);
  console.log(thisAlbum);
  for (let i = 0; i < thisAlbum.length; i++) {
    let albumRef = document.querySelector("#album");
    albumRef.innerHTML = ` <div class="col-3 border border-solid border-dark">
      <img
        class="image-fluid w-100"
        src="${thisAlbum[i].cover_big}"
        alt="Album cover"
      />
    </div>
    <div class="col border border-solid border-dark">
      <div>
        <span>album</span>
        
      
        <h2>${thisAlbum[i].title}</h2>
        <p><a href="./artists.html?artistId=${thisAlbum[i].artist.id}">${thisAlbum[i].artist.name}</a> - ${thisAlbum[i].release_date} - ${thisAlbum[i].nb_tracks} brani - ${thisAlbum[i].duration}</p>
      </div>
      <div>PLAY</div>

    </div>`;
    for (let j = 0; j < thisAlbum[i].tracks.data.length; j++) {
      let preview = '"' + thisAlbum[i].tracks.data[j].preview + '"';
      //let id = "track" + j;
      console.log(preview);

      albumRef.innerHTML += ` <div class="row">
      
      <div  onclick="playFunction(\'${thisAlbum[i].tracks.data[j].preview}\')" class="col d-flex">
      <span class="align-self-center mx-3 fs-3">${j + 1}</span>
      <span class="d-flex flex-column justify-content-around">
      <h4 class="my-0 ">${thisAlbum[i].tracks.data[j].title}</h4>
      <p class="fs-5 my-0 ">${thisAlbum[i].artist.name}<p></span>
    </div>
    <div class="col-2 d-flex">
    <h4 class="align-self-center">${thisAlbum[i].tracks.data[j].rank}</h4>
  </div>
  <div class="col-2 d-flex">
  <h4 class="align-self-center">${thisAlbum[i].tracks.data[j].duration}</h4>
</div>
    </div>`;
    }
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

//popolamento array albums
const getMyAlbums = async function () {
  let albumRef = document.getElementById("album");
  await getData("album/316555317", myAlbums);
  await getData("album/405622007", myAlbums);
  await getData("album/288437072", myAlbums);
  await getData("album/205447462,", myAlbums);
  await getData("album/361734707", myAlbums);
  await getData("album/137556512", myAlbums);
  await getData("album/314664567", myAlbums);
  await getData("album/119606", myAlbums);
  await getData("album/15483710", myAlbums);
  await getData("album/384315", myAlbums);
  await getData("album/12207770", myAlbums);
  await getData("album/75621062", myAlbums);
  await getData("album/12047952", myAlbums);
  await getData("album/12047958", myAlbums);
  await getData("album/109943", myAlbums);
  await getData("album/74495", myAlbums);
  await getData("album/12047930", myAlbums);
  await getData("album/406094377", myAlbums);
  console.log(myAlbums);
  myAlbums.forEach((album) => {
    albumRef.innerHTML += ` <div class="col-6 col-md-4 col-lg-3 justify-content-between"><a href="albums.html?id=${album.id}"> <div class="card">
    <img src="${album.cover_big}" class="card-img-top" alt="album cover" />
    </div>
    <div class="card-body">
      <p class="card-text">${album.title}</p>
      <p class="card-text"><a href="./artists.html?artistId=${album.artist.id}">${album.artist.name}</a></p>
    </div>
  </a></div>`;
  });
};

if (albumId) {
  printAlbum();
} else {
  getMyAlbums();
}
