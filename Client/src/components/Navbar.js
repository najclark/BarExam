import React, {useContext} from 'react';
import '../styles/Navbar.css';
import { IntentContext, StartIntent } from './IntentContext';

export default function LoadingIndicator(props) {

    const intent = useContext(IntentContext);

    var backButton = null;

    if (props.pickSong !== undefined) {
        backButton = (<li style={{ float: 'left' }}><button onClick={() => { props.pickSong(null); }}>BACK</button></li>);
    }

    return (
        <ul id='navbar'>
            {backButton}
            <h1>"Bar Exam"</h1>
            <li style={{ float: 'right' }}><button onClick={() => { intent(StartIntent); }}>HOME</button></li>
        </ul>
    )
}