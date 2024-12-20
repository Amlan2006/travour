'use client'
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useState } from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const refreshPage = ()=>useEffect(()=>{
return(
  <>
  <Navbar/>
  </>
)
      
    },[])

  return (
    <header className="bg-gradient-to-r from-red-950 to-black text-white py-4 px-6">
          <div className="container mx-auto flex justify-between items-center ">
            <h1 className="text-xl font-bold">Travour</h1>
            <button
              className="text-white md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            <nav
              className={`${
                menuOpen ? 'block' : 'hidden'
              } absolute top-16 left-0 transition-all bg-black w-full rounded-md flex  justify-around md:relative md:top-auto md:left-auto md:bg-transparent md:flex`}
            >
              <ul className="md:flex md:space-x-4 text-center">
                <li className="text-center py-2 md:py-0 hover:bg-red-600 w-16 h-10 flex items-center justify-center rounded-md">
                  <Link href='/'onClick={refreshPage}>
                  Home
                  </Link>
                    
                  
                </li>
                <li className="text-center py-2 md:py-0 hover:bg-red-600 w-16 h-10 flex items-center justify-center rounded-md">
                  <Link href='/search-routes' className="block px-4" onClick={refreshPage}>Routes</Link>
                </li>
                <li className="text-center py-2 md:py-0 hover:bg-red-600 w-28 h-10 flex items-center justify-center rounded-md">
                  <Link href='/add-routes'onClick={refreshPage}>Add Routes</Link>
                </li>
                <li className="text-center py-2 md:py-0 hover:bg-red-600 w-16 h-10 flex items-center justify-center rounded-md">
                  <Link href='/show-post'onClick={refreshPage}>Stories</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
  )
}

export default Navbar