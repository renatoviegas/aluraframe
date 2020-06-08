class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._negociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');
    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
  }

  adiciona(event) {
    event.preventDefault();
    this._negociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso!';
    this._limpaFormulario();
  }

  apaga() {
    this._negociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso!';
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