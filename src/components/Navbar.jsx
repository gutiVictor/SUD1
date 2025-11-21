import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className='glass-dark sticky top-0 z-50 animate-slide-in shadow-lg'>
            <div className='container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center'>
                <Link to='/' className='flex-1'>
                    <h1 className='text-heading text-gold text-xl sm:text-2xl md:text-3xl font-bold 
                                 hover:scale-105 transition-all duration-300 text-center
                                 hover:text-gold-light drop-shadow-lg'>
                        Quiz SUD Rama Granada
                    </h1>
                </Link>
                
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='text-gold text-lg focus:outline-none md:hidden ml-4
                             hover:text-gold-light transition-colors duration-300'
                    aria-label="Toggle menu"
                >
                    <svg
                        className='w-7 h-7'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                </button>
            </div>
            
            <nav className={`${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 md:max-h-full md:opacity-100'} 
                          overflow-hidden transition-all duration-300 ease-in-out
                          md:block border-t border-white/10 md:border-0`}>
                <ul className='flex flex-col md:flex-row md:justify-center md:items-center 
                             gap-2 md:gap-6 px-4 py-2 md:py-0'>
                    <li>
                        <Link 
                            to='/' 
                            className='text-gold-light hover:text-gold block py-2 md:py-1 
                                     text-center font-medium transition-all duration-300
                                     hover:scale-105 text-accent text-base md:text-lg'
                            onClick={() => setIsOpen(false)}
                        >
                            INICIO
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
