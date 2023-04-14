import MailSvg from "../../../../public/svgs/mail.svg";
import styled from "styled-components";

interface Props {
  length: number;
}

export default function MailIcon({ length }: Props) {
  return (
    <a
      href="mailto:wwoon63@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Container length={length}>
        <StyledMailSvg
          alt="mail"
          width={(length * 7) / 10}
          height={(length * 7) / 10}
        />
      </Container>
    </a>
  );
}

const Container = styled.div<{ length: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.length}px`};
  height: ${(props) => `${props.length}px`};
  border-radius: ${(props) => `${props.length / 2}px`};
  background-color: white;
`;

const StyledMailSvg = styled(MailSvg)`
  fill: ${(props) => props.theme.colors.primary};
`;
