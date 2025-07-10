import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setMessage('✅ Đăng nhập thành công!');
      localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email }));

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      console.error('Firebase login error:', err);
      let errorMessage = '';
      switch (err.code) {
        case 'auth/invalid-email':
          errorMessage = '❌ Email không hợp lệ.';
          break;
        case 'auth/user-not-found':
          errorMessage = '❌ Tài khoản không tồn tại.';
          break;
        case 'auth/wrong-password':
          errorMessage = '❌ Mật khẩu không đúng.';
          break;
        default:
          errorMessage = '❌ Đăng nhập thất bại. Vui lòng thử lại.';
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl text-slate-700 font-bold mb-4">Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-3 block w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="border p-2 mb-3 block w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

          {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button type="submit" className="bg-cyan-500 text-white p-2 w-full rounded">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;
