import React from 'react';

const Rodape = () => {
    return (
        <div className='text-center p-3' id="sr" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            &copy; {new Date().getFullYear()} Copyright:{' '}
            GoWake
        </div>
    );
};

export default Rodape;