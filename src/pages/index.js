import "../pages/index.css";
import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import { settings } from "../utils/constants.js";

const userInfoController = new UserInfo(".profile__name", ".profile__about");
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
const validatorProfile = new FormValidator(settings, profilePopup);
const validatorEdit = new FormValidator(settings, cardAddPopup);
validatorProfile.enableValidation();
validatorEdit.enableValidation();

//вызывается при клике на карточку
function handleCardClick(card) {
  let popupWithImage = new PopupWithImage(".popupimage");

  popupWithImage.open(card.name, card.link);
}

const cardsContainerSelector = ".elements";

const renderCard = (item) => {
  const card = new Card(item.name, item.link, "#template", handleCardClick);
  return card.render();
};

const cardsSection = new Section(
  { items: initialCards, renderer: renderCard },
  cardsContainerSelector
);

cardsSection.renderItems();

//Add form
const submitAddCallback = (data) => {
  cardsSection.addItem(renderCard(data, "#template", handleCardClick));
};

// вызывается при нажатии на кнопку
const popupWithForm = new PopupWithForm("#popup-add", submitAddCallback);

function handleAddClick() {
  popupWithForm.open();
}

const submitProfileCallback = (data) => {
  userInfoController.setUserInfo(data["profile-name"], data["profile-about"]);
};

const popupWithEdit = new PopupWithForm("#popup-edit", submitProfileCallback);

function handleProfileEdit() {
  popupWithEdit.open();
}

profileEditBtn.addEventListener("click", handleProfileEdit);
cardAddBtn.addEventListener("click", handleAddClick);
