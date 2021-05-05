import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import '../styles/removenomination.css';

const RemoveNomination = () => {
    return (
        <div className='remove-nomination-button'>
            <span><HighlightOffIcon color='primary' />Remove</span>
        </div>
    )
}

export default RemoveNomination
