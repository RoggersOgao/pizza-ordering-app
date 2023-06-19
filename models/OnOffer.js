import mongoose from 'mongoose'

const OnOfferSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:60
    },
    description:{
        type:String,
        required:true,
        maxLength:200,
    },
    includes:{
        type:[String],
        required:true
    },
    price:{
        type:[Number], //type number for the array
        required:true
    },
    img:{
        type:String,
        required:true,
    },
    alt:{
        type:String,
        required:true,
    },
},{timestamps:true})

const OnOffer = mongoose.models.OnOffer || mongoose.model("OnOffer", OnOfferSchema)

module.exports = OnOffer
