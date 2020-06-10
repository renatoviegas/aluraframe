class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana() {
    return this._http.get('negociacoes/semana')
      .then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana');
      });
  }

  obterNegociacoesDaSemanaAnterior() {
    return this._http.get('negociacoes/anterior')
      .then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana anterior');
      });
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this._http.get('negociacoes/retrasada')
      .then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana retrasada');
      });
  }

  adicionaNegociacao(negociacao) {

    return this._http.post('/negociacoes', negociacao)
      .then(data => true)
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível adicionar a negociação no servidor');
      });
  }
}