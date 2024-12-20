'use client'
import { useState, useEffect } from 'react';
// import { firestore } from '../firebase';
import { collection, addDoc, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '@/firebase';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import Login from '../login/page';
const firestore = getFirestore(app)
const auth = getAuth(app)
export default function AddRoutes() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [routeDescription, setRouteDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [user,setUser] = useState(null)

  // Fetch Suggestions
  useEffect(() => {
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
    const fetchSuggestions = async () => {
      try {
        const routesRef = collection(firestore, 'routes');
        const querySnapshot = await getDocs(routesRef);
        const allRoutes = querySnapshot.docs.map((doc) => doc.data());

        const uniqueFrom = [...new Set(allRoutes.map((route) => route.from))];
        const uniqueTo = [...new Set(allRoutes.map((route) => route.to))];

        setSuggestionsFrom(uniqueFrom);
        setSuggestionsTo(uniqueTo);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleAddRoute = async () => {
    if (!from || !to || !routeDescription) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const routesRef = collection(firestore, 'routes');
      await addDoc(routesRef, {
        from: from.toLowerCase(),
        to: to.toLowerCase(),
        routeDescription,
        likes: 0,
        username: user.email
      });
      alert('Route added successfully!');
      setFrom('');
      setTo('');
      setRouteDescription('');
    } catch (error) {
      console.error('Error adding route:', error);
    } finally {
      setLoading(false);
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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-950 to-black">
      <div className="max-w-4xl mx-auto bg-transparent p-6 sm:p-8 rounded-lg shadow-lg shadow-gray-500">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Add a New Route
        </h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From..."
              list="from-suggestions"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <datalist id="from-suggestions">
              {suggestionsFrom.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>
          </div>
          <div>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="To..."
              list="to-suggestions"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <datalist id="to-suggestions">
              {suggestionsTo.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>
          </div>
          <textarea
            value={routeDescription}
            onChange={(e) => setRouteDescription(e.target.value)}
            placeholder="Describe the route..."
            className="w-full p-3 text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            rows="4"
          ></textarea>
        </div>

        
        <div className="mt-6">
          <button
            onClick={handleAddRoute}
            disabled={loading}
            className={`w-full bg-red-600 text-white px-4 py-3 rounded-md hover:bg-red-700 transition duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Adding...' : 'Add Route'}
          </button>
        </div>
      </div>
    </div>
  );
}
