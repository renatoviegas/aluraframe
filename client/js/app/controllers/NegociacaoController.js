class NegociacaoController {
  constructor() {
    this._service = new NegociacaoService();

    const $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._negociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');
    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
  }

  adiciona(event) {
    event.preventDefault();
    const negociacao = this._criaNegociacao();
    this._negociacoes.adiciona(negociacao);
    this._service.adicionaNegociacao(negociacao, erro => {
      if (erro) {
        this._mensagem.texto = erro;
        return;
      };

      this._mensagem.texto = 'Negociação adicionada com sucesso!';
      this._limpaFormulario();
    });
  }

  apaga() {
    this._negociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso!';
    this._limpaFormulario();
  }

  importaNegociacoes() {
    this._service.obterNegociacoesDaSemana((erro, negociacoes) => {
      if (erro) {
        this._mensagem.texto = erro;
        return;
      }

      negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações importadas com sucesso!';
    });

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

