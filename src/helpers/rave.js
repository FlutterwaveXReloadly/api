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
      env.RAVE_HOST,
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
