class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this.name = name; // имя из массива

    this.link = link; // ссылка из массива

    this.templateSelector = templateSelector; // Селектор template-элемента с шаблоном карточки

    this._handleCardClick = handleCardClick; //функция
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

      .querySelector(this.templateSelector)

      .content.querySelector(".card")

      .cloneNode(true);

    return cardElement;
  }

  //новая карточка

  render() {
    this._element = this._getTemplate(); //структура карточки

    this._image = this._element.querySelector(".card__image"); //находим изображение

    this._likeButton = this._element.querySelector(".card__icon"); //нахожим иконку лайк и присваиваем

    this._image.src = this.link; //ссылка массива и присваиваем

    this._image.alt = this.name; //имя из масиива и присваиваем

    this._element.querySelector(".card__title").textContent = this.name; //находим заголовок  и присваиваем

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
      this._handleCardClick(this);
    });
  }
}

//экспорт модуля Card

export { Card };
