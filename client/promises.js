function a(falhar) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      if (falhar) {

        reject('PROMISE A FALHOU');
      } else {

        console.log('PROMISE A RESOLVIDA');
        resolve('DADO A');
      }

    }, 2000);
  });
}

function b(falhar) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      if (falhar) {

        reject('PROMISE B FALHOU');
      } else {

        console.log('PROMISE B RESOLVIDA')
        resolve('DADO B');
      }

    }, 1000);
  });
}

function c(falhar) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {

      if (falhar) {

        reject('PROMISE C FALHOU');
      } else {

        console.log('PROMISE C RESOLVIDA')
        resolve('DADO C');
      }

    }, 500);
  });
}

if (false) {
  a()
    .then(dado => {
      console.log(dado);
      // O RETORNO DA PROMISE B ESTARÁ DISPONÍVEL NO PRÓXIMO THEN
      return b();
    })
    .then(dado => {
      console.log(dado);

      /* FORÇANDO A REJEIÇÃO DA PROMISE. TEM QUE IR DIRETO PARA O CATCH. 
      SE NÃO TIVESSE REJEITADO, O RETORNO DE C ESTARIA DISPONÍVEL NO PRÓXIMO THEN */
      return c(true);
    })
    .then(dado => {
      console.log(dado);
    })
    .catch(erro => console.log(erro));
}

Promise
  .all([a(), b(true), c()])
  .then(arrayComResultadoDasPromises => console.log(arrayComResultadoDasPromises))
  .catch(erroDeAlgumaDasPromises => console.log('Error:', erroDeAlgumaDasPromises));