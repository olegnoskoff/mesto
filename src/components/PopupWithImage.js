import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImg = this._popup.querySelector(".popupimage__image");
    this._popupTitle = this._popup.querySelector(".popupimage__title");
    this._setEventListeners();
  }

  _setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit();
    });
  }
  

  //открывает попап с изображением, используя переданные параметры
  open(name, link) {
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}
