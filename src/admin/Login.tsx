import styled from "styled-components";
import { useState } from "react";
import apiHelper from "../modules/apiHelper";

interface Props {
  setToken: (arg: string) => void;
}

export default function Login({ setToken }: Props) {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const Login = async () => {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_LOGIN,
      method: "POST",
      body: {
        user_id: userId,
        password: password,
      },
    });
    if (res) {
      setToken(res.access_token);
    }
  };

  return (
    <Container>
      <Input value={userId} onChange={(e) => setUserId(e.target.value)} />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <Button onClick={Login}>로그인</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  height: 500px;
  width: 500px;
  text-align: center;
`;

const Input = styled.input`
  height: 50px;
  width: 300px;
  margin: 10px;
  padding: 10px;
`;

const Button = styled.div`
  height: 50px;
  width: 300px;
  margin: 10px;
  background-color: RGB(66, 132, 243);
  color: white;
  line-height: 50px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(7, 47, 116);
  }
`;
