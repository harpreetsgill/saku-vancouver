import Image from "next/image";
import Grid from "../Layout/Grid";
import styles from "./InstagramFeed.module.css";

export default function InstagramFeed({ data: instagramFeed }) {
  const imageSize = "(max-width: 300px) 100%, (max-width: 200px) 50%, 33%";
  return (
    <Grid className={styles["instagram-feed"]}>
      {instagramFeed.map((item) => (
        <div className={styles.cell} key={item.id}>
          <a href={item.permalink} target="_blank" rel="noreferrer">
            <Image src={item.media_url} alt="Image 1" fill sizes={imageSize} />
          </a>
        </div>
      ))}
    </Grid>
  );
}
