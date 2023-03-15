import './App.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);
  const [register, setRegister] = useState({
    email: '',
    password: '',
  });
  const [login, setLogin] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { VITE_BASE_URL: baseURL } = import.meta.env;
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/auth/isAuth`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            contentType: 'application/json',
          },
        });
        const { status, user } = await response.json();

        if (status === 'failed') {
          return;
        }
        setUser({ email: user.email, id: user.id });
        console.log(user);

        setIsLoggedIn(true);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/api/v1/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: register.email,
          password: register.password,
        }),
      });
      const data = await response.json();

      if (data.status === 'failed') {
        console.log(data);
        return;
      }

      setUser({ email: data.user.email, id: data.user.id });
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`${baseURL}/api/v1/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: login.email,
          password: login.password,
        }),
      });
      const data = await response.json();

      if (data.status === 'failed') {
        setError({ message: data.message });
        return;
      }
      setUser({ email: data.user.email, id: data.user.id });

      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseURL}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUser(null);
      setIsLoggedIn(false);
      navigate('/');
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main>
      <h2>Client auth</h2>
      <hr />
      <h3>Register form</h3>
      <form className='register' onSubmit={handleRegister}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          value={register.email}
          onChange={(e) => setRegister({ ...register, email: e.target.value })}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={register.password}
          onChange={(e) =>
            setRegister({ ...register, password: e.target.value })
          }
        />
        <button type='submit' disabled={isLoggedIn}>
          register
        </button>
      </form>
      <hr />
      <h3>Login form</h3>
      <form className='login' onSubmit={handleLogin}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
        {error && <p style={{ color: 'red' }}>{error.message.toUpperCase()}</p>}
        <button type='submit' disabled={isLoggedIn}>
          login
        </button>
      </form>
      <hr />
      <button
        type='button'
        className='logout'
        disabled={!isLoggedIn}
        onClick={handleLogout}
      >
        logout
      </button>
      <hr />
      <Link to={'/secure'}>
        <button>To secure page</button>
      </Link>
      <hr />
      {!user ? (
        <p>Unauthorized</p>
      ) : (
        <>
          <h3>Profile</h3>
          <p>user id: {user?.id}</p>
          <p>email: {user?.email}</p>
          <p>Logged in: {user ? 'true' : 'false'}</p>
        </>
      )}
    </main>
  );
};

export default App;
