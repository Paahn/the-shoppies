import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import '../styles/nominated.css';

const Nominated = () => {
    return (
        <div>
            <span className='nominated'><CheckCircleIcon color='secondary' />Nominated</span>
        </div>
    )
}

export default Nominated
