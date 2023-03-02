import Link from "next/link";

import styles from "./Header.module.css";

import Image from "next/image";
import Logo from "../../public/logo.png";
import LogoType from "../../public/logotype.png";
import HandIcon from "../../public/hand-white.svg";
import Instagram from "../../public/instagram.svg";
import { useState } from "react";

export default function Header({ data: instagramData }) {
  const [navDisplay, setNavDisplay] = useState(false);
  const menuHandler = () => {
    setNavDisplay((prevState) => !prevState);
  };

  const headerClasses = `${styles.header} ${navDisplay && styles.expanded}`;

  const instagramAccountLink = instagramData[0].link;

  return (
    <header className={headerClasses}>
      <Link href="/" className={styles.logo}>
        <Image src={Logo} alt="Saku Logo" className={styles["logo-mark"]} />
        <Image
          src={LogoType}
          alt="Saku Logo Text"
          className={styles["logo-type"]}
        />
      </Link>
      <nav className={navDisplay ? styles.active : ""}>
        <Link href="/#" className={styles.red}>
          <Image
            src={HandIcon}
            alt="A hand icon pointing to the right"
            width={15}
            height={15}
          />
          Order
        </Link>
        <Link href="/menu" className={styles.text}>
          Menu
        </Link>
        <Link href="/#locations" className={styles.text}>
          Locations
        </Link>
        <a href={instagramAccountLink} target="_blank" rel="noreferrer">
          <Image src={Instagram} alt="Instagram Logo" width={27} height={27} />
        </a>
      </nav>

      <div className={styles.arrow} onClick={menuHandler}>
        <div className={styles["arrow-left"]}></div>
        <div className={styles["arrow-right"]}></div>
      </div>
    </header>
  );
}
