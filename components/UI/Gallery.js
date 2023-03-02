import Grid from "../Layout/Grid";
import Image from "next/image";
import styles from "./Gallery.module.css";

export default function Gallery({ data: galleryData }) {
  return (
    <Grid className={styles.gallery}>
      <div className={styles.bowl}>
        <Image src={galleryData[0].cover} alt="A noodle bowl" fill />
      </div>
      <div className={styles.bowlText}>
        <h3>{galleryData[0].name}</h3>
        <p>{galleryData[0].text}</p>
      </div>
      <div className={styles.video}>
        <Image
          src={galleryData[1].cover}
          alt="Knife in a hand cutting peppers."
          fill
        />
      </div>
      <div className={styles.pork}>
        <Image
          src={galleryData[2].cover}
          alt="Freshly cut Pork placed on a chopping board."
          fill
        />
      </div>
      <div className={styles.porkText}>
        <h3>{galleryData[2].name}</h3>
        <p>{galleryData[2].text}</p>
      </div>
      <div className={styles.interior}>
        <Image
          src={galleryData[3].cover}
          alt="A Japanese styled interior of the Saku Restaurant."
          fill
        />
      </div>
      <div className={styles.interiorText}>
        <h3>{galleryData[3].name}</h3>
        <p>{galleryData[3].text}</p>
      </div>
    </Grid>
  );
}
