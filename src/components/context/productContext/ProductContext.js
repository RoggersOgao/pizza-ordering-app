import {createContext, useReducer} from 'react'
import ProductReducer from './ProductReducer'

const ProductContext = createContext()

export const ProductProvider = ({children}) => {

    const initialState = {
        products:[],
        isLoading:true
    }

    const [state, dispatch] = useReducer(ProductReducer, initialState)

    return <ProductContext.Provider value={{
        state,
        dispatch,
        isLoading:state.isLoading
    }}>
    {children}
    </ProductContext.Provider>
}

export default ProductContext