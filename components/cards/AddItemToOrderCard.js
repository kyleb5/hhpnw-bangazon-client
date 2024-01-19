/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { createItemToOrder } from '../../utils/data/itemData';
import { useAuth } from '../../utils/context/authContext';

function AddItemToOrderCard({ itemInOrderObj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  if (!user.hasAccess) {
    return (
      <div className="text-center">
        <h1>Access Denied</h1>
        <p>You don't have access to view this webpage.</p>
        <p>Please see a current MOD about access</p>
      </div>
    );
  }

  const addItemToOrder = (orders, items) => {
    createItemToOrder({ orders, items }).then(() => onUpdate());
  };

  return (
    <Card style={{ width: '100%', margin: '10px', backgroundColor: 'darkgrey' }} id={itemInOrderObj.id}>
      <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <Image src={itemInOrderObj.img} rounded style={{ width: '100px', height: '100px' }} draggable={false} />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <Card.Title style={{ marginBottom: '0' }}>{itemInOrderObj.name}</Card.Title>
          <Card.Text>Price: {itemInOrderObj.price}</Card.Text>
          <Card.Text>Description: {itemInOrderObj.description}</Card.Text>
        </div>
        <Button variant="warning" onClick={() => addItemToOrder(id, itemInOrderObj.id)}>
          Add
        </Button>
      </Card.Body>
    </Card>
  );
}

AddItemToOrderCard.propTypes = {
  itemInOrderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AddItemToOrderCard;
