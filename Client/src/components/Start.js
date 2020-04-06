import React, {useContext} from 'react';
import { IntentContext, AddBarIntent, GameIntent } from './IntentContext';
import '../styles/Start.css'

export default function Start() {

    const intent = useContext(IntentContext);

    const renderAddBar = () => {
        intent(AddBarIntent)
    }

    const renderGame = () => {
        intent(GameIntent)
    }

    return (
        <div>
            <div id='play'>
                <h1>"Bar Exam"</h1>
                <h3>Select who said the bar before time runs out.</h3>
                <button id='start' onClick={renderGame}>PLAY</button>
                <button id="start" onClick={renderAddBar}>ADD A BAR</button>
            </div>
        </div>
    )
}
