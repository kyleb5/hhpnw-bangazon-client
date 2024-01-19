import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../utils/context/authContext';
import { deleteItemsFromOrder } from '../../utils/data/itemData';

function ItemCard({ viewItemObj, onUpdate }) {
  const { user } = useAuth();

  const deleteItemFromOrder = () => {
    if (window.confirm(`Delete ${viewItemObj.item_details.name}?`)) {
      deleteItemsFromOrder(viewItemObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '100%', margin: '10px', backgroundColor: 'darkgrey' }} id={viewItemObj.id}>
      <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <Image src={viewItemObj.item_details.img} rounded style={{ width: '100px', height: '100px' }} draggable={false} />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <Card.Title style={{ marginBottom: '0' }}>{viewItemObj.item_details.name}</Card.Title>
          <Card.Text>Price: {viewItemObj.item_details.price}</Card.Text>
          <Card.Text>Description: {viewItemObj.item_details.description}</Card.Text>
        </div>
        {user.uid === viewItemObj.order_uid && (
          <Button variant="danger" onClick={() => deleteItemFromOrder(viewItemObj.id)}>
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  viewItemObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    orders: PropTypes.number.isRequired,
    items: PropTypes.number.isRequired,
    order_uid: PropTypes.string.isRequired,
    item_details: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ItemCard;
