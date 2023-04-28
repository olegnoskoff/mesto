export default class Section {
  constructor(obj, selector) {
    this._items = obj.items;

    this._renderer = obj.renderer;

    this._container = document.querySelector(selector); //определяем место на странице, ищем элемент в DOM дереве
  }

  //итерируется по каждому элементу в массиве

  renderItems() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }

  //создает HTML элемент, соответствующий переданному элементу массива

  addItem(item) {
    this._container.prepend(this._renderer(item)); //добавляем созданный элемент в начало
  }
}
