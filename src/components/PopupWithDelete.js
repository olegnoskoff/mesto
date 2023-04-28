// import Popup from "./Popup.js";

// export default class PopupWithDelete extends Popup {
//   constructor({ selector }) {
//     super(selector);
//     this._form = this._popup.querySelector(".popup__form");
//   }

//   // принимает коллбэк на удаление карточки
//   submitCallback(removing) {
//     this._handleSubmit = removing;
//   }

//   // удаление карточки по нажатию на submit
//   setEventListeners() {
//     super.setEventListeners();
//     this._form.addEventListener("click", (event) => {
//       event.preventDefault();
//       this._handleSubmit();
//     });
//   }
// }
