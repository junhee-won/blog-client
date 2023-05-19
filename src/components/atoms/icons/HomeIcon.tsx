import styled from "styled-components";
import Link from "next/link";
import HomeSvg from "../../../../public/svgs/home.svg";

export default function HomeIcon() {
  return (
    <Link href="/">
      <StyledHomeSvg alt="tistory" />
    </Link>
  );
}

const StyledHomeSvg = styled(HomeSvg)`
  fill: ${(props) => props.theme.colors.primary};
  ${(props) => props.theme.media.desktop} {
    width: 150px;
    height: 150px;
  }
  ${(props) => props.theme.media.mobile} {
    width: 70px;
    height: 70px;
  }
`;
