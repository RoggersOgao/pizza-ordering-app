import React from 'react'
import Footer from '../footer/Footer'
import Navbar from '../nav/Navbar'
import styles from './Layout.module.scss'

function Layout({children}) {
  return (
    <div className={styles.container}>
    <div className={styles.nav}>
        <Navbar />
    </div>
        {children}
        <Footer />
    </div>
  )
}

export default Layout