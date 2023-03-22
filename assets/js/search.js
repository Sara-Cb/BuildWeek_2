let tracksArray = [];
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const tracksDiv = document.getElementById("tracksDiv");
const albumsDiv = document.getElementById("albumsDiv");
const artistsDiv = document.getElementById("artistsDiv");

const printEverything = function () {
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

    trackCard.innerHTML = `<div class='row'><div class="col-3"><img class="image-fluid trackCardImg" src="${album.cover_big}"  alt="Album cover"/></div><div class="col-7"><div class='card-body'><h4>${track.title}</h4><p>${artist.name}</p></div></div><div class="col-1"><p>${track.duration}</p></div></div>`;
    albumCard.innerHTML = `<div> <img class="image-fluid albumCardImg" src="${album.cover_big}"  alt="Album cover"/>
     </div><div class="col-7"> <div class='card-body'> <h4>${album.title}</h4> <p>${artist.name}</p> </div> </div>`;
    artistCard.innerHTML = `<div class= card-img-top"> <img class="image-fluid artistCardImg" src="${artist.picture_big}"  alt="Album cover"/> </div> <div class="col-7"> <div class='card-body'><h4>${artist.name}</h4><p>Artista</p> </div></div>`;
    /* `
    <div class="col-6 col-md-4 col-lg-3 justify-content-between"><a href="albums.html?id=${album.id}"> <div class="card">
    <img src="${album.cover_big}" class="card-img-top" alt="album cover" /></a>
    </div>
    <div class="card-body">
      <p class="card-text">${album.title}</p>
      <p class="card-text"><a href="./artists.html?artistId=${album.artist.id}">${album.artist.name}</a></p>
    </div>
  </div>`;*/

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
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${keyword}`);
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
