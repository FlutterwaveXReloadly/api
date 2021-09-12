import ioredis from "ioredis";

const redis = new ioredis();

export const get = async (key) => {
  const response = await redis.get(key);
  return response;
};

export const set = async (key, value) => {
  const response = await redis.setex(key, 86400, JSON.stringify(value));
  return response;
};
