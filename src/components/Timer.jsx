import React, { useState, useEffect } from 'react';

const Timer = ({ time, onTimeout, active }) => {
    const [seconds, setSeconds] = useState(time);

    // Reiniciar el temporizador cuando `time` o `active` cambian
    useEffect(() => {
        if (active) {
            setSeconds(time);
        }
    }, [time, active]);

    useEffect(() => {
        if (!active || seconds <= 0) return;

        const timer = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds, active]);

    useEffect(() => {
        if (seconds === 0) {
            onTimeout();
        }
    }, [seconds, onTimeout]);

    return (
        <div className='text-center text-lg font-bold'>
            Tiempo restante: {seconds} segundos
        </div>
    );
};

export default Timer;
