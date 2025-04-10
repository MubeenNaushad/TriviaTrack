import { useState } from "react";
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

export default function PostPage() {
  const params = useParams();
  const id = params?.id;
  const post = posts.find((p) => p.id === id) || posts[0];
  const category = post.category;
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState([
    {
      id: "comment-1",
      content:
        "This was really helpful! I've been struggling with this concept but your explanation made it click for me.",
      author: users[1],
      createdAt: "1 day ago",
      likes: 12,
    },
    {
      id: "comment-2",
      content:
        "Great post! I would add that understanding the fundamentals is also crucial for beginners.",
      author: users[2],
      createdAt: "2 days ago",
      likes: 8,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: `comment-${Date.now()}`,
      content: newComment,
      author: {
        id: "current-user",
        name: "Current User",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      createdAt: "Just now",
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 pt-32">
        <a
          href={`/categories/${category.slug}`}
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
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.author.name}</span>
                {post.author.badge && (
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
              <p>{post.excerpt}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,
                eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget
                ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl
                nisl eget nisl. Sed vitae magna eu magna efficitur consequat in
                vel enim. Vestibulum ante ipsum primis in faucibus orci luctus
                et ultrices posuere cubilia curae; Donec at mauris nec dolor
                consequat faucibus.
              </p>
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
                  key={comment.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-start gap-4 p-4">
                    <div className="h-8 w-8 overflow-hidden rounded-full bg-blue-100">
                      <img
                        src={comment.author.avatar || "/placeholder.svg"}
                        alt={comment.author.name}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {comment.author.name}
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
                          <span>Reply</span>
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

// Updated categories array using react-icons for icons in the category list
const categories = [
  {
    id: "cat-1",
    name: "Programming",
    slug: "programming",
    description:
      "Discuss coding challenges, programming languages, and software development",
    // Using react-icons FaCode instead of custom CodeIcon
    icon: <FaCode className="h-5 w-5 text-blue-500" />,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-950",
  },
  {
    id: "cat-2",
    name: "Mathematics",
    slug: "mathematics",
    description: "Explore mathematical concepts, problems, and solutions",
    // Using react-icons FiBookOpen instead of custom BookIcon
    icon: <FiBookOpen className="h-5 w-5 text-green-500" />,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-950",
  },
  {
    id: "cat-3",
    name: "Science",
    slug: "science",
    description: "Discuss scientific theories, experiments, and discoveries",
    // Using react-icons FaGraduationCap instead of custom GraduationCapIcon
    icon: <FaGraduationCap className="h-5 w-5 text-purple-500" />,
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-950",
  },
  {
    id: "cat-4",
    name: "Gaming",
    slug: "gaming",
    description: "Share gaming experiences, strategies, and discussions",
    // Using react-icons GiGamepad instead of custom GamepadIcon
    icon: <GiGamepad className="h-5 w-5 text-red-500" />,
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-950",
  },
];

const users = [
  {
    id: "user-1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Moderator",
  },
  {
    id: "user-2",
    name: "Sam Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-3",
    name: "Taylor Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Top Contributor",
  },
  {
    id: "user-4",
    name: "Jordan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const posts = [
  {
    id: "post-1",
    title: "Getting started with React: A beginner's guide",
    excerpt: "Learn the basics of React and how to build your first component",
    author: users[0],
    category: categories[0],
    createdAt: "2 days ago",
    views: 1245,
    replies: 32,
    likes: 87,
    isPinned: true,
  },
  {
    id: "post-2",
    title: "Understanding calculus: The basics of derivatives",
    excerpt: "A simple explanation of derivatives and their applications",
    author: users[1],
    category: categories[1],
    createdAt: "5 days ago",
    views: 876,
    replies: 18,
    likes: 45,
  },
  {
    id: "post-3",
    title: "The theory of relativity explained simply",
    excerpt:
      "Breaking down Einstein's famous theory into understandable concepts",
    author: users[2],
    category: categories[2],
    createdAt: "1 week ago",
    views: 1532,
    replies: 27,
    likes: 103,
    isEdited: true,
  },
  {
    id: "post-4",
    title: "Optimizing game performance: Tips and tricks",
    excerpt: "Learn how to improve your game's performance and user experience",
    author: users[3],
    category: categories[3],
    createdAt: "3 days ago",
    views: 945,
    replies: 21,
    likes: 67,
  },
];
