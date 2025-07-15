import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig'; 
import getPosts from '../Firebase/getPosts';
import deletePost from '../Firebase/deletePost';

function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bài viết này?');
    if (!confirmDelete) return;

    const success = await deletePost(id);
    if (success) {
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } else {
      alert('❌ Xóa bài viết thất bại!');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Đăng xuất thất bại:', error);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6 max-w-4xl mx-auto bg-teal-50 shadow rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-500 text-center sm:text-left">
          📖 Bài viết
        </h1>
        <button
          onClick={handleLogout}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded text-sm sm:text-base"
        >
          🔚 Đăng xuất
        </button>
      </div>

      <ul className="space-y-4">
        {Array.isArray(posts) && posts.map((post) => (
          <li key={post.id}>
            <div className="bg-white flex flex-col shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="Ảnh bài viết"
                  className="w-full h-auto max-h-[500px] sm:max-h-[600px] object-contain rounded mb-4"
                />
              )}
              <h2 className="text-xl sm:text-2xl font-semibold text-green-600 mb-2">📝 {post.title}</h2>
              <p className="text-gray-700 text-sm sm:text-base">{post.content}</p>
              <div className="mt-4 flex flex-wrap justify-end gap-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded text-sm"
                  onClick={() => navigate(`/edit/${post.id}`)}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
                  onClick={() => handleDelete(post.id)}
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;