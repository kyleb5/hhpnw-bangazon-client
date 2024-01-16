import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Row } from 'react-bootstrap';
import { viewAllOrders } from '../utils/data/orderData';
import ViewOrderCard from '../components/cards/viewOrderCard';

function ViewOrder() {
  const [order, setOrders] = useState([]);
  const router = useRouter();

  const getAllTheOrders = () => {
    viewAllOrders().then(setOrders);
  };

  useEffect(() => {
    getAllTheOrders();
  }, []);

  const updateOrders = () => {
    getAllTheOrders();
  };

  console.warn(order);

  return (
    <>
      <div>
        <Button style={{ marginTop: '5px' }} variant="success">
          Create Order
        </Button>
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
