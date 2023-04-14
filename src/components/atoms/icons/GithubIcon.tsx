import styled from "styled-components";
import GithubSvg from "../../../../public/svgs/github.svg";

export default function GithubIcon() {
  return (
    <a
      href="https://github.com/junhee-won"
      target="_blank"
      rel="noopener noreferrer"
    >
      <StyledGithubSvg alt="github" />
    </a>
  );
}

const StyledGithubSvg = styled(GithubSvg)`
  ${(props) => props.theme.media.desktop} {
    width: 50px;
    height: 50px;
  }
  ${(props) => props.theme.media.mobile} {
    width: 30px;
    height: 30px;
  }
`;
