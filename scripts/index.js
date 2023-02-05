let openForm = document.querySelector("#popup-edit");
let buttonOpen = document.querySelector(".profile__edit-button");
let buttonClose = document.querySelector(".popup__button-close");
let formElement = document.querySelector(".popup-profile__form");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_about");
let name = nameInput.value;
let job = jobInput.value;
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

function open() {
  openForm.classList.add("popup__opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}

function close() {
  openForm.classList.remove("popup__opened");
}
buttonOpen.addEventListener("click", open);
buttonClose.addEventListener("click", close);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  close();
}

formElement.addEventListener("submit", handleFormSubmit);
