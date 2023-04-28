export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupCloseBtn = this._popup.querySelector(".popup__button-close");
  }

  //Открываем
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //Закрываем
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //Escape
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //Устанавливаем слушатели событий
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) this.close();
    });

    this._popupCloseBtn.addEventListener("click", () => {
      this.close();
    });
  }
}
