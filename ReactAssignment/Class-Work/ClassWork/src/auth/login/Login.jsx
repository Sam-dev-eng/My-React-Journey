import {Link} from "react-router"
import styles from "./loginStyle.module.css"
import messageIcon from "../../assets/imageIcon.png"
import buttons from "../../assets/googlebutton.png"
import facebookLogo from "../../assets/faceBookLogo.png"
import backgroundPics from "../../assets/backgroundPics.png"
const Login =()=>{
    
    return (
        <div className={styles.boardHeader}>
        <div className = {styles.formStyle}>
            <form>
                <div>
                    <h1>Log in</h1>
                    <input className={styles.input} type="email" placeholder="Your email"/>
                </div>
                <div>
                    <input type="password" placeholder="Pasword"/>
                </div>
                <div>
                    <button className={styles.loginButton}>log in</button>
                    
                </div>
                <div className={styles.forgetPassword}>
                    <a href="#">forget password?</a>
                </div>
                <div className={styles.orSign}>
                <hr></hr>
                <p>or</p>
                <hr></hr>
                </div>
                <div className={styles.underButtons}>
                <button>
                  <img src={buttons}/>  
                    Google
                </button>
                <button>
                    <img src={facebookLogo}/>
                    Facebook
                </button>
                </div>
                <div className = {styles.signUpLink}>
                    <span>Don't have an account?
                        <Link to="/register"> Sign up</Link>
                    </span>
                </div>
            </form>
            
        </div>
         <div className={styles.backgroundPics}>   

                <img src={backgroundPics} alt="" />
            </div>
        </div>
    )
}
export default Login;