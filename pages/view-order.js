/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Button, Row, Form } from 'react-bootstrap';
import Link from 'next/link';
import { viewAllOrders } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';
// eslint-disable-next-line import/no-unresolved
import ViewOrderCard from '../components/cards/viewOrderCard';

function ViewOrder() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  const getAllTheOrders = () => {
    viewAllOrders().then(setOrders);
  };

  useEffect(() => {
    if (user.hasAccess) {
      getAllTheOrders();
    }
  }, [user.hasAccess]);

  const updateOrders = () => {
    getAllTheOrders();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOrders = orders.filter((order) => order.orderName.toLowerCase().includes(searchQuery.toLowerCase()));

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
    <>
      <div>
        <Link passHref href="/create-order">
          <Button style={{ marginTop: '5px' }} variant="success">
            Create Order
          </Button>
        </Link>
      </div>
      <Form style={{ marginTop: '10px' }}>
        <Form.Group controlId="searchForm" style={{ marginBottom: '10px' }}>
          <Form.Control type="text" placeholder="Search by order name" value={searchQuery} onChange={handleSearchChange} style={{ height: '30px', fontSize: '14px', maxWidth: '300px' }} />
        </Form.Group>
      </Form>
      <Row>
        {filteredOrders.map((order) => (
          <ViewOrderCard key={order.id} viewOrderObj={order} onUpdate={updateOrders} />
        ))}
      </Row>
    </>
  );
}

export default ViewOrder;
