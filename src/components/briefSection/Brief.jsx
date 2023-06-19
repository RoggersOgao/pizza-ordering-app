import React from 'react'
import styles from "./Brief.module.scss"
import Image from 'next/image'
import {motion} from 'framer-motion'
import Link from 'next/link'
function Brief() {
  return (
    <div  className={styles.brief}>
    <div className={styles.container}>
        <div className={styles.left}>
        <motion.div
        initial={{
            opacity: 0,
            scale: 0,
            rotate: "90deg"
        }}
        transition={{
            duration: .5
        }}
        whileInView={{
            opacity: 1,
            scale: 1,

        }}

         className={styles.imgContainer}>
            <Image 
                src="/img/tasty-homemade-traditional-pizza-italian-recipe.jpg"
                alt="tasty-homemade-traditional-pizza-italian-recipe"
                width={500}
                height={350}
                className={styles.img}
            />
        </motion.div>
        </div>  
        <div className={styles.right}>
                <motion.div
                initial={{
                    opacity:0,
                    x:-60
                }}
                transition={{
                    duration:.5
                }}
                whileInView={{
                    opacity:1,
                    x:0
                }}


                 className={styles.title}>
                <h1>Welcome to YayPizza!</h1>
                <h4 className={styles.subTitle}>Your Destination for Authentic, Delicious Pizza! </h4>
                </motion.div>
                <motion.div 
                
                initial={{
                    opacity:0,
                    x: 60
                }}
                transition={{
                    duration:.5
                }}
                whileInView={{
                    opacity:1,
                    x:0
                }}
                className={styles.description }>
                At YayPizza, we take great pride in crafting the perfect pizza. From our fresh ingredients to our homemade sauces and dough, we create each pizza with care and attention to detail. Whether you prefer classic toppings like pepperoni and mushrooms, or more adventurous options like BBQ chicken or pesto and goat cheese, we have something for everyone. Come explore our menu, place an order, and taste the difference for yourself!
                </motion.div>


                <div className={styles.aboutUsButton}>
                <Link href="">
                    <button>More</button>
                </Link>
                </div>


        </div> 
        </div>
    </div>
  )
}

export default Brief