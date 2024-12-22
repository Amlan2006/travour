'use client'
import { useState, useEffect } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '@/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from '../login/page';

const firestore = getFirestore(app);
const auth = getAuth(app);

export default function PostStory() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    story: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.story) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addDoc(collection(firestore, 'posts'), {
        ...formData,
        username: user.email,
      });
      setLoading(false);
      setFormData({ title: '', location: '', story: '', imageUrl: '' });
    } catch (err) {
      setLoading(false);
      setError('Error submitting your story. Please try again.');
    }
  };

  if (user == null) {
    return (
      <div className='bg-gradient-to-r from-red-950 to-black'>
        <Login />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-950 via-black to-red-950 animate-gradient-x flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl bg-opacity-80 bg-white backdrop-blur-md p-8 rounded-lg shadow-2xl transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Share Your Travel Story
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105"
              placeholder="Enter a catchy title for your story"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105"
              placeholder="Where did this story happen?"
              required
            />
          </div>

          <div>
            <label htmlFor="story" className="block text-sm font-semibold text-gray-700">
              Your Story
            </label>
            <textarea
              id="story"
              name="story"
              value={formData.story}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105"
              placeholder="Share your travel experience..."
              rows="6"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700">
              Image URL (Optional)
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105"
              placeholder="Provide a URL for your travel photo"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105 duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Post Story'}
          </button>
        </form>
      </div>
    </div>
  );
}
