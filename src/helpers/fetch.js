import fetch from "node-fetch";

const Fetch = async (url, method, headers, body) => {
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  const responseJson = await response.json();
  return responseJson;
};

export default Fetch;
