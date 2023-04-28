// export default class Api {
//   constructor(options) {
//     this._baseUrl = options.baseUrl;
//     this._headers = options.headers;
//   }

//   _parseResponse(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   }

//   // Получение карточек с сервера
//   async getInitialCards() {
//     const res = await fetch(`${this._baseUrl}/cards`, {
//       headers: this._headers,
//     });
//     return this._parseResponse(res);
//   }

//   // Добавление новой карточки через попап
//   async addCard(data) {
//     const res = await fetch(`${this._baseUrl}/cards`, {
//       method: "POST",
//       headers: this._headers,
//       body: JSON.stringify({
//         name: item.name,
//         link: item.link,
//       }),
//     });
//     return this._parseResponse(res);
//   }

//   // Удаление карточки
//   async deleteCard(cardId) {
//     const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
//       method: "DELETE",
//       headers: this._headers,
//     });
//     return this._parseResponse(res);
//   }

//   // Ставим лайк карточке
//   async setLike(cardId) {
//     const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: "PUT",
//       headers: this._headers,
//     });
//     return this._parseResponse(res);
//   }

//   // Удаляем лайк
//   async deleteLike(cardId) {
//     const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: "DELETE",
//       headers: this._headers,
//     });
//     return this._parseResponse(res);
//   }

//   // Получение информации о пользователе с сервера
//   async getUserInfo() {
//     const res = await fetch(`${this._baseUrl}/users/me`, {
//       headers: this._headers,
//     });
//     return this._parseResponse(res);
//   }

//   // Редактирование информации о пользователе через попап
//   async editUserInfo(data) {
//     const res = await fetch(`${this._baseUrl}/users/me`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({
//         name: nameElement,
//         about: aboutElement,
//       }),
//     });
//     return this._parseResponse(res);
//   }

//   // Редактирование аватара пользователя через попап
//   async editAvatar(data) {
//     const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({
//         avatar: avatar,
//       }),
//     });
//     return this._parseResponse(res);
//   }
// }
