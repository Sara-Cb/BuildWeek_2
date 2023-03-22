const tracksArray = [];
const stampaPlace = document.getElementById("stampaqui");

const printEverything = function () {
  const tracksDiv = document.createElement("div");
  tracksDiv.setAttribute("class", "tracks");
  const albumsDiv = document.createElement("div");
  albumsDiv.setAttribute("class", "albums");
  const artistsDiv = document.createElement("div");
  artistsDiv.setAttribute("class", "artists");
  for (let i = 0; i < tracksArray.length; i++) {
    let track = tracksArray[i];
    let album = track.album;
    let artist = track.artist;

    const trackCard = document.createElement("div");
    trackCard.setAttribute("class", "card");
    const albumCard = document.createElement("div");
    albumCard.setAttribute("class", "card");
    const artistCard = document.createElement("div");
    artistCard.setAttribute("class", "card");

    trackCard.innerHTML = `<div class='row'><div class="col-3 border border-solid border-dark card-img"><img class="image-fluid" src="${album.cover_big}" style='width:100px; aspect-ratio:1/1' alt="Album cover"/></div><div class="col-7 border border-solid border-dark"><div class='card-body'><h2>${track.title}</h2><p>${artist.name}</p></div></div><div class="col-2 border border-solid border-dark"><p>${track.duration}</p></div></div>`;

    albumCard.innerHTML = `<div class="border border-solid border-dark card-img-top"> <img class="image-fluid" src="${album.cover_big}" style='width:100px; aspect-ratio:1/1' alt="Album cover"/> </div><div class="col-7 border border-solid border-dark"> <div class='card-body'> <h2>${album.title}</h2> <p>${artist.name}</p> </div> </div>`;

    artistCard.innerHTML = `<div class="border border-solid border-dark card-img-top"> <img class="image-fluid" src="${artist.picture_big}" style='width:100px; aspect-ratio:1/1' alt="Album cover"/> </div> <div class="col-7 border border-solid border-dark"> <div class='card-body'><h2>${artist.name}</h2><p>Artista</p> </div></div>`;

    tracksDiv.appendChild(trackCard);
    albumsDiv.appendChild(albumCard);
    artistsDiv.appendChild(artistCard);
  }

  stampaPlace.appendChild(tracksDiv);
  stampaPlace.appendChild(albumsDiv);
  stampaPlace.appendChild(artistsDiv);
};

const fetchEverything = async (keyword) => {
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

fetchEverything("america");
//fetchEverything("love");
//fetchEverything("every");

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

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}
