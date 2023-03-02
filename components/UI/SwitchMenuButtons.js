import { useState } from "react";
import styles from "./SwitchMenuButtons.module.css";

export default function SwitchMenuButtons(props) {
  const [menuType, setMenuType] = useState("regular");

  function buttonHandler(event) {
    setMenuType(event.target.id);
    props.menuType(event.target.id);
  }

  return (
    <div className={`${styles["switch-menu-buttons"]} ${props.className}`}>
      <button
        id="regular"
        onClick={buttonHandler}
        className={menuType === "regular" ? styles.active : ""}
      >
        Regular
      </button>
      <button
        id="takeout"
        onClick={buttonHandler}
        className={menuType === "takeout" ? styles.active : ""}
      >
        Takeout & Delivery
      </button>
    </div>
  );
}
