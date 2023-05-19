import styled from "styled-components";
import Image from "next/image";

export default function ConeIcon() {
  return (
    <Wrapper>
      <Image src="/svgs/cone.svg" alt="cone icon" fill sizes="100%" priority />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  object-fit: contain;
  ${(props) => props.theme.media.desktop} {
    width: 50px;
    height: 50px;
  }
  ${(props) => props.theme.media.mobile} {
    width: 30px;
    height: 30px;
  }
`;
