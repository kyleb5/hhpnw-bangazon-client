import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../utils/context/authContext';
import { deleteItemsFromOrder } from '../../utils/data/itemData';
import { viewSingleOrder } from '../../utils/data/orderData';

function ItemCard({ viewItemObj, onUpdate }) {
  const router = useRouter();
  const { id } = router.query;
  const [orderDetails, setOrderDetails] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      viewSingleOrder(id).then(setOrderDetails);
    }
  }, [id]);

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
        {user.uid === viewItemObj.order_uid && orderDetails.open && (
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
