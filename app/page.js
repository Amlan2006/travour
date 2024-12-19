'use client'
import { app } from '@/firebase';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useState ,useEffect} from 'react';
// import Map from './components/Map';
// import ''
import CarAnimation from './components/CarAnimation';
const auth = getAuth(app)

export default function Home() {
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Travour - Find the Best Routes</title>
        <meta
          name="description"
          content="Travour helps you discover the shortest routes to your destination, curated from suggestions by other travelers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="bg-black text-red-800 ">
        {/* Header */}
        

        {/* Hero Section */}
        <section className="text-center py-16 bg-gradient-to-r from-red-950 to-black text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4">Find the Best Route with Travour</h2>
            <p className="text-lg mb-6">
              Discover the shortest and most efficient routes to your destination, based on real suggestions from fellow travelers.
            </p>
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg shadow-lg font-medium hover:bg-red-100 transition">
              <Link href='/signup'>{user ? <><Link href='/search-routes'>Go To Routes</Link></>:"Get Started"}</Link>
              
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-center mb-10 text-red-500">Why Choose Travour?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="transition-all hover:bg-white text-red-500 p-6 bg-transparent rounded-md shadow-sm shadow-gray-500">
                <h4 className="text-xl font-bold mb-2">Community Driven</h4>
                <p>
                  Routes suggested by people like you ensure the best and most reliable travel paths.
                </p>
              </div>
              <div className="transition-all hover:bg-white text-red-500 p-6 rounded-md bg-transparent shadow-sm shadow-gray-500">
                <h4 className="text-xl font-bold mb-2">Time-Saving</h4>
                <p>Find the shortest routes and save precious time during your journeys.</p>
              </div>
              <div className="transition-all hover:bg-white text-red-500 p-6 rounded-md bg-transparent shadow-sm shadow-gray-500">
                <h4 className="text-xl font-bold mb-2">Share and Read</h4>
                <p>Share your travel stories and read others story.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="h-32 flex items-center justify-center bg-black">
      <CarAnimation />
    </div>
        <section className="bg-black text-white py-16">
          <div className="container mx-auto text-center px-6">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="mb-6">
              Sign up for Travour today and explore efficient routes like never before!
            </p>
            <button className="bg-white text-red-600 px-6 py-3 rounded-lg shadow-lg font-medium hover:bg-red-100 transition">
              <Link href='/signup'>Join Now</Link>
            </button>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-red-700 text-red-100 py-6">
          <div className="container mx-auto text-center">
            <p>© 2024 Travour. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
