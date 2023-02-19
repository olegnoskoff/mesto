const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const closeButtons = document.querySelectorAll(".popup__button-close");

const cardPopup = document.querySelector("#imageCard");
const cardPopupCity = cardPopup.querySelector("#nameImg");
const cardPopupImg = cardPopup.querySelector(".popupimage__image");

const cardTemplate = document.querySelector("#template").content.querySelector(".card");
const cardsContainer = document.querySelector(".elements");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const profilePopup = document.querySelector("#popup-edit");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profilePopupForm = profilePopup.querySelector(".popup__form");
const profileNameInput = profilePopupForm.querySelector(".popup__input_type_name");
const profileAboutInput = profilePopupForm.querySelector(".popup__input_type_about");

const cardAddBtn = document.querySelector(".profile__add-button");

const cardAddPopup = document.querySelector("#popup-add");
const cardAddPopupForm = cardAddPopup.querySelector(".popup__form");
const cityInput = cardAddPopup.querySelector(".popup__input_type_city");
const linkInput = cardAddPopup.querySelector(".popup__input_type_link");

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closeButtons.forEach((button) => {
  button.addEventListener('click', () => closePopup(button.closest(".popup")));
});

function profileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
  evt.target.reset();
  closePopup(profilePopup);
}

profileEditBtn.addEventListener("click", () => openPopup(profilePopup));
profilePopupForm.addEventListener("submit", profileEdit);

function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".card__image").src = item.link;
  card.querySelector(".card__image").alt = item.name;
  card.querySelector(".card__title").textContent = item.name;
  const like = card.querySelector(".card__icon");
  like.addEventListener("click", () =>
    like.classList.toggle("card__icon_active"));
  card.querySelector(".card__delete").addEventListener("click", () =>
    card.remove());
  card.querySelector(".card__image").addEventListener("click", () =>
  {
    openPopup(cardPopup);
    const city = target
      .closest(".card")
      .querySelector(".card__title").innerText;
    cardPopupCity.innerText = city;
    cardPopupImg.alt = city;
    cardPopupImg.src = target.src;
  });
  return(card);
}

initialCards.forEach((item) => cardsContainer.append(createCard(item)));

cardAddPopupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      cardsContainer.prepend(
          createCard({name: cityInput.value, link: linkInput.value }, true));
      evt.target.reset();
      closePopup(cardAddPopup);
    }
);

cardAddBtn.addEventListener("click", () => openPopup(cardAddPopup));