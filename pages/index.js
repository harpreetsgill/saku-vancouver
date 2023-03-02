import Head from "next/head";
import Hero from "../components/UI/Hero";
import Gallery from "../components/UI/Gallery";
import InstagramFeed from "../components/UI/InstagramFeed";
import Locations from "../components/UI/Locations";
import InstaPlaceholder from "../public/insta-placeholder.jpeg";
import { getBlock, getDatabase } from "../lib/notion";

const miscDbId = process.env.MISC_DB_ID;
const galleryDbId = process.env.GALLERY_DB_ID;
const locationsDbId = process.env.LOCATIONS_DB_ID;
const instagramToken = process.env.INSTAGRAM_ID;

export default function HomePage({ misc, gallery, locations, instagram }) {
  const heroData = misc.filter((item) => item.type === "Hero Text");
  const franchiseeData = misc.filter((item) => item.type === "Franchisee Card");

  return (
    <>
      <Head>
        <title>Saku</title>
      </Head>
      <Hero data={heroData} />
      <Gallery data={gallery} />
      <InstagramFeed data={instagram} />
      <Locations data={[locations, franchiseeData]} />
    </>
  );
}

export async function getStaticProps() {
  const locationsDb = await getDatabase(locationsDbId, "Sort ID", "ascending");

  const locationsData = locationsDb.map((location) => {
    return {
      id: location.id,
      name: location.properties.Place[location.properties.Place.type][0][
        "plain_text"
      ],
      image: location.cover[location.cover.type].url,
      address:
        location.properties.Address[location.properties.Address.type][0].text
          .content,
      phone: location.properties.Phone[location.properties.Phone.type],
      doordash: location.properties.DoorDash[location.properties.DoorDash.type],
      ubereats: location.properties.UberEats[location.properties.UberEats.type],
    };
  });

  const addressBlocks = await Promise.all(
    locationsData.map(async (location) => {
      const block = await getBlock(location.id);
      return {
        id: block[0].id,
        days: block[0][block[0].type]["rich_text"][0]["plain_text"],
        timeBlocks: await getBlock(block[0].id),
      };
    })
  );

  for (let i = 0; i < locationsData.length; i++) {
    locationsData[i].days = addressBlocks[i].days;
    locationsData[i].time = addressBlocks[i].timeBlocks.map((timeBlock) => {
      return {
        id: timeBlock.id,
        timeBlock: timeBlock.paragraph.rich_text[0].plain_text,
        updated: timeBlock.last_edited_time,
      };
    });
  }

  const instaDataLatest = [];
  try {
    const instaResp = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption&access_token=${instagramToken}`
    );

    const instaData = await instaResp.json();

    if (instaData.data.length > 0) {
      const numberOfSlides =
        instaData.data.length >= 6 ? 6 : instaData.data.length;
      for (let i = 0; i < numberOfSlides; i++) {
        instaDataLatest.push(instaData.data[i]);
      }
    }
  } catch (error) {
    console.log(`Error fetching Instagram feed: ${error.message}`);
    for (let i = 0; i < 6; i++) {
      instaDataLatest.push({
        id: `inst-${i}`,
        media_url: InstaPlaceholder.src,
        permalink: "https://www.instagram.com/sakuvancouver/",
        status: "loading",
      });
    }
  }

  const galleryData = [];
  try {
    const galleryDatabase = await getDatabase(galleryDbId, "Item Number");
    for (const item of galleryDatabase) {
      galleryData.push({
        id: item.id,
        number: item.properties["Item Number"].number,
        name: item.properties.Name.title[0].plain_text,
        cover: item.cover.file.url,
        text:
          item.properties.Text.rich_text.length !== 0
            ? item.properties.Text.rich_text[0].plain_text
            : "",
        video:
          item.properties.Video.files.length !== 0
            ? item.properties.Video.files[0].file.url
            : "",
      });
    }
  } catch (error) {
    console.log(`Error with fetching Gallery Data: ${error.message}`);
  }

  const miscData = [];
  try {
    const miscDatabase = await getDatabase(miscDbId, "Name");
    for (const item of miscDatabase) {
      miscData.push({
        id: item.id,
        type: item.properties.Name.title[0].plain_text,
        // content: item.properties.Text.rich_text[0].plain_text,
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
      gallery: galleryData,
      locations: locationsData,
      instagram: instaDataLatest,
    },
  };
}
