/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import OrderForm from '../components/forms/OrderForm';
import { useAuth } from '../utils/context/authContext';

function CreateOrder() {
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

  return <OrderForm />;
}

export default CreateOrder;
