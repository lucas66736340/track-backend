// tudo sobre  a autenticacao fica nesse arquivo
const express = require('express')

//para ter acesso ao model do usuario dentro da minha rota de authenticacao
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const User = mongoose.model('User')

//collections é como se fosse uma tabela

const router = express.Router()

//rota de cadastro do usuario
router.post('/signup',async (req,res)=>{
    
    try{

        const {email,password} = req.body

        if(!email || !password ){
          throw {errorMessage:'O campo email e senha são obrigatorios'}
        }

        const emailExiste = await User.findOne({email})  
       
        if(!emailExiste){

          const user = new User({email,password})
          await user.save()
          const token = jwt.sign({userId:user._id},'MY_SECRET_KEY')
  
         return res.send({token})
        }else{
          throw {errorMessage:'Esse email ja ésta em uso'}
        }

    }catch(error){
        //retornando uma mensagem de erro para quem fez a requisicao 
        // com um erro de status
      return res.json({error:error.errorMessage})
    }
})

//rota de authenticacao do usuario 
router.post('/signin',async (req,res)=>{
   
  try{
        const {email,password} = req.body

        if(!email || !password){
          throw {errorMessage:'O campo email e senha são obrigatorios',status:422}
        }
        const user =  await User.findOne({email})
        if(!user){
          throw {errorMessage:'Email ou senha envalidos',status}
      }
        await user.comparePassWord(password)
        const token = jwt.sign({userId:user._id},'MY_SECRET_KEY')
        return  res.send({token})

  }catch(err){
    return res.json({error:err.errorMessage,status:err.status})
    
  }

})


module.exports = router



