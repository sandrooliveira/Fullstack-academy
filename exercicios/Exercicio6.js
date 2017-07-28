const express = require('express')
const app = express()

const port = 3000

app.get('/',(request,response) => {
   const num1 = parseInt(request.query.num1)
   const num2 = parseInt(request.query.num2)
   const soma = num1 + num2;
   response.send(soma.toString()) 
})
app.listen(port,() => console.log('Server running on ' + port))