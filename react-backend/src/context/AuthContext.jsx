import { createContext, useContext, useState, useEffect } from 'react';
import { request } from '../util/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in by checking localStorage
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const address = localStorage.getItem('address');
    const image = localStorage.getItem('image');
    const type = localStorage.getItem('type');

    if (id && email) {
      setUser({
        id,
        name,
        email,
        profile: {
          phone,
          address,
          image,
          type
        }
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = { email, password };
      const res = await request("auth/login", "post", data);
      if (res && res.user) {
        localStorage.setItem("id", res.user.id);
        localStorage.setItem("name", res.user.name);
        localStorage.setItem("email", res.user.email);
        if (res.user.profile) {
          localStorage.setItem("phone", res.user.profile.phone);
          localStorage.setItem("address", res.user.profile.address);
          localStorage.setItem("image", res.user.profile.image);
          localStorage.setItem("type", res.user.profile.type);
        }
        setUser(res.user);
        return res.user;
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await request("auth/register", "post", userData);
      if (res) {
        return res;
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("address");
    localStorage.removeItem("image");
    localStorage.removeItem("type");
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};