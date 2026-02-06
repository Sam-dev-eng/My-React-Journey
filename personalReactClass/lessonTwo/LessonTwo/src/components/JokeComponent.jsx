import styles from "./Joke.module.css"




export default function Joke(props){
    
    return (
        <>
        {props.setup && <p className={styles.setup}> Setup: {props.setup}</p>}
        <p className={styles.punchline}>Punchline: {props.punchline}</p>
        <hr/>
        </>
    );
}
