import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    customer:{
        type:String,
        required:true,
        maxLength:60
    },
    address:{
        type:String,
        required:true,
        maxLength:200,
    },
    total:{
        type:Number,
        required:true,
    },
    status:{
        type:Number,
        required:true,
        default:0

    },
    paymentMethod:{
        type:Number,
        required:true
    },

},
{timestamps:true}
)

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

module.exports = Order;