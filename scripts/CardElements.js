const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document.querySelector("#template").content;
const container = document.querySelector(".elements");

function createCard(item, order = false) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  if (order === true) {
    container.prepend(cardElement);
  } else {
    container.append(cardElement);
  }
}

initialCards.forEach(createCard);

let openAdd = document.querySelector("#popup-add");
let buttonOpenAdd = document.querySelector(".profile__add-button");
let buttonCloseAdd = document.querySelector("#popup-add .popup__button-close");
let formElementAdd = document.querySelector("#popup-add .popup__form");
let cityInput = formElementAdd.querySelector(".popup__input_type_city");
let linkInput = formElementAdd.querySelector(".popup__input_type_link");

function open() {
  openAdd.classList.add("popup_opened");
}

function close() {
  openAdd.classList.remove("popup_opened");
}

buttonOpenAdd.addEventListener("click", open);
buttonCloseAdd.addEventListener("click", close);

function newCardCreate(evt) {
  evt.preventDefault();
  createCard({ name: cityInput.value, link: linkInput.value }, true);

  close();
}

formElementAdd.addEventListener("submit", newCardCreate);

const imageCard = document.querySelector("#imageCard");

function clickHandler(event) {
  if (event.target.classList.contains("card__icon"))
    event.target.classList.toggle("card__icon_active");
  else if (event.target.classList.contains("card__delete")) {
    event.target.closest(".card").remove();
  } else if (event.target.classList.contains("card__image")) {
    imageCard.classList.add("popup_opened");

    let city = event.target
      .closest(".card")
      .querySelector(".card__title").innerText;
    let imgSrc = event.target.src;

    imageCard.querySelector("#nameImg").innerText = city;
    imageCard.querySelector(".popupimage__image").alt = city;
    imageCard.querySelector(".popupimage__image").src = imgSrc;
  } else if (event.target.classList.contains("popupimage__button-close")) {
    imageCard.classList.remove("popup_opened");
  }
}

document.addEventListener("click", clickHandler);
