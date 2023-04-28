export default class UserInfo {
  constructor({nameElement, jobElement: aboutElement, avatarElement}) {
    this._nameElement = nameElement;
    this._aboutElement = aboutElement;
    this._avatarElement = avatarElement;
  }

  //Сохраняем полученную информацию о пользователе
  fill({name, about, avatar, cohort, _id}) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._cohort = cohort;
    this.id = _id;
  }

  //Возвращаем имя и инфу
  getUserInfo() {
    return {
      name: this._name,
      about: this._about
    }
  }

  //Имя пользователя
  renderName() {
    this._nameElement.textContent = this._name;
  }

  //О пользователе
  renderAbout() {
    this._aboutElement.textContent = this._about;
  }

  //Аватар пользователя
  renderAvatar() {
    this._avatarElement.src = this._avatar;
  }
}