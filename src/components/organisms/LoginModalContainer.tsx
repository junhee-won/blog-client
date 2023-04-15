import { useState, useEffect, KeyboardEvent } from "react";
import Cookies from "js-cookie";
import apiHelper from "../../modules/apiHelper";
import LoginModalPresenter from "./LoginModalPresenter";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function LoginModalContainer() {
  const [isLoginMoalOpen, setIsLoginModalOpen] = useState(true);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
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
      setIsLoginModalOpen(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      Login();
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
        setIsLoginModalOpen(false);
      } else {
        setIsLoginModalOpen(true);
      }
    });
  }, []);

  if (!isLoginMoalOpen) return null;
  else
    return (
      <div onKeyDown={handleKeyPress}>
        <LoginModalPresenter>
          <Input text={userId} setText={setUserId} />
          <Input text={password} setText={setPassword} type="password" />
          <Button text="로그인" onClick={Login} />
        </LoginModalPresenter>
      </div>
    );
}
