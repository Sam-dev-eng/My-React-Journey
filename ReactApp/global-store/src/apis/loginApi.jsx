import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const URL = import.meta.env.VITE_APP_FAKESTORE_URL

export const loginApi = createApi({
    reducerPath: "login",
    baseQuery: fetchBaseQuery({baseUrl:URL}),
    endpoints: (builder)=>({
        login: builder.mutation({
            query:(data)=>({
                url: "/auth/login",
                method:"Post",
                body:data
            })
        })
    })
})

export const {useLoginMutation} = loginApi
