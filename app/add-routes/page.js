'use client'
import { app } from '@/firebase';
import { getAuth ,onAuthStateChanged} from 'firebase/auth';
import { getFirestore,addDoc,collection } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../login/page';
// import { firestore } from '../firebase';
const firestore = getFirestore(app)
const auth = getAuth(app)
export default function AddRoutes() {
  // const router = useRouter()
    const [user,setUser] = useState(null)
    // const navigate = useNavigate()
    // const router = useRouter()
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
    from: '',
    to: '',
    routeDescription: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

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

    if (!formData.from || !formData.to || !formData.routeDescription) {
      setError('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Add the route to Firestore
      await addDoc(collection(firestore,'routes'),{
        from: formData.from.toLowerCase().trim(),
        to: formData.to.toLowerCase().trim(),
        routeDescription: formData.routeDescription,
        likes: 0, // Initialize likes to 0
        username: user.email,
        // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setLoading(false);
      setSuccessMessage('Route added successfully!');
      setFormData({ from: '', to: '', routeDescription: '' });
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError('Error adding route. Please try again.');
    }
  };
if(user == null){
  return(
    <>
    <Login/>
    </>
  )
}

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Add a New Route
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* From Location */}
          <div className="mb-4">
            <label
              htmlFor="from"
              className="block text-sm font-semibold text-gray-700"
            >
              From
            </label>
            <input
              type="text"
              id="from"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter starting point"
              required
            />
          </div>

          {/* To Location */}
          <div className="mb-4">
            <label
              htmlFor="to"
              className="block text-sm font-semibold text-gray-700"
            >
              To
            </label>
            <input
              type="text"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter destination"
              required
            />
          </div>

          {/* Route Description */}
          <div className="mb-6">
            <label
              htmlFor="routeDescription"
              className="block text-sm font-semibold text-gray-700"
            >
              Route Description
            </label>
            <textarea
              id="routeDescription"
              name="routeDescription"
              value={formData.routeDescription}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md text-black"
              placeholder="Describe the route and helpful details"
              rows="6"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 focus:outline-none"
          >
            {loading ? 'Adding...' : 'Add Route'}
          </button>
        </form>
      </div>
    </div>
  );
}
