/* eslint-disable implicit-arrow-linebreak */
import { clientCredentials } from '../client';

const viewAllItems = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/items`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getSingleItem = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/items/${id}`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const viewOrderItems = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/ordermenuitem/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const deleteItemsFromOrder = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/ordermenuitem/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

const createItemToOrder = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/ordermenuitem`, {
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

export { viewAllItems, viewOrderItems, getSingleItem, deleteItemsFromOrder, createItemToOrder };
