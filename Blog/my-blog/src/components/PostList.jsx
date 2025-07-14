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
    <div className="flex flex-col gap-6 p-4 max-w-3xl mx-auto bg-teal-50 shadow rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-green-500 mb-4">📖 Bài viết</h1>
        <button
          onClick={handleLogout}
          className="bg-cyan-500 hover:bg-gray-400 text-black px-4 py-1 rounded"
        >
          🔚Đăng xuất
        </button>
      </div>

      <ul className="space-y-4">
        {Array.isArray(posts) && posts.map((post) => (
          <li key={post.id}>
            <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-green-600">📝 {post.title}</h2>
              <p className="text-gray-700 mt-2">{post.content}</p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                  onClick={() => navigate(`/edit/${post.id}`)}
                >
                  ✏️ Sửa
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
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
