import { useState } from "react";
import Image from "next/image";
import { useEffect } from "react";
import Grid from "../Layout/Grid";
import styles from "./InstagramFeed.module.css";

const instagramToken = process.env.NEXT_PUBLIC_INSTAGRAM_ID;

export default function InstagramFeed() {
  const [instagramData, setInstagramData] = useState([]);
  const imageSize = "(max-width: 300px) 100%, (max-width: 200px) 50%, 33%";

  useEffect(() => {
    async function getInstaFeed(instagramToken) {
      try {
        const instaResp = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption&access_token=${instagramToken}`
        );
        const instaData = await instaResp.json();

        setInstagramData(instaData.data);
      } catch (error) {
        console.log(`Error fetching Instagram feed: ${error.message}`);
      }
    }

    getInstaFeed(instagramToken);
  }, []);
  instagramData.length = 6;
  return (
    <Grid className={styles["instagram-feed"]}>
      {instagramData.map((item) => (
        <div className={styles.cell} key={item.id}>
          <a href={item.permalink} target="_blank" rel="noreferrer">
            <Image
              src={item.media_url}
              alt="Instagram Image"
              fill
              sizes={imageSize}
            />
          </a>
        </div>
      ))}
    </Grid>
  );
}
