import { Link } from "react-router"
import styles from "./Register.module.css"
import { useState } from "react"
import useRegister from "../../costomeHooks/useRegister"

const register = () => {
    const[firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userDetails = {firstName,lastName,email,
    }
    try {
        const {name,message} = await useRegister(userDetails);
        setMessage(message);
        localStorage.setItem("name",name);
       }
         catch (error) { 
            setError("Registration failed. Please try again.");  
       } 
    }
   

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.registerWrapper}>
                <div className={styles.labelInput}>
                    <label htmlFor="firstName" >first Name</label>
                    <input 
                    onChange={(e) => setFirstName(e.target.value)} 
                    id="firstName" 
                    type="firstName" 
                    className={styles.input} 
                    placeholder="Enter ypur name here.." />
                </div>
                <div className={styles.labelInput}>
                    <label htmlFor="lasttName">last Name</label>
                    <input id="lastName" onChange={(e) => setLastName(e.target.value)} type="lastname" className={styles.input} placeholder="" />
                </div>
                <div className={styles.labelInput}>
                    <label htmlFor="password">password</label>
                    <input type="password" className={styles.input} placeholder="" />
                </div>
                <div className={styles.labelInput}>
                    <label htmlFor="confirmpassword">confirm password</label>
                    <input type="password" className={styles.input} placeholder="" />
                </div>
                <button type="submit">submit</button>
            </form>
            <Link to="/">Login</Link>
        </div>

    )
}
export default register