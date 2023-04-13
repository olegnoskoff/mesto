import "../pages/index.css";
import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

const UserInfoController = new UserInfo(".profile__name", ".profile__about");

const cardPopup = document.querySelector("#imageCard");

const cardPopupCity = cardPopup.querySelector(".popupimage__title");

const cardPopupImg = cardPopup.querySelector(".popupimage__image");

const cardTemplate = document

  .querySelector("#template")

  .content.querySelector(".card");

const cardsContainer = document.querySelector(".elements");

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

//вызывается при клике на карточку

function handleCardClick(card) {
  let popupWithImage = new PopupWithImage(".popupimage");

  popupWithImage.open(card.name, card.link);
}

let cards = [];

const cardsContainerSelector = ".elements";

const cardRender = (card) => {
  return card.render();
};

initialCards.forEach((item) => {
  cards.push(new Card(item.name, item.link, "#template", handleCardClick));
});

const cardsSection = new Section(
  { items: cards, render: cardRender },

  cardsContainerSelector
);

cardsSection.renderItems();

//Add form

const submitAddCallback = (data) => {
  if (data.card_name && data.card_link) {
    //извеняюсь, что так пофиксил. Не могу отловить ошибку по добавлении карточек. Был бы признателен, если вы подскажете.

    cardsSection.addItem(
      new Card(data.card_name, data.card_link, "#template", handleCardClick)
    );
  }
};

// вызывается при нажатии на кнопку

function handleAddClick() {
  const popupWithForm = new PopupWithForm("#popup-add", submitAddCallback);

  popupWithForm.open();
}

const submitProfileCallback = (data) => {
  UserInfoController.setUserInfo(data["profile-name"], data["profile-about"]);
};

function handleProfileEdit() {
  const popupWithForm = new PopupWithForm("#popup-edit", submitProfileCallback);

  popupWithForm.open();
}

profileEditBtn.addEventListener("click", handleProfileEdit);

cardAddBtn.addEventListener("click", handleAddClick);
