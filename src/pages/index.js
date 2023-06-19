import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import Slider from '@/components/slider/Slider'
import Brief from '@/components/briefSection/Brief'
import PizzaList from '@/components/PizzaList/PizzaList'
import { fetchProducts } from '@/components/context/productContext/ProductActions'
import { useContext, useEffect } from 'react'
import ProductContext from '@/components/context/productContext/ProductContext'



export default function Home({products}) {
  const {state, dispatch} = useContext(ProductContext);

  // set products in the context

  useEffect(()=>{
    dispatch({
      type:'SET_PRODUCTS',
      payload:products
    })
  },[dispatch, products])
  
  return (
    <>
      <Head>
        <title>YayPizza</title>
        <meta name="description" content="Pizza commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Slider />
        <Brief />
        <PizzaList pizzaList={products}/>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  //fetch all products from the server

  const {data} = await fetchProducts()

  // pass the fetched products as props to the component

  return {props: {products: data }}
}
