import { useState, useEffect } from "react";

const useRegister = (userDetails) => {

    const [name,setName] = useState("");
    const [message,setMessage] = useState("");
    const[lastName,SetLastName] = useState("");

    useEffect(()=>{
        if(userDetails){
            setName(userDetails.firstName);
            setMessage("Registration Successful");
            SetLastName(userDetails.lastName);
        }
    },[userDetails])
    return {name,message,lastName};
}
export default useRegister;