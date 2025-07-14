import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-orange-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-4xl">
          <Link to="/home">My Blog</Link>
        </h1> 
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Trang chủ</Link>
          <Link to="/create" className="hover:underline">Tạo bài viết</Link>
          <Link to="/login" className="hover:underline">Đăng nhập</Link>
          <Link to="/register" className="hover:underline">Đăng ký</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
