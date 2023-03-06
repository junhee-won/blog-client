import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useMedia } from "../src/hooks/useMedia";
import MobileNavbar from "../src/components/MobileNavbar";
import apiHelper from "../src/modules/apiHelper";
import GithubLogo from "../public/github-mark.svg";
import TistoryLogo from "../public/tistory-logo.svg";
import Hamburger from "../public/hamburger.svg";
import XLogo from "../public/x.svg";
import { Row } from "../src/components/common/Row";

interface Props {
  posts: PostType[];
  categories: CategoryType[];
}

interface CategoryTree {
  id: number;
  name: string;
}

interface PostType {
  id: number;
  title: string;
  created_at: string;
  categoryTree: CategoryTree[];
  thumbnail: string;
}

interface CategoryType {
  id: number;
  name: string;
  children: {
    id: number;
    name: string;
  }[];
}

function Home({ posts, categories }: Props) {
  const media = useMedia();
  const [activeCategoryModal, setActiveCategoryModal] = useState(false);

  const toggleActiveCategoryModal = () => {
    setActiveCategoryModal(!activeCategoryModal);
  };

  return (
    <>
      <Head>
        <title>개발이 개발새발</title>
        <meta name="description" content="개발이 개발새발" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="NdpeE1O9cq2cINgWWi4KQsDytrXaSMknBnf7psY5oyE"
        />
        <meta
          name="naver-site-verification"
          content="13d7b00d31715c3eb02b20f1da5a84e345ed34e1"
        />
      </Head>
      {media === "mobile" ? (
        <MContainer>
          <MobileNavbar media={media} />
          <MPostsContainer>
            {posts?.map((post, index) => {
              return (
                <Link href={`/post/${post.id}`} key={index}>
                  <MPostBox>
                    {post.thumbnail && (
                      <MImageBox>
                        <Image
                          alt="thumbnail"
                          src={post.thumbnail}
                          priority
                          sizes="167px"
                          width={167}
                          height={98}
                          placeholder="empty"
                        />
                      </MImageBox>
                    )}
                    <_Container>
                      <MPostTitle>{post.title}</MPostTitle>
                      <MPostBottom>
                        <Row>
                          {/* <Link href={`/category/${post.categoryTree[0].id}`}> */}
                          <MPostCategory>
                            {post.categoryTree[0].name + " "}
                          </MPostCategory>
                          {/* </Link> */}
                          {post.categoryTree[1] && (
                            <>
                              &nbsp;/&nbsp;
                              <MPostCategory>
                                {/* <Link
                                  href={`/category/${post.categoryTree[1].id}`}
                                > */}
                                {post.categoryTree[1].name}
                                {/* </Link> */}
                              </MPostCategory>
                            </>
                          )}
                        </Row>
                        <MPostDate>{post.created_at}</MPostDate>
                      </MPostBottom>
                    </_Container>
                  </MPostBox>
                </Link>
              );
            })}
          </MPostsContainer>
        </MContainer>
      ) : (
        <Container>
          <Left>
            <TitleContainer>
              <BlindTitle>개발이 개발새발</BlindTitle>
              <Title dir="start">개발이</Title>
              <Title dir="end">개발새발</Title>
            </TitleContainer>
            <LogoContainer>
              <a
                href="https://github.com/junhee-won"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogoBox>
                  <Image src={GithubLogo} alt="github" width={50} height={50} />
                </LogoBox>
              </a>
              <a
                href="https://junhee-hee.tistory.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogoBox>
                  <Image
                    src={TistoryLogo}
                    alt="tistory"
                    width={50}
                    height={50}
                  />
                </LogoBox>
              </a>
            </LogoContainer>
          </Left>
          <Right>
            <PostContainer>
              {posts?.map((post, index) => {
                return (
                  <PostCard key={index}>
                    <Link href={`/post/${post.id}`}>
                      <PostTitle>{post.title}</PostTitle>
                      {post.thumbnail && (
                        <ImageBox>
                          <Image
                            alt="thumbnail"
                            src={post.thumbnail}
                            priority
                            sizes="276px"
                            width="276"
                            height="155"
                            placeholder="empty"
                          />
                        </ImageBox>
                      )}
                    </Link>
                    <PostBottom>
                      <Row>
                        <Link href={`/category/${post.categoryTree[0].id}`}>
                          <PostCategory>
                            {post.categoryTree[0].name + " "}
                          </PostCategory>
                        </Link>
                        {post.categoryTree[1] && (
                          <>
                            &nbsp;/&nbsp;
                            <PostCategory>
                              <Link
                                href={`/category/${post.categoryTree[1].id}`}
                              >
                                {post.categoryTree[1].name}
                              </Link>
                            </PostCategory>
                          </>
                        )}
                      </Row>
                      <PostDate>{post.created_at}</PostDate>
                    </PostBottom>
                  </PostCard>
                );
              })}
            </PostContainer>
            <CategoryHamburger onClick={toggleActiveCategoryModal}>
              <Image
                src={Hamburger}
                alt="hamburger-menu"
                width={50}
                height={50}
              />
            </CategoryHamburger>
          </Right>
          <CategoryModalBack
            onClick={toggleActiveCategoryModal}
            active={activeCategoryModal}
          >
            <CategoryModalContainer
              onClick={(e) => e.stopPropagation()}
              active={activeCategoryModal}
            >
              <CategoryHamburger onClick={toggleActiveCategoryModal}>
                <Image src={XLogo} alt="x" width={50} height={50} />
              </CategoryHamburger>
              {/* <AllPosts>전체보기</AllPosts> */}
              {categories.map((parentCategory, index) => {
                return (
                  <ParentCategory key={index}>
                    <Link href={`/category/${parentCategory.id}`}>
                      {parentCategory.name}
                    </Link>
                    {parentCategory?.children?.map(
                      (childCategory, childIndex) => {
                        return (
                          <ChildCategory key={childIndex}>
                            <Link
                              href={`/category/${childCategory.id}`}
                              key={childIndex}
                            >
                              - {childCategory.name}
                            </Link>
                          </ChildCategory>
                        );
                      }
                    )}
                  </ParentCategory>
                );
              })}
            </CategoryModalContainer>
          </CategoryModalBack>
        </Container>
      )}
    </>
  );
}

