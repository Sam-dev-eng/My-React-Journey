import api from "./axios"

export const loginUser = async (credentials) => { 
    const response = await api.post("/auth/login", credentials)
    console.log(credentials)
    return response.data;
}

export const registerUser = async (userData) => {
    const response = await api.post("/auth/signUp", userData); 
    return response.data;
}
