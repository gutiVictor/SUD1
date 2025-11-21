import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Question } from '../components/Question';
import { questions, imgs } from '../dataold';

// Nueva función para seleccionar preguntas únicas sin repetir
const selectUniqueQuestions = (array, num) => {
    const selectedQuestions = new Set();
    while (selectedQuestions.size < num && selectedQuestions.size < array.length) {
        const randomIndex = Math.floor(Math.random() * array.length);
        selectedQuestions.add(array[randomIndex]);
    }
    return Array.from(selectedQuestions);
};

// Función para normalizar la dificultad (quita tildes y pasa todo a minúsculas)
const normalizeDifficulty = (difficulty) => {
    return difficulty.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const CategoryPage = () => {
    const { category } = useParams(); // Obtiene la categoría de la URL

    // Busca la imagen correspondiente a la categoría o asigna una específica si es Master
    const [imgCategory] = category === "Master"
        ? ["/src/assets/master.png"] // Imagen específica para la tarjeta Master
        : imgs.filter(img => img === `/src/assets/${category.toLowerCase()}.png`);

    const [questionsFiltered, setQuestionsFiltered] = useState([]); // Preguntas filtradas
    const [indexQuestion, setIndexQuestion] = useState(0); // Índice de la pregunta actual
    const [activeQuiz, setActiveQuiz] = useState(false); // Determina si el quiz está activo
    const [selectedDifficulty, setSelectedDifficulty] = useState(null); // Dificultad seleccionada

    // Cantidades de preguntas por dificultad
    const questionCounts = {
        facil: 15,
        medio: 14,
        dificil: 14,
        aleatorio: 15
    };

    // Filtrar preguntas según la categoría seleccionada
    useEffect(() => {
        if (category === "Master") {
            // Si la categoría es "Master", carga todas las preguntas
            setQuestionsFiltered(questions);
        } else {
            // Filtra preguntas específicas de la categoría seleccionada
            const filteredQuestions = questions.filter(
                question => question.category === category
            );
            setQuestionsFiltered(filteredQuestions);
        }
    }, [category]);

    // Manejar la selección de dificultad y activar el quiz
    const handleStartQuiz = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setActiveQuiz(true);
    };

    // Filtra preguntas por la dificultad seleccionada
    const filteredQuestionsByDifficulty = selectedDifficulty
        ? questionsFiltered.filter(
            question => normalizeDifficulty(question.difficulty) === normalizeDifficulty(selectedDifficulty)
        )
        : questionsFiltered;

    // Determinar la cantidad de preguntas según la dificultad seleccionada
    const numQuestions = selectedDifficulty
        ? questionCounts[normalizeDifficulty(selectedDifficulty)]
        : questionCounts.aleatorio;

    // Seleccionar preguntas únicas sin repetir
    const finalQuestions = selectUniqueQuestions(filteredQuestionsByDifficulty, numQuestions);

    return (
        <div
            className='container flex flex-col items-center justify-center gap-10'
            style={{ height: 'calc(100vh - 5rem)' }}
        >
            {activeQuiz ? (
                <Question
                    filteredQuestion={finalQuestions[indexQuestion]} // Pregunta actual
                    setIndexQuestion={setIndexQuestion} // Cambiar el índice
                    indexQuestion={indexQuestion} // Índice de la pregunta
                    questionsFiltered={finalQuestions} // Preguntas seleccionadas
                    setActiveQuiz={setActiveQuiz} // Cambiar el estado del quiz
                />
            ) : (
                <>
                    {/* Category Display Card */}
                    <div className='glass-dark rounded-3xl p-8 sm:p-10 md:p-12 
                                  max-w-2xl mx-auto animate-fade-in-scale
                                  shadow-2xl border-2 border-white/10'>

                        {/* Category Title */}
                        <h1 className='text-3xl sm:text-4xl md:text-5xl text-gold text-center 
                                     font-bold mb-6 text-heading drop-shadow-xl'>
                            {category === "Master"
                                ? "Banco Completo de Preguntas"
                                : category}
                        </h1>

                        {/* Category Image */}
                        <div className='flex justify-center items-center mb-8'>
                            <img
                                src={imgCategory}
                                alt={category}
                                className='w-48 sm:w-56 md:w-64 drop-shadow-2xl
                                         hover:scale-110 transition-transform duration-500'
                            />
                        </div>

                        {/* Difficulty Selection */}
                        <div>
                            <h2 className='text-2xl sm:text-3xl font-bold text-center mb-6
                                         text-gold-light text-heading'>
                                Selecciona la dificultad:
                            </h2>

                            <div className='flex flex-col gap-4'>
                                {/* Easy Button */}
                                <button
                                    className="glass-strong text-white py-4 px-8 rounded-xl 
                                             font-bold text-lg shadow-xl 
                                             border-2 border-green-400/30 
                                             transition-all duration-300
                                             hover:bg-green-500/30 hover:border-green-400
                                             hover:scale-105 hover:shadow-green-500/50
                                             text-accent"
                                    onClick={() => handleStartQuiz('Facil')}
                                >
                                    🟢 Fácil
                                </button>

                                {/* Medium Button */}
                                <button
                                    className="glass-strong text-white py-4 px-8 rounded-xl 
                                             font-bold text-lg shadow-xl 
                                             border-2 border-yellow-400/30 
                                             transition-all duration-300
                                             hover:bg-yellow-500/30 hover:border-yellow-400
                                             hover:scale-105 hover:shadow-yellow-500/50
                                             text-accent"
                                    onClick={() => handleStartQuiz('Medio')}
                                >
                                    🟡 Medio
                                </button>

                                {/* Hard Button */}
                                <button
                                    className="glass-strong text-white py-4 px-8 rounded-xl 
                                             font-bold text-lg shadow-xl 
                                             border-2 border-red-400/30 
                                             transition-all duration-300
                                             hover:bg-red-500/30 hover:border-red-400
                                             hover:scale-105 hover:shadow-red-500/50
                                             text-accent"
                                    onClick={() => handleStartQuiz('Dificil')}
                                >
                                    🔴 Difícil
                                </button>

                                {/* Random Button */}
                                <button
                                    className="glass-strong text-white py-4 px-8 rounded-xl 
                                             font-bold text-lg shadow-xl 
                                             border-2 border-gold/40 
                                             transition-all duration-300
                                             hover:bg-gold/30 hover:border-gold
                                             hover:scale-105 hover:shadow-gold/50
                                             text-accent"
                                    onClick={() => handleStartQuiz(null)}
                                >
                                    ⭐ Aleatorio
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
