import dbConnect from "lib/dbConnect";
import Product from "models/Product";
import Joi from 'joi';

// validating the input of the products side
const productSchema = Joi.object({
   name: Joi.string().max(60).required(),
   description: Joi.string().max(200).required(),
   includes: Joi.array().items(Joi.string()).required(),
   price: Joi.array().items(Joi.number()).required(),
   img: Joi.string().required(),
   alt: Joi.string().max(100),
});

export default async function handler(req, res) {
  await dbConnect();

  const { method, query: { id, name } } = req;

  try {
    switch (method) {
      case 'GET': {
        let product;
        if (id) {
          product = await Product.findById(id);
        } else if (name) {
          product = await Product.findOne({ name });
        } else {
          const products = await Product.find();
          return res.status(200).json(products);
        }

        if (!product) {
          return res.status(404).json({ message: "Product Not Found" });
        }
        return res.status(200).json(product);
      }

      case 'POST': {
        const { error, value } = productSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: "Invalid Product Data!", details: error.details });
        }

        const existingProduct = await Product.findOne({ name: value.name });
        if (existingProduct) {
          return res.status(409).json({ message: "A similar product exists!" });
        }

        const product = new Product(value);
        const savedProduct = await product.save();
        return res.status(201).json(savedProduct);
      }

      case 'PUT': {
        const { error, value } = productSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ message: "Invalid Product Data!", details: error.details });
        }

        const product = await Product.findByIdAndUpdate(id, value, { new: true, runValidator: true });
        if (!product) {
          return res.status(404).json({ message: "Product Not Found!" });
        }

        return res.status(200).json(product);
      }

      case 'DELETE': {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
          return res.status(404).json({ message: "Product Not Found!" });
        }

        return res.status(200).json({ message: "Product Deleted Successfully" });
      }

      default: {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${method} not allowed` });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
