import {
  FiChevronLeft,
  FiMessageSquare,
  FiUsers,
  FiSearch,
  FiGlobe,
  FiBookOpen,
} from "react-icons/fi";
import { FaThumbsUp, FaCode, FaGraduationCap } from "react-icons/fa";
import { GiGamepad } from "react-icons/gi";
import { MdPalette } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const icons = {
    FaCode: <FaCode className="h-5 w-5 text-blue-500" />,
    FiBookOpen: <FiBookOpen className="h-5 w-5 text-green-500" />,
    FaGraduationCap: <FaGraduationCap className="h-5 w-5 text-purple-500" />,
    GiGamepad: <GiGamepad className="h-5 w-5 text-red-500" />,
    MdPalette: <MdPalette className="h-5 w-5 text-orange-500" />,
    FiGlobe: <FiGlobe className="h-5 w-5 text-teal-500" />,
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await axios.get(
          `${import.meta.env.VITE_APP_BASEURL}/forum/all-categories`
        );
        setCategories(categories.data);
      } catch (error) {
        console.log("Error fetching categories: ", error);
      }
    };

    const getAllPosts = async () => {
      try {
        const posts = await axios.get(
          `${import.meta.env.VITE_APP_BASEURL}/forum/all-posts`
        );
        setPosts(posts.data);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    getCategories();
    getAllPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 pt-32">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Statistics Section */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col items-center justify-center rounded-lg bg-green-100 p-6 dark:bg-green-900/20">
                {/* Replaced ThumbsUpIcon with FaThumbsUp */}
                <FaThumbsUp className="mb-2 h-10 w-10 text-green-500" />
                <div className="text-2xl font-bold">334,006</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Thanks given
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg bg-blue-100 p-6 dark:bg-blue-900/20">
                {/* Replaced MessageSquareIcon with FiMessageSquare */}
                <FiMessageSquare className="mb-2 h-10 w-10 text-blue-500" />
                <div className="text-2xl font-bold">2,143,258</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total posts
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-lg bg-purple-100 p-6 dark:bg-purple-900/20">
                {/* Replaced UsersIcon with FiUsers */}
                <FiUsers className="mb-2 h-10 w-10 text-purple-500" />
                <div className="text-2xl font-bold">25</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Online users
                </div>
              </div>
            </div>

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                Learning Forum
              </h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Join discussions on various learning topics
              </p>
            </div>

            {/* Categories Section */}
            <div className="grid gap-4 sm:grid-cols-2">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/forum/categories/${category.slug}`}
                  className="block h-full"
                >
                  <div className="h-full rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${category.bgColor}`}
                      >
                        {icons[category.icon]}
                      </div>
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                    </div>
                    <p className="mb-4 text-gray-500 dark:text-gray-400">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div>{category.postCount} posts</div>
                      <div>{category.userCount} participants</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Recent Discussions Section */}
            <h2 className="mb-4 mt-12 text-2xl font-bold">
              Recent Discussions
            </h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <a key={post.id} href={`/posts/${post._id}`} className="block">
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
                            alt={post.author?.name || "ff"}
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
                          {/* Replaced ThumbsUpIcon with FaThumbsUp */}
                          <FaThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/* Replaced MessageSquareIcon with FiMessageSquare */}
                          <FiMessageSquare className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-6">
            {/* Search Box */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="relative">
                {/* Replaced SearchIcon with FiSearch */}
                <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search forums..."
                  className="w-full rounded-md border border-gray-200 bg-gray-100 py-2 pl-10 pr-4 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Trending Topics */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold">Trending Topics</h3>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <a key={topic.id} href={topic.url} className="block">
                    <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${topic.bgColor}`}
                      >
                        {topic.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{topic.title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {topic.postCount} posts this week
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Active Users */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold">Active Users</h3>
              <div className="space-y-3">
                {activeUsers.map((user) => (
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
                        {user.postCount} posts
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Forum Guidelines
                </a>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  FAQ
                </a>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Report an Issue
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const activeUsers = [
  {
    id: "active-1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    postCount: 128,
  },
  {
    id: "active-2",
    name: "Sam Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    postCount: 85,
  },
  {
    id: "active-3",
    name: "Taylor Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    postCount: 237,
  },
];

const trendingTopics = [
  {
    id: "topic-1",
    title: "React Hooks",
    url: "/categories/programming",
    icon: <FaCode className="h-4 w-4 text-blue-500" />,
    bgColor: "bg-blue-100 dark:bg-blue-950",
    postCount: 42,
  },
  {
    id: "topic-2",
    title: "Calculus Problems",
    url: "/categories/mathematics",
    icon: <FiBookOpen className="h-4 w-4 text-green-500" />,
    bgColor: "bg-green-100 dark:bg-green-950",
    postCount: 28,
  },
  {
    id: "topic-3",
    title: "Quantum Physics",
    url: "/categories/science",
    icon: <FaGraduationCap className="h-4 w-4 text-purple-500" />,
    bgColor: "bg-purple-100 dark:bg-purple-950",
    postCount: 35,
  },
  {
    id: "topic-4",
    title: "Game Optimization",
    url: "/categories/gaming",
    icon: <GiGamepad className="h-4 w-4 text-red-500" />,
    bgColor: "bg-red-100 dark:bg-red-950",
    postCount: 19,
  },
];
