'use client'
import { app } from '@/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const firestore = getFirestore(app);
export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const docref = collection(firestore, 'posts');
        const docsnap = await getDocs(docref);
        const fetchedPosts = docsnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm)
    );
    setFilteredPosts(filtered);
  };

  const truncateText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-950 via-black to-red-950 animate-gradient-x py-8 px-6">
      <div className="max-w-4xl mx-auto bg-transparent p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-6 animate-fade-in">
          Recent Travel Stories
        </h2>
        <Link href="/add-post">
          <button className="bg-red-700 text-white rounded-md w-full py-4 my-4 hover:bg-red-600 transition-transform transform hover:scale-105 animate-bounce-slow">
            Add Your Stories
          </button>
        </Link>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by story title..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          />
        </div>

        {loading && (
          <p className="text-center text-gray-500 animate-pulse">
            Loading posts...
          </p>
        )}

        {!loading && filteredPosts.length === 0 && (
          <p className="text-center text-gray-500">No stories found.</p>
        )}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-6 rounded-lg shadow-md bg-black hover:bg-gray-800 transition-transform transform hover:scale-105 text-white"
            >
              <h3 className="text-xl font-semibold text-red-600">
                {post.title}
              </h3>
              <p className="text-sm">{post.location}</p>
              <p className="mt-4">
                {truncateText(post.story, 200)}{' '}
                {post.story.length > 200 && (
                  <button
                    className="text-red-600 font-bold hover:underline"
                    onClick={() => alert(post.story)}
                  >
                    Read More
                  </button>
                )}
              </p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="mt-4 w-full h-auto rounded-md"
                />
              )}
              <p className="text-sm text-gray-400 mt-4">
                Posted By {post.username}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
