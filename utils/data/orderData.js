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

const createOrder = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/orders`, {
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

const updateOrder = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/orders/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

// eslint-disable-next-line object-curly-newline
export { viewAllOrders, viewSingleOrder, deleteOrder, createOrder, updateOrder };
