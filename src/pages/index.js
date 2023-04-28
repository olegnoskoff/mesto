import {apiConfig} from '../utils/apiConfig.js';
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

import {
  cardsSelector, cardTemplateSelector, formSelector, profileElement,
  profileEditBtn, profileNameInput, profileAboutInput, profilePopupSelector,
  avatarButton, avatarPopupSelector, cardAddBtn, cardAddPopup, cardPopupImg, deletPopupSelector,
} from "../utils/constants.js";

const formsValidator = {};
const cards = {}; 

//Запускает валидацию всех форм на странице
function validatorForms(formSelectors) {
  const formValidElements = Array.from(
    document.querySelectorAll(formSelectors.formSelector)
  );
  formValidElements.forEach((formElement) => {
    const form = new FormValidator(formSelectors, formElement);
    formsValidator[formElement.getAttribute("name")] = form;
    form.enableValidation();
  });
}

//Создает элемент карточки
function newCard(data) {
  const card = new Card(
    data,cardTemplateSelector, handleCardClick, handleDeleteCard, handleCardLike, userInfo.id
  );
  cards[data._id] = card;
  return card.generateCard();
}

//Обрабатывает нажатие на картинку карточки
function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}

//Обрабатывает нажатие на удаление карточки
function handleDeleteCard(cardId) {
  popupWithConfirmation.setTarget(cardId);
  popupWithConfirmation.open();
}


//Обрабатывает нажатие на лайк в карточке
function handleCardLike(cardId, isLiked) {
  cards[cardId].blockLikeButton();

  api
    .toggleLike(cardId, isLiked)
    .then((likes) => {
      cards[cardId].setLikes(likes);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      cards[cardId].unblockLikeButton();
    });
}

//Выполняет сброс формы при открытии попапа с формой
function handleFormOpen() {
  formsValidator[this.formName].hideErrors();
  formsValidator[this.formName].disableButtonState();
}

//Инициализация классов
const api = new Api(apiConfig);

const userInfo = new UserInfo({
  nameElement: profileElement.name,
  aboutElement: profileElement.about,
  avatarElement: profileElement.avatar,
});

const cardsSection = new Section(newCard, cardsSelector);

//Попапы
const profilePopupEdit = new PopupWithForm(
  profilePopupSelector,
  (data) => {
    profilePopupEdit.blockSubmitButton();

    api
      .setUserInfo(data)
      .then((res) => {
        userInfo.fill(res);
        userInfo.renderName();
        userInfo.renderAbout();
        profilePopupEdit.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        profilePopupEdit.unblockSubmitButton();
      });
  },
  handleFormOpen
);

const avatarFotoPopup = new PopupWithForm(
  avatarPopupSelector,
  (data) => {
    avatarFotoPopup.blockSubmitButton();

    api
      .changeAvatar(data.link)
      .then((res) => {
        userInfo.fill(res);
        userInfo.renderAvatar();
        avatarFotoPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        avatarFotoPopup.unblockSubmitButton();
      });
  },
  handleFormOpen
);

const newCardPopup = new PopupWithForm(
  cardAddPopup,
  (data) => {
    newCardPopup.blockSubmitButton();

    api
      .addNewCard(data)
      .then((res) => {
        cardsSection.addItem(newCard(res), true);
        newCardPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        newCardPopup.unblockSubmitButton();
      });
  },
  handleFormOpen
);

const imagePopup = new PopupWithImage(cardPopupImg);

const popupWithConfirmation = new PopupWithConfirmation(
  deletPopupSelector,
  (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cards[cardId].delete();
        popupWithConfirmation.close();
      })
      .catch((err) => console.error(err));
  }
);

//Первоначальное получение данных от сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((results) => {
    userInfo.fill(results[0]);
    userInfo.renderName();
    userInfo.renderAbout();
    userInfo.renderAvatar();

    cardsSection.renderItems(results[1]);
  })
  .catch((err) => console.error(err));

//Установка слушателей для работы попапов
profilePopupEdit.setEventListeners();

profileEditBtn.addEventListener("click", function () {
  ({ name: profileNameInput.value, about: profileAboutInput.value } =
    userInfo.getUserInfo());
  profilePopupEdit.open();
  profileNameInput.dispatchEvent(new Event("input"));
  profileAboutInput.dispatchEvent(new Event("input"));
});

//Попап обновления аватара
avatarFotoPopup.setEventListeners();

avatarButton.addEventListener("click", () => {
  avatarFotoPopup.open();
});

//Попап добавления новой карточки
newCardPopup.setEventListeners();

cardAddBtn.addEventListener("click", function () {
  newCardPopup.open();
});

//Попап с подтвержденим информации
popupWithConfirmation.setEventListeners();

//Попап с увеличенным изображением
imagePopup.setEventListeners();

//Валидация
validatorForms(formSelector);
