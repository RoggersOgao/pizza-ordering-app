import React, { useState, useEffect, useCallback } from "react";
import styles from "./Slider.module.scss";
import { FaGripfire } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from 'next/link'

import Image from "next/image";

function Slider() {
  const [index, setIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const images = [
    {
      slide: {
        img: "/img/img1.jpg",
        heading: "Order Pizza Anytime, Anywhere",
        description:
          "You can easily order pizza from our pizzerias from the convenience of your smartphone or tablet. Whether you're at home, work, or out and about, you can quickly and easily place an order and have your piping hot pizza delivered right to your door.",
      },
    },
    {
      slide: {
        img: "/img/perfectPizza.jpg",
        heading: "Customize Your Perfect Pizza",
        description:
          "With our pizza delivery app, you have complete control over your pizza order. Choose your crust, sauce, toppings, and cheese to create the perfect pizza for your taste buds. Plus, you can save your favorite orders for easy re-ordering in the future",
      },
    },
    {
      slide: {
        img: "/img/lastImg.jpg",
        heading: "Track Your Pizza in Real-Time",
        description:
          "No more wondering where your pizza is or when it will arrive. With our app, you can track your pizza delivery in real-time, so you always know exactly when your pizza will be at your doorstep. Plus, you can get updates on the status of your order along the way, so you're never left in the dark",
      },
    },
  ];

  const handleSliderClickArrow = useCallback(
    (direction) => {
      if (direction === "left") {
        setIndex(index !== 0 ? index - 1 : 2);
        setForward(false);
      }
      if (direction === "right") {
        setIndex(index !== 2 ? index + 1 : 0);
        setForward(true);
      }
    },
    [index]
  );

  useEffect(() => {
    let interval;
    if (!isHovering) {
      interval = setInterval(() => {
        handleSliderClickArrow("right");
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isHovering, handleSliderClickArrow]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <div
      className={styles.slider}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.iconLeft}
        onClick={() => handleSliderClickArrow("left")}
      >
        <FaGripfire />
      </div>

      <div
        className={styles.container}
        style={{
          transform: forward
            ? `translateX(${-100 * index}vw)`
            : `translateX(${-100 * index}vw)`,
          transition: "all .5s ease-in-out",
        }}
      >
        {images.map((item, index) => (
          <div key={index} className={styles.imgContainer}>
            <Image
              src={item.slide.img}
              alt={item}
              width={1150}
              height={625}
              className={styles.img}
            />
            <motion.div
            initial={{
              opacity:0
            }}
            transition={{
              duration:2
            }}
            whileInView={{
              opacity:1,
              
            }}

             className={styles.slideTitleMessage}>
              <h1>{item.slide.heading}</h1>
            </motion.div>
            <div className={styles.slideDescription}>
              <p>{item.slide.description}</p>
            </div>
            <div className={styles.orderNowButton}>
            <Link href="">
              <button>Order Now</button>
            </Link>
            </div>
          </div>
        ))}
      </div>

      <div
        className={styles.iconRight}
        onClick={() => handleSliderClickArrow("right")}
      >
        <FaGripfire />
      </div>
    </div>
  );
}

export default Slider;
