class ListaNegociacoes {

  constructor(trigger) {
    this._negociacoes = [];
    this._trigger = trigger;
  }

  _refresh() {
    this._trigger(this);
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
    this._refresh();
  }
  
  get negociacoes() {
    return [].concat(this._negociacoes);
  }
  
  esvazia() {
    this._negociacoes = [];
    this._refresh();
  }
}