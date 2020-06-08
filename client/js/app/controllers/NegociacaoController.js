class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    
    this._negociacoes = new ListaNegociacoes();
    this._negociacoesView = new NegociacoesView($('#negociacoesView'));
    this._negociacoesView.update(this._negociacoes);

    this._mensagem = new Mensagem();
    this._mensagemView = new MensagemView($('#mensagemView'));
    this._mensagemView.update(this._mensagem);
  }

  adiciona(event) {
    event.preventDefault();
    this._negociacoes.adiciona(this._criaNegociacao());
    this._negociacoesView.update(this._negociacoes);

    this._mensagem.texto = 'Negociação adicionada com sucesso!';
    this._mensagemView.update(this._mensagem);
    this._limpaFormulario();
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.stringToDate(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value);
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;   

    this._inputData.focus();
  }
}