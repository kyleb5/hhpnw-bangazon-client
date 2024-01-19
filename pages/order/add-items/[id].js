/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button, Row } from 'react-bootstrap';
import { useAuth } from '../../../utils/context/authContext';
import { viewAllItems, viewOrderItems } from '../../../utils/data/itemData';
import AddItemToOrderCard from '../../../components/cards/AddItemToOrderCard';
import ItemCard from '../../../components/cards/ItemCard';

export default function AddItemsToOrder() {
  const [orderItems, setOrderItems] = useState([]);
  const [items, setItems] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      viewOrderItems(id).then(setOrderItems);
      viewAllItems().then(setItems);
    }
  }, [id]);

  const updateItems = () => {
    viewOrderItems(id).then(setOrderItems);
  };

  if (!user.hasAccess) {
    return (
      <div className="text-center">
        <h1>Access Denied</h1>
        <p>You don't have access to view this webpage.</p>
        <p>Please see a current MOD about access</p>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    orderItems.forEach((orderItem) => {
      totalPrice += orderItem.item_details.price;
    });
    return totalPrice;
  };

  return (
    <div>
      <h1>Order Total: {calculateTotalPrice()}</h1>
      <h1>Available Items to Add</h1>
      <Row>
        {items.map((item) => (
          <AddItemToOrderCard key={item.id} itemInOrderObj={item} onUpdate={updateItems} />
        ))}
      </Row>
      <h1>Current Items</h1>
      {orderItems.length > 0 ? (
        <Row>
          {orderItems.map((orderItem) => (
            <ItemCard key={orderItem.id} viewItemObj={orderItem} onUpdate={updateItems} />
          ))}
        </Row>
      ) : (
        <p>None</p>
      )}
    </div>
  );
}
