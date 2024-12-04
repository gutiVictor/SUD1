import { Link } from "react-router-dom";

export const CategoryCard = ({
    category,
    alt,
    src,
    gradientColor,
}) => {
    return (
        <Link
            to={`/category/${category}`}
            className="flex flex-col justify-between rounded-2xl overflow-hidden bg-orange-200 
                     transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl
                     transform hover:-translate-y-1 cursor-pointer group"
        >
            <div className='p-5 flex justify-center items-center bg-white'>
                <img 
                    src={src} 
                    alt={alt} 
                    className='w-28 sm:w-24 md:w-32 lg:w-36 object-contain group-hover:scale-110 transition-transform duration-300' 
                    loading="lazy"
                /> 
            </div>

            <div className='bg-gradient-to-r from-stone-800 to-stone-700 group-hover:from-stone-900 group-hover:to-stone-800
                          p-3 px-5 transition-colors duration-300'>
                <h1 className='text-xl sm:text-lg md:text-xl lg:text-2xl font-bold text-stone-100 
                             text-center tracking-wide group-hover:text-yellow-400'>
                    {category}
                </h1>
            </div>
        </Link>
    );
};
