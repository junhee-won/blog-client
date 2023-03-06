import apiHelper from "../src/modules/apiHelper";

interface Res {
  id: number;
  updated_at: string;
}

interface Page {
  url: string;
  loc: string;
}

function generateSiteMap(pages: any) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://junhee.kr</loc>
     </url>
     ${pages
       .map(({ loc, lastmod }: any) => {
         return `
       <url>
           <loc>${loc}</loc>
           <lastmod>${lastmod}</lastmod>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: any) {
  let pages: Page[] = [];
  try {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_GET_ALL_POST,
      method: "GET",
    });
    if (!res.success) throw "error";

    const posts = res.data.map((item: Res) => {
      return {
        loc: process.env.SITE_URL + "/post/" + item.id,
        lastmod: item.updated_at.slice(0, 10),
      };
    });
    pages = [...pages, ...posts];
  } catch (e) {}
  try {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_GET_ALL_CATEGORIES_MAP,
      method: "GET",
    });

    const categories = res.data.map((item: Res) => {
      return {
        loc: process.env.SITE_URL + "/category/" + item.id,
        lastmod: item.updated_at.slice(0, 10),
      };
    });
    pages = [...pages, ...categories];
  } catch (e) {}

  const sitemap = generateSiteMap(pages);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
