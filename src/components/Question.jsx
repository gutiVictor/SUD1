import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Results } from './Results';
import Timer from './Timer';

export const Question = ({
    filteredQuestion,
    questionsFiltered,
    indexQuestion,
    setIndexQuestion,
    setActiveQuiz,
}) => {
    const [score, setScore] = useState(0);
    const [selectAnswerIndex, setSelectAnswerIndex] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [answersRandom, setAnswersRandom] = useState([]);
    const [activeResults, setActiveResults] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [justification, setJustification] = useState('');
    const [timerTime, setTimerTime] = useState(25);
    
    // Estados para las ayudas (ahora son para toda la ronda)
    const [fiftyFiftyAvailable, setFiftyFiftyAvailable] = useState(true);
    const [audienceHelpAvailable, setAudienceHelpAvailable] = useState(true);
    const [smartDiscardAvailable, setSmartDiscardAvailable] = useState(true);
    const [audienceResults, setAudienceResults] = useState(null);
    const [availableAnswers, setAvailableAnswers] = useState([]);

    useEffect(() => {
        if (filteredQuestion) {
            const answers = [
                filteredQuestion.correct_answer,
                ...filteredQuestion.incorrect_answers,
            ];
            const randomizedAnswers = answers.sort(() => Math.random() - 0.5);
            setAnswersRandom(randomizedAnswers);
            setCorrectAnswer(filteredQuestion.correct_answer);
            setAvailableAnswers(randomizedAnswers.map(answer => answer)); // Inicializar con todas las respuestas
            setTimerTime(45);
            setAnswered(false);
            setSelectAnswerIndex(null);
            setJustification('');
            setAudienceResults(null);
        }
    }, [filteredQuestion, indexQuestion]);

    // Función para la ayuda 50/50
    const useFiftyFifty = () => {
        if (fiftyFiftyAvailable && !answered) {
            const correctAnswerIndex = answersRandom.indexOf(correctAnswer);
            let newAvailableAnswers = [...availableAnswers];
            let incorrectAnswersRemaining = newAvailableAnswers
                .map((answer, index) => ({ answer, index }))
                .filter(item => item.answer !== null && item.index !== correctAnswerIndex);

            // Eliminar dos respuestas incorrectas aleatorias
            for (let i = 0; i < 2 && incorrectAnswersRemaining.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * incorrectAnswersRemaining.length);
                const toRemove = incorrectAnswersRemaining[randomIndex];
                newAvailableAnswers[toRemove.index] = null;
                incorrectAnswersRemaining.splice(randomIndex, 1);
            }

            setAvailableAnswers(newAvailableAnswers);
            setFiftyFiftyAvailable(false);
        }
    };

    // Función para descarte inteligente
    const useSmartDiscard = () => {
        if (smartDiscardAvailable && !answered) {
            const correctAnswerIndex = answersRandom.indexOf(correctAnswer);
            let newAvailableAnswers = [...availableAnswers];
            
            // Encontrar respuestas incorrectas que aún están disponibles
            let incorrectAnswersRemaining = newAvailableAnswers
                .map((answer, index) => ({ answer, index }))
                .filter(item => item.answer !== null && item.index !== correctAnswerIndex);

            // Si hay respuestas incorrectas disponibles, eliminar una al azar
            if (incorrectAnswersRemaining.length > 0) {
                const randomIndex = Math.floor(Math.random() * incorrectAnswersRemaining.length);
                const toRemove = incorrectAnswersRemaining[randomIndex];
                newAvailableAnswers[toRemove.index] = null;
                setAvailableAnswers(newAvailableAnswers);
            }

            setSmartDiscardAvailable(false);
        }
    };

    // Función para consultar al público
    const useAudienceHelp = () => {
        if (audienceHelpAvailable && !answered) {
            const correctIndex = answersRandom.indexOf(correctAnswer);
            let results = answersRandom.map((_, index) => {
                if (index === correctIndex) {
                    // La respuesta correcta tiene más probabilidad
                    return Math.floor(Math.random() * (65 - 45) + 45);
                } else if (availableAnswers[index] === null) {
                    // Si la respuesta fue eliminada por 50:50 o descarte
                    return 0;
                } else {
                    // Respuestas incorrectas disponibles
                    return Math.floor(Math.random() * 25);
                }
            });
            
            // Ajustar porcentajes para que sumen 100%
            const total = results.reduce((a, b) => a + b, 0);
            const adjustedResults = results.map(value => 
                total === 0 ? 0 : Math.round((value / total) * 100)
            );
            
            setAudienceResults(adjustedResults);
            setAudienceHelpAvailable(false);
        }
    };

    const checkAnswer = (answerText, index) => {
        setSelectAnswerIndex(index);
        setAnswered(true);

        if (answerText === correctAnswer) {
            setScore(score + 1);
            setJustification(filteredQuestion.justifications.correct_answer);
        } else {
            const incorrectIndex = filteredQuestion.incorrect_answers.indexOf(answerText);
            setJustification(filteredQuestion.justifications.incorrect_answers[incorrectIndex]);
        }
    };

    const onNextQuestion = () => {
        if (indexQuestion + 1 < questionsFiltered.length) {
            setIndexQuestion(indexQuestion + 1);
        } else {
            setActiveResults(true);
        }
    };

    const onReset = () => {
        // Reiniciar todo, incluyendo la disponibilidad de las ayudas
        setScore(0);
        setActiveQuiz(false);
        setIndexQuestion(0);
        setFiftyFiftyAvailable(true);
        setAudienceHelpAvailable(true);
        setSmartDiscardAvailable(true);
    };

    if (!filteredQuestion) {
        return <p>Cargando pregunta...</p>;
    }

    return (
        <>
            {activeResults ? (
                <Results
                    questionsFiltered={questionsFiltered}
                    score={score}
                    onReset={onReset}
                />
            ) : (
                <div className='flex flex-col justify-between shadow-md shadow-slate-300 w-full max-w-lg mx-auto h-auto p-10 rounded-lg'>
                    <div className='flex justify-between'>
                        <span className='text-xl font-bold'>
                            {indexQuestion + 1} / {questionsFiltered.length}
                        </span>
                        <div>
                            <span className='font-semibold'>Dificultad: </span>
                            <span className='font-bold'>
                                {filteredQuestion.difficulty}
                            </span>
                        </div>
                    </div>

                    {/* Botones de ayuda */}
                    <div className='flex gap-2 mb-4 flex-wrap'>
                        <button
                            className={`px-4 py-2 rounded ${
                                !fiftyFiftyAvailable ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
                            } text-white font-bold`}
                            onClick={useFiftyFifty}
                            disabled={!fiftyFiftyAvailable || answered}
                        >
                            50:50
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${
                                !audienceHelpAvailable ? 'bg-gray-300' : 'bg-purple-500 hover:bg-purple-600'
                            } text-white font-bold`}
                            onClick={useAudienceHelp}
                            disabled={!audienceHelpAvailable || answered}
                        >
                            Consultar Público
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${
                                !smartDiscardAvailable ? 'bg-gray-300' : 'bg-orange-500 hover:bg-orange-600'
                            } text-white font-bold`}
                            onClick={useSmartDiscard}
                            disabled={!smartDiscardAvailable || answered}
                        >
                            Descarte Extra
                        </button>
                    </div>

                    {/* Mostrar resultados de la audiencia si está activo */}
                    {audienceResults && (
                        <div className='bg-white p-3 rounded mb-4 border-2 border-purple-500 shadow-lg'> 
                            <h3 className='font-bold mb-2 text-black'>Resultados del Público:</h3> 
                            <div className='space-y-2'>
                                {answersRandom.map((answer, index) => (
                                    answer !== null && (
                                        <div key={index} className='flex items-center gap-2'>
                                            <div className='w-24 text-black'>{answer}:</div> 
                                            <div className='flex-1 bg-gray-200 rounded-full h-4'>
                                                <div
                                                    className='bg-purple-500 h-4 rounded-full'
                                                    style={{ width: `${audienceResults[index]}%` }}
                                                ></div>
                                            </div>
                                            <div className='w-12 text-right text-black font-medium'>{audienceResults[index]}%</div> 
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='text-gray-700 text-lg font-semibold mb-4'>
                        ID de la pregunta: {filteredQuestion.id}
                    </div>

                    <button
                        className='border px-5 py-2 rounded-lg font-bold transition-all hover:bg-yellow-500 hover:text-gray-900'
                        onClick={onReset}
                    >
                        Reiniciar
                    </button>

                    <div>
                        <h1 className='font-bold'>{filteredQuestion.question}</h1>
                    </div>

                    <Timer time={timerTime} onTimeout={() => setAnswered(true)} active={!answered} />

                    <div className='grid grid-cols-2 gap-5'>
                        {answersRandom.map((answer, index) => (
                            availableAnswers[index] !== null && (
                                <button
                                    className={`border p-5 rounded-lg flex justify-center items-center 
                                        transition-all duration-300 ease-in-out
                                        ${!answered ? 'bg-gray-800 hover:bg-gray-700 text-white' : ''}
                                        ${selectAnswerIndex !== null && index === selectAnswerIndex
                                            ? answer === correctAnswer
                                                ? 'bg-green-600 text-white'
                                                : 'bg-red-600 text-white'
                                            : ''
                                        }
                                        ${answered && answer === correctAnswer ? 'bg-green-600 text-white' : ''}
                                        transform hover:scale-102 hover:shadow-lg
                                        border-2 border-gray-600 hover:border-gray-400`}
                                    key={index}
                                    onClick={() => !answered && checkAnswer(answer, index)}
                                    disabled={answered}
                                >
                                    <p className='font-medium text-center text-sm'>
                                        {answer}
                                    </p>
                                </button>
                            )
                        ))}
                    </div>

                    {answered && selectAnswerIndex !== null && (
                        <>
                            <p className='mt-3'>
                                La respuesta correcta es: <strong>{correctAnswer}</strong>
                            </p>
                            <p className='mt-2 italic'>{justification}</p>
                        </>
                    )}

                    <Link to='/' className='mt-4'>
                        <button className='border-4 border-red-900 text-yellow-100 rounded-md px-5 py-2 hover:bg-yellow-600 hover:text-black font-medium'>
                            Regresar al Menú Principal
                        </button>
                    </Link>

                    {indexQuestion + 1 === questionsFiltered.length ? (
                        <button
                            className='border-2 border-red-900 text-black rounded-md px-5 py-2 hover:bg-yellow-600 hover:text-black font-medium mt-2'
                            onClick={() => setActiveResults(true)}
                        >
                            Finalizar
                        </button>
                    ) : (
                        <button
                            className='border-4 border-red-900 text-orange-600 rounded-md px-5 py-2 hover:bg-blue-500 hover:text-black font-medium mt-2'
                            onClick={onNextQuestion}
                        >
                            Siguiente Pregunta
                        </button>
                    )}
                </div>
            )}
        </>
    );
};