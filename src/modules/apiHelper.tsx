import axios, { RawAxiosRequestHeaders } from "axios";

interface Props {
  url: string | undefined;
  method: string;
  jwt?: string;
  body?: Object;
}

export default async function apiHelper({ url, method, jwt, body }: Props) {
  const headers: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
  };
  if (jwt) {
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
