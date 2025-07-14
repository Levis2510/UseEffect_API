import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const deletePost = async(id) => {
    try {
        await deleteDoc(doc(db, "posts", id));
        return true;
    } catch (error) {
        console.error("❌ Lỗi khi xóa bài viết:", error);
        return false;
    }
};

export default deletePost;