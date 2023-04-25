import "../pages/index.css";
import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api";
import PopupWithDelete from "../components/PopupWithDelete";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import { settings } from "../utils/constants.js";

const userInfoController = new UserInfo(".profile__name", ".profile__about");
const cardPopup = document.querySelector("#imageCard");
const cardPopupCity = cardPopup.querySelector(".popupimage__title");
const cardPopupImg = cardPopup.querySelector(".popupimage__image");
const cardTemplate = document.querySelector("#template").content.querySelector(".card");
const cardsContainer = document.querySelector(".elements");
const profilePopup = document.querySelector("#popup-edit");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profilePopupForm = profilePopup.querySelector(".popup__form");
const profileNameInput = profilePopupForm.querySelector(".popup__input_type_name");

const popupEditAvatar = document.querySelector('#avatarBtn');
// Форма редактирования аватара пользователя
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
// кнопка редактирования аватара пользователя
const buttonAvatar = document.querySelector('.profile__avatar-button');
// аватар пользователя
const avatar = document.querySelector('.profile__avatar');

const profileAboutInput = profilePopupForm.querySelector(".popup__input_type_about");
const cardAddBtn = document.querySelector(".profile__add-button");
const cardAddPopup = document.querySelector("#popup-add");
const cardAddPopupForm = cardAddPopup.querySelector(".popup__form");
const validatorProfile = new FormValidator(settings, profilePopup);
const validatorEdit = new FormValidator(settings, cardAddPopup);
validatorProfile.enableValidation();
validatorEdit.enableValidation();


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'd44b9fca-9567-456c-ae11-66fa146c6bcd',
    'Content-Type': 'application/json'
  }
});

//вызывается при клике на карточку
const popupWithImage = new PopupWithImage(".popupimage");
function handleCardClick(card) { 
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

// Создаем попап с подтверждением удаления карточки
const deleteCardPopup = new PopupWithDelete({
  popupSelector: '.card__delete'
});
deleteCardPopup.setEventListeners();

//Add form
const submitAddCallback = (data) => {
  cardsSection.addItem(renderCard(data, "#template", handleCardClick));
};

// вызывается при нажатии на кнопку
const popupWithForm = new PopupWithForm("#popup-add", submitAddCallback);

function handleAddClick() {
  popupWithForm.open();
}


const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup__avatar',
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api.editAvatar(data)
      .then(() => {
        avatar.src = avatar;
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  }
});
editAvatarPopup.setEventListeners();

// Обработчик кнопки Edit аватара пользователя
buttonAvatar.addEventListener('click', () => {
  formEditAvatarValidator.toggleButtonState();
  editAvatarPopup.open();
});

// Обработчик кнопки Edit попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  fillInEditProfileFormInputs({
    username: item.name,
    job: item.about
  });
  editProfilePopup.open();
});

const formEditAvatarValidator = new FormValidator(settings, formEditAvatar);
formEditAvatarValidator.enableValidation();

const submitProfileCallback = (data) => {
  userInfoController.setUserInfo(data["profile-name"], data["profile-about"]);
};

const popupWithEdit = new PopupWithForm("#popup-edit", submitProfileCallback);

function handleProfileEdit() {
  popupWithEdit.open();
}

profileEditBtn.addEventListener("click", handleProfileEdit);
cardAddBtn.addEventListener("click", handleAddClick);
