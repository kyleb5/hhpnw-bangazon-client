/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import Link from 'next/link';
import { viewAllOrders } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';
// eslint-disable-next-line import/no-unresolved
import ViewOrderCard from '../components/cards/viewOrderCard';

function ViewOrder() {
  const [order, setOrders] = useState([]);
  const { user } = useAuth();

  if (!user.hasAccess) {
    return (
      <div className="text-center">
        <h1>Access Denied</h1>
        <p>You don't have access to view this webpage.</p>
        <p>Please see a current MOD about access</p>
      </div>
    );
  }

  const getAllTheOrders = () => {
    viewAllOrders().then(setOrders);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getAllTheOrders();
  }, []);

  const updateOrders = () => {
    getAllTheOrders();
  };

  return (
    <>
      <div>
        <Link passHref href="/create-order">
          <Button style={{ marginTop: '5px' }} variant="success">
            Create Order
          </Button>
        </Link>
      </div>
      <Row>
        {order.map((orders) => (
          <ViewOrderCard key={orders.id} viewOrderObj={orders} onUpdate={updateOrders} />
        ))}
      </Row>
    </>
  );
}

export default ViewOrder;
