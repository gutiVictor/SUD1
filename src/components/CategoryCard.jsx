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
            className="group relative flex flex-col rounded-2xl overflow-hidden
                     transition-all duration-500 ease-out
                     hover:scale-105 hover:-translate-y-2
                     transform perspective-1000
                     shadow-xl hover:shadow-2xl
                     glass-dark border-2 border-white/10 hover:border-gold/40
                     animate-fade-in-up opacity-0"
        >
            {/* Image Container */}
            <div className='relative p-6 sm:p-8 flex justify-center items-center 
                          bg-gradient-to-br from-white/5 to-white/10 
                          group-hover:from-white/10 group-hover:to-white/15
                          transition-all duration-500 overflow-hidden'>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent
                              translate-x-[-100%] group-hover:translate-x-[100%] 
                              transition-transform duration-1000 ease-in-out" />

                <img
                    src={src}
                    alt={alt}
                    className='relative z-10 w-32 sm:w-28 md:w-36 lg:w-40 
                             object-contain 
                             group-hover:scale-110 group-hover:rotate-3
                             transition-all duration-500 
                             drop-shadow-2xl'
                    loading="lazy"
                />
            </div>

            {/* Title Container with Glassmorphism */}
            <div className='relative glass-strong p-4 px-6
                          group-hover:bg-white/20
                          transition-all duration-500
                          border-t border-white/20'>
                <h2 className='text-lg sm:text-xl md:text-2xl font-bold
                             text-center tracking-wide
                             text-gold-light group-hover:text-gold
                             transition-all duration-300
                             text-heading
                             drop-shadow-lg'>
                    {category}
                </h2>

                {/* Decorative bottom accent */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                              w-0 group-hover:w-3/4 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent
                              transition-all duration-500" />
            </div>
        </Link>
    );
};
