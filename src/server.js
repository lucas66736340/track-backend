
require('./models/User')
require('./models/Track')
const express = require('express')
const mogoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')




//basta passar essa funcao antes do acesso a rota para authenticar o usuaruio
const requireAuth = require('./middlewares/requireAuth')


const app = express()


app.use(express.json())
app.use(authRoutes)
app.use(trackRoutes)

//connectando no mongo
const mongoUri = 'mongodb://localhost/track'
mogoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true

})


//permitindo o usuario acessar uma determinada rota da aplicacao se ele tiver um token de acesso
//essa e a rota token no insominia
app.get('/',requireAuth,(req,res)=>{
    res.send('voce pode acessar essa rota pq vc tem um jwt' + 'seu email é ' + req.user.email)
})



mogoose.connection.on('connected',()=>{
    console.log('Conenctado no mongo')
})
mogoose.connection.on('error',(erro)=>{
    console.log('Erro au se conectar no mongo' + erro)
})


app.listen(3000,()=>{
    console.log('servidor rodando na porta 3k')
})



