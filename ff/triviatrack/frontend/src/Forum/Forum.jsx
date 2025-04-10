import {
  FiChevronLeft, // For any needed back or navigation icons (if used)
  FiMessageSquare, // Replaces custom MessageSquareIcon
  FiUsers, // Replaces custom UsersIcon
  FiSearch, // Replaces custom SearchIcon in sidebar
  FiGlobe, // Replaces custom GlobeIcon for Languages category
  FiBookOpen, // Replaces custom BookIcon
} from "react-icons/fi";
import {
  FaThumbsUp, // Replaces custom ThumbsUpIcon
  FaCode, // Replaces custom CodeIcon in categories/trending topics
  FaGraduationCap, // Replaces custom GraduationCapIcon
} from "react-icons/fa";
import { GiGamepad } from "react-icons/gi"; // Replaces custom GamepadIcon
import { MdPalette } from "react-icons/md"; // Replaces custom PaletteIcon

export default function HomePage() {
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
                  href={`/categories/${category.slug}`}
                  className="block h-full"
                >
                  <div className="h-full rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${category.bgColor}`}
                      >
                        {category.icon}
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
                <a key={post.id} href={`/posts/${post.id}`} className="block">
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
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 overflow-hidden rounded-full bg-blue-100">
                          <img
                            src={post.author.avatar || "/placeholder.svg"}
                            alt={post.author.name}
                          />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {post.author.name}
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

const categories = [
  {
    id: "cat-1",
    name: "Programming",
    slug: "programming",
    description:
      "Discuss coding challenges, programming languages, and software development",
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
    icon: <GiGamepad className="h-5 w-5 text-red-500" />,
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-950",
    postCount: 156,
    userCount: 512,
  },
  {
    id: "cat-5",
    name: "Art & Design",
    slug: "art-design",
    description: "Showcase creative works and discuss design principles",
    icon: <MdPalette className="h-5 w-5 text-orange-500" />,
    color: "text-orange-500",
    bgColor: "bg-orange-100 dark:bg-orange-950",
    postCount: 64,
    userCount: 198,
  },
  {
    id: "cat-6",
    name: "Languages",
    slug: "languages",
    description: "Learn and practice different languages from around the world",
    icon: <FiGlobe className="h-5 w-5 text-teal-500" />,
    color: "text-teal-500",
    bgColor: "bg-teal-100 dark:bg-teal-950",
    postCount: 73,
    userCount: 245,
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
