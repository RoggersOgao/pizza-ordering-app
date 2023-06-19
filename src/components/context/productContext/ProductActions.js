import axios from 'axios'

const product = axios.create({
    baseURL:"http://localhost:3000",
    headers:{
        'content-type':"application/json"
    }
})

export const fetchProducts = async()=>{
    const response = await product.get("/api/products")
    
    return response
}

export const fetchSingleProduct = async(id)=>{
    const response = await product.get(`/api/products?name=${id}`)

    return response
}