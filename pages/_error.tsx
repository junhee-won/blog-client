import Head from "next/head";
import ErrorTemplate from "../src/components/templates/ErrorTemplate";

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>!잘못된 접근!</title>
        <meta name="description" content="개발이 개발새발" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="띠요잉! 존재하지 않는 페이지 입니다"
        />
        <meta property="og:site_name" content="개발이 개발새발" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content="개발새발 개발 블로그" />
        <meta
          property="og:image"
          content="https://d1qlsar6961fb5.cloudfront.net/etc/og-image.png"
        />
      </Head>
      <ErrorTemplate />
    </>
  );
}
