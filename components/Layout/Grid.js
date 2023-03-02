import styles from "./Grid.module.css"

export default function Gallery(props) {
    return <div className={`${styles.grid} ${props.className}`}>
        {props.children}
    </div>
}