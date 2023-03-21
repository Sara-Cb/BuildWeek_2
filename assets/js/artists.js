const API_URL = "https://striveschool-api.herokuapp.com/api/deezer/";

let artistId = new URLSearchParams(window.location.search).get("artistId");
let thisArtist = [];
let myArtists = [];

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

if (artistId) {
  console.log(artistId);
  let printArtist = async function () {
    await getData(`artist/${artistId}`, thisArtist);
    for (let i = 0; i < thisArtist.length; i++) {
      let artistRef = document.querySelector("#artist");
      artistRef.innerHTML = ` 
        <div class="col col-3 border border-solid border-dark">
              <img
                class="image-fluid w-100"
                src="${thisArtist[i].picture_big}"
                alt="Artist cover"
              />
            </div>
            <div class="col col-9 border border-solid border-dark">
              <div>
                <span>artist</span>
                <h2>${thisArtist[i].name}</h2>
                <p>${thisArtist[i].nb_album} albums</p>
                <p>${thisArtist[i].nb_fan} ascoltatori</p>
              </div>
            </div>`;
    }
  };
  printArtist();
} else {
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
      <div class="col-3 border border-solid border-dark">
            <img
              class="image-fluid w-100"
              src="${myArtists[i].picture_big}"
              alt="Artist cover"
            />
          </div>
          <div class="col-9 border border-solid border-dark">
            <div>
              <span>artist</span>
              <h2>${myArtists[i].name}</h2>
              <p>${myArtists[i].nb_album} albums</p>
              <p>${myArtists[i].nb_fan} ascoltatori</p>
            </div>
          </div>`;
    }
  };
  printArtists();
}

//getData("search?q=liberato");
//http://127.0.0.1:5500/artists.html?artistId=7979
