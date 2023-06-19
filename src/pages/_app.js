import { CartProvider } from '@/components/context/cartContext/CartContext'
import { ProductProvider } from '@/components/context/productContext/ProductContext'
import Layout from '@/components/layout/Layout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
  <CartProvider>
  <ProductProvider>
  <Layout>
  <Component {...pageProps} />
  </Layout>
  </ProductProvider>
  </CartProvider>
  )
}
