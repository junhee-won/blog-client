import Head from "next/head";
import apiHelper from "../src/modules/apiHelper";

import HomeTemplate from "../src/components/templates/HomeTemplate";
import { Category, Post } from "../src/types/interfaces";

interface Props {
  categories: Category[];
  posts: Post[];
}

function Home({ categories, posts }: Props) {
  return (
    <>
      <Head>
        <title>개발이 개발새발</title>
        <meta name="description" content="개발새발 개발 블로그" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="개발이 개발새발" />
        <meta property="og:site_name" content="개발이 개발새발" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://heeground.com" />
        <meta property="og:description" content="개발새발 개발 블로그" />
        <meta
          property="og:image"
          content="https://d1qlsar6961fb5.cloudfront.net/etc/og-image.png"
        />
        <meta
          name="naver-site-verification"
          content="13d7b00d31715c3eb02b20f1da5a84e345ed34e1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeTemplate categories={categories} posts={posts} />
    </>
  );
}

Home.getInitialProps = async () => {
  const postsRes = await apiHelper({
    url: process.env.NEXT_PUBLIC_API_GET_ALL_POST,
    method: "GET",
  });

  const posts = postsRes.success ? postsRes.data : [];

  const categoriesRes = await apiHelper({
    url: process.env.NEXT_PUBLIC_API_GET_ALL_CATEGORIES,
    method: "GET",
  });
  const categories = categoriesRes.success ? categoriesRes.data : [];
  return { posts, categories };
};

export default Home;
