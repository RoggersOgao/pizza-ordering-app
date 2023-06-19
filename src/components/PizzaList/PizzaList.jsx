import React from 'react'
import styles from "./PizzaList.module.scss"
import List from './List'
import {motion} from 'framer-motion'
import OfferList from './OfferList'


function PizzaList({pizzaList}) {

    

const onOfferList = [
    {
        pizza:{
            name:"Margherita",
            description: "Classic Italian pizza with fresh basil",
            includes:["Tomato", "Mozzarella,","Basil"],
            price: 499,
            img:"/img/tasty-homemade-traditional-pizza-italian-recipe.jpg",
            alt:"tasty-homemade-traditional-pizza-italian-recipe"
        }
    },
    {
        pizza:{
            name:"White Pizza",
            description: "Creamy and rich garlic and cheese pizza",
            includes:["Olive Oil", "Garlic", "Ricotta", "Mozzarella"],
            price: 599,
            img:"/img/side-view-pizza-with-chicken-mushrooms-served-with-sauce-vegetables-salad-wooden-plate.jpg",
            alt:"side-view-pizza-with-chicken-mushrooms-served-with-sauce-vegetables-salad-wooden-plate"
        }
    },
    {
        pizza:{
            name:"BBQ Chicken",
            description: "Smoky and delicious BBQ flavor",
            includes:["BBQ Sauce", "Chicken", "Mozzarella"],
            price: 450,
            img:"/img/pexels-horizon-content-3915855.jpg",
            alt:"pexels-horizon-content-3915855"
        }
    },
]
  return (
    <div className={styles.pizzaContainer}>
    <div className={styles.pizzaList}>
    <motion.h1
    
    initial={{
        x:-100,
        opacity:0,
    }}
    transition={{
        duration:.5
    }}
    whileInView={{
        x:0,
        opacity:1
    }}

     className={styles.pizzaListTitle}>Flavor Types</motion.h1>
            <div   
             className={styles.list} >
        {pizzaList.map((item,index)=>(
            <List pizzas={item} key={index}/>
        ))}
            </div>
    </div>
    <motion.div className={styles.pizzaOffer}
    initial={{
        opacity:0,
        x:-100,
        y:-200
    }}
    transition={{
        duration:1,
    }}
    whileInView={{
        opacity:1,
        x:0
    }}

    >
        <h1 className={styles.offerTittle}><span>Delicious</span> Pizza Selection</h1>
        <h5>Our Mouth-Watering Offerings to Satisfy Every Craving</h5>
        <p>Indulge in our delectable pizza selection, made with the freshest ingredients and crafted with care to ensure every bite is bursting with flavor. From classic Margherita to savory Meat Lovers, we have a variety of options to suit every taste bud. Whether you prefer a thin crispy crust or a thick and chewy base, our pizzas are sure to delight. Don&apos;t miss out on this tempting <span>offer</span> - come and try our pizzas today!</p>
<div className={styles.list}>
{onOfferList.map((item,index)=>(
        <OfferList key={index} onOfferPizza={item}/>
))}
</div>
    </motion.div>


    </div>
  )
}


export default PizzaList