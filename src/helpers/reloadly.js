import fetch from './fetch';
import { env } from '../config/env';
import { get, set } from './redis';

const getAccessToken = async (audience) => {
    const accessToken = await get(`${audience}_access_token`);
    if (accessToken) {
        return accessToken;
    }
    const response = await fetch(`${env.RELOADLY_AUTH_HOST}/token`, 'POST', {
        grant_type: 'client_credentials',
        client_id: env.RELOADLY_CLIENT_ID,
        client_secret: env.RELOADLY_CLIENT_SECRET,
        audience,
    });
    await set(`${audience}_access_token`, response.access_token, response.expires_in);
    return response.access_token || null;
}

export const getFxRate = async (operatorId, amount) => {
    const accessToken = await getAccessToken(`${env.RAVE_TOP_UP_HOST}`);
    const response = await fetch(`${env.RAVE_TOP_UP_HOST}/operators/fx-rate`, 'POST', {
        Authorization: `Bearer ${accessToken}`,
        operatorId,
        amount
    });
    return response.fxRate || null;
}
export const airtimeTopup = async (operatorId, receiverPhone, number, amount) => {
    const accessToken = await getAccessToken(`${env.RAVE_TOP_UP_HOST}`);
    const response = await fetch(`${env.RAVE_TOP_UP_HOST}/topups`, 'POST', {
        Authorization: `Bearer ${accessToken}`,
        operatorId,
        amount,
        receiverPhone,
        number
    });
    return response;
}

export const getOperators = async () => {
    const cache = await get('operators');
    if (cache) {
        return cache;
    }
    const accessToken = await getAccessToken(`${env.RAVE_TOP_UP_HOST}`);
    const response = await fetch(`${env.RAVE_TOP_UP_HOST}/operators`, 'GET', {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
    });
    await set('operators', response.content);
    return response.content || null;
}

export const getProducts = async () => {
    const cache = await get('products');
    if (cache) {
        return cache;
    }
    const accessToken = await getAccessToken(`${env.RAVE_GIFT_CARD_HOST}`);
    const response = await fetch(`${env.RAVE_GIFT_CARD_HOST}/products`, 'GET', {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
    });
    await set('products', response.content);
    return response.content || null;
}