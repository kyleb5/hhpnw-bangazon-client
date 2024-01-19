/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewSingleOrder } from '../../../utils/data/orderData';
import OrderForm from '../../../components/forms/OrderForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditOrder() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth();

  useEffect(() => {
    viewSingleOrder(id).then(setEditItem);
  }, [id]);

  if (!user.hasAccess) {
    return (
      <div className="text-center">
        <h1>Access Denied</h1>
        <p>You don't have access to view this webpage.</p>
        <p>Please see a current MOD about access</p>
      </div>
    );
  }

  return <OrderForm obj={editItem} />;
}
