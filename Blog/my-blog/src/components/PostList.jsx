import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getPosts from '../Firebase/getPosts';

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

  return (
    <div className="flex flex-col gap-6 p-4 max-w-3xl mx-auto bg-teal-50">
      <h1 className="text-4xl font-bold text-slate-700 mb-4">📖 Bài viết</h1>
      <ul className="space-y-4">
        {Array.isArray(posts) && posts.map((post) => (
          <li key={post.id}>
            <div className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-green-600">📝 {post.title}</h2>
              <p className="text-gray-700 mt-2">{post.content}</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                  onClick={() => navigate(`/edit/${post.id}`)}
                >
                  ✏️ Sửa
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

