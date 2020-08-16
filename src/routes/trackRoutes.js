//rotas de track
const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const Track = mongoose.model('Track')

const router = express.Router()

//essa difinicao faz com que o usuario tenha que ter authenticacao para  acessar essas rotas
router.use(requireAuth)//sem precisar passar o midlewere em todas as rotas 


//buscar todas as tracks que o usuario fez vai listar 
router.get('/tracks', async (req,res)=>{
  
    
    const tracks = await Track.find({userId:req.user._id})

    //array com todos os caminhos do usuario
    res.send(tracks)

})


router.post('/tracks', async (req,res)=>{
    const {name,locations} = req.body

    if(!name || !locations){
        return res.status(422) .send('you must provide a name and locations')


    }
 try {
    
        const track = new Track({name,locations,userId:req.user._id})
        await track.save()
        res.send(track)
    
} catch (error) {
    res.status(422).send({error:error.message})   
}

})

module.exports = router