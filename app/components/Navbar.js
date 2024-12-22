'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const refreshPage = () =>
    useEffect(() => {
      return (
        <>
          <Navbar />
        </>
      );
    }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-red-950 via-black to-red-950 animate-gradient-x text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold tracking-wider hover:text-red-400 transition-colors">
          Travour
        </h1>
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
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
          } absolute top-16 left-0 w-full bg-black rounded-md md:static md:block md:bg-transparent transition-all duration-300`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 text-center px-10">
            <li className="py-2 md:py-0">
              <Link
                href="/"
                onClick={refreshPage}
                className="block px-4 py-2 rounded-md hover:bg-red-600 hover:scale-105 transition transform"
              >
                Home
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link
                href="/search-routes"
                onClick={refreshPage}
                className="block px-4 py-2 rounded-md hover:bg-red-600 hover:scale-105 transition transform"
              >
                Routes
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link
                href="/add-routes"
                onClick={refreshPage}
                className="block px-4 py-2 rounded-md hover:bg-red-600 hover:scale-105 transition transform"
              >
                Add Routes
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link
                href="/show-post"
                onClick={refreshPage}
                className="block px-4 py-2 rounded-md hover:bg-red-600 hover:scale-105 transition transform"
              >
                Stories
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
