import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Flex, Image, Text, Title } from '@mantine/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebaseConfig';
import useAuth from '../hooks/useAuth';

function Login() {
  const user = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  // Signup
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Signin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {}
  };

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, newEmail, newPassword);
    } catch (error) {}
  };

  const logInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

  return (
    <Container>
      <Flex direction='column' my='50px'>
        <Flex gap='xl' align='center' justify='center'>
          <Image radius='md' src='/favicon.png' alt='Logo' height='60px' width='60px' />{' '}
          <Title size='50px'>Jira</Title>
        </Flex>
      </Flex>
      <Flex direction='column' my='50px' p='xl' align='center' justify='center' rowGap='xl'>
        <Text size='lg' weight='bold'>
          Login to Jira
        </Text>
      </Flex>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='newEmail'>New Email</label>
        <input
          type='text'
          id='newEmail'
          placeholder='Enter Email'
          onChange={(e) => setNewEmail(e.target.value)}
          value={newEmail}
        />
        <label htmlFor='newPassword'>New Password</label>
        <input
          type='password'
          id='newPassword'
          placeholder='Enter password'
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <Button onClick={signUp}>Sign Up</Button>
      </form>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          id='email'
          placeholder='Enter Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          placeholder='Enter password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button onClick={login}>Login</Button>
      </form>
      <Button onClick={logInWithGoogle}>Continue With Google</Button>
      <Title size='50px'>Current User: {user?.email ?? 'Logged out'}</Title>
    </Container>
  );
}

export default Login;
