import React from "react";
import styles from "./List.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

function List({ pizzas }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -100,
        y: 50,
      }}
      transition={{
        duration: 0.5,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      whileHover={{
        scale: 1.04,
        zIndex: 4,
        boxShadow: "2px 2px 58px black",
      }}
      className={styles.container}
    >
      <div className={styles.left}>
        <div className={styles.imgCont}>
          <Image
            src={pizzas.img}
            alt={pizzas.alt}
            width={300}
            height={200}
            className={styles.img}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          <h1>{pizzas.name}</h1>
        </div>
        <div className={styles.subTitle}>
          <h3>{pizzas.description}</h3>
        </div>
        <div className={styles.includes}>
          <ul className={styles.includesList}>
            {pizzas.includes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.bottomGroup}>
          <div className={styles.price}>
            <h1>ksh {pizzas.price[0]}</h1>
          </div>
          <div className={styles.orderButton}>
            <Link
              href={`/products/${encodeURIComponent(
                pizzas.name
              )}?d=${encodeURIComponent(
                pizzas.description.replace(/\s+/g, "-")
              )}`}
            >
              <button>Order</button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default List;
