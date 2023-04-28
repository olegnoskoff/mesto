export const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    popupButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

const profilePopupForm = '.popup__form';
const inputName = '.popup__input';
const submitBtnSelector = '.popup__save-button';
const inactBtnClass = 'popup__save-button_disabled';
const inputErrClass = 'popup__input_type_error';
const errorClass = 'popup__input-error_visible';
export const formSelector = {formSelector: profilePopupForm, inputSelector: inputName, submitButtonSelector: submitBtnSelector, inactiveButtonClass: inactBtnClass, inputErrorClass: inputErrClass, errorClass
};

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__job');
const profileAvatar = document.querySelector('.profile__avatar-image');
export const profileElement = {name: profileName, about: profileAbout, avatar: profileAvatar
}

export const cardsSelector = '.cards';
export const cardTemplateSelector = '#card';
export const profileEditBtn = document.querySelector('.profile__button_type_edit');
export const profilePopupSelector = '.popup_type_edit-profile';
const profilePopupEdit = document.querySelector(profilePopupSelector);
export const profileNameInput = profilePopupEdit.querySelector('.popup__input_type_name');
export const profileAboutInput = profilePopupEdit.querySelector('.popup__input_type_job');
export const avatarButton = document.querySelector('.profile__avatar-button');
export const avatarPopupSelector = '.popup_type_change-avatar';
export const cardAddBtn = document.querySelector('.profile__button_type_add');
export const cardAddPopup = '.popup_type_add-card';
export const cardPopupImg = '.popup_type_image';
export const deletPopupSelector = '.popup_type_confirm';
  