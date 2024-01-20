import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { Button, FloatingLabel } from 'react-bootstrap';
import { closeOrder } from '../../utils/data/revenueData';
import { useAuth } from '../../utils/context/authContext';
import { updateOrder, viewSingleOrder } from '../../utils/data/orderData';

const initialState = {
  paymentType: '',
  tipAmount: undefined,
};

function CloseOrderForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [orderDetails, setOrderDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const timestamp = new Date().getTime();

  useEffect(() => {
    if (id) {
      viewSingleOrder(id).then(setOrderDetails);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeOrder({ ...formInput, date: timestamp, orderid: id });
    updateOrder({ ...orderDetails, open: false, id });
    router.push(`/order/${id}`);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5 container">Close Order</h2>

        <FloatingLabel controlId="paymentTypeSelect" label="Payment Type" className="mb-3">
          <Form.Select name="paymentType" onChange={handleChange} value={formInput.paymentType}>
            <option value="">Select Payment Type</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Enter Tip Amount" className="mb-3">
          <Form.Control type="number" placeholder="Enter Tip Amount" name="tipAmount" value={formInput.tipAmount || ''} onChange={handleChange} required />
        </FloatingLabel>

        <Button variant="danger" type="submit">
          Close Order
        </Button>
      </Form>
    </div>
  );
}

export default CloseOrderForm;
