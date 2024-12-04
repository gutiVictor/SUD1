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
                    {/* Mostrar la categoría y su imagen */}
                    <div className='flex flex-col gap-5 mt-14'>
                        <h1 className='text-3xl text-red-500 text-center font-bold'>
                            {category === "Master" 
                                ? "Banco Completo de Preguntas" 
                                : category}
                        </h1>

                        <div className='flex justify-center items-center'>
                            <img
                                src={imgCategory}
                                alt={category}
                                className='w-60'
                            />
                        </div>
                    </div>

                    {/* Botones para seleccionar la dificultad */}
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-2xl font-bold text-center'>Selecciona la dificultad:</h2>
                        <button
    className="bg-white/20 text-white py-3 px-6 rounded-xl backdrop-blur-lg font-bold text-lg shadow-lg border border-white/30 transition-all hover:bg-white hover:text-gray-900 hover:scale-105"
    onClick={() => handleStartQuiz('Facil')}
>
    Fácil
</button>

<button
    className="bg-gradient-to-br from-gray-800 to-gray-600 text-white py-3 px-6 rounded-xl border border-gray-500 shadow-md hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-500 hover:shadow-lg transform transition-all hover:scale-105"
    onClick={() => handleStartQuiz('Medio')}
>
   Medio
</button>


<button
    className="bg-white/20 text-white py-3 px-6 rounded-xl backdrop-blur-lg font-bold text-lg shadow-lg border border-white/30 transition-all hover:bg-white hover:text-gray-900 hover:scale-105"
    onClick={() => handleStartQuiz('Dificil')}
>
    Difícil
</button>

<button
   className="bg-gradient-to-br from-gray-800 to-gray-600 text-white py-3 px-6 rounded-xl border border-gray-500 shadow-md hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-500 hover:shadow-lg transform transition-all hover:scale-105"
    onClick={() => handleStartQuiz(null)}
>
    Aleatorio
</button>

                    </div>
                </>
            )}
        </div>
    );
};
