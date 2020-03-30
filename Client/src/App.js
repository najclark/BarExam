import React, {useState} from 'react';
import './App.css';
import Start from './components/Start';
import Game from './components/Game';
import AddBar from './components/AddBar';
import { IntentContext, StartIntent, GameIntent, AddBarIntent } from './components/IntentContext';


function App() {

    const [activeComponent, intent] = useState('Start')

    var renderedComponent = null;

    if (activeComponent === StartIntent) {
        renderedComponent = (
            <div className="App">
                <Start />
            </div>
        );
    } else if (activeComponent === GameIntent) {
        renderedComponent = (
            <div className="App">
                <Game />
            </div>
        );
    } else if (activeComponent === AddBarIntent) {
        renderedComponent = (
            <div className="App">
                <AddBar />
            </div>
        );
    }
    
    return (
        <IntentContext.Provider value={intent}>
            <link href="https://fonts.googleapis.com/css?family=Righteous&display=swap" rel="stylesheet"/>
            {renderedComponent}
        </IntentContext.Provider>
    );
}

export default App;
