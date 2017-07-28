const fs = require('fs')

/*const path = './'
fs.readdir(path, (err, files) => {
  if(err){
    console.log('ocorreu um erro.')
  }else{
    console.log(files)
  }
})*/

function readdirPromise(path){
    return new Promise((resolve,reject) => {
        fs.readdir(path,(err,files) =>{
            err ? reject(err) : resolve(files)
        })
    })
}
readdirPromise('./').then((files)=> console.log(files))