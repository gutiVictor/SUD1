import React from 'react';

export const Results = ({ score, questionsFiltered, onReset }) => {
    const percentage = ((score / questionsFiltered.length) * 100).toFixed(0);
    const isGoodScore = percentage >= 70;

    return (
        <div className='glass-dark flex flex-col justify-evenly items-center rounded-3xl w-full max-w-2xl mx-auto h-auto p-10 sm:p-12 md:p-16 gap-8 shadow-2xl border-2 border-white/10 animate-fade-in-scale'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-gold text-heading drop-shadow-2xl'>
                Resultados
            </h1>

            <div className='flex flex-col gap-6 text-center'>
                <p className='text-2xl sm:text-3xl font-bold text-gold-light text-accent'>
                    Acertaste
                </p>

                {/* Animated Score */}
                <div className={`relative inline-block ${isGoodScore ? 'animate-glow' : ''}`}>
                    <span className={`font-black text-7xl sm:text-8xl md:text-9xl 
                                   drop-shadow-2xl transition-all duration-500
                                   ${isGoodScore
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400'
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light'
                        }`}>
                        {percentage}%
                    </span>
                </div>

                <p className='text-xl sm:text-2xl text-gold-light font-medium'>
                    de las preguntas ({score} de {questionsFiltered.length})
                </p>

                {/* Achievement Message */}
                {isGoodScore && (
                    <p className='text-3xl animate-bounce'>🎉</p>
                )}
            </div>

            <button
                className='glass-strong border-2 border-gold/40 px-8 py-4 rounded-xl 
                         transition-all duration-300 font-bold text-lg
                         hover:bg-gold/30 hover:border-gold hover:scale-105
                         text-gold-light text-accent shadow-xl'
                onClick={onReset}
            >
                🔄 Vamos de nuevo
            </button>
        </div>
    );
};