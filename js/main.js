const elCardList = $_(".card-list");
const elPrevBtn = $_(".prev-btn");
const elNextBtn = $_(".next-btn");
const elForm = $_(".header__form");
const elSearchInput = $_(".header__search-input");
const elLoader = $_(".loader");
let page = 1;

elCardList.innerHTML = "";

let getData = (page) => {
  fetch(`https://www.omdbapi.com/?s=Spider&apikey=2e4bc5c4&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      working(data.Search);
      elLoader.style.display = "none"
    });


  let working = (arr) => {
    arr.forEach((element) => {
      renderCards(element);
    });

  };
};

// =========== CREATED ELEMENTS FUNCTION ================
let renderCards = (object) => {
  const newLi = createElement("li", "card-item");
  const newImg = createElement("img", "item__img");
  const newInfoDiv = createElement("div", "item__info");
  const newInfoTitle = createElement("h5", "info__title", object.Title);
  const newInfoYear = createElement("p", "info__year", object.Year);
  const newInfoType = createElement("p", "info__type", object.Type)
  newImg.src = object.Poster

  elCardList.appendChild(newLi);
  newLi.appendChild(newImg);
  newLi.appendChild(newInfoDiv);
  newInfoDiv.appendChild(newInfoTitle);
  newInfoDiv.appendChild(newInfoYear);
  newInfoDiv.appendChild(newInfoType);
}


// ==== BUTTON TO GO TO THE NEXT PAGE =====
elNextBtn.addEventListener("click", () => {
  elCardList.innerHTML = "";
  page = page + 1;
  getData(page);
});

// ==== BUTTON TO GO TO THE PREVIOUS PAGE =====
elPrevBtn.addEventListener("click", () => {
  if (page > 1) {
    elCardList.innerHTML = "";
    page = page - 1;
    getData(page);
  }
});

getData(page);