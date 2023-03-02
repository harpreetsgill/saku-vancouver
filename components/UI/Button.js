import styles from "./Button.module.css";

export default function Button(props) {
  const buttonClass =
    props.type === "phone"
      ? styles.phone
      : props.type === "doordash"
      ? styles.doordash
      : props.type === "ubereats"
      ? styles.ubereats
      : "";

  const newTab = props.type === "doordash" || props.type === "ubereats" ? "_blank" : "";

  return (
    <a
      href={props.href}
      className={`${styles.button} ${buttonClass} ${props.className}`}
      target={newTab}
    >
      {props.text}
    </a>
  );
}
