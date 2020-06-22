class NegociacaoController {
  constructor() {
    this._service = new NegociacaoService();

    const $ = document.querySelector.bind(document);

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._negociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
    this._ordemAtual = '';

    this._init();
  }

  _init() {
    this._service
      .lista()
      .then(negociacoes => negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao)))
      .catch(erro => this._showError(erro));

    setInterval(() => this._importaNegociacoes(), 60000);
  }

  _showError(error) {
    console.log(error);
    this._mensagem.texto = error;
  }

  adiciona(event) {
    event.preventDefault();

    const negociacao = this._criaNegociacao();

    this._service
      .cadastra(negociacao)
      .then(mensagem => {
        this._negociacoes.adiciona(negociacao);
        this._mensagem.texto = mensagem;
        this._limpaFormulario();
      })
      .catch(erro => this._showError(erro));
  }

  apaga() {
    this._service
      .apaga()
      .then(mensagem => {
        this._mensagem.texto = mensagem;
        this._negociacoes.esvazia();
      })
      .catch(erro => this._showError(erro));
  }

  _importaNegociacoes() {
    this._service
      .importa(this._negociacoes.negociacoes)
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações importadas com sucesso!';
      })
      .catch(erro => this._showError(erro));
  }

  ordena(coluna) {
    if (this._ordemAtual === coluna) {
      this._negociacoes.inverteOrdem();
    } else {
      this._negociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }

    this._ordemAtual = coluna;
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.stringToDate(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value));
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }

}

