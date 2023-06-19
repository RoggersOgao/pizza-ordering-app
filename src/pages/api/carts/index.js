import dbConnect from "lib/dbConnect";
import Cart from "models/Cart";
import Joi from 'joi'


// validating the input of the cart file
const cartItemSchema = Joi.object({
    name: Joi.string().max(60).required(),
    img:Joi.string().max(70).required(),
    size: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        count: Joi.number().required()
      })
    ),
    extras: Joi.array().items(Joi.string()),
    total: Joi.number().required(),

});

export default async function handler(req, res){
    await dbConxnect()

    const {method, query:{id, userId}} = req;

    switch(method){
        case 'GET':
            if(id){
                try{
                    const cartItem = await Cart.findById(id);
                    if(!cartItem){
                        return res.status(404).json({message: "Cart Item Not Found"})
                    }
                    res.status(200).json(cartItem)
                }catch(err){
                    console.error(err);
                    res.status(500).json({message: "Internal Server Error"})
                }
            }else if(userId){
                try{
                    const cartItem = await Cart.findOne({userId: userId})
                    if(!cartItem){
                        return res.status(404).json({message: "Cart Item Not Found"})
                    }
                    res.status(200).json(cartItem)

                }catch(err){
                    console.error(err)
                    res.status(500).json({message:"Internal Server Error"})
                }
            }else{
                try{
                    const cartItems = await Cart.find();
                    res.status(200).json(cartItems)
                }catch(err){
                    console.error(err)
                    res.status(500).json({message: "Internal Server Error"})
                }
            }
            break;
        case 'POST':
            try{
                const { error, value} = cartItemSchema.validate(req.body);
                if(error){
                    console.error(error);
                    res.status(400).json({message:"Invalid Cart Item Data!", details: error.details})
                }

                // checking if the same cart item already exists
                const existingCartItem = await Cart.findOne({name: value.name});

                if(existingCartItem){
                    return res.status(409).json({message:`Pizza is already added to cart!`})
                }

                const cartItem = new Cart(value);
                const savedCartItem = await cartItem.save();
                res.status(201).json(savedCartItem);
            }catch(err){
                console.error(err);
                res.status(500).json({message:"Internal Server Error"})
            }
            break;
        case 'PUT':
        try{
            const { error, value} = cartItemSchema.validate(req.body);
            if(error){
                console.error(error);
                res.status(400).json({message:"Invalid Cart Item Data!"}, error.details)
            }
            const cartItem = await Cart.findByIdAndUpdate(id, value,{new: true, runValidator:true})

            if(!cartItem){
                return res.status(404).json({message: "Cart Item Not Found!"})
            }
            res.status(200).json(cartItem);

        }catch(err){
            console.error(err);
            res.status(500).json({message:"Internal Server Error"})
        }
        break;
        

        case 'DELETE':
            try{
                const cartItem = await Cart.findOneAndDelete({ _id: id });
                if(!cartItem){
                    return res.status(404).json({message: 'Cart Item Not Found!'})
                }
                res.status(200).json({message: 'Cart Item Deleted Successfully'})
            }catch(err){
                console.error(err);
                res.status(500).json({message:"Internal Server Error!"})
            }
        break;

    default:
        res.setHeader('Allow',['GET','POST','PUT','DELETE'])
        res.status(405).json({message:`Method ${method} not allowed`})
    }
}
