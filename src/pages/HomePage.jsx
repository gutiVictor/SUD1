import { CategoryList } from '../components/CategoryList';

export const HomePage = () => {
	return (
		<div className='container mx-auto min-h-screen'>
			{/* Hero Section */}
			<section className='text-center py-8 sm:py-12 md:py-16 px-4 animate-fade-in-up'>
				<h1 className='text-heading text-4xl sm:text-5xl md:text-6xl font-bold 
				             text-gold mb-4 drop-shadow-2xl animate-glow'>
					Quiz SUD
				</h1>
				<p className='text-gold-light text-lg sm:text-xl md:text-2xl font-light 
				            max-w-2xl mx-auto text-accent'>
					Pon a prueba tus conocimientos sobre las escrituras
				</p>
			</section>

			{/* Categories Grid */}
			<CategoryList />
		</div>
	);
};
