export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatar) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatar);
  }

  //метод которым возвращаем объект с двумя свойствами
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatar.src
    };
    
  }

  //устанавливаем текстовое содержимое в соответствии с переданными аргументами
  setUserInfo(name, about, avatar) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatar.src = avatar;
  } 
}