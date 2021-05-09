import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import '../styles/removenomination.css';

const RemoveNomination = () => {
    return (
        <div className='remove-nomination-button'>
            <div>
                <HighlightOffIcon color='primary' />
                Remove
            </div>
        </div>
    )
}

export default RemoveNomination
