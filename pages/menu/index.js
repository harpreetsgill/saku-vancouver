import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { getDatabase, getBlock } from "../../lib/notion";
import SwitchMenuButtons from "../../components/UI/SwitchMenuButtons";
import Card from "../../components/Layout/Card";
import Masonry from "react-masonry-css";

import styles from "./index.module.css";

const miscDbId = process.env.MISC_DB_ID;
const regularMenuDbId = process.env.REGULAR_MENU_DB_ID;
const takeoutMenuDbId = process.env.TAKEOUT_MENU_DB_ID;

export default function MenuPage({ regularMenu, takeoutMenu }) {
  const [menuType, setMenuType] = useState("regular");

  function displayMenuTypeHandler(type) {
    if (type === "regular") {
      setMenuType("regular");
    } else if (type === "takeout") {
      setMenuType("takeout");
    }
  }

  const takeoutMenuContent = takeoutMenu.map((category) => (
    <Card
      key={category.id}
      className={`${styles.card} ${
        category.layout === "1-column" ? "col-1" : "col-2"
      }`}
    >
      <div className={styles.header}>
        <h2 className={styles["header-title"]}>{category.title}</h2>
        {category.desc !== "" && (
          <p className={styles["header-desc"]}>{category.desc}</p>
        )}
        <Image
          src={category.icon}
          width={28}
          height={20}
          alt={category.title + " icon"}
          className={styles["header-icon"]}
        />
      </div>
      <div className={styles.body}>
        {category.items.map((item) => (
          <div className={styles.item} key={item.id}>
            <h3>{item.properties.Item.title[0].plain_text}</h3>
            <span>${item.properties.Price.number}</span>
            {item.properties.Description.rich_text.length > 0 && (
              <p>{item.properties.Description.rich_text[0].plain_text}</p>
            )}
            {item.properties.Children.select.name == 1 && (
              <div className={styles.children}>
                <h4>
                  {item.properties["Child 1 Name"].rich_text[0].plain_text}
                </h4>
                <span>${item.properties["Child 1 Price"].number}</span>
              </div>
            )}
            {item.properties.Children.select.name == 2 && (
              <>
                <div className={styles.children}>
                  <h4>
                    {item.properties["Child 1 Name"].rich_text[0].plain_text}
                  </h4>
                  <span>${item.properties["Child 1 Price"].number}</span>
                </div>
                <div className={styles.children}>
                  <h4>
                    {item.properties["Child 2 Name"].rich_text[0].plain_text}
                  </h4>
                  <span>${item.properties["Child 2 Price"].number}</span>
                </div>
              </>
            )}
            {item.properties.Children.select.name == 3 && (
              <>
                <div className={styles.children}>
                  <h4>
                    {item.properties["Child 1 Name"].rich_text[0].plain_text}
                  </h4>
                  <span>${item.properties["Child 1 Price"].number}</span>
                </div>
                <div className={styles.children}>
                  <h4>
                    {item.properties["Child 2 Name"].rich_text[0].plain_text}
                  </h4>
                  <span>${item.properties["Child 2 Price"].number}</span>
                </div>
                <div className={styles.children}>
                  <h4>
                    {item.properties["Child 3 Name"].rich_text[0].plain_text}
                  </h4>
                  <span>${item.properties["Child 3 Price"].number}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {category.note !== "" && <p className={styles.note}>{category.note}</p>}
    </Card>
  ));

  const regularMenuContent = regularMenu.map((category) => (
    <Card
      key={category.id}
      className={`${styles.card} ${
        category.layout === "1-column" ? "col-1" : "col-2"
      }`}
    >
      <div className={styles.header}>
        <h2 className={styles["header-title"]}>{category.title}</h2>
        {category.desc !== "" && (
          <p className={styles["header-desc"]}>{category.desc}</p>
        )}
        <Image
          src={category.icon}
          width={28}
          height={20}
          alt={category.title + " icon"}
          className={styles["header-icon"]}
        />
      </div>
      <div className={styles.body}>
        {category.items.map((item) => (
          <div className={styles.item} key={item.id}>
            <h3>{item.properties.Item.title[0].plain_text}</h3>
            <span>${item.properties.Price.number}</span>
            {item.properties.Description.rich_text.length > 0 && (
              <p>{item.properties.Description.rich_text[0].plain_text}</p>
            )}
            {item.properties.Children.select.name == 1 && (
              <div className={styles.children}>
                <h4>
                  {item.properties["Child 1 Name"].rich_text[0].plain_text}
                </h4>
                <span>${item.properties["Child 1 Price"].number}</span>
              </div>
            )}
            {item.properties.Children.select.name == 2 && (
              <>
                <div className={styles.children}>
                  <h4>
                    {item.properties["Child 1 Name"].rich_text[0].plain_text}
                  </h4>
                  <span>${item.properties["Child 1 Price"].number}</span>
                </div>
                <div className={styles.children}>
                  <h4>
                    {item.properties["Child 2 Name"].rich_text[0].plain_text}
                  </h4>
                  <span>${item.properties["Child 2 Price"].number}</span>
                </div>
              </>
            )}
            {item.properties.Children.select.name == 3 && (
              <>
                <div className={styles.children}>
                  <h4>
                    {item.properties["Child 1 Name"].rich_text[0].plain_text}
                  </h4>
                  <span>${item.properties["Child 1 Price"].number}</span>
                </div>
                <div className={styles.children}>
                  <h4>
                    {item.properties["Child 2 Name"].rich_text[0].plain_text}
                  </h4>
                  <span>${item.properties["Child 2 Price"].number}</span>
                </div>
                <div className={styles.children}>
                  <h4>
                    {item.properties["Child 3 Name"].rich_text[0].plain_text}
                  </h4>
                  <span>${item.properties["Child 3 Price"].number}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {category.note !== "" && <p className={styles.note}>{category.note}</p>}
    </Card>
  ));

  useEffect(() => {
    if (menuType === "regular") {
      document
        .querySelector(".col-1")
        .parentNode.classList.add(`${styles["col-1"]}`);
      document
        .querySelector(".col-2")
        .parentNode.classList.add(`${styles["col-2"]}`);
    }
  }, [menuType]);

  return (
    <>
      <Head>
        <title>Menu - Saku</title>
      </Head>
      <SwitchMenuButtons
        className={styles["switch-menu-buttons"]}
        menuType={displayMenuTypeHandler}
      />
      <Masonry
        breakpointCols={{ default: 2, 720: 1 }}
        className={styles.menu}
        columnClassName={styles["menu-column"]}
      >
        {menuType === "takeout" && takeoutMenuContent}
        {menuType === "regular" && regularMenuContent}
      </Masonry>
    </>
  );
}

export async function getStaticProps() {
  const regularMenuDb = await getDatabase(
    regularMenuDbId,
    "Sort ID",
    "ascending"
  );
  const takeoutMenuDb = await getDatabase(
    takeoutMenuDbId,
    "Sort ID",
    "ascending"
  );

  const regularMenuItems = regularMenuDb.map((page) => {
    page.properties.Description[page.properties.Description.type][0] ||= {
      plain_text: "",
    };
    page.properties.Note[page.properties.Note.type][0] ||= { plain_text: "" };

    return {
      id: page.id,
      title: page.properties.Type.title[0].plain_text,
      desc: page.properties.Description[page.properties.Description.type][0]
        .plain_text,
      note: page.properties.Note[page.properties.Note.type][0].plain_text,
      icon: page.icon.file.url,
      layout: page.properties.Layout[page.properties.Layout.type].name,
    };
  });

  const takeoutMenuItems = takeoutMenuDb.map((page) => {
    page.properties.Description[page.properties.Description.type][0] ||= {
      plain_text: "",
    };
    page.properties.Note[page.properties.Note.type][0] ||= { plain_text: "" };

    return {
      id: page.id,
      title: page.properties.Type.title[0].plain_text,
      desc: page.properties.Description[page.properties.Description.type][0]
        .plain_text,
      note: page.properties.Note[page.properties.Note.type][0].plain_text,
      icon: page.icon.file.url,
      layout: page.properties.Layout[page.properties.Layout.type].name,
    };
  });

  const regularItems = await Promise.all(
    regularMenuItems.map(async (category) => {
      const pages = await getBlock(category.id);
      return pages[0];
    })
  );

  const takeoutItems = await Promise.all(
    regularMenuItems.map(async (category) => {
      const pages = await getBlock(category.id);
      return pages[0];
    })
  );

  const regularChildren = await Promise.all(
    regularItems.map(async (item) => {
      const child = await getDatabase(item.id, "Item", "ascending");
      return child;
    })
  );

  const takeoutChildren = await Promise.all(
    takeoutItems.map(async (item) => {
      const child = await getDatabase(item.id, "Item", "ascending");
      return child;
    })
  );

  for (let i = 0; i < regularMenuItems.length; i++) {
    regularMenuItems[i].items = regularChildren[i];
  }

  for (let i = 0; i < takeoutMenuItems.length; i++) {
    takeoutMenuItems[i].items = takeoutChildren[i];
  }

  const miscData = [];
  try {
    const miscDatabase = await getDatabase(miscDbId, "Name");
    for (const item of miscDatabase) {
      miscData.push({
        id: item.id,
        type: item.properties.Name.title[0].plain_text,
        content:
          item.properties.Text.rich_text.length === 3
            ? [
                item.properties.Text.rich_text[0].plain_text,
                item.properties.Text.rich_text[1].plain_text,
                item.properties.Text.rich_text[2].plain_text,
              ]
            : item.properties.Text.rich_text[0].plain_text,
        link: item.properties.Text.rich_text[0].href
          ? item.properties.Text.rich_text[0].href
          : "",
        obj: item,
      });
    }
  } catch (error) {
    console.log(`Error with fetching Misc Data: ${error.message}`);
  }

  return {
    props: {
      misc: miscData,
      regularMenu: regularMenuItems,
      takeoutMenu: takeoutMenuItems,
    },
  };
}
