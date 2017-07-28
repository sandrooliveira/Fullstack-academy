const fs = require('fs')

function readdirPromise(path){
    return new Promise((resolve,reject) => {
        fs.readdir(path,(err,dirContent) =>{
            err ? reject(err) : resolve(dirContent)
        })
    })
}

async function listDir(path){
    const dirContent = await readdirPromise(path)
    console.log(dirContent)
}
listDir('./');