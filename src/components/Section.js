export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Создаеv и добавляеv элементы
  renderItems(items) {
    items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  //Добвляем элемент на страницу
  addItem(item, isInversed = false) {
    isInversed ? this.container.prepend(item) : this.container.append(item);
  }
}
