/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Button, Row } from 'react-bootstrap';
import Link from 'next/link';
import { viewSingleOrder } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';
import { viewOrderItems } from '../../utils/data/itemData';
import ItemCard from '../../components/cards/ItemCard';

export default function ViewOrderDetails() {
  const [orderDetails, setOrderDetails] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const orderDate = new Date(orderDetails.date);
  const year = orderDate.getFullYear();
  const month = orderDate.getMonth() + 1;
  const day = orderDate.getDate();

  useEffect(() => {
    if (id) {
      viewSingleOrder(id).then(setOrderDetails);
      viewOrderItems(id).then(setOrderItems);
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

  return (
    <div className="center-container">
      <h1>Order Details</h1>
      <div>
        <Card style={{ width: '100%', margin: '10px', backgroundColor: 'darkgrey' }} id={orderDetails.id}>
          <Card.Title>Order: {orderDetails.orderName}</Card.Title>
          <Card.Text style={{ marginBottom: '0' }}>{orderDetails.open ? 'Order Status is Open' : 'Order Status is Closed'}</Card.Text>
          <Card.Text style={{ marginBottom: '0' }}>Email: {orderDetails.customerEmail}</Card.Text>
          <Card.Text style={{ marginBottom: '0' }}>Phone: {orderDetails.customerPhone}</Card.Text>
          <Card.Text style={{ marginBottom: '0' }}>
            Date Created: {month}-{day}-{year}
          </Card.Text>
        </Card>
      </div>
      {user.uid === orderDetails.uid && (
        <Link passHref href={`/order/edit/${orderDetails.id}`}>
          <Button variant="primary">Edit Order</Button>
        </Link>
      )}
      <div>
        Items
        {orderItems.length > 0 ? (
          <Row>
            {orderItems.map((orderItem) => (
              <ItemCard key={orderItem.id} viewItemObj={orderItem} onUpdate={updateItems} />
            ))}
          </Row>
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
  );
}
