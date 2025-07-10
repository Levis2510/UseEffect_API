// getPosts.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const getPosts = async() => {
    try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const posts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log(posts);
        return posts;
    } catch (error) {
        console.error("Lỗi khi lấy data:", error);
    }
};

export default getPosts;