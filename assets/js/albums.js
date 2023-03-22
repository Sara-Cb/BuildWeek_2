const API_URL = "https://striveschool-api.herokuapp.com/api/deezer/";
let thisAlbum = [];
let albumId = new URLSearchParams(window.location.search).get("id");
let song;
const tracklistRef = document.getElementById("tracklist");
const playerSong = document.getElementById("playerSong");
const playerArtist = document.getElementById("playerArtist");
const songTime = document.getElementById("songTime");
const timeRange = document.getElementById("timeRange");
const playerImg = document.getElementById("playerImg");
const playButton = document.getElementById("playbutton");
const volumeControl = document.getElementById("volume");
let audio = document.getElementById("audioReference");

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
  audio.volume = volumeControl.value / 10;
});

function playFunction(url, title, artist, cover, duration) {
  audio.src = url;

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
    songTime.children[0].textContent = formatTime(
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
    albumRef.innerHTML = ` 
    <div class="col-3 border border-solid border-dark">
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
      let preview = thisAlbum[i].tracks.data[j].preview;
      let songTitle = thisAlbum[i].tracks.data[j].title;
      let songArtist = thisAlbum[i].artist.name;
      let songCover = thisAlbum[i].cover_big;
      let songTime = thisAlbum[i].tracks.data[j].duration;
      let reproductions = thisAlbum[i].tracks.data[j].rank;
      //let id = "track" + j;
      console.log(preview);

      tracklistRef.innerHTML += `<li><div class="row">
      <div onclick="playFunction(\'${preview}\', \'${songTitle}\', \'${songArtist}\',\'${songCover}\', \'${songTime}\')" class="col d-flex">
        <span class="align-self-center mx-3 fs-3">${j + 1}</span>
        <span class="d-flex flex-column justify-content-around">
          <h4 class="my-0 ">${songTitle}</h4>
          <p class="fs-5 my-0 ">${songArtist}<p>
        </span>
      </div>
      <div class="col-2 d-flex">
        <h4 class="align-self-center">${reproductions}</h4>
      </div>
      <div class="col-2 d-flex">
        <h4 class="align-self-center">${calcDuration(songTime)}</h4>
      </div>
      </div></li>`;
    }
  }
};

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
