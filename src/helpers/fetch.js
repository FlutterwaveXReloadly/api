import fetch from "node-fetch";

export default async (url, method, headers, body) => {
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  return response.json();
};
