// pages/api/cart/update-all-active.js

// Import the Cart model and any other dependencies
import Cart from "models/Cart";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      try {
        const { error, value } = cartItemSchema.validate(req.body);
        if (error) {
          console.error(error);
          res.status(400).json({ message: "Invalid Cart Item Data!" }, error.details);
          return;
        }

        // Update all cart items where status is "active"
        const updatedCartItems = await Cart.updateMany(
          { status: "active" },
          value,
          { new: true, runValidators: true }
        );

        if (updatedCartItems.n === 0) {
          return res.status(404).json({ message: "No Cart Items Found!" });
        }
        
        res.status(200).json(updatedCartItems);

      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
      break;
      
    // Other cases here...
    
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
