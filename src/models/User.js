const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userScema = new mongoose.Schema({

    email:{
        type:String,
        unique:true,
        required:true,
    },

    password:{
        type:String,
        required:true
    }

})


//funcao que vai ser executada antes que eu salve um usuario no banco de dados
//vamos deixar a senha hash 
userScema.pre('save',function(next){
  const user = this
  if(!user.isModified('password')){
    return next()
  }

  bcrypt.genSalt(10,(err,salt)=>{
    if(err){
        return next(err)
    }

    bcrypt.hash(user.password,salt,(err,hash)=>{
        if(err){
            return next(err)
        }
        user.password = hash
        next()
    })

  })
})

userScema.methods.comparePassWord = function(candidatePassword){
  const user = this
  return new Promise((resolve,reject)=>{
    bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
      if(err){
        reject(err)
      }
      if(!isMatch){
        return reject(false)
      }

      resolve(true)
    })

  })
}

mongoose.model('User' ,userScema)