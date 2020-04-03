import React, { useState, useEffect } from 'react'
import ArtistButton from './ArtistButton'
import { useContext } from 'react'
import { IntentContext, StartIntent } from './IntentContext'
import LoadingIndicator from './LoadingIndicator'
import '../styles/Game.css';

export default function Game() {

    const batch_size = 20;
    const [bars, setBars] = useState([]);
    const [selectedArtist, selectArtist] = useState(-1);
    const intent = useContext(IntentContext);

    const [timer, setTimer] = useState(null);

    function removeByIndex(array, index) {
        return array.filter((el, i) => {
            return index !== i;
        });
    }

    function refreshBar(data) {
        clearTimeout(timer);
        setTimer(setTimeout(() => { intent(StartIntent); }, 10000));
        setBars(data);
    }

    useEffect(() => {
        //Artist has been selected, verify answer
        if (selectedArtist !== -1) {
            clearTimeout(timer);
            fetch(`/verifyanswer?BarID=${bars[0].bar.BarID}&pick=${selectedArtist}`).then(res => res.json()).then(data => {
                if(data.response === 'Incorrect') {
                    intent(StartIntent);
                } else {
                    selectArtist(-1); //Set to default to avoid multiple fetches to verifyanswer
                    refreshBar(removeByIndex(bars, 0));
                }
            });
        }
        //Grab new batch of bars if current batch is empty
        if (bars.length === 0) {
            fetch(`/getbars?batch_size=${batch_size}`).then(res => res.json()).then(data => {
                refreshBar(data);
            });
        }
    })

    if(bars.length === 0) {
        return (
            <LoadingIndicator />
        )
    } else {
        return (
            <div>
                <div className="split left">
                    <ArtistButton artist={bars[0].options[0]} selectArtist={selectArtist} position='left'/>
                    <ArtistButton artist={bars[0].options[1]} selectArtist={selectArtist} position='left'/>
                </div>
                <div id={selectedArtist !== -1 ? '' : 'timer'}>
                    <img id='needle' src="needle.png" alt='Needle' />
                    <img id='vinyl' src="vinyl.png" alt='Vinyl' />
                    <svg> <circle /> </svg>
                </div>
                <div className="split right">
                    <ArtistButton artist={bars[0].options[2]} selectArtist={selectArtist} position='right'/>
                    <ArtistButton artist={bars[0].options[3]} selectArtist={selectArtist} position='right'/>
                </div>

                <h1 id="bar">"{bars[0].bar.Line}"</h1>
            </div>
        )
    }
}
