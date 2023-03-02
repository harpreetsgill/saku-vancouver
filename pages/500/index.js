import Head from "next/head";
import Error from "../../components/UI/Error";
import { getDatabase } from "../../lib/notion";
const miscDbId = process.env.MISC_DB_ID;

export default function ServerErrorPage() {
  return (
    <>
      <Head>
        <title>500 - Saku</title>
      </Head>
      <Error code="500" />
    </>
  );
}

export async function getStaticProps() {
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
    },
  };
}
