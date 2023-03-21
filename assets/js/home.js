const API_URL = "https://striveschool-api.herokuapp.com/api/deezer/";
let cardsAlbums = [];
let cardAd = [];
let cardsMore = [];

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

let printWelcome = async function () {
  await getData("album/384315", cardsAlbums);
  await getData("album/12207770", cardsAlbums);
  await getData("album/75621062", cardsAlbums);
  await getData("album/12047952", cardsAlbums);
  await getData("album/12047958", cardsAlbums);
  await getData("album/109943", cardsAlbums);
  await getData("album/74495", cardsAlbums);
  await getData("album/12047930", cardsAlbums);
  await getData("album/406094377", cardsAlbums);

  for (let i = 0; i < 6; i++) {
    let colRef = document.querySelector("#welcome");
    colRef.innerHTML += ` <a href="albums.html?id=${cardsAlbums[i].id}"><div class="col">
      <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
          <div class="col-4">
            <img
              class="image-fluid w-100"
              src="${cardsAlbums[i].cover}"
              class="img-fluid rounded-start"
              alt="album cover"
            />
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title">${cardsAlbums[i].title}</h5>
            </div>
          </div>
        </div>
      </div>
    </div></a>`;
  }
};

let printAd = async function () {
  await getData("track/1509449772", cardAd);
  console.log(cardAd);
  for (let i = 0; i < cardAd.length; i++) {
    let adRef = document.querySelector("#ad");
    adRef.innerHTML = `<div class="col-3 border border-solid border-dark">
    <img
      class="image-fluid w-100"
      src="${cardAd[i].album.cover_big}"
      alt="Album cover"
    />
  </div>
  <div class="col border border-solid border-dark">
    <div>
      <span>album</span>
      <span><button>nascondi annuncio</button></span>
    </div>
    <div>
      <h2>${cardAd[i].title}</h2>
      <p>${cardAd[i].artist.name}</p>
      <p>Ascolta il nuovo singolo di ${cardAd[i].artist.name}</p>
      <div>
        <button>Play</button>
        <button>Salva</button>
        <button>...</button>
      </div>
    </div>
  </div>`;
  }
};

let printMore = async function () {
  await getData("album/316555317", cardsMore);
  await getData("album/405622007", cardsMore);
  await getData("album/288437072", cardsMore);
  await getData("album/205447462,", cardsMore);
  await getData("album/361734707", cardsMore);
  await getData("album/137556512", cardsMore);
  await getData("album/314664567", cardsMore);
  await getData("album/119606", cardsMore);
  await getData("album/15483710", cardsMore);

  //correggere dimensione dell'immagine a riga 101!

  for (let i = 0; i < 6; i++) {
    let colRef = document.querySelector("#more");
    colRef.innerHTML += ` <div class="col-2 justify-content-between"><a href="albums.html?id=${cardsMore[i].id}"> <div class="card">
    <img src="${cardsMore[i].cover_big}" class="card-img-top" alt="album cover" />
    </div>
    <div class="card-body">
      <p class="card-text">${cardsMore[i].title}</p>
      <p class="card-text">${cardsMore[i].artist.name}</p>
    </div>
  </a></div>`;
  }
};

//getData("search?q=turbe giovanili");

printAd();
printWelcome();
printMore();
