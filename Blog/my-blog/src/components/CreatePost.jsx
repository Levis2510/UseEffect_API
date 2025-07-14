import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage('Vui lòng nhập tiêu đề và nội dung.');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        createdAt: Timestamp.now(),
      });
      setMessage('Đăng bài thành công!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage('Lỗi: ' + err.message);
    }
  };

  return (
    <div className="p-4 bg-teal-50 shadow rounded-lg">
      <h2 className="text-4xl text-green-500 font-bold mb-4">Tạo bài viết</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 mb-2 w-full"
          placeholder="Nội dung"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {message && <p className="text-red-500 text-sm">{message}</p>}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Đăng bài
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
