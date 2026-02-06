import {Link } from "react-router"




const Register = ()=>{


    return (
        <div>
            <form className ="  ">
                <div>
                    <input type="userName" placeholder="Enter your user Name"/>
                
                </div>
                <div>
                    <input type="password" placeholder="Enter your password"/>
                </div>
                <div>
                    <input type = "password" placeholder="Confirm your Password"/>
                </div>
            </form>
            <p>Already had an account?</p>
            <Link to="/"> login here</Link>
        </div>
    )
}
export default Register;