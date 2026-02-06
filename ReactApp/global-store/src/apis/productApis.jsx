import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const URL = import.meta.env.VITE_APP_FAKESTORE_URL

export const productApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({baseUrl:URL}),
    endpoints: (builder)=>({
        getAllProducts: builder.query({
            query:()=>"/products"
        })
    })
});
export const {useGetAllProductsQuery} = productApi;
