import React, {useState} from 'react';
import './App.css';
import Start from './components/Start';
import Game from './components/Game';


function App() {

    const [activeComponent, intent] = useState('Start')

    if (activeComponent === 'Start') {
        return (
            <div className="App">
                <Start intent={intent} />
            </div>
        );
    } else if (activeComponent === 'Game') {
        return (
            <div className="App">
                <Game intent={intent} />
            </div>
        );
    }
    
    return null;
}

export default App;
