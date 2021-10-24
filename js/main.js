const elCardList = $_(".card-list");
const elBookeMarkedList = $_(".bookmareked-list");
const elPrevBtn = $_(".prev-btn");
const elNextBtn = $_(".next-btn");
const elForm = $_(".header__form");
const elSearchInput = $_(".header__search-input", elForm);
const elLoader = $_(".loader");
const elSeccessText = $_(".succeccfuly-added");
let page = 1;

let bookeMarked = JSON.parse(localStorage.getItem("item")) || [];
elLoader.style.display = "none"

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  elLoader.style.display = "block"
  const inputValue = elSearchInput.value.trim();
  getData(page, inputValue);
})

let getData = (page, value) => {
  elCardList.innerHTML = "";
  fetch(`https://www.omdbapi.com/?apikey=2e4bc5c4&s=${value}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      working(data.Search);
      elLoader.style.display = "none"

      if (page <= 1) {
        elPrevBtn.disabled = true;
      }
      if (page > 1) {
        elPrevBtn.disabled = false;
      }
      if (page == Math.ceil(data.totalResults / 10)) {
        elNextBtn.disabled = true;
      }
      if (page < Math.ceil(data.totalResults / 10)) {
        elNextBtn.disabled = false;
      }
      if (Math.ceil(data.totalResults / 10) < 2) {
        elNextBtn.disabled = true;
        elPrevBtn.disabled = true;
      }
    });

  let working = (arr) => {
    arr.forEach((element, i) => {
      renderCards(element, i);
    });
  };
};


// =========== CREATED ELEMENTS FUNCTION ================
let renderCards = (object, i) => {
  const newLi = createElement("li", "card-item");
  const newImg = createElement("img", "item__img");
  const newInfoDiv = createElement("div", "item__info");
  const newInfoTitle = createElement("h5", "info__title", object.Title);
  const newInfoYear = createElement("p", "info__year", object.Year);
  const newInfoType = createElement("p", "info__type", object.Type);
  const newBookMarkBtn = createElement("button", "bookmark-btn btn btn-info", "BookMark");
  newBookMarkBtn.setAttribute("data-id", i);
  console.log(newBookMarkBtn);
  newImg.src = object.Poster

  elCardList.appendChild(newLi);
  newLi.appendChild(newImg);
  newLi.appendChild(newInfoDiv);
  newInfoDiv.appendChild(newInfoTitle);
  newInfoDiv.appendChild(newInfoYear);
  newInfoDiv.appendChild(newInfoType);
  newInfoDiv.appendChild(newBookMarkBtn);


  newBookMarkBtn.addEventListener("click", (e) => {
    let id = e.target.parentNode.children[0].textContent;
    console.log(id);
    if (!bookeMarked.includes(id)) {
      bookeMarked.push(id);
      localStorage.setItem("item", JSON.stringify(bookeMarked));
      renderItem();
    }
  });

}

let createBookeMarkItem = (item, i) => {
  let newItem = createElement("li", "bookmark-item");
  let newWrapper = createElement("div", "bookmark-item-wrapper")
  let newItemTitle = createElement("h5", "bookmark-item-title", item);
  let newRemoveBtn = createElement("button", "btn btn-danger", 'Delete')
  newRemoveBtn.value = i;

  newItem.appendChild(newWrapper);
  newWrapper.appendChild(newItemTitle);
  newWrapper.appendChild(newRemoveBtn);
  elBookeMarkedList.appendChild(newItem);

  newRemoveBtn.addEventListener('click', function () {
    const index = this.value;
    console.log(index);
    bookeMarked.splice(index, 1);
    localStorage.setItem("item", JSON.stringify(bookeMarked));
    renderItem(bookeMarked);
  });
};

let renderItem = () => {
  elBookeMarkedList.innerHTML = "";
  bookeMarked.forEach((element, i) => {
    createBookeMarkItem(element, i);
  });
}



// ==== BUTTON TO GO TO THE NEXT PAGE =====
elNextBtn.addEventListener("click", () => {
  elCardList.innerHTML = "";
  page = page + 1;
  const inputValue = elSearchInput.value.trim();
  elLoader.style.display = "block"
  getData(page, inputValue);
});

// ==== BUTTON TO GO TO THE PREVIOUS PAGE =====
elPrevBtn.addEventListener("click", () => {
  elCardList.innerHTML = "";
  page = page - 1;
  elLoader.style.display = "block"
  const inputValue = elSearchInput.value.trim();
  getData(page, inputValue);
});

const disco = setInterval(() => {
  setTimeout(() => {
    document.body.style.backgroundColor = "#5da1ce";
    document.body.style.transition = "4s"
  }, 3000)

  setTimeout(() => {
    document.body.style.backgroundColor = "#9b09fd";
    document.body.style.transition = "4s"
  }, 6000)

  setTimeout(() => {
    document.body.style.backgroundColor = " #fd0967";
    document.body.style.transition = "4s"
  }, 9000)

  setTimeout(() => {
    document.body.style.backgroundColor = " #09fd83";
    document.body.style.transition = "4s"
  }, 12000)

}, 12000);


renderItem();