'use client';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase';

const firestore = getFirestore(app);

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [uEmail, setUEmail] = useState('');
  const [ready, setReady] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUEmail(user.email);
        setReady(true);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    if (ready) {
      fetchProfileData();
    }
  }, [ready]);

  const fetchProfileData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const usersRef = collection(firestore, 'users');
      const q = query(usersRef, where('email', '==', uEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setProfileData(userData);
      } else {
        console.error('No user data found.');
      }
    } catch (err) {
      console.error('Error fetching profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-300 animate-pulse">Loading profile...</p>;
  }

  if (!profileData) {
    return <p className="text-center text-gray-300">No profile data found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-black border border-red-700 p-6 sm:p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-red-600 mb-6 animate-fade-in">Your Profile</h2>
        <div className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-red-800 to-red-600 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-white">Name:</h3>
            <p className="text-gray-200">{profileData.name}</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-red-800 to-red-600 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-white">Email:</h3>
            <p className="text-gray-200">{profileData.email}</p>
          </div>
          <div className="p-4 bg-gradient-to-r from-red-800 to-red-600 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-white">Instagram Handle:</h3>
            <p className="text-gray-200">{'@' + profileData.Insta || 'Not Provided'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
