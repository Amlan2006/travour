'use client'
import React from 'react'
import { useState } from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-red-600 text-white py-4 px-6">
          <div className="container mx-auto flex justify-between items-center">
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
              } absolute top-16 left-0 w-full bg-red-600 md:relative md:top-auto md:left-auto md:bg-transparent md:flex`}
            >
              <ul className="md:flex md:space-x-4">
                <li className="text-center py-2 md:py-0">
                  <a href="#features" className="block px-4 hover:underline">
                    Features
                  </a>
                </li>
                <li className="text-center py-2 md:py-0">
                  <a href="#about" className="block px-4 hover:underline">
                    About
                  </a>
                </li>
                <li className="text-center py-2 md:py-0">
                  <a href="#contact" className="block px-4 hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
  )
}

export default Navbar