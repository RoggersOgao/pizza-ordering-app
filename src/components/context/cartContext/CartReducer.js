export const CartReducer =(state,action)=>{
    
    switch(action.type){
        case 'FETCH_CART_ITEMS':
            return{
                ...state,
                cartItems: action.payload,
                isLoading:false,
            }
        case 'ADD_TO_CART':

            return{
                ...state,
                cartItems:[...state.cartItems, action.payload],
            }
        case 'DELETE_FROM_CART':
                const filteredCartItems = state.cartItems.filter(
                    (cartItem)=> cartItem.id !== action.payload
                );
                return{
                    ...state,
                    cartItems:filteredCartItems
                }
        case 'UPDATE_CART_ITEM':
            const updatedCartItem = state.cartItems.map((cartItem)=>
            product.id === action.payload.id ? action.payload: cartItem )

            return{
                ...state,
                cartItems: updatedCartItem
            }
            

        case 'CLEAR_CART':
            return{
                ...state,
                cartItems:[]
            };
        default:
            return state;
    }
}
