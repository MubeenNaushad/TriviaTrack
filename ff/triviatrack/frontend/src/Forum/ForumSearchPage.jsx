import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiMessageSquare } from "react-icons/fi";
import { FaThumbsUp } from "react-icons/fa";

export default function ForumSearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const fetchResults = async () => {
      setLoading(true);
      try {
        const url = `${import.meta.env.VITE_APP_BASEURL}/forum/search-posts?query=${encodeURIComponent(query)}`;
        const resp = await axios.get(url);
        setResults(resp.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to search posts");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6 pt-32">
        <h1 className="text-3xl font-bold mb-4">
          Search results for “{query}”
        </h1>

        {loading && <p>Loading…</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && results.length === 0 && (
          <p>No posts matched your query.</p>
        )}

        <div className="space-y-4">
          {results.map((post) => (
            <Link
              key={post._id}
              to={`/forum/posts/${post._id}`}
              className="block rounded-lg border bg-white p-4 hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                {post.isPinned && (
                  <span className="px-2 py-0.5 border text-xs">Pinned</span>
                )}
              </div>
              <p className="text-gray-500 mb-2">{post.description}</p>
              <div className="flex items-center text-sm text-gray-500 gap-4">
                <div className="flex items-center gap-1">
                  <FiMessageSquare /> {post.replies}
                </div>
                <div className="flex items-center gap-1">
                  <FaThumbsUp /> {post.likes}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
