import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h2>
        There's a new place to get dr<span>oo</span>l-worthy Japanese
        Pork in Vancouver
      </h2>
    </div>
  );
}
