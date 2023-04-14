import MailSvg from "../../../../public/svgs/mail.svg";
import styled from "styled-components";

export default function MailIcon() {
  return (
    <a
      href="mailto:wwoon63@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Container>
        <StyledMailSvg alt="mail" width="70%" height="70%" />
      </Container>
    </a>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.media.desktop} {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }
  ${(props) => props.theme.media.mobile} {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
  background-color: white;
`;

const StyledMailSvg = styled(MailSvg)`
  fill: ${(props) => props.theme.colors.primary};
`;
