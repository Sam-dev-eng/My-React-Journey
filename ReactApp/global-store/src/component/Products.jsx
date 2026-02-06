import React from "react"
import {useGetAllProductsQuery} from "../apis/productApis"
import style from "./productsStyle.module.css"
const Products = () => {

    const data = useGetAllProductsQuery();
    console.log(data.data);

    return (
    <div className={style.productContainer}>
        {
            data?.data?.map((products)=>(
                <div key={products.id}>
                    <img  src={`${products.image}`}/>
                    <h5>${products.price}</h5>
                    <h1>{products.title}</h1>
                    <h2>({products.category})</h2>
                    
                </div>
            ))
        }
    </div>
        
    )
}
export default Products;