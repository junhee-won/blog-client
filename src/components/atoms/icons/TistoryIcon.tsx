import styled from "styled-components";
import TistorySvg from "../../../../public/svgs/tistory.svg";

export default function TistoryIcon() {
  return (
    <a
      href="https://junhee-hee.tistory.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <StyledTistorySvg alt="tistory" />
    </a>
  );
}

const StyledTistorySvg = styled(TistorySvg)`
  ${(props) => props.theme.media.desktop} {
    width: 50px;
    height: 50px;
  }
  ${(props) => props.theme.media.mobile} {
    width: 30px;
    height: 30px;
  }
`;