Home.getInitialProps = async () => {
  const postsRes = await apiHelper({
    url: process.env.NEXT_PUBLIC_API_GET_NEW_POST,
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

const Container = styled.div`
  display: flex;
  width: 100vw;
`;

const MContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Left = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  height: 100vh;
  overflow: hidden;
  background-color: #4e5684;
  color: white;
`;

const TitleContainer = styled.div`
  position: relative;
  width: 270px;
  height: 200px;
  transform: rotate(-5deg);
`;

const Title = styled.div`
  width: 100%;
  text-align: ${(props) => props.dir};
  line-height: 100px;
  font-size: 60px;
  font-weight: 500;
`;

const BlindTitle = styled.h1`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  bottom: 20px;
  width: 100%;
  height: 50px;
  padding: 0 20px 0;
`;

const LogoBox = styled.div`
  height: 50px;
  width: 50px;
`;

const Right = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 300px));
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-height: 100vh;
  padding: 50px;
  overflow-y: scroll;
`;

const _Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 5px 10px 5px;
`;

const MPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
`;

const MPostBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
  height: 100px;
  width: 95vw;
  min-width: 200px;
`;

const MPostTitle = styled.h3`
  width: 90%;
  height: 50px;
  margin-top: 10px;
  line-height: 50px;
  overflow: hidden;
`;

const MPostBottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: gray;
`;

const MPostCategory = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  font-weight: 500;
  overflow-x: hidden;
`;

const MPostDate = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: 500;
  overflow-x: hidden;
`;

const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 276px;
  height: 300px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.05);
  }
`;

const MImageBox = styled.div`
  position: relative;
  height: 98px;
  width: 167px;
`;

const ImageBox = styled.div`
  position: relative;
  width: 276px;
  height: 155px;
  align-self: center;
`;

const PostTitle = styled.h3`
  width: 276px;
  height: 60px;
  margin: 15px 0 15px;
  padding: 10px;
  text-align: center;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PostBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 20px 0;
  color: gray;
`;

const PostCategory = styled.div`
  max-width: 90px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: gray;
  &:hover {
    color: black;
  }
`;

const PostDate = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: gray;
`;

const CategoryHamburger = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  height: 50px;
  width: 50px;
`;
const CategoryModalBack = styled.div<{ active: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.active ? 1 : 0)};
  visibility: ${(props) => !props.active && "hidden"};
  transition: all 0.2s ease-in-out;
`;

const CategoryModalContainer = styled.div<{ active: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 320px;
  height: 100vh;
  padding: 100px 50px 100px;
  background-color: #4e5684;
  color: white;
  right: ${(props) => (props.active ? "0px" : "-320px")};
  transition: all 0.2s ease-in-out;
`;

const AllPosts = styled.div`
  margin-bottom: 50px;
  font-size: 24px;
  font-weight: 700;
`;

const ParentCategory = styled.div`
  width: 220px;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChildCategory = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 12px;
  padding-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
