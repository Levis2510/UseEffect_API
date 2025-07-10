// src/pages/Login.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // chuyển về trang chính sau đăng nhập
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl text-slate-700 font-bold mb-4">Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-2 block w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="border p-2 mb-2 block w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="bg-green-500 text-white p-2 w-full">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
