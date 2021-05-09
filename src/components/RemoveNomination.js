import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import '../styles/removenomination.css';

const RemoveNomination = () => {
    return (
        <div>
            <div className='remove-nomination-button'>
                <HighlightOffIcon color='primary' />
                Remove
            </div>
        </div>
    )
}

export default RemoveNomination
