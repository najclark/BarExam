import React, {useContext} from 'react';
import '../styles/Navbar.css';
import { IntentContext, StartIntent } from './IntentContext';

export default function LoadingIndicator(props) {

    const intent = useContext(IntentContext);
    return (
        <ul id='navbar'>
            <h1>"Bar Exam"</h1>
            <li style={{ float: 'right' }}><button onClick={() => { intent(StartIntent); }}>HOME</button></li>
        </ul>
    )
}