import React from 'react';
import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    return (
        <div className="flex justify-center space-x-4 p-4 border-b border-gray-300">
            <Link
                to="/"
                className={`px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 ${
                    location.pathname === '/'
                        ? 'bg-gray-300 text-white'
                        : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
            >
                Edit Users
            </Link>
            <Link
                to="/users"
                className={`px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 ${
                    location.pathname === '/users'
                        ? 'bg-gray-300 text-white'
                        : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
            >
                Users
            </Link>
        </div>
    );
}

export default Header;
