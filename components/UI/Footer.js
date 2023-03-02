import styles from "./Footer.module.css";

export default function Footer({ data: footerData }) {
  const copyright = footerData.filter((item) => item.type === "Copyright Text");
  const email = footerData.filter((item) => item.type === "Contact Email");
  const facebook = footerData.filter((item) => item.type === "Facebook Page");
  const instagram = footerData.filter(
    (item) => item.type === "Instagram Account"
  );
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        {copyright[0].content}
        <a href={email[0].link}>{email[0].content}</a>
      </div>
      <div className={styles["social-media"]}>
        <a href={facebook[0].link} target="_blank" rel="noopener">
          {facebook[0].content}
        </a>
        <a href={instagram[0].link} target="_blank" rel="noopener">
          {instagram[0].content}
        </a>
      </div>
    </footer>
  );
}
