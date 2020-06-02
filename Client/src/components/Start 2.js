import React, {useContext} from 'react';
import { IntentContext, AddBarIntent, GameIntent } from './IntentContext';
import '../styles/Start.css'
import { ExplicitContext } from './ExplicitContext';

export default function Start() {

    const intent = useContext(IntentContext);
    const {explicit, setExplicit} = useContext(ExplicitContext);

    const renderAddBar = () => {
        intent(AddBarIntent)
    }

    const renderGame = () => {
        intent(GameIntent)
    }

    var explicitBtnText = "SHOW EXPLICIT CONTENT";
    if(explicit) {
        explicitBtnText = "HIDE EXPLICIT CONTENT";
    }

    return (
        <div>
            <button id='explicit' type="button" onClick={() => { setExplicit(!explicit); }}>{explicitBtnText}</button>
            {/* <button id="addbar-btn" type="button" onClick={renderAddBar}>ADD BAR</button> */}
            <div id='play'>
                <h1>"Bar Exam"</h1>
                <h3>Select who said the bar before time runs out.</h3>
                <button id='start' onClick={renderGame}>PLAY</button>
                <button id='start' onClick={renderAddBar}>ADD A BAR</button>
            </div>
        </div>
    )
}
