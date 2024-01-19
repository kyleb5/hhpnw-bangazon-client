import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import CloseOrderForm from '../../../components/forms/CloseOrderForm';

export default function CloseOrder() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  return (
    <div>
      <CloseOrderForm />
    </div>
  );
}
