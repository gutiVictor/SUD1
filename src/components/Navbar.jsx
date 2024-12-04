import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className='bg-yellow-500 bg-opacity-100 py-2'>
            <div className='container mx-auto flex justify-center items-center'>
                <Link to='/'>
                    <h1 className='text-white text-lg font-bold hover:scale-110 transition-all duration-500 text-center'>
                        Quiz SUD Rama Granada AUDAVIALL
                    </h1>
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='text-white text-lg focus:outline-none md:hidden ml-auto'
                >
                    <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M4 6h16M4 12h16m-7 6h7'
                        />
                    </svg>
                </button>
            </div>
            <nav className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:w-auto`}>
                <ul className='md:flex md:space-x-2'>
                <li className='ml-5'>
                        <Link to='/' className='text-white hover:text-gray-300 block mt-2 md:inline-block md:mt-0'>
                           INICIO
                        </Link>
                    </li>
                    {/* <li>
                        <Link to='/categorias' className='text-white hover:text-gray-300 block mt-4 md:inline-block md:mt-0'>
                            Categorías
                        </Link>
                    </li>
                    <li>
                        <Link to='/resultados' className='text-white hover:text-gray-300 block mt-4 md:inline-block md:mt-0'>
                            Resultados
                        </Link>
                    </li> */}
                </ul>
            </nav>
        </header>
    );
};
