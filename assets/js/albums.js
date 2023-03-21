const API_URL = "https://striveschool-api.herokuapp.com/api/deezer/";
let thisAlbum = [];
let albumId = new URLSearchParams(window.location.search).get("id");

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
        <p>${thisAlbum[i].artist.name} - ${thisAlbum[i].release_date} - ${thisAlbum[i].nb_tracks} brani - ${thisAlbum[i].duration}</p>
      </div>
      <div>PLAY</div>

    </div>`;
    for (let j = 0; j < thisAlbum[i].tracks.data.length; j++) {
      albumRef.innerHTML += ` <div class="row">
      
      <div class="col"><a class="d-flex" href="albums.html?id=${thisAlbum[i].id}&track=${
        thisAlbum[i].tracks.data[j].preview
      }">
      <span class="align-self-center mx-3 fs-3">${j + 1}</span>
      <span class="d-flex flex-column justify-content-around">
      <h4 class="my-0 ">${thisAlbum[i].tracks.data[j].title}</h4>
      <p class="fs-5 my-0 ">${thisAlbum[i].artist.name}<p></span>
    </a></div>
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
printAlbum();
