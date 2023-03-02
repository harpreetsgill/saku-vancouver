import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });

export const getDatabase = async (
  databaseId,
  sortProperty = "Sort ID",
  sortDirection = "ascending"
) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: sortProperty,
        direction: sortDirection,
      },
    ],
  });
  return response.results;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  });
  return response;
};

export const getBlock = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};
