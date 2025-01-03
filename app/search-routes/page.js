'use client'
import { useEffect, useState} from 'react';
import { collection, query, where, startAt, endAt, getDocs, updateDoc, arrayUnion, doc, orderBy, getFirestore } from 'firebase/firestore';
import { app } from '@/firebase';

const firestore = getFirestore(app);

export default function SearchRoutes() {
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch Suggestions for "From"
  const fetchFromSuggestions = async (input) => {
    if (!input.trim()) {
      setFromSuggestions([]);
      return;
    }

    try {
      const routesRef = collection(firestore, 'routes');
      const q = query(
        routesRef,
        orderBy('from'),
        startAt(input),
        endAt(input + '\\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      setFromSuggestions(querySnapshot.docs.map((doc) => doc.data().from));
    } catch (err) {
      console.error('Error fetching suggestions for "from":', err);
    }
  };

  // Fetch Suggestions for "To"
  const fetchToSuggestions = async (input) => {
    if (!input.trim()) {
      setToSuggestions([]);
      return;
    }

    try {
      const routesRef = collection(firestore, 'routes');
      const q = query(
        routesRef,
        orderBy('to'),
        startAt(input),
        endAt(input + '\\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      setToSuggestions(querySnapshot.docs.map((doc) => doc.data().to));
    } catch (err) {
      console.error('Error fetching suggestions for "to":', err);
    }
  };

  // Handle Search
  const handleSearch = async () => {
    if (!searchFrom || !searchTo) {
      alert('Please enter both "from" and "to" fields.');
      return;
    }

    setLoading(true);
    setSearchResults([]);
    setSuccessMessage('');

    try {
      const routesRef = collection(firestore, 'routes');
      const q = query(
        routesRef,
        where('from', '==', searchFrom.toLowerCase()),
        where('to', '==', searchTo.toLowerCase())
      );
      const querySnapshot = await getDocs(q);

      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSearchResults(results);
    } catch (err) {
      console.error('Error fetching search results:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Adding a Suggestion
  const handleAddSuggestion = async (routeId) => {
    if (!suggestion.trim()) {
      alert('Please enter a suggestion.');
      return;
    }

    try {
      const routeDoc = doc(firestore, 'routes', routeId);
      await updateDoc(routeDoc, {
        suggestions: arrayUnion(suggestion),
      });

      // Update UI with new suggestion
      setSearchResults((prevResults) =>
        prevResults.map((route) =>
          route.id === routeId
            ? { ...route, suggestions: [...(route.suggestions || []), suggestion] }
            : route
        )
      );
      setSuggestion('');
      setSuccessMessage('Suggestion added successfully!');
    } catch (err) {
      console.error('Error adding suggestion:', err);
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-r from-red-950 to-black">
      <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg bg-black/70 shadow-gray-500 transition-transform transform hover:scale-105 duration-500">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6 animate-pulse">
          Search for Routes
        </h2>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchFrom}
              onChange={(e) => {
                setSearchFrom(e.target.value.toLowerCase());
                fetchFromSuggestions(e.target.value.toLowerCase());
              }}
              placeholder="From...(atleast one word)"
              className="flex-grow p-3 border shadow-sm shadow-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            {fromSuggestions.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto text-red-700 z-10">
                {fromSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSearchFrom(suggestion);
                      setFromSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchTo}
              onChange={(e) => {
                setSearchTo(e.target.value.toLowerCase());
                fetchToSuggestions(e.target.value.toLowerCase());
              }}
              placeholder="To...(atleast one word)"
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            {toSuggestions.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto text-red-700">
                {toSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSearchTo(suggestion);
                      setToSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="bg-red-600 text-white px-4 py-3 rounded-md hover:bg-red-700 transition-transform transform hover:scale-105"
          >
            Search
          </button>
        </div>

        {/* Loading State */}
        {loading && <p className="text-center text-gray-500 animate-pulse">Searching...</p>}

        {/* Search Results */}
        {!loading && searchResults.length === 0 && (
          <p className="text-center text-gray-500">No routes found.</p>
        )}
        <div className="space-y-6">
          {searchResults.map((route) => (
            <div
              key={route.id}
              className="p-6 rounded-lg shadow-sm shadow-gray-500 bg-white/10 transition-transform transform hover:scale-105 duration-500"
            >
              <h3 className="text-xl font-semibold text-red-600">
                {route.from} → {route.to}
              </h3>
              <p className="mt-2 text-white">{route.routeDescription}</p>

              {/* Suggestions */}
              <div className="mt-4">
                <h4 className="font-semibold text-gray-300">Suggestions:</h4>
                <ul className="list-disc pl-6">
                  {(route.suggestions || []).map((suggestion, index) => (
                    <li key={index} className="text-gray-300">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add Suggestion */}
              <div className="mt-4 flex flex-wrap gap-2 items-center space-x-4">
                <input
                  type="text"
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="Add a suggestion..."
                  className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
                <button
                  onClick={() => handleAddSuggestion(route.id)}
                  className="bg-red-600 text-white px-4 py-3 rounded-md hover:bg-red-700 transition-transform transform hover:scale-105"
                >
                  Add Suggestion
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 text-center mt-6 animate-bounce">{successMessage}</p>
        )}
      </div>
    </div>
  );
}
