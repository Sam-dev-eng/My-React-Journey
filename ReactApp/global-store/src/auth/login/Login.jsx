
import { Link } from "react-router";
const login = ()=>{

    return (
        <div>
            <form>       
            <div>
                <label htmlFor="userName" >user Name</label>
                <input type="userName" placeholder=""/>
            </div>
            <div >
                <label htmlFor="passwordName">password</label>
                <input type="password"  placeholder=""/>
            </div>
            </form>
            <span>Don't have an account?</span>
            <Link to="/register">SignUp</Link>


            </div>

           

    );
}
export default login;