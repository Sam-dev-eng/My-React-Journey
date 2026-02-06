import styles from "./styles.module.css"


export default function NavBar(){
    return (
        <>
           <header>
                <nav className={styles.navBar}>
                <img  src="/src/assets/react.svg"/>
                <span>ReactFacts</span>
                </nav>
           </header>
        
        </>
    );
}