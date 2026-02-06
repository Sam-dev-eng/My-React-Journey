import styles from "./styles.module.css"

export default function Main(){
    return (
        <>
        <div className={styles.mainBody}>
            <h1>Fun Facts About React</h1>
            <ul className={styles.lists}>
                <li>Was first realised in 2013</li>
                <li>Was originally created by John walke </li>
                <li>Has well over 100k stars in github</li>
                <li>is maintained by meta</li>
                <li>powers thounsands of interprice app inlcuding mobile app</li>

            </ul>
            </div>
        </>
        
    )
}