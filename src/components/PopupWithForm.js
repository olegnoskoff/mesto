import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, handleOpenForm) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputValues = {};
    this._handleOpenForm = handleOpenForm;
    this.formName = this._form.getAttribute("name");
    this._allInput = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__save-button");
    this._buttonText = this._submitButton.textContent;
  }

  //Сохраняем все поля
  _getInputValues() {
    this._allInput.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  //Устанавливаем необходимые слушатели
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit();
    });
  }

  //Выполняем действия при сабмите формы
  _submit() {
    this._handleSubmit(this._getInputValues());
  }

  //Блокируем кнопку отправки во время запроса
  blockSubmitButton(blockedButtonText = "Сохранение...") {
    this._blockedButtonText = blockedButtonText;
    this._submitButton.disabled = true;
    this._submitButton.textContent = this._blockedButtonText;
  }

  //Возвращаем кнопку отправки после блокировки
  unblockSubmitButton() {
    this._submitButton.disabled = false;
    this._submitButton.textContent = this._buttonText;
  }

  //Закрываем
  close() {
    super.close();
    this._form.reset();
  }

  //Открываем
  open() {
    super.open();
    this._handleOpenForm();
  }
}
