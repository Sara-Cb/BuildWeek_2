const tracksArray = [];
const albumsArray = [];
const artistsArray = [];

const fetchAlbum = function (albumId) {
  async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      tracklist = albumData.tracks.data;

      let album = data;
      albumsArray.push(album);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };
};

const fetchArtist = function (artistId) {
  async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      let artist = data.data;
      artistsArray.push(artist);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };
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
      let album = track.album;
      albumsArray.push(album);
      let artist = track.artist;
      artistsArray.push(artist);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
  console.log(tracksArray);
  console.log(albumsArray);
  console.log(artistsArray);
};

fetchEverything("america");
//fetchEverything("love");
//fetchEverything("every");

const playerSong = document.getElementById("playerSong");
const playerArtist = document.getElementById("playerArtist");
const songTime = document.getElementById("songTime");
const timeRange = document.getElementById("timeRange");

function playFunction(url, title, artist, cover, duration) {
  const audio = new Audio(url);

  playerSong.textContent = title;
  playerArtist.textContent = artist;

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
