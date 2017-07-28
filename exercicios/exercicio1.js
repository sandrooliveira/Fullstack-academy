const produtos = [
  {
    nome: 'Bicicleta',
    preco: 1200.0
  },
  {
    nome: 'Capacete',
    preco: 450.0
  }
]

const somaValores = produtos.reduce((anterior,atual) => anterior.preco + atual.preco);
console.log(somaValores);