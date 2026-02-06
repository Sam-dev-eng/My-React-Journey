import React,{useState} from "react";
import { Link,useNavigate } from "react-router";
import {useLoginMutation} from "../../apis/loginApi"
const login = ()=>{

    const [login,{data,isError,isSuccessful}] = useLoginMutation();
    const navigate = useNavigate()

    const userLoginData = {
        username:"",
        password:""
    }
    const [formData,setFormData] = useState(userLoginData);

    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormData((prev)=>({...prev,[name]: value}))
    }
    const submitHandler = async (e)=>{
        e.preventDefault();

        try{
            const response = await login(formData).unwrap()
            if(!response){alert("error")}
            console.log(response)
            localStorage.setItem("res",response.token)
            navigate("/products")
        }catch (error){
            console.log(error)
            
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler} action="">       
            <div>
                <label htmlFor="username" >user Name</label>
                <input name="username" onChange={handleChange} type="username" placeholder=""/>
            </div>
            <div >
                <label  htmlFor="passwordName">password</label>
                <input name="password" onChange={handleChange} type="password"  placeholder=""/>
            </div>
            <button type="submit">login</button>
            </form>
            <span>Don't have an account?</span>
            <Link to="/register">SignUp</Link>
            </div>
    );
}
export default login;