import React, {useState} from 'react';
import './App.css';
import Start from './components/Start';
import Game from './components/Game';
import AddBar from './components/AddBar';
import { IntentContext } from './components/IntentContext';


function App() {

    const [activeComponent, intent] = useState('Start')

    var renderedComponent = null;

    if (activeComponent === 'Start') {
        renderedComponent = (
            <div className="App">
                <Start />
            </div>
        );
    } else if (activeComponent === 'Game') {
        renderedComponent = (
            <div className="App">
                <Game />
            </div>
        );
    } else if (activeComponent === 'AddBar') {
        renderedComponent = (
            <div className="App">
                <AddBar />
            </div>
        );
    }
    
    return (
        <IntentContext.Provider value={intent}>
            {renderedComponent}
        </IntentContext.Provider>
    );
}

export default App;
