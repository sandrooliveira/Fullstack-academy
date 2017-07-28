const fs = require('fs')

function readdirPromise(path){
    return new Promise((resolve,reject) => {
        fs.readdir(path,(err,dirContent) =>{
            err ? reject(err) : resolve(dirContent)
        })
    })
}

function stat(file){
    return new Promise((resolve,reject) => {
        fs.stat(file, (err,stat) => {
            err ? reject(err) : resolve({file,stat})
        })
    })
}

async function listarArquivos(path){
    try{
        const all = await readdirPromise(path)
        const promises = all.map(async (file) => await stat(file))
        const retorno = await Promise.all(promises)
        const files = retorno.filter((file) => file.stat.isFile())
        files.map((file) => console.log(file.file))
        
    }catch(e){
        console.log(e)
    }
}
listarArquivos('./');