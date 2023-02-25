import { enableValidation } from "./validate.js";

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

const cardPopup = document.querySelector("#imageCard");
const cardPopupCity = cardPopup.querySelector("#nameImg");
const cardPopupImg = cardPopup.querySelector(".popupimage__image");

const cardTemplate = document
  .querySelector("#template")
  .content.querySelector(".card");
const cardsContainer = document.querySelector(".elements");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const profilePopup = document.querySelector("#popup-edit");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profilePopupForm = profilePopup.querySelector(".popup__form");
const profileNameInput = profilePopupForm.querySelector(
  ".popup__input_type_name"
);
const profileAboutInput = profilePopupForm.querySelector(
  ".popup__input_type_about"
);

const cardAddBtn = document.querySelector(".profile__add-button");

const cardAddPopup = document.querySelector("#popup-add");
const cardAddPopupForm = cardAddPopup.querySelector(".popup__form");
const cityInput = cardAddPopup.querySelector(".popup__input_type_city");
const linkInput = cardAddPopup.querySelector(".popup__input_type_link");

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__button-close")
    ) {
      closePopup(popup);
    }
  });
});

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  evt.target.reset();
  closePopup(profilePopup);
}

profileEditBtn.addEventListener("click", () => {
  openPopup(profilePopup);
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
});
profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  const image = card.querySelector(".card__image");
  image.src = item.link;
  image.alt = item.name;
  card.querySelector(".card__title").textContent = item.name;
  const like = card.querySelector(".card__icon");
  like.addEventListener("click", () =>
    like.classList.toggle("card__icon_active")
  );
  card
    .querySelector(".card__delete")
    .addEventListener("click", () => card.remove());
  image.addEventListener("click", () => {
    openPopup(cardPopup);
    cardPopupCity.innerText = item.name;
    cardPopupImg.alt = item.name;
    cardPopupImg.src = item.link;
  });
  return card;
}

initialCards.forEach((item) => cardsContainer.append(createCard(item)));

cardAddPopupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardsContainer.prepend(
    createCard({ name: cityInput.value, link: linkInput.value }, true)
  );
  evt.target.reset();
  closePopup(cardAddPopup);
});

cardAddBtn.addEventListener("click", () => openPopup(cardAddPopup));

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
