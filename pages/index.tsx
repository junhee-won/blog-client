import styled from "styled-components";
import Head from "next/head";
import { useMedia } from "../src/hooks/useMedia";
import apiHelper from "../src/modules/apiHelper";
import { PostCardInterface, CategoryInterface } from "../src/types/interfaces";
import MobileHeader from "../src/components/home/MobileHeader";
import LeftSide from "../src/components/home/LeftSide";
import Main from "../src/components/home/Main";
import CategoryModal from "../src/components/home/CategoryModal";

interface Props {
  postCards: PostCardInterface[];
  categories: CategoryInterface[];
}

function Home({ postCards, categories }: Props) {
  const media = useMedia();

  return (
    <>
      <Head>
        <title>개발이 개발새발</title>
        <meta name="description" content="개발이 개발새발" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="개발이 개발새발" />
        <meta property="og:site_name" content="개발이 개발새발" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://junhee.kr" />
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
      <Container isMobile={media === "mobile"}>
        {media === "mobile" ? <MobileHeader media={media} /> : <LeftSide />}
        <Main postCards={postCards} media={media} />
        {media !== "mobile" && <CategoryModal categories={categories} />}
      </Container>
    </>
  );
}

Home.getInitialProps = async () => {
  const postCardsRes = await apiHelper({
    url: process.env.NEXT_PUBLIC_API_GET_NEW_POST,
    method: "GET",
  });
  const postCards = postCardsRes.success ? postCardsRes.data : [];

  const categoriesRes = await apiHelper({
    url: process.env.NEXT_PUBLIC_API_GET_ALL_CATEGORIES,
    method: "GET",
  });
  const categories = categoriesRes.success ? categoriesRes.data : [];
  return { postCards, categories };
};

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
`;

export default Home;
