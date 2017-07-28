const produtos = [
  {
    id: 1,
    preco: 10.0,
    qtd: 2
  },
  {
    id: 2,
    preco: 10.0,
    qtd: 2
  },
  {
    id: 3,
    preco: 10.0,
    qtd: 2
  },
  {
    id: 4,
    preco: 10.0,
    qtd: 0
  }
]

const prodSubtotais = produtos.map((produto) =>{ 
    produto.subTotal = produto.qtd*produto.preco
    produto.id
    return produto
});

const somaSubtotais = prodSubtotais.reduce((anterior,atual) => {
   console.log(anterior,atual)
   return anterior + atual.subTotal
},0)
console.log(somaSubtotais)
