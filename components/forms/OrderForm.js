import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, updateOrder } from '../../utils/data/orderData';

const initialState = {
  customerEmail: '',
  customerPhone: undefined,
  open: true,
  orderName: '',
  orderType: '',
};

function OrderForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const timestamp = new Date().getTime();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.id) {
      updateOrder({ ...formInput, id: obj.id });
    } else {
      createOrder({ ...formInput, uid: user.uid, date: timestamp });
    }

    router.push('/view-order');
  };

  return (
    <div className="center-block-container">
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5 container">{obj.id ? 'Update' : 'Create'} Order</h2>

        <FloatingLabel controlId="floatingInput1" label="Enter Order Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter a Order Name" name="orderName" value={formInput.orderName} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Enter Email" className="mb-3">
          <Form.Control type="text" placeholder="Enter a Email" name="customerEmail" value={formInput.customerEmail} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Enter Phone Number" className="mb-3">
          <Form.Control type="number" placeholder="Enter Phone Number" name="customerPhone" value={formInput.customerPhone || ''} onChange={handleChange} required />
        </FloatingLabel>
        <Form.Label className="mr-4">Order Type</Form.Label>
        <Form.Group controlId="orderType" className="mb-3">
          <Form.Check type="radio" label="Phone" name="orderType" value="phone" checked={formInput.orderType === 'phone'} onChange={handleChange} inline />
          <Form.Check type="radio" label="In-Person" name="orderType" value="in-person" checked={formInput.orderType === 'in-person'} onChange={handleChange} inline />
        </Form.Group>

        <Button style={{ marginLeft: '50px' }} type="submit">
          {obj.id ? 'Update' : 'Create'} Order
        </Button>
      </Form>
    </div>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    customerEmail: PropTypes.string,
    customerPhone: PropTypes.number,
    date: PropTypes.number,
    open: PropTypes.bool,
    orderName: PropTypes.string,
    orderType: PropTypes.string,
    uid: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};

export default OrderForm;
