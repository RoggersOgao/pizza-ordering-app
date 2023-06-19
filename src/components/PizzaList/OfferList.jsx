import React from 'react'
import styles from "./OfferList.module.scss"
import Image from 'next/image'
import {motion} from 'framer-motion'

function OfferList({onOfferPizza}) {
  return (
    <motion.div 
     initial={{
                opacity:0,
                x:-100,
                y:50
            }}
            transition={{
                duration:.5
            }}
            whileInView={{
                opacity:1,
                x:0
            }}
            whileHover={{
                scale:1.04,
                zIndex:4,
                boxShadow:"2px 2px 58px black"
            }}
    className={styles.container}>
        <div className={styles.left}>
            <div className={styles.imgCont}>
                <Image 
                    src={onOfferPizza.pizza.img}
                    alt={onOfferPizza.pizza.alt}
                    width={300}
                    height={200}
                    className={styles.img}
                />
            </div>
        </div>
        <div className={styles.right}>
            <div className={styles.title}>
                <h1>{onOfferPizza.pizza.name}</h1>
            </div>
            <div className={styles.subTitle}>
                <h3>{onOfferPizza.pizza.description}</h3>
            </div>
            <div className={styles.includes}>
                <ul className={styles.includesList}>
                {onOfferPizza.pizza.includes.map((item,index)=>(
                    <li key={index}>{item}</li>
                ))}
                </ul>
            </div>
            <div className={styles.bottomGroup}>
            <div className={styles.price}>
                <h1>ksh {onOfferPizza.pizza.price}</h1>
            </div>
            <div className={styles.orderButton}>
                <button>Order</button>
            </div>
            </div>
        </div>
    </motion.div>
  )
}

export default OfferList