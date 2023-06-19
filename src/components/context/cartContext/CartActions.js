import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cartItems = axios.create({
    baseURL:"http://localhost:3000",
    headers:{
        'content-type':"application/json"
    }
})

export const addToCart = (item) => {
    return {
        type:'ADD_TO_CART',
        payload:item,
    }
}
export const fetchCartItem = (item) => {
    return{
        type:'FETCH_CART_ITEMS',
        payload:item
    }
}

export const updateCartItem = (item) =>{
    return {
        type:'UPDATE_CART_ITEM',
        payload:item
    }
}
export function removeFromCart(itemId){
    return{
        type:'REMOVE_FROM_CART',
        payload:item,
    }
}
export function clearCart(){
    return{
        type:'CLEAR_CART'
    }
}

export const fetchCartItems = async () => {
    try{
        const response = await cartItems.get('/api/carts');
        
        return response.data
    }catch(err){
        console.log(err)
    }

}

export const AddCartItem = async(dispatch, product) => {
    try{
        const response = await cartItems.post('/api/carts', product)
        dispatch(addToCart(response.data))
        console.log(response)
        if(response.status === 201){
            toast.success('Item added to cart!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }catch(err){
        // console.log(err)
        toast.error('Item already exists!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    return null;
}

export const updateCartItems = async(dispatch, id)=>{
    try{
        const response = await  cartItems.put(`/api/carts/${id}`, product)
        dispatch(updateCartItem(response.data))

        return response
    }catch(err){
        console.log(err)
    }


}

export const deleteCartItem = async(dispatch, id) =>{
    try{
        const response = await cartItems.delete(`/api/carts/${id}`)
        dispatch(removeFromCart(response.data))


        return response
    }catch(err){
        console.log(err)
    }
}