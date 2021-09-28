import ioredis from "ioredis";

const redis = new ioredis();

export const get = async (key) => {
  const response = await redis.get(key);
  return JSON.parse(response);
};

export const set = async (key, value, exp) => {
  const response = await redis.setex(key, exp || 86400, JSON.stringify(value));
  return response;
};
