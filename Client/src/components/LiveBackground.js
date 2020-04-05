import React, { useState, useEffect} from 'react'
import '../styles/LiveBackground.css'
import FallingBar from './FallingBar';

export default function LiveBackground() {

    const batch_size = 20;
    const [bars, setBars] = useState([]);
    const [createNewFallingBar, setCreateNewFallingBar] = useState(true);
    const [fallingBars, setFallingBars] = useState([]);


    function createFallingBar() {
        var fb = fallingBars;
        var id = randomNumber(0, bars.length);
        fb.push([id, <FallingBar key={bars[id].bar.Line} Line={bars[id].bar.Line} duration={5} removeSelf={() => {
            var filtered = fb.filter((val, i, arr) => {
                if (val[0] === id) {
                    return false;
                }
                return true;
            });
            fb = filtered;
            console.log(fb.length - filtered.length);
            setFallingBars(fb);
            setCreateNewFallingBar(true);
        }} />]);
        // setCreateNewFallingBar(false);
        setFallingBars(fb);
    }

    if(bars.length > 0 && createNewFallingBar) {
        // createFallingBar();
        setCreateNewFallingBar(false);
    }

    useEffect(() => {
        //Grab new batch of bars if current batch is empty
        if (bars.length === 0) {
            fetch(`/getbars?batch_size=${batch_size}`).then(res => res.json()).then(data => {
                setBars(data);
            });
        }

        if (fallingBars.length < 3 && bars.length > 0 && createNewFallingBar) {

        }
    })

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    if (bars.length > 0) {
        return (
            <div>
                <FallingBar bars={bars} />
                <FallingBar bars={bars} />
                <FallingBar bars={bars} />
                <FallingBar bars={bars} />
                <FallingBar bars={bars} />
                <FallingBar bars={bars} />
                <FallingBar bars={bars} />
                <FallingBar bars={bars} />
            </div>
        )
    }
    return null;
}
