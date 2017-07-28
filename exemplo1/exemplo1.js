console.log('fllstack academy')

//String
const name = 'Sandro Oliveira'

//object (json)
const person = {
    firstName:'Sandro',
    lastName:'Oliveira'
}
person.firstName = "San"

//Integer
let count = 0;
count ++
console.log(count)

let vetor = [1,2,3];
vetor.push(1);

console.log(vetor);


if(count === 1){
    console.log('Count eh igual a 1')
}

while(count < 2){
    count ++;
}

for(let i=1;i<10;i++){
    console.log(i);
}
console.log("==========================================")
//Functional
const latir = function(){
    console.log('Auuuuuuuu!')
}

const miau = function(){
    console.log('miauuuu!')
}

//High order function
const gerarSom = function(qtd,tipo){
    for(let i = 0;i<qtd;i++){
        tipo()
    }
}

gerarSom(2,miau);

const itens = [1,2,3,4]

//Pure function
const dobro = (valor) => valor * 2;

console.log(dobro(1)) // 2
console.log(dobro(2)) // 4


const itens2 = itens.map(dobro);
console.log(itens2)

const somentePares = value => value%2===0
console.log(itens.filter(somentePares))

