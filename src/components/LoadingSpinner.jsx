import React from 'react';
import { BeatLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <BeatLoader color='#36D7B7' size={20} />
        </div>
    );
};

export default LoadingSpinner;