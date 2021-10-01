import fetch from "./fetch";
import { env } from "../config/env";
import { get, set } from "./redis";

const getAccessToken = async (audience) => {
  const accessToken = await get(`${audience}_access_token`);
  if (accessToken) {
    return accessToken;
  }
  const response = await fetch(
    `${env.RELOADLY_AUTH_HOST}/token`,
    "POST",
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    {
      grant_type: "client_credentials",
      client_id: env.RELOADLY_CLIENT_ID,
      client_secret: env.RELOADLY_CLIENT_SECRET,
      audience,
    }
  );
  await set(
    `${audience}_access_token`,
    response.access_token,
    response.expires_in
  );
  return response.access_token || null;
};

export const getFxRate = async (operatorId, amount) => {
  const accessToken = await getAccessToken(`${env.RELOADLY_TOP_UP_HOST}`);
  const response = await fetch(
    `${env.RELOADLY_TOP_UP_HOST}/operators/fx-rate`,
    "POST",
    {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/com.reloadly.topups-v1+json",
      "Content-Type": "application/json",
    },
    {
      operatorId,
      amount,
    }
  );
  return response.fxRate || null;
};
export const airtimeTopup = async (
  operatorId,
  amount,
  recipientPhone,
  senderPhone
) => {
  const accessToken = await getAccessToken(`${env.RELOADLY_TOP_UP_HOST}`);
  const response = await fetch(
    `${env.RELOADLY_TOP_UP_HOST}/topups`,
    "POST",
    {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/com.reloadly.topups-v1+json",
      "Content-Type": "application/json",
    },
    {
      operatorId,
      amount,
      recipientPhone,
      senderPhone,
    }
  );
  return response;
};

export const getOperators = async () => {
  const cache = await get("operators");
  if (cache) {
    return cache;
  }
  const accessToken = await getAccessToken(`${env.RELOADLY_TOP_UP_HOST}`);
  const response = await fetch(`${env.RELOADLY_TOP_UP_HOST}/operators`, "GET", {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/com.reloadly.topups-v1+json",
  });
  await set("operators", response.content);
  return response.content || null;
};

export const getProducts = async () => {
  const accessToken = await getAccessToken(`${env.RELOADLY_GIFT_CARD_HOST}`);
  const response = await fetch(
    `${env.RELOADLY_GIFT_CARD_HOST}/products`,
    "GET",
    {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/com.reloadly.giftcards-v1+json",
    }
  );
  return response.content || null;
};

export const detectOperator = async (phoneNumber, country) => {
  const accessToken = await getAccessToken(`${env.RELOADLY_TOP_UP_HOST}`);
  const response = await fetch(
    `${env.RELOADLY_TOP_UP_HOST}/operators/auto-detect/phone/${phoneNumber}/countries/${country}?suggestedAmountsMap=true&SuggestedAmounts=true`,
    "GET",
    {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/com.reloadly.topups-v1+json",
    }
  );
  console.log(response);
  return response.id ? response : null;
};

export const getCountry = async () => {
  const accessToken = await getAccessToken(`${env.RELOADLY_TOP_UP_HOST}`);
  const response = await fetch(`${env.RELOADLY_TOP_UP_HOST}/countries`, "GET", {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/com.reloadly.topups-v1+json",
  });
  return response.length > 0 ? response : null;
};

export const orderGiftCard = async (
  productId,
  unitPrice,
  quantity,
  customIdentifier,
  recipientEmail,
  senderName
) => {
  const accessToken = await getAccessToken(`${env.RELOADLY_GIFT_CARD_HOST}`);
  const body = {
    productId,
    quantity,
    unitPrice,
    customIdentifier,
    recipientEmail,
    senderName,
  };
  const response = await fetch(
    `${env.RELOADLY_GIFT_CARD_HOST}/orders`,
    "POST",
    {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/com.reloadly.giftcards-v1+json",
      "Content-Type": "application/json",
    },
    body
  );
  console.log(response);
  return response.status === "SUCCESSFUL" ? response : null;
};

export const getredeemCode = async (transactionId) => {
  const accessToken = await getAccessToken(`${env.RELOADLY_GIFT_CARD_HOST}`);
  const response = await fetch(
    `${env.RELOADLY_GIFT_CARD_HOST}/orders/transactions/${transactionId}/cards`,
    "GET",
    {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/com.reloadly.giftcards-v1+json",
    }
  );
  console.log(response);
  return response.length > 0 ? response : null;
};
