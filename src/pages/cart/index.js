import React, {useContext, useEffect} from 'react'
import styles from "./Cart.module.scss"
import { FaTrash } from 'react-icons/fa'
import Image from 'next/image'
import { fetchCartItems } from '@/components/context/cartContext/CartActions'
import CartContext from '@/components/context/cartContext/CartContext'
import { fetchCartItem } from '@/components/context/cartContext/CartActions'
import Head from 'next/head'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
function Cart({products}) {

const {dispatch, state} = useContext(CartContext)
// Dispatch an action with the products payload
useEffect(() => {
    dispatch(fetchCartItem(products));
  }, [dispatch, products]);

//   calculating the subtotal
let subTotal = products.reduce((acc, curr)=> acc + curr.total,0)

const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: subTotal,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      console.log("Payment successful!", details);
    });
  };

  const onError = (err) => {
    console.log("Payment failed!", err);
  };


  return (
    <PayPalScriptProvider
    options={{
        "client-id": "YOUR_CLIENT_ID",
        currency: "USD",
      }}
    >
    <div className={styles.container}>
    <Head>
        <title>Cart</title>
    </Head>

    <div className={styles.container__left}>
    {products.map((item, index)=>(

        <div className={styles.leftContainer} key={index}>
                <div className={styles.left}>
                <Image
                    src={item.img}
                    alt="img1"
                    width={100}
                    height={100}
                    className={styles.image}
                />
                </div>
                <div className={styles.right}>
                    <div className={styles.right__top}>
                                <div className={styles.top__left}>
                                <p>{new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <div className={styles.top__right}>
                                    <button><FaTrash className={styles.trash}/> DELETE</button>
                                </div>
                    </div>
                    <div className={styles.right__middle}>
                        <div className={styles.top}>
                            <h1>{item.name}</h1>
                        </div>
                        <div className={styles.middle}>
                        <table className={styles.table}>
                        <thead className={styles.quantityTableHead}>
                            <tr>
                                <th>Size:</th>
                                <th>Small</th>
                                <th>Medium</th>
                                <th>Large</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td className={styles.quantityTitle}>Quantity:</td>
                                {item.size.map((item,index)=>(
                                    <td key={index}>{item.count}</td>
                                ))}

                            </tr>
                        </tbody>
                    </table>
                        </div>

                        <div className={styles.bottom}>
                        <div className={styles.title}>
                            <h4>Extras</h4>
                        </div>
                        <ul>
                       {item.extras.map((item,index)=>(
                        <li key={index}>{item}</li>
                       ))}
                    </ul>
                        </div>
                    </div>
                    <div className={styles.right__bottom}>
                        <div className={styles.totalContainer}>
                            <h1>Total: <span>{item.total}</span></h1>
                        </div>
                    </div>
                </div>
        </div>
    ))}
    </div>
    <div className={styles.container__right}>
    <div className={styles.title}>
        Summary
    </div>
    <div className={styles.middlePart}>
        <h3>SubTotal: <span>{subTotal}</span> </h3>
        <h3>Discount: <span>0</span></h3>
        <h3>Total: <span>{subTotal}</span></h3>
    </div>
    <div className={styles.bottomPart}>
        <button>Checkout Now!</button>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
    </div>
    </div>
    </div>

    </PayPalScriptProvider>

  )
}

export default Cart

export async function getServerSideProps() {
    // Fetch the cart items from a database or API
    let cartItems = await fetchCartItems();
  
    // Check if cartItems is undefined and set it to an empty array if it is
    if (!cartItems) {
      cartItems = [];
    }
  
    // Return the serialized cart items as props
    return {
      props: {
        products: cartItems,
      },
    };
  }
  
  