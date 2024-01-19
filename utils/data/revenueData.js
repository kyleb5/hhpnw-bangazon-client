/* eslint-disable implicit-arrow-linebreak */
import { clientCredentials } from '../client';

const closeOrder = (payload) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/revenue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getRevenueByOrderId = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/revenue/orderid/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

export { closeOrder, getRevenueByOrderId };
