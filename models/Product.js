const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
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

},
{timestamps:true}
)

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

module.exports = Product;