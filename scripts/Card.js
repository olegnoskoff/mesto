class Card {
  constructor(name, link, templateSelector, openedCard) {
    this._name = name; // имя из массива
    this._link = link; // ссылка из массива
    this._templateSelector = templateSelector; // Селектор template-элемента с шаблоном карточки
    this._openedCard = openedCard; //функция
  }

  //изменяет лайк на активный
  _handleButtonLike() {
    this._likeButton.classList.toggle("card__icon_active");
  }

  //удаляем карточку
  _handleButtonDel() {
    this._element.remove();
  }

  //получаем шаблон карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  //новая карточка
  generateCard() {
    this._element = this._getTemplate(); //структура карточки
    this._image = this._element.querySelector(".card__image"); //находим изображение
    this._likeButton = this._element.querySelector(".card__icon"); //нахожим иконку лайк и присваиваем
    this._image.src = this._link; //ссылка массива и присваиваем
    this._image.alt = this._name; //имя из масиива и присваиваем
    this._element.querySelector(".card__title").textContent = this._name; //находим заголовок  и присваиваем
    this._setEventListeners(); //слушатель
    return this._element; //возвращаем карточку с данными
  }

  //слушатель событий

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleButtonLike(); //  лайк в карточке
    });

    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleButtonDel(); //удаляем карточку
      });

    this._image.addEventListener("click", () => {
      this._openedCard(this._name, this._link); //открытие попапа с изображением
    });
  }
}

//экспорт модуля Card
export { Card };
