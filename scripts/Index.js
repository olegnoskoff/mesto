import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  popupButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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
const cardPopupCity = cardPopup.querySelector(".popupimage__title");
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

const validatorProfile = new FormValidator(settings, profilePopup);
const validatorEdit = new FormValidator(settings, cardAddPopup);

validatorProfile.enableValidation();
validatorEdit.enableValidation();

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

const createCard = (name, link) => {
  const card = new Card(name, link, "#template", openedCard);
  const cardElement = card.generateCard();
  return cardElement;
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function openPopupEdit() {
  openPopup(cardAddPopup);
  cardAddPopupForm.reset();
  validatorEdit.hidePopupErrors();
}

function openPopupProfile() {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  openPopup(profilePopup);
  validatorProfile.hidePopupErrors();
}

function openedCard(name, link) {
  cardPopupImg.src = link;
  cardPopupCity.alt = name;
  cardPopupCity.textContent = name;
  openPopup(cardPopup);
}

function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  evt.target.reset();
  closePopup(profilePopup);
}

const handleAddBtn = (evt) => {
  evt.preventDefault();
  cardsContainer.prepend(createCard(cityInput.value, linkInput.value));
  closePopup(cardAddPopup);
};

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item.name, item.link));
});

cardAddPopupForm.addEventListener("submit", handleAddBtn);
profileEditBtn.addEventListener("click", openPopupProfile);
cardAddBtn.addEventListener("click", openPopupEdit);
profilePopup.addEventListener("submit", submitFormProfile);
