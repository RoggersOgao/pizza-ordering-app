import React, { useContext } from "react";

import styles from "./Navbar.module.scss"
import {IoMdCart} from 'react-icons/io'
import {FaPhone, FaHome, FaGlobe} from 'react-icons/fa'
import Link from 'next/link'
import CartContext from "../context/cartContext/CartContext";


function notificationCartItems(items){
    return items.filter(item => item.status === "active").length
}
function Navbar() {

const { state }  = useContext(CartContext)

const count = notificationCartItems(state.cartItems)



  return (
    <nav className={styles.nav}>
    <div className={styles.left}>
        <h2>Logo</h2>
    </div>
        <div className={styles.middle}>
            <ul className={styles.list}>
            <Link className={styles.navLink} href="/"><li className={styles.navItem}><FaHome className={styles.icon}/>home</li></Link>     
            <Link className={styles.navLink} href="/about"><li className={styles.navItem}><FaGlobe className={styles.icon}/>about us</li></Link>          
            <Link className={styles.navLink} href="/contact"><li className={styles.navItem}><FaPhone className={styles.icon}/>contact us</li></Link>     
            </ul>
            <span></span>
        </div>
        <div className={styles.right}>
            <Link href="/cart">
                <div className={styles.cart}>
                    <i className={styles.icon}><IoMdCart /></i>
                    <span>{count}</span>
                </div>
            </Link>
                <div className={styles.phone}>
                    <div className={styles.left}>
                        <i className={styles.icon}><FaPhone /></i>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.top}>
                            <h6>order now!</h6>
                        </div>
                        <div className={styles.bottom}><h1>0700601885</h1></div>
                    </div>
                </div>
        </div>

    </nav>
  )
}

export default Navbar