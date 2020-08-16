const mongoose = require('mongoose')


const pointSchema = mongoose.Schema({

    timestamp: Number,
    coords:{
        latitude:Number,
        longitude:Number,
        altitude:Number,
        accuracy:Number,
        speed:Number,
    }

})

const trackSchema = mongoose.Schema({

    userId:{
        //esse user id é uma referencia ao id do obejeto usuario
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type:String,
        default:''
    },
    locations: [pointSchema]

})

mongoose.model('Track',trackSchema)
