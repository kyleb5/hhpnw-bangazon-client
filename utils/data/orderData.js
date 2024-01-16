/* eslint-disable implicit-arrow-linebreak */
import { clientCredentials } from '../client';

const viewAllOrders = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/orders`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const viewSingleOrder = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const deleteOrder = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { viewAllOrders, viewSingleOrder, deleteOrder };
