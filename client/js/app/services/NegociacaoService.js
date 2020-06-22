export class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoes() {
    return this._http.get('negociacoes')
      .then(negociacoes => negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)))
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações');++++
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

  cadastra(negociacao) {
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.adiciona(negociacao))
      .then(() => 'Negociação adicionada com sucesso!')
      .catch(() => {
        throw new Error('Não foi possível adicionar a negociação!')
      });
  }

  lista() {
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listaTodos())
      .catch(() => {
        throw new Error('Não foi possível adicionar a negociação!')
      });
  }

  apaga() {
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.apagaTodos())
      .then(mensagem => 'Negociações apagadas com sucesso!')
      .catch(erro => {
        throw new Error('Não foi possível apagar as negociações!')
      });
  }

  importa(listaAtual) {
    return this.obterNegociacoes()
      .then(negociacoes =>
        negociacoes.filter(negociacao =>
          !listaAtual.some(negociacaoExistente => negociacao.isEquals(negociacaoExistente))))
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível importar as negociações!')
      });
  }

}