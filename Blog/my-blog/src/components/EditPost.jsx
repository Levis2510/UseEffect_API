import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setContent(data.content);
      } else {
        setMessage('❌ Bài viết không tồn tại.');
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage('Vui lòng nhập đầy đủ tiêu đề và nội dung.');
      return;
    }

    try {
      await updateDoc(doc(db, 'posts', id), {
        title,
        content,
      });
      setMessage('✅ Cập nhật thành công!');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      setMessage('❌ Lỗi cập nhật: ' + error.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-700 mb-4">Sửa bài viết</h2>
      <form onSubmit={handleUpdate}>
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
        {message && <p className="text-sm text-red-500">{message}</p>}
        <button className="bg-cyan-500 text-white px-4 py-2 rounded">
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default EditPost;
