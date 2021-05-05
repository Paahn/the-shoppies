import React from 'react';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import '../styles/addnomination.css';

const AddNomination = () => {
    return (
        <div className='nomination-button'>
            <span><EmojiEventsIcon color='primary' />Nominate</span>
        </div>
    )
}

export default AddNomination
