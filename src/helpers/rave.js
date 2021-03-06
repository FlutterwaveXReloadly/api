import Fetch from "./fetch";
import { env } from "../config/env";

export const standard = async (amount, tx_ref, meta, customer) => {
   const body = {
      amount,
      currency: "USD",
      payment_options: "card",
      tx_ref,
      meta,
      redirect_url: env.RAVE_REDIRECT_URL,
      customer,
       customizations: {
        title: "WorkHaus bounty deposit",
        description:
          "This amount of money will be used to pay users that will complete the task",
       },
       logo: 'https://assets.piedpiper.com/logo.png'
    };
    const response = await Fetch(
      `${env.RAVE_HOST}/payments`,
      "POST",
      {
        Authorization: `Bearer ${env.RAVE_SEC}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body
    );
    return response;
};

export const transVerify = async (transId) => {
  const response = await Fetch(
    `${env.RAVE_HOST}/transactions/${transId}/verify`,
    'GET',
    {
      Authorization: `Bearer ${env.RAVE_SEC}`,
    }
  );
  return response;
}

export const transfers = async (raw) => {
  const response = await Fetch(`${env.RAVE_HOST}/transfers`, 'POST', {
    Authorization: `Bearer ${env.RAVE_SEC}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  }, raw);
  return response;
};

export const verifyTransfer = async (id) => {
  const response = await Fetch(`${env.RAVE_HOST}/transfers/${id}`, 'GET', {
    Authorization: `Bearer ${env.RAVE_SEC}`,
  });
  return response;
};

export const getBanks = async (country) => {
  const response = await Fetch(`${env.RAVE_HOST}/banks/${country}`, 'GET', {
    Authorization: `Bearer ${env.RAVE_SEC}`
  });
  return response;
}
