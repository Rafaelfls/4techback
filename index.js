// // const http = require('http')

// // http.createServer(function(req, res){
// //     res.writeHead(200, {'Content-Type': 'text/html'})
// //     res.write('Hello World')
// //     res.end()
// // }).listen(3000,function(){
// //     console.log('Server listenis on port 3000')
// // })



// // ciração de servidor usando express

// const express = require('express')

// const server = express()
// const port =3000

// // function (teste54, teste18) equivale (teste54, teste18) =>
// server.get ('/', (req, res)=>{
//     res.send('Recebido')
// })

// server.get('/users', (req, res)=>{
//     res.send('Joao, Adriano, Vitor')
// })


const server = require('./config/server')
const port =3001

server.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})