import { useState, useEffect, KeyboardEvent } from "react";
import Cookies from "js-cookie";
import apiHelper from "../../../modules/apiHelper";
import Login from "./Login";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

interface Props {
  setIsLogin: (arg: boolean) => void;
}

export default function LoginContainer({ setIsLogin }: Props) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_LOGIN,
      method: "POST",
      body: {
        user_id: userId,
        password: password,
      },
    });
    if (res.success) {
      Cookies.set("jwt", res.data.access_token);
      setIsLogin(true);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      login();
    }
  };

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (!jwt) return;
    apiHelper({
      url: process.env.NEXT_PUBLIC_API_SERVER + "/validate",
      method: "GET",
      jwt: true,
    }).then((res) => {
      if (res.success) {
        setIsLogin(true);
      }
    });
  }, []);

  return (
    <div onKeyDown={handleKeyPress}>
      <Login>
        <Input text={userId} setText={setUserId} />
        <Input text={password} setText={setPassword} type="password" />
        <Button text="로그인" onClick={login} />
      </Login>
    </div>
  );
}
