import React, { useContext } from 'react'
import { IntentContext, StartIntent } from './IntentContext'
import '../styles/ScorePage.css'

export default function ScorePage(props) {

    const intent = useContext(IntentContext);

    const renderStart = () => {
        intent(StartIntent);
    }

    const renderGame = () => {
        props.restart();
    }

    return (
        <div id='score-page'>
            <h3>You scored:</h3>
            <h1>{props.score}</h1>
            <button onClick={renderStart}>Home</button>
            <button onClick={renderGame}>Play Again</button>
        </div>
    )
}
