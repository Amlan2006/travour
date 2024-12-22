'use client'
import { useEffect, useState } from 'react';
// import { firestore } from '../firebase';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase';
const firestore = getFirestore(app)
export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState(null)
  const [uEmail,setUEmail] = useState('')
  const [ready,setReady] = useState(false)
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
          if(user){
            // console.log("hello",user.ema)
            setUser(user)
            setUEmail(user.email)
            setReady(true)
          }
          
          else{
            console.log("You are logged out")
            setUser(null)
          }
        })
      
    fetchProfileData()
    
  }, []);
  const fetchProfileData = async () => {

    if (user == null) {
      console.error('User not signed in.');
      console.log(uEmail,"not found")
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
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

 else if (!profileData) {
    return <p className="text-center text-gray-500">No profile data found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Your Profile</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Name:</h3>
            <p className="text-gray-600">{profileData.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Email:</h3>
            <p className="text-gray-600">{profileData.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Instagram Handle:</h3>
            <p className="text-gray-600">{profileData.instaHandle  || 'Not Provided'}</p>
          </div> 

        </div>
      </div>
    </div>
  );
}
