/* eslint-disable react/no-unescaped-entities */
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  // <Image src="https://i.imgur.com/RwB717Y.jpg" fluid />

  if (!user.hasAccess) {
    return (
      <div className="text-center">
        <h1>Access Denied</h1>
        <p>You don't have access to view this webpage.</p>
        <p>Please see a current MOD about access</p>
      </div>
    );
  }

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <Link passHref href="/create-order">
        <Button variant="success">Create Order</Button>
      </Link>
      <Link passHref href="/view-order">
        <Button variant="primary">View Orders</Button>
      </Link>
      <Link passHref href="/revenue">
        <Button variant="warning">View Revenue</Button>
      </Link>
    </div>
  );
}

export default Home;
