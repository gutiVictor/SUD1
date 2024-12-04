import { imgs, categories } from '../dataold';
import { CategoryCard } from './CategoryCard';

const [
    imglibro,
    imgAntiguo,
    imgNuevo,
    imgDoctrina,
    imgHistoria,
    imgPerla,
    imgOrdenanzas,
    imgMaster,
    imgProfe,
] = imgs;

export const CategoryList = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                      gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 
                      max-w-7xl mx-auto'>
            <CategoryCard
                category={categories.libro}
                src={imglibro}
                alt={`Categoría ${categories.libro}`}
                gradientColor='from-purple-500 to-pink-500'
            />
            <CategoryCard
                category={categories.antiguo}
                src={imgAntiguo}
                alt={`Categoría ${categories.antiguo}`}
                gradientColor='from-lime-400 to-teal-700'
            />
            <CategoryCard
                category={categories.nuevo}
                src={imgNuevo}
                alt={`Categoría ${categories.nuevo}`}
                gradientColor='from-red-400 to-zinc-400'
            />
            <CategoryCard
                category={categories.doctrina}
                src={imgDoctrina}
                alt={`Categoría ${categories.doctrina}`}
                gradientColor='from-cyan-200 to-lime-200'
            />
            <CategoryCard
                category={categories.historia}
                src={imgHistoria}
                alt={`Categoría ${categories.historia}`}
                gradientColor='from-sky-300 to-indigo-900'
            />
            <CategoryCard
                category={categories.perla}
                src={imgPerla}
                alt={`Categoría ${categories.perla}`}
                gradientColor='from-amber-400 to-emerald-600'
            />
            <CategoryCard
                category={categories.ordenanzas}
                src={imgOrdenanzas}
                alt={`Categoría ${categories.ordenanzas}`}
                gradientColor='from-violet-900 to-rose-500 '
            />

            <CategoryCard
                category={categories.master} // Accede correctamente a 'master'
                src={imgMaster}
                alt={`Categoría ${categories.master}`}
                gradientColor="from-violet-900 to-rose-500"
            />

                <CategoryCard
                category={categories.profetas} // Accede correctamente a 'master'
                src={imgProfe}
                alt={`Categoría ${categories.profetas}`}
                gradientColor="from-violet-900 to-rose-500"
            />

        </div>
    );
};
