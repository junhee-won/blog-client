import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import apiHelper from "../../src/modules/apiHelper";

interface Post {
  id: number;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let fields;
  try {
    const allPosts = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_GET_ALL_POST,
      method: "GET",
    });
    if (!allPosts.success) throw "error";

    fields = allPosts.data.map((item: Post) => {
      return {
        loc: process.env.SITE_URL + "/post/" + item.id,
        lastmod: new Date().toISOString(),
      };
    });
  } catch (e) {
    fields = [];
  }

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
