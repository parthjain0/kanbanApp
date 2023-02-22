import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { auth } from './firebaseConfig';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import AuthContext from './components/AuthProvider';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (tempUser) => setUser(tempUser));
    return () => {
      unlisten();
    };
  }, []);

  return (
    <AuthContext.Provider value={user}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MantineProvider>
      </ColorSchemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
