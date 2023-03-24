import axios, { RawAxiosRequestHeaders } from "axios";
import Cookies from "js-cookie";

interface Props {
  url: string | undefined;
  method: string;
  jwt?: boolean;
  body?: Object;
}

export default async function apiHelper({ url, method, jwt, body }: Props) {
  const headers: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
  };
  if (jwt) {
    const jwt = Cookies.get("jwt");
    headers.Authorization = "Bearer " + jwt;
  }
  return axios({
    url,
    method,
    data: body,
    headers: headers,
  })
    .then((res) => {
      const data = res.data;
      return { data, success: true };
    })
    .catch((err) => {
      return { success: false, data: null };
    });
}
