const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

//aqui garente que o usuario vai ter que ter authnticacao
//essa funcao vai fazer vai pegar a requisicao  e fazer um pre processamento
//um medleware 

module.exports =  function(req,res,next){
    //recebendo o token  no cabeçalho da requisicao
   
    const {authorization} = req.headers 
    
    //caso ele nao tenha o token para acessar a rota
    if(authorization === null){
        return res.status(401).send({error:'You most be logged in'})
    }

    const token = authorization.replace('Bearer','').trim()
    

    jwt.verify(token,'MY_SECRET_KEY',async (err,payload)=>{
        if(err){
            return res.status(401).send({error:'You must be loging'})
        }

        //payload carrega a informacao do usuario que no caso é o userId do banco
        const {userId} = payload

        // pegando o usuario que entrou no banco
        const user = await User.findById(userId)
        req.user = user
        next()

    })
}