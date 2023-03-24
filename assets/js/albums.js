const API_URL = "https://striveschool-api.herokuapp.com/api/deezer/";
let thisAlbum = [];
let myAlbums = [];
let trackArray = [];
let albumId = new URLSearchParams(window.location.search).get("id");
let song;
let cardsMore = [];
const trackIndex = document.getElementsByClassName("trackIndex");
const trackItem = document.getElementsByClassName("trackItem");
const trackPlayBtn = document.getElementsByClassName("playbutton");
const hearts = document.getElementsByClassName("like");
const heartsArray = document.getElementsByClassName("tracklike");

const tracklistRef = document.getElementById("tracklist");
// RIFERIMENTI PLAYER
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
    //console.log(currentTrack);
    let divBack = document.getElementById(backId);
    //console.log(divBack);
    divBack.click();
  } else {
    divCur = document.getElementById(currentTrack);
    divCur.click();
  }
});

btnNext.addEventListener("click", function () {
  if (currentTrack != trackArray.length - 1) {
    let nextId = currentTrack + 1;
    //console.log(currentTrack);
    let divNext = document.getElementById(nextId);
    //console.log(divNext);
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
    playButton.innerHTML = `<i class="bi bi-pause-circle-fill fs-2"></i>`;
  } else {
    audio.pause();
    playButton.innerHTML = `<i class="bi bi-play-circle-fill fs-2"></i>`;
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
    playButton.innerHTML = `<i class="bi bi-pause-circle-fill fs-2"></i>`;
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
  //console.log(correctTime);
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

let printAlbum = async function () {
  await getData(`album/${albumId}`, thisAlbum);
  //console.log(thisAlbum);
  for (let i = 0; i < thisAlbum.length; i++) {
    let albumRef = document.querySelector("#album");
    albumRef.innerHTML = ` 
    <div class="col-3">
      <img
        class="image-fluid w-100"
        src="${thisAlbum[i].cover_big}"
        alt="Album cover"
      />
    </div>
    <div class="col d-flex flex-column justify-content-between">
      <div>
        <span>album</span>
       </div> 
      <div>
        <h1>${thisAlbum[i].title}</h1>
        <p><a href="./artists.html?artistId=${thisAlbum[i].artist.id}">${
      thisAlbum[i].artist.name
    }</a> • ${thisAlbum[i].release_date.split("-")[0]} • ${
      thisAlbum[i].nb_tracks
    } brani • ${formatTime(thisAlbum[i].duration)}</p></div>
    </div>
    </div>`;
    //<a onclick="playTop()">PLAY</a>
    for (let j = 0; j < thisAlbum[i].tracks.data.length; j++) {
      let preview = thisAlbum[i].tracks.data[j].preview;
      let songTitle = thisAlbum[i].tracks.data[j].title;
      let songArtist = thisAlbum[i].artist.name;
      let songCover = thisAlbum[i].cover_big;
      let songTime = thisAlbum[i].tracks.data[j].duration;
      let reproductions = thisAlbum[i].tracks.data[j].rank;
      let artistId = thisAlbum[i].artist.id;
      let id = j;
      trackArray.push(thisAlbum[i]);
      console.log(thisAlbum[i]);

      tracklistRef.innerHTML += `<li class="trackItem"><div class="row g-0 mx-0 mx-md-2">
      <div  class="col-1 d-flex ">
      <button onclick="playFunction(\'${preview}\', \'${songTitle}\', \'${songArtist}\',\'${songCover}\', \'${songTime}\',${id})" class="playbutton px-0 px-md-2 align-self-center btn d-none">
      <i class="bi bi-play-fill fs-3"></i>
    </button>
        <span class="text-secondary trackIndex align-self-center   mx-md-3 fs-3">${
          j + 1
        }</span>
        </div>
        <div class=" col trackBody ">
          <h4 id=${id} onclick="playFunction(\'${preview}\', \'${songTitle}\', \'${songArtist}\',\'${songCover}\', \'${songTime}\',${id})" class="mb-0 mt-3 clickable">${songTitle}</h4>
          <a href="./artists.html?artistId=${artistId}"><p class="fs-5 my-0 clickable text-secondary">${songArtist}<p></a>    
      </div>
      <div class="col-2 justify-content-end d-none d-md-flex">
        <p class="align-self-center text-secondary">${reproductions}</p>
      </div>
      <div class="col-1 justify-content-center d-flex ">
        <p class="align-self-center"><i class="tracklike bi bi-heart d-none"></i></p>
      </div>
      <div class="col-1 justify-content-end d-none d-md-flex">
        <p class="align-self-center text-secondary">${formatTime(songTime)}</p>
      </div>
      
      </div></li>`;
    }

    for (let i = 0; i < trackItem.length; i++) {
      trackItem[i].addEventListener("mouseover", function () {
        trackPlayBtn[i].classList.toggle("d-none");
        trackIndex[i].classList.toggle("d-none");
        if (heartsArray[i].classList.contains("bi-heart")) {
          heartsArray[i].classList.toggle("d-none");
        }
      });
      trackItem[i].addEventListener("mouseout", function () {
        trackPlayBtn[i].classList.toggle("d-none");
        trackIndex[i].classList.toggle("d-none");
        if (heartsArray[i].classList.contains("bi-heart")) {
          heartsArray[i].classList.toggle("d-none");
        }
      });
      for (let i = 1; i < hearts.length; i++) {
        hearts[i].addEventListener("click", function (e) {
          e.target.classList.toggle("bi-heart");
          e.target.classList.toggle("bi-heart-fill");
        });
      }
      for (let i = 0; i < heartsArray.length; i++) {
        heartsArray[i].addEventListener("click", function (e) {
          e.target.classList.toggle("bi-heart");
          e.target.classList.toggle("bi-heart-fill");
        });
      }
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
  //console.log(myAlbums);
  myAlbums.forEach((album) => {
    albumRef.innerHTML += ` <div class="col-6 col-md-4 col-lg-3 justify-content-between"><a href="albums.html?id=${album.id}"> <div class="card">
    <img src="${album.cover_big}" class="card-img-top" alt="album cover" />
    </div>
    <div class="card-body">
      <p class="card-text overflow">${album.title}</p>
      <p class="card-text"><a href="./artists.html?artistId=${album.artist.id}">${album.artist.name}</a></p>
    </div>
  </a></div>`;
  });
};

if (albumId) {
  printAlbum();
} else {
  iconsRowRef.classList.toggle("d-none");
  indiciRowRef.classList.toggle("d-none");
  getMyAlbums();
}

//LIKE FUNCTION

for (let i = 0; i < hearts.length; i++) {
  hearts[i].addEventListener("click", function (e) {
    e.target.classList.toggle("bi-heart");
    e.target.classList.toggle("bi-heart-fill");
  });
}

// COLONNA DESTRA
const closedRight = document.getElementById("mainRightClosed");
const openedRight = document.getElementById("mainRightOpened");

const toggleRightCol = function () {
  openedRight.classList.toggle("d-none");
  closedRight.classList.toggle("d-none");
};
