import Image from "next/image";
import Grid from "../Layout/Grid";
import styles from "./InstagramFeed.module.css";

import Inst1 from "../../public/inst1.jpeg";
import Inst2 from "../../public/inst2.jpeg";
import Inst3 from "../../public/inst3.jpeg";
import Inst4 from "../../public/inst4.jpeg";
import Inst5 from "../../public/inst5.jpeg";
import Inst6 from "../../public/inst6.jpeg";

const instagramProfile = "https://www.instagram.com/sakucanada/";

// The grid is styled for exactly six cells (see the nth-child rules in the
// stylesheet), so keep this list at six.
const posts = [
  { id: "inst1", src: Inst1, alt: "A bowl of udon topped with sliced green onion" },
  { id: "inst2", src: Inst2, alt: "Raw premium Canadian pork loin with rosemary" },
  { id: "inst3", src: Inst3, alt: "Sliced cheese katsu on a grill plate" },
  { id: "inst4", src: Inst4, alt: "An arched booth in Saku's dining room" },
  { id: "inst5", src: Inst5, alt: "A shared platter of assorted Saku katsu" },
  { id: "inst6", src: Inst6, alt: "A katsu rice bowl held up with chopsticks" },
];

export default function InstagramFeed() {
  const imageSize = "(max-width: 300px) 100%, (max-width: 200px) 50%, 33%";

  return (
    <Grid className={styles["instagram-feed"]}>
      {posts.map((post) => (
        <div className={styles.cell} key={post.id}>
          <a href={instagramProfile} target="_blank" rel="noreferrer">
            <Image src={post.src} alt={post.alt} fill sizes={imageSize} />
          </a>
        </div>
      ))}
    </Grid>
  );
}
