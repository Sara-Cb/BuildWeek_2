let tracksArray = [];
let cardsMore = [];
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const tracksDiv = document.getElementById("tracksDiv");
const albumsDiv = document.getElementById("albumsDiv");
const artistsDiv = document.getElementById("artistsDiv");

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
