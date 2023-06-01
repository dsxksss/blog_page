import axios from "axios";

// 博客评论相关API请求
const commentAPI = {
    // 获取单个博客评论
    getCommentById: (id) => axios.get(`http://localhost:3001/comment/${id}`),
    // 创建博客评论
    createComment: (commentData) => axios.post('http://localhost:3001/comment', commentData),
    // 更新博客评论
    updateComment: (id, commentData) => axios.put(`http://localhost:3001/comment/${id}`, commentData),
    // 删除博客评论
    deleteComment: (id) => axios.delete(`http://localhost:3001/comment/${id}`)
};

export default commentAPI;