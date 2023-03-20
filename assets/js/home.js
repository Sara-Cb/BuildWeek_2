const API_URL = "https://striveschool-api.herokuapp.com/api/deezer/";
let cardAlbums = [];
let flag = false;

const getData = async function (_content) {
  try {
    let response = await fetch(API_URL + _content);
    if (response.ok) {
      data = await response.json();
      console.log(data);
      cardAlbums.push(data);
      if (cardAlbums.length == 6) {
        flag = true;
      }
    } else {
      return new Error("Error while loading data.");
    }
  } catch (error) {
    alert(error);
  }
  printBenvenuto();
};

let printBenvenuto = function () {
  if (flag) {
    cardAlbums.forEach((album) => {
      let colRef = document.querySelector("#benvenuto");
      colRef.innerHTML += ` <a href="albums.html?id=${album.id}"><div class="col">
      <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
          <div class="col-4">
            <img
              class="image-fluid w-100"
              src="${album.cover}"
              class="img-fluid rounded-start"
              alt="album cover"
            />
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title">${album.title}</h5>
            </div>
          </div>
        </div>
      </div>
    </div></a>`;
    });
  }
};
//getData("search?q=album");
getData("album/400801747");
getData("album/108359");
getData("album/10176470");
getData("album/381253");
getData("album/419086837");
getData("album/14882019");

console.log(cardAlbums);
