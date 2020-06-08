class View {

  constructor(element) {
    this._element = element;
  }

  template(model) {
    throw new Error('Este método deve ser implementado!');
  }

  update(model) {
    this._element.innerHTML = this.template(model);
  }
}