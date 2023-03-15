import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Secure = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { VITE_BASE_URL: baseURL } = import.meta.env;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/auth/isAuth`, {
          credentials: 'include',
        });
        const data = await response.json();

        if (data.status === 'failed') {
          navigate('/');
          return;
        }
        setUser({
          email: data.user.email,
          id: data.user.id,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      {user && (
        <>
          <h1>Secure</h1>
          <h3>{user.email}</h3>
          <Link to='/'>
            <button>Home</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Secure;
