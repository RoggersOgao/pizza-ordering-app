const ProductReducer = (state, action)=>{
    switch(action.type){
        case "SET_PRODUCTS":
            return{
                ...state,
                products: action.payload
            }
    }
}

export default ProductReducer