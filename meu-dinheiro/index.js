const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

const MongoClient = require('mongodb').MongoClient
const mongoUri = 'mongodb://admin:admin1@meu-dinheiro-shard-00-00-mrafo.mongodb.net:27017,meu-dinheiro-shard-00-01-mrafo.mongodb.net:27017,meu-dinheiro-shard-00-02-mrafo.mongodb.net:27017/meu-dinheiro-live?ssl=true&replicaSet=meu-dinheiro-shard-0&authSource=admin'

app.use(express.static('public'))

const path = require('path')

//Onde estão os templates
app.set('views', path.join(__dirname, 'views'))
//Tipo de Template
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const image = 'images/meu-dinheiro.png'

    res.render('home')
})

const calculoJuros = (p, i, n) => p * Math.pow(1 + i, n)

const calcEvolution = (p,i,n) => {
    const months = Array.from(new Array(n), (n,i) => i + 1)
    return months.map((month) => {
        return {
            month:month,
            value:calculoJuros(p,i,month)
        }
    })   
}

app.get('/calculadora', (req, res) => {
    const resultado = {
        calculado: false
    }
    if (req.query.valorInicial && req.query.taxa && req.query.tempo) {
        
        const valorInicial = parseFloat(req.query.valorInicial)
        const taxa = parseFloat(req.query.taxa) / 100
        const tempo = parseInt(req.query.tempo)

        resultado.calculado = true
        resultado.total = calculoJuros(valorInicial,taxa,tempo)
        resultado.evolution = calcEvolution(valorInicial,taxa,tempo)
    }
    res.render('calculadora', { resultado })
})


const findAll = (db, collectionName) => {
    const collection = db.collection(collectionName)
    const cursor = collection.find({})
    const documents = []
    return new Promise((resolve, reject) => {
        cursor.forEach(
            (doc) => documents.push(doc),
            () => resolve(documents)
        )
    })
}

const insert = (db, collectionName, document) => {
    const collection = db.collection(collectionName)
    return new Promise((resolve, reject) => {
        collection.insert(document, (err, doc) => {
            if(err){
                reject(err)
            }else{
                resolve(doc)
            }
        })
    })
}

const calcExtrato = (operacoes) => {
    const opsWithSubTotal = []
    const total = operacoes.reduce((prev,curr) => {
        const valor = parseFloat(curr.valor)
        opsWithSubTotal.push({
            description:curr.descricao,
            value:valor,
            subTotal:prev + valor
        })
        return prev +  valor;
    },0)

    return {
        total:total,
        operacoes:opsWithSubTotal
    }
}

const filterOps = (operacoes,tipo) => {
    return tipo === 'entradas' ? operacoes.filter((op) => op.valor >= 0) : operacoes.filter((op) => op.valor < 0)
}

app.get('/operacoes', async (req, res) => {
    const operacoes = await findAll(app.db, 'operacoes')
    let extrato = null
    if(req.query.tipo){ 
        const filteredOps = filterOps(operacoes,req.query.tipo)
        extrato = calcExtrato(filteredOps)
    }else{
        extrato = calcExtrato(operacoes)
    }
    res.render('operacoes', { extrato })
})

app.get('/nova-operacao', (req, res) => res.render('nova-operacao'))
app.post('/nova-operacao', async (req, res) => {
    const operacao = {
        descricao: req.body.descricao,
        valor: parseFloat(req.body.valor)
    }
    const newOperacao = await insert(app.db,'operacoes',operacao)
    res.redirect('/operacoes')
})

MongoClient.connect(mongoUri, (err, db) => {
    if (err) {
        return
    } else {
        app.db = db
        app.listen(port, () => { console.log('Server Running...') })
    }

})

