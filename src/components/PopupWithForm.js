import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);

    this._submitCallback = submitCallback;

    this._form = this._popup.querySelector(".popup__form");

    this._inputList = this._form.querySelectorAll(".popup__input");

    this._submitButton = this._form.querySelector(".popup__button");

    this._submitButtonText = this._submitButton.textContent;

    this.setEventListeners();
  }

  //возвращаем объект со значениями полей ввода формы

  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  // устанавливаем слушатель событий на отправку формы

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submitCallback(this._getInputValues());

      this.close();
    });
  }

  //сбрасываем значения полей ввода формы

  close() {
    this._form.reset();

    super.close();
  }
}
