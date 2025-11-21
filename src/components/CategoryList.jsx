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

const categoryData = [
    { category: categories.libro, src: imglibro, className: 'stagger-1' },
    { category: categories.antiguo, src: imgAntiguo, className: 'stagger-2' },
    { category: categories.nuevo, src: imgNuevo, className: 'stagger-3' },
    { category: categories.doctrina, src: imgDoctrina, className: 'stagger-4' },
    { category: categories.historia, src: imgHistoria, className: 'stagger-5' },
    { category: categories.perla, src: imgPerla, className: 'stagger-6' },
    { category: categories.ordenanzas, src: imgOrdenanzas, className: 'stagger-7' },
    { category: categories.master, src: imgMaster, className: 'stagger-8' },
    { category: categories.profetas, src: imgProfe, className: 'stagger-8' },
];

export const CategoryList = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                      gap-6 sm:gap-8 md:gap-10 p-6 sm:p-8 md:p-10 
                      max-w-7xl mx-auto'>
            {categoryData.map((item, index) => (
                <div key={index} className={item.className}>
                    <CategoryCard
                        category={item.category}
                        src={item.src}
                        alt={`Categoría ${item.category}`}
                        gradientColor='from-gold to-gold-light'
                    />
                </div>
            ))}
        </div>
    );
};
