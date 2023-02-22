import { Button, Container, Title } from '@mantine/core';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import useAuth from '../hooks/useAuth';

function Dashboard() {
  const user = useAuth();
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  return (
    <Container>
      <Title size='50px'>Current User: {user?.email ?? 'Logged out'}</Title>
      <Button onClick={logOut}>Logout</Button>
    </Container>
  );
}

export default Dashboard;
