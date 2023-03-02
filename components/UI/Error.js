import styles from "./Error.module.css";

export default function Error(props) {
  return (
    <div className={styles.error}>
      <h2>{props.code}</h2>
      {props.code === "404" && (
        <p>
          The page you&apos;re trying to access is as elusive as a unicorn.
          We&apos; re still trying to track it down.
        </p>
      )}
      {props.code === "500" && (
        <p>
          The server is feeling a little under the weather. Please be patient
          while we nurse it back to health.
        </p>
      )}
    </div>
  );
}
