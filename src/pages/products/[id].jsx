import React, {useContext, useState} from "react";
import styles from "./Products.module.scss";
import Image from "next/image";
import { GiFullPizza } from "react-icons/gi";
import { fetchSingleProduct } from "@/components/context/productContext/ProductActions";
import { AddCartItem } from "@/components/context/cartContext/CartActions";
import CartContext from "@/components/context/cartContext/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const checkboxPrices = {
  extraCheese: 250,
  extraSpicy:150,
  spicySauce:100,
  garlic:50
}

function Products({singlePizza}) {

  const { dispatch } = useContext(CartContext);

  const [checkboxValues, setCheckboxValues] = useState({})
  const [form, setForm] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)

  const extrasTotalPrice = Object.keys(checkboxValues).reduce(
    (acc, key) =>
      checkboxValues[key] ? acc + checkboxPrices[key] : acc,
    0
  );

  
  const setField = (field, value)=>{
    setForm({
      ...form,
      [field]:value,
    })
  }


  const [sizes, setSizes] = useState({
    0: 0,
    1: 0,
    2: 0
  })
  

  const handleSizeChange = (sizeIndex, value) => {
    const numberOfPizzas = +value;
    setSizes((prevSizes) => ({ ...prevSizes, [sizeIndex]: numberOfPizzas }));
    const newTotal = Object.values({ ...sizes, [sizeIndex]: numberOfPizzas }).reduce(
      (acc, curr, i) => {
        const sizeTotal = singlePizza.price[i] * curr;
        return acc + sizeTotal;
      },
      0
    );
    setTotalPrice(newTotal);
  };

  let finalTotal = totalPrice + extrasTotalPrice;
  

// declare the notify var

const handleSubmit = async (e) => {
  e.preventDefault();

  // destructure the object checkboxes
  const { extraCheese, extraSpicy, spicySauce, garlic} = checkboxValues
  const { small, medium, large } = form;


  // prepare the data to be sent to server

  const data = {
    name: singlePizza.name,
    img: singlePizza.img,
    size:[
      { name: 'small', count: +small || 0 },
      { name: 'medium', count: +medium || 0 },
      { name: 'large', count: +large || 0 }
    ],
    extras: Object.keys(checkboxValues).filter((key) => checkboxValues[key] == true),
    total: finalTotal
  }


  const response = await AddCartItem(dispatch, data)
  

}
 
  return (
    <div className={styles.products}>
      
        <div className={styles.container}>
          <div className={styles.productsLeft}>
            <Image
              src={singlePizza.img}
              alt={singlePizza.alt}
              width={500}
              height={380}
              className={styles.img}
            />
          </div>
          <form className={styles.productsRight} onSubmit={handleSubmit}>
            <div className={styles.title}>{singlePizza.name}</div>
            <div className={styles.description}>
              <div className={styles.descriptionTitle}>
                <h4>Brief Description</h4>
              </div>
              <div className={styles.text}>
                <p>{singlePizza.description}</p>
              </div>
            </div>

            <div className={styles.includes}>
              <div className={styles.includesTitle}>
                <h4>Ingredients</h4>
              </div>
              <div className={styles.list}>
                {singlePizza.includes.map((item, index) => (
                  <div className={styles.includesList} key={index}>
                    <ul>
                      <li>{item}</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.pizzaSize}>
            <div className={styles.pizzaSizeTitle}>
                <h4>Sizes</h4>
              </div>
              <div className={styles.form}>
                <div className={styles.small}>
                <div className={styles.smallPizzaContainer}>
                  <i>
                    <GiFullPizza />
                  </i>
                  <span className={styles.price}>ksh {singlePizza.price[0]}</span>
                  <span className={styles.size}>small</span>
                </div>
                  <div className={styles.formGroup}>
                    <input type="number" id="" min={0} value={form.small || ""} onChange={(e)=>{setField("small",e.target.value), handleSizeChange("0",e.target.value)}}/>
                  </div>
                </div>
                <div className={styles.medium}>
                <div className={styles.mediumPizzaContainer}>
                  <i>
                    <GiFullPizza />
                  </i>
                  <span className={styles.price}>ksh {singlePizza.price[1]}</span>
                  <span className={styles.size}>medium</span>
                </div>
                  <div className={styles.formGroup}>
                    <input type="number" id="" min={0} value={form.medium || ""} onChange={(e) => {setField("medium",e.target.value), handleSizeChange("1",e.target.value)}} />
                  </div>
                </div>
                <div className={styles.large}>
                <div className={styles.largePizzaContainer}>
                  <i>
                    <GiFullPizza />
                  </i>
                  <span className={styles.price}>ksh {singlePizza.price[2]}</span>
                  <span className={styles.size}>large</span>
                </div>
                  <div className={styles.formGroup}>
                    <input type="number" id="" min={0} value={form.large || ""} onChange={(e)=>{setField("large",e.target.value),handleSizeChange("2",e.target.value)}}/>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.extras}>
              <div className={styles.extrasTitle}>
                <h4>Extras</h4>
                  <div className={styles.container}>
                  <div className={styles.formGroup}>
                    <label htmlFor="extraCheese">Extra Cheese</label>
                    <input type="checkbox" name="extraCheese" id="extraCheese" 
                      onChange={(e)=> setCheckboxValues(
                        {
                          ...checkboxValues,
                          [e.target.name]: e.target.checked
                        }
                      )}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="extraSpicy">Extra Spicy</label>
                    <input type="checkbox" name="extraSpicy" id="extraSpicy" 
                      onChange={(e)=> setCheckboxValues(
                        {
                          ...checkboxValues,
                          [e.target.name]:e.target.checked
                        }
                      )}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="spicySauce">Inc. Spicy Sauce</label>
                    <input type="checkbox" name="spicySauce" id="spicySauce" 
                      onChange={(e)=>setCheckboxValues({
                        ...checkboxValues,
                        [e.target.name]:e.target.checked
                      })}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="garlic">Garlic Sauce</label>
                    <input type="checkbox" name="garlic" id="garlic" 
                      onChange={(e)=> setCheckboxValues({
                        ...checkboxValues,
                        [e.target.name]: e.target.checked
                      })}
                    />
                  </div>
                  </div>
              </div>

            </div>

            <div className={styles.submitButton}>
            <div className={styles.totalText}>
              <h1>Total:  <span>ksh {finalTotal} </span></h1>
            </div>
                    <button type="submit">Add to Cart</button>
                    <ToastContainer style={{ fontSize: "14px" }}/>
            </div>

          </form>
        </div>
    </div>
  );
}

export async function getServerSideProps({params}){
    const {data} = await fetchSingleProduct(params.id)
    return({
      props:{singlePizza:data}
    })
}

export default (Products);
