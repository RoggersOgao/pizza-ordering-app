import React from 'react'
import styles from "./Footer.module.scss"
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import {motion} from 'framer-motion'
function Footer() {
  const dateN = new Date().getFullYear()
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.leftCard}>
            <h1>Logo</h1>
            <p>Phone: 0700601885 </p>
            <div className={styles.social}>
            <div className={styles.icon}><FaFacebook /></div>
            <div className={styles.icon}><FaInstagram /></div>
            <div className={styles.icon}><FaWhatsapp /></div>

            </div>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.middleCard}>
            <h1>Our Locations</h1>
            <p className={styles.text}>
              <br/>Nairobi,kenya,
              <br />1745 Tom Mboya Street
              <br/>0700601885
            </p>
            <p className={styles.text}>
              <br/>Nakuru,kenya,
              <br />23, semtuk off rithuli Road
              <br/>0700601885
            </p>
            <p className={styles.text}>
              <br/>Kisumu,kenya,
              <br /> 34, off Obiro Road
              <br/>0700601885
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightCard}>
            <div className={styles.title}>
              <h1>Official Working Hours</h1>
            </div>

            <p>
              Monday-Friday
              <br/> 8:00 - 10:00
            </p>
            <p>
              Saturday-Sunday
              <br/> 10:00 - 8:00
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bottomPart}>
       <p>&copy;Copyright {dateN}</p>
      </div>
    </div>
  )
}

export default Footer