import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._figureElement = this._popup.querySelector(".popup__image");
    this._captionElement = this._popup.querySelector(".popup__image-caption");
  }

  //Заполняет нужными значениями и открывает
  open(imageLink, text) {
    this._figureElement.src = imageLink;
    this._figureElement.alt = text;
    this._captionElement.textContent = text;
    super.open();
  }
}
