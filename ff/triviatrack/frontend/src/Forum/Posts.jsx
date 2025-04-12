import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  FiChevronLeft,
  FiMessageSquare,
  FiBookmark,
  FiShare,
  FiFlag,
  FiCornerUpLeft,
  FiBookOpen,
} from "react-icons/fi";

import { FaThumbsUp, FaCode, FaGraduationCap } from "react-icons/fa";

import { GiGamepad } from "react-icons/gi";
import axios from "axios";

export default function PostPage() {
  const {postId} = useParams();

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [category, setCategory] = useState("");
  const [newComment, setNewComment] = useState("");


  useEffect(() => {
    const getPost = async () => {
      try{
        console.log("g", postId);
        const response = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/forum/posts/${postId}`);
        const data = response.data;
        console.log("data", data);
        setPost(data.post);
        setComments(data.comments);
        setCategory(data.post.category);
        setLikes(data.post.likes);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    }

    getPost();
  }, []);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = await axios.post(`${import.meta.env.VITE_APP_BASEURL}/forum/posts/${postId}/add-comment`, {
      content: newComment,
    }, {
      withCredentials: true,
    });

    const addedComment = comment.data;
    setComments([addedComment, ...comments]);
    console.log("comments", comments);
    console.log("dsd", comment.data);

    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 pt-32">
        <a
          href={`/forum/categories/${category.slug}`}
          className="mb-6 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          {/* Using react-icons FiChevronLeft instead of custom ChevronLeftIcon */}
          <FiChevronLeft className="h-4 w-4" />
          Back to {category.name}
        </a>

        <div className="mb-6 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start gap-4 border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-blue-100">
              <img
                src={post.author?.photoUrl || "/placeholder.svg"}
                alt={post.author?.name}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.author?.name}</span>
                {post.author?.badge && (
                  <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs dark:border-gray-700">
                    {post.author.badge}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <span>Posted {post.createdAt}</span>
                {post.isEdited && <span> • Edited</span>}
              </div>
            </div>
          </div>

          <div className="p-6">
            <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>
            <div className="prose max-w-none dark:prose-invert">
              <p className="italic font-bold">Description: {post.description}</p>
              <p className="mt-4">Content: {post.content}</p>
            </div>
          </div>
          

          <div className="flex justify-between border-t border-gray-200 p-4 dark:border-gray-700">
            <div className="flex gap-2">
              <button
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm ${
                  isLiked
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
                onClick={handleLike}
              >
                {/* Using react-icons FaThumbsUp instead of custom ThumbsUpIcon */}
                <FaThumbsUp className="h-4 w-4" />
                <span>{likes}</span>
              </button>
              <button className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                {/* Using react-icons FiMessageSquare instead of custom MessageSquareIcon */}
                <FiMessageSquare className="h-4 w-4" />
                <span>{post.replies}</span>
              </button>
            </div>
            <div className="flex gap-2">
              <button
                className={`rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 ${
                  isSaved ? "text-blue-600 dark:text-blue-400" : ""
                }`}
                onClick={() => setIsSaved(!isSaved)}
              >
                {/* Using react-icons FiBookmark instead of custom BookmarkIcon */}
                <FiBookmark className="h-5 w-5" />
              </button>
              <button className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                {/* Using react-icons FiShare instead of custom ShareIcon */}
                <FiShare className="h-5 w-5" />
              </button>
              <button className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                {/* Using react-icons FiFlag instead of custom FlagIcon */}
                <FiFlag className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 p-4 dark:border-gray-700">
              <h2 className="text-lg font-semibold">
                Comments ({comments.length})
              </h2>
            </div>
            <div className="p-4">
              <form onSubmit={handleSubmitComment}>
                <textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-2 min-h-24 w-full resize-none rounded-md border border-gray-200 p-2 dark:border-gray-700 dark:bg-gray-700"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-start gap-4 p-4">
                    <div className="h-8 w-8 overflow-hidden rounded-full bg-blue-100">
                      <img
                        src={comment.author?.photoUrl || "/placeholder.svg"}
                        alt={comment.author?.name}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {comment.author?.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {comment.createdAt}
                        </span>
                      </div>
                      <p className="mt-1 text-sm">{comment.content}</p>
                      <div className="mt-2 flex gap-2">
                        <button className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                          {/* Using react-icons FaThumbsUp in comment buttons */}
                          <FaThumbsUp className="h-3 w-3" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                          {/* Using react-icons FiCornerUpLeft as the Reply icon */}
                          <FiCornerUpLeft className="h-3 w-3" />
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-20 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-center text-gray-500 dark:text-gray-400">
                No comments yet. Be the first to comment!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

