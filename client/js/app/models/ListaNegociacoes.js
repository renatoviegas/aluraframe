class ListaNegociacoes {

  constructor(context, trigger) {
    this._negociacoes = [];
    this._context = context;
    this._trigger = trigger;
  }

  _refreshView() {
    Reflect.apply(this._trigger, this._context, [this]);
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
    this._refreshView();
  }
  
  get negociacoes() {
    return [].concat(this._negociacoes);
  }
  
  esvazia() {
    this._negociacoes = [];
    this._refreshView();
  }
}