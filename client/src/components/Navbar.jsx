import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Why Us', href: '#why-us' },
        { name: 'Stories', href: '#stories' },
    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg backdrop-blur-md bg-opacity-80' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
                <a href="#" className="flex items-center space-x-2">
                    <img src="https://placehold.co/40x40/1E8449/ffffff?text=L" alt="Logo" className="rounded-lg transition-transform duration-300 hover:scale-110" />
                    <span className="text-xl font-bold text-emerald-600 transition-colors duration-300 hover:text-emerald-800">GapoTaraan</span>
                </a>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 font-medium">Home</a>
                    {navItems.map((item, index) => (
                        <a key={index} href={item.href} className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 font-medium">
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/login" className="px-6 py-2 border-2 border-transparent text-gray-600 font-semibold rounded-full hover:text-emerald-600 transition-all duration-300 transform hover:scale-105">
                        Login
                    </Link>
                    <Link to="/register" className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105">
                        Sign Up
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;