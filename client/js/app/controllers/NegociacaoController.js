class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
  }

  adiciona(event) {
    event.preventDefault();

    const data = new Date(...this._inputData.value.split('-').map((item, index) => item - index % 2));

    console.log(data);

    const negocicacao = new Negociacao(
      data,
      this._inputQuantidade.value,
      this._inputValor.value);
  }
}