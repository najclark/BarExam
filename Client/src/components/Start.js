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
            <button id="addbar-btn" type="button" onClick={renderAddBar}>ADD BAR</button>
            <div id='play'>
                <h1>"Bar Exam"</h1>
                <button id='start' type="button" onClick={renderGame}>START</button>
            </div>
        </div>
    )
}
