import { Fragment } from "react";
import Image from "next/image";
import Grid from "../Layout/Grid";
import Button from "./Button";
import FranchiseeCard from "./FranchiseeCard";
import Clock from "../../public/clock.svg";

import styles from "./Locations.module.css";

export default function Locations(props) {
  const locations = props.data[0];
  const franchisee = props.data[1];
  return (
    <>
      <a id="locations" className={styles["anchor-link"]}></a>
      <Grid className={styles.locations}>
        {locations.map((location) => (
          <Fragment key={location.id}>
            <div
              className={
                location.name === "Robson"
                  ? styles["robson-image"]
                  : location.name === "W Broadway"
                  ? styles["broadway-image"]
                  : ""
              }
            >
              <Image
                src={location.image}
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt="People sitting and eating inside a restaurant"
              />
              <Button
                type="phone"
                href={`tel:${location.phone}`}
                text={location.phone}
                className={styles["phone-button"]}
              />
            </div>
            <div
              className={
                location.name === "Robson"
                  ? styles["robson-text"]
                  : location.name === "W Broadway"
                  ? styles["broadway-text"]
                  : ""
              }
            >
              <div className={styles["address-hours"]}>
                <address>{location.address}</address>
                <span className={styles.days}>{location.days}</span>
                {location.time.map((timeDuration) => (
                  <div key={timeDuration.id}>
                    <span className={styles.time}>
                      {timeDuration.timeBlock}
                    </span>
                  </div>
                ))}
                <div className={styles.update}>
                  <Image src={Clock} alt="Clock icon" width={12} height={12} />
                  <span>{`Updated: ${new Date(
                    location.time[0].updated
                  ).toDateString()}`}</span>
                </div>
              </div>
              <div className={styles.buttons}>
                <Button
                  type="doordash"
                  href={location.doordash}
                  text="DoorDash"
                  className={styles["order-doordash-button"]}
                />
                <Button
                  type="ubereats"
                  href={location.ubereats}
                  text="UberEats"
                  className={styles["order-ubereats-button"]}
                />
              </div>
            </div>
          </Fragment>
        ))}
        <FranchiseeCard data={franchisee} className={styles.franchisee} />
      </Grid>
    </>
  );
}
