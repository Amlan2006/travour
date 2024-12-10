// src/pages/login.js
'use client'
import { app } from '@/firebase';
import { getAuth,signInWithEmailAndPassword ,onAuthStateChanged} from 'firebase/auth';
import { useState ,useEffect} from 'react';
// import { useRouter } from 'next/router';
// import firebase from '../firebase';
const auth = getAuth(app)
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
//   const router = useRouter();

  // Handle email and password change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth,email, password);
    //   router.push('/'); // Redirect to home page after successful login
    } catch (err) {
      setError('Invalid credentials, please try again.');
      alert(error)
    }
  };
  if(user != null){
    return(
        <>
        <div className='text-center text-white bg-red-500 h-screen'>
            <p>You Are Welcome</p>
        </div>
        </>
    )
}if(user != null){
    return(
        <>
        <div className='text-center text-white bg-red-500 h-screen'>
            <p>You Are Welcome</p>
        </div>
        </>
    )
}if(user != null){
    return(
        <>
        <div className='text-center text-white bg-red-500 h-screen'>
            <p>You Are Welcome</p>
        </div>
        </>
    )
}
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Travour Login</h2>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Your email address"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Login
          </button>
        </form>

        {/* Redirect to Signup */}
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-red-600 hover:text-red-700 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
