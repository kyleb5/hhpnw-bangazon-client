import React from 'react';
import Card from 'react-bootstrap/Card';

function OrderCard(orderObj) {
  return (
    <Card style={{ width: '18rem', margin: '10px', backgroundColor: 'darkgrey' }}>
      <Card.Body>
        <Card.Title></Card.Title>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    orderObj: PropTypes.shape({}),
  }),
};

export default OrderCard;
