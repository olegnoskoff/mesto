export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //открываем попап, добавляя класс

  open() {
    this._popup.classList.add("popup_opened");

    document.addEventListener("keydown", this._handleEscClose);
  }

  //закрываем попап, удаляя класс

  close() {
    this._popup.classList.remove("popup_opened");

    document.removeEventListener("keydown", this._handleEscClose);
  }

  //обрабатываем событие

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //добавляем обработчик события на кнопку закрытия и на клик вне попапа

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__button-close");

    closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
