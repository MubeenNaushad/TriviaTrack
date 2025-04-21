import { useParams } from "react-router-dom";
import {
  FiChevronLeft,
  FiMessageSquare,
  FiUsers,
  FiSearch,
  FiGlobe,
  FiBookOpen,
  FiX,
} from "react-icons/fi";
import { FaThumbsUp, FaCode, FaGraduationCap } from "react-icons/fa";
import { GiGamepad } from "react-icons/gi";
import { MdPalette } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;
  const [category, setCategory] = useState([]);
  const [categoryPosts, setcategoryPosts] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const icons = {
    FaCode: <FaCode className="h-5 w-5 text-blue-500" />,
    FiBookOpen: <FiBookOpen className="h-5 w-5 text-green-500" />,
    FaGraduationCap: <FaGraduationCap className="h-5 w-5 text-purple-500" />,
    GiGamepad: <GiGamepad className="h-5 w-5 text-red-500" />,
    MdPalette: <MdPalette className="h-5 w-5 text-orange-500" />,
    FiGlobe: <FiGlobe className="h-5 w-5 text-teal-500" />,
  };

  useEffect(() => {
    const getCategoryPosts = async () => {
      try {
        console.log("gg");
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASEURL}/forum/categories/${slug}`
        );
        setcategoryPosts(response.data.CategoryPosts);
        setCategory(response.data.category);
        console.log("catposts", response.data);
      } catch (error) {
        console.error("Error fetching category posts:", error);
      }
    };

    getCategoryPosts();
  }, [slug]);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!postTitle.trim() || !postDescription.trim() || !postContent.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASEURL}/forum/create-post`,
        {
          title: postTitle,
          description: postDescription,
          content: postContent,
          category: category._id,
        }
      );
      console.log("Post created successfully:", response.data);
      setIsCreateModalOpen(false);
      setPostTitle("");
      setPostContent("");
      setPostDescription("");
      // getCategoryPosts();

      const newres = await axios.get(
        `${import.meta.env.VITE_APP_BASEURL}/forum/categories/${slug}`
      );
      setcategoryPosts(newres.data.CategoryPosts);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 pt-32">
        <a
          href="/forum"
          className="mb-6 inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <FiChevronLeft className="h-4 w-4" />
          Back to Forum
        </a>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 flex items-start gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.bgColor}`}
              >
                {icons[category.icon]}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {category.name}
                </h1>

                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex ml-auto items-right gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md "
              >
                <FiPlus className="h-4 w-4" />
                Create Post
              </Button>
            </div>

            <div className="space-y-4">
              {categoryPosts.length > 0 ? (
                categoryPosts.map((post) => (
                  <a
                    key={post._id}
                    href={`/forum/posts/${post._id}`}
                    className="block"
                  >
                    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                      <div className="mb-2 flex items-start justify-between">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        {post.isPinned && (
                          <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs dark:border-gray-700">
                            Pinned
                          </span>
                        )}
                      </div>
                      <p className="mb-4 text-gray-500 dark:text-gray-400">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 overflow-hidden rounded-full bg-blue-100">
                            <img
                              src={post.author?.photoUrl || "/placeholder.svg"}
                              alt={post.author?.name || "Unknwon"}
                            />
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {post.author?.name || "Unknown"}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {post.createdAt}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            {/* Using react-icons FaThumbsUp instead of custom ThumbsUpIcon */}
                            <FaThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {/* Using react-icons FiMessageSquare instead of custom MessageSquareIcon */}
                            <FiMessageSquare className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No posts found in this category
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search Box */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="relative">
                {/* Using react-icons FiSearch instead of custom SearchIcon */}
                <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search forums..."
                  className="w-full rounded-md border border-gray-200 bg-gray-100 py-2 pl-10 pr-4 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Category Stats */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold">Category Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Total Posts
                  </span>
                  <span className="font-medium">{category.postCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Participants
                  </span>
                  <span className="font-medium">{category.userCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Last Activity
                  </span>
                  <span className="font-medium">2 hours ago</span>
                </div>
              </div>
            </div>

            {/* Top Contributors */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold">Top Contributors</h3>
              <div className="space-y-3">
                {users.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-blue-100">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {Math.floor(Math.random() * 50) + 10} posts in this
                        category
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Categories */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold">Related Categories</h3>
              <div className="space-y-2">
                {categories
                  .filter((cat) => cat.id !== category.id)
                  .slice(0, 3)
                  .map((cat) => (
                    <a
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${cat.bgColor}`}
                      >
                        {cat.icon}
                      </div>
                      <span>{cat.name}</span>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Create New Post</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label htmlFor="post-title" className="block mb-1 font-medium">
                  Title
                </label>
                <input
                  id="post-title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Enter post title"
                  required
                  className="w-full rounded-md border border-gray-200 p-2 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="post-description"
                  className="block mb-1 font-medium"
                >
                  Description
                </label>
                <textarea
                  id="post-description"
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                  placeholder="Write your post description here..."
                  required
                  rows={3}
                  className="w-full rounded-md border border-gray-200 p-2 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="post-content"
                  className="block mb-1 font-medium"
                >
                  Content
                </label>
                <textarea
                  id="post-content"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Write your post content here..."
                  required
                  rows={8}
                  className="w-full rounded-md border border-gray-200 p-2 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Updated categories array using react-icons for category icons
const categories = [
  {
    id: "cat-1",
    name: "Programming",
    slug: "programming",
    description:
      "Discuss coding challenges, programming languages, and software development",
    // Replaced CodeIcon with FaCode
    icon: <FaCode className="h-5 w-5 text-blue-500" />,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-950",
    postCount: 128,
    userCount: 456,
  },
  {
    id: "cat-2",
    name: "Mathematics",
    slug: "mathematics",
    description: "Explore mathematical concepts, problems, and solutions",
    // Replaced BookIcon with FiBookOpen
    icon: <FiBookOpen className="h-5 w-5 text-green-500" />,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-950",
    postCount: 87,
    userCount: 324,
  },
  {
    id: "cat-3",
    name: "Science",
    slug: "science",
    description: "Discuss scientific theories, experiments, and discoveries",
    // Replaced GraduationCapIcon with FaGraduationCap
    icon: <FaGraduationCap className="h-5 w-5 text-purple-500" />,
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-950",
    postCount: 95,
    userCount: 287,
  },
  {
    id: "cat-4",
    name: "Gaming",
    slug: "gaming",
    description: "Share gaming experiences, strategies, and discussions",
    // Replaced GamepadIcon with GiGamepad
    icon: <GiGamepad className="h-5 w-5 text-red-500" />,
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-950",
    postCount: 156,
    userCount: 512,
  },
];

// The users and posts arrays remain the same

const users = [
  {
    id: "user-1",
    name: "Arish Amin",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Moderator",
  },
  {
    id: "user-2",
    name: "Mubeen Naushad",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "user-3",
    name: "Dr.Adeel Ansari",
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "Top Contributor",
  },
  {
    id: "user-4",
    name: "Jordan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
