export default class Card {
  constructor({ name, link, likes, owner, createdAt: created, _id }, templateSelector, handleCardClick, handleDeleteCard, handleLikeCard, userId) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._created = created;
    this._id = _id;
    this._userId = userId;
    this._isLiked = this._checkIsLiked();

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

    //Шаблон создаваемой карточки из разметки
  _getTemplate() {
    const cardTemple = document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(true);
    return cardTemple;
  }

    //Создаем заполненную по данным карточку
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");

    //Заполнение содержимого карточки
    const img = this._element.querySelector(".card__image");
    img.src = this._link;
    img.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    this.setLikes();
    if (this._owner._id !== this._userId) {
      this._element.querySelector(".card__delete-button").remove();
    }

    //Нажатие на карточку
    this._setEventlisteners();

    return this._element;
  }

  //Устанавливаем слушатели событий на элементы карточки
  _setEventlisteners() {
    //Лайк 
    this._element.querySelector(".card__like-button")
      .addEventListener("click", () => this._likeCard());
    //Картинка
    this._element.querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._link, this._name)
      );
    //Удаляем карточку, при наличии
    if (this._element.querySelector(".card__delete-button")) {
      this._element.querySelector(".card__delete-button")
        .addEventListener("click", () => this._handleDelete());
    }
  }

    //Обрабатываем лайк карточки
  _likeCard() {
    this._handleLikeCard(this._id, this._isLiked);
  }

    //Блокируем лайк
  blockLikeBtn() {
    this._likeButton.disabled = true;
  }

    //Разблокирует лайк
  unblockLikeBtn() {
    this._likeButton.disabled = false;
  }

    //Обрабатываем нажатие на удаление карточки
  _handleDelete() {
    this._handleDeleteCard(this._id);
  }

    //Определяем, есть ли лайк пользователя на карточке
  _checkIsLiked() {
    return this._likes.some((person) => person._id === this._userId);
  }

    //Обрабатываем массив лайков карточки
  setLikes(likes) {
    const likeCount = this._element.querySelector(".card__like-count");
    const likeBtn = this._element.querySelector(".card__like-button");

    if (likes) {
      this._likes = likes;
      this._isLiked = this._checkIsLiked();
    }

    likeCount.textContent = this._likes.length;

    if (this._isLiked) {
      likeBtn.classList.add("card__like-button_active");
    } else {
      likeBtn.classList.remove("card__like-button_active");
    }
  }

    //Удаляем карточку
  delete() {
    this._element.remove();
    this._element = null;
  }
}
