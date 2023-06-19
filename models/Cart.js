import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:60
    },
    img:{
        type:String,
        required:true,
    },
    size:{
        type:[
            {
                name:{
                    type:String,
                    required:true
                },
                count:{
                    type:Number,
                    required:true
                }
            }
        ]
    },
    extras:{
        type:[String]
    },
    total:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['active', 'inactive'],
        default:'active'
    }
}, {timestamps:true} )

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema)

module.exports = Cart