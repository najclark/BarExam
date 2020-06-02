import React, { useState, useEffect} from 'react'
import '../styles/LiveBackground.css'
import FallingBar from './FallingBar';

export default function LiveBackground() {

    const batch_size = 100;
    const [bars, setBars] = useState([]);

    useEffect(() => {
        //Grab new batch of bars if current batch is empty
        if (bars.length === 0) {
            fetch(`/getbars?batch_size=${batch_size}`).then(res => res.json()).then(data => {
                setBars(data);
            });
        }
    });

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
