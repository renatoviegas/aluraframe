class NegociacaoService {


  obterNegociacoesDaSemana(cb) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'negociacoes/semana');

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          cb(null, JSON.parse(xhr.responseText).map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
        } else {
          console.log(xhr.responseText);
          cb('Não foi possível obter as negociações do servidor');
        }
      }
    };

    xhr.send();
  }

  adicionaNegociacao(negociacao, cb) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/negociacoes', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          cb(null);
        } else {
          cb('Não foi possível adicionar a negociação no servidor');
        }
      }
    };

    xhr.send(JSON.stringify(negociacao));
  }
}