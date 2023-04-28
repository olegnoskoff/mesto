export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameElement = document.querySelector(nameSelector);

    this._aboutElement = document.querySelector(aboutSelector);
  }

  //возвращаем объект с двумя свойствами

  getUserInfo() {
    return {
      name: this._nameElement.textContent,

      about: this._aboutElement.textContent,
    };
  }

  //устанавливаем текстовое содержимое в соответствии с переданными аргументами

  setUserInfo(name, about) {
    this._nameElement.textContent = name;

    this._aboutElement.textContent = about;
  }
}
