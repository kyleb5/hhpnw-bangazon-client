import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../utils/context/authContext';
import { deleteOrder } from '../../utils/data/orderData';

function ViewOrderCard({ viewOrderObj, onUpdate }) {
  const { user } = useAuth();
  console.warn(user);

  const deleteThisOrder = () => {
    if (window.confirm(`Delete ${viewOrderObj.orderName}?`)) {
      deleteOrder(viewOrderObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '100%', margin: '10px', backgroundColor: 'darkgrey' }} id={viewOrderObj.id}>
      <Card.Body style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Card.Title style={{ marginBottom: '0' }}>Order Name: {viewOrderObj.orderName}</Card.Title>
          <Card.Text style={{ marginBottom: '0' }}>{viewOrderObj.open ? 'Order Status is Open' : 'Order Status is Closed'}</Card.Text>
          <Card.Text style={{ marginBottom: '0' }}>Email: {viewOrderObj.customerEmail}</Card.Text>
          <Card.Text>Phone: {viewOrderObj.customerPhone}</Card.Text>
        </div>
        {user.uid === viewOrderObj.uid && (
          <Button variant="danger" onClick={() => deleteThisOrder(viewOrderObj.id)}>
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

ViewOrderCard.propTypes = {
  viewOrderObj: PropTypes.shape({
    id: PropTypes.number,
    customerEmail: PropTypes.string,
    customerPhone: PropTypes.number,
    date: PropTypes.string,
    open: PropTypes.bool,
    orderName: PropTypes.string,
    orderType: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ViewOrderCard;
