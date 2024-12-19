'use client'
import { useState ,useEffect} from 'react';
// import { useRouter } from 'next/router';
// import { firestore } from '../firebase';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from '@/firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import Login from '../login/page';
const firestore = getFirestore(app)
const auth = getAuth(app)

export default function PostStory() {
    // const navigate = useNavigate()
    const [user,setUser] = useState(null)
    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          // console.log("hello",user)
          setUser(user)
        }
        
        else{
          // console.log("You are logged out")
          setUser(null)
        }
      })
    },[])
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    story: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
//   const router = useRouter();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.location || !formData.story) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Add to Firestore collection
      await addDoc(collection(firestore,'posts'),{
        ...formData,
        username: user.email
        // createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Timestamp
      });
      setLoading(false);
    //   router.push('/'); // Redirect to the homepage or another page
    } catch (err) {
      setLoading(false);
      setError('Error submitting your story. Please try again.');
    }
  };
if(user == null){
  return(
    <div className='bg-gradient-to-r from-red-950 to-black'>
    <Login/>
    </div>
  )
}
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-6 bg-gradient-to-r from-red-950 to-black">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Share Your Travel Story
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
              placeholder="Enter a catchy title for your story"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
              placeholder="Where did this story happen?"
              required
            />
          </div>

          {/* Story */}
          <div className="mb-4">
            <label htmlFor="story" className="block text-sm font-semibold text-gray-700">
              Your Story
            </label>
            <textarea
              id="story"
              name="story"
              value={formData.story}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-700"
              placeholder="Share your travel experience..."
              rows="6"
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div className="mb-6">
            <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700">
              Image URL (Optional)
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Provide a URL for your travel photo"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 focus:outline-none"
          >
            {loading ? 'Submitting...' : 'Post Story'}
          </button>
        </form>
      </div>
    </div>
  );
}
