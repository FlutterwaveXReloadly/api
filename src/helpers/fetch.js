import fetch from "node-fetch";

const Fetch = async (url, method, headers, body) => {
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  return await response.json();
};

export default Fetch;
