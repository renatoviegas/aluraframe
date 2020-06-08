const Negociacao = require('./app/models/Negociacao');

const n1 = new Negociacao(new Date(), 25, 200);

console.log(n1);
console.log('volume', n1.volume);