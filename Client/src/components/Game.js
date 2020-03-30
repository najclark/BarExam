import React, { useState, useEffect } from 'react'
import ArtistButton from './ArtistButton'
import { useContext } from 'react'
import { IntentContext, StartIntent } from './IntentContext'

export default function Game() {

    const batch_size = 20;
    const [bar, setBar] = useState([]);
    const [selectedArtist, selectArtist] = useState(-1);
    const intent = useContext(IntentContext);

    function removeByIndex(array, index) {
        return array.filter((el, i) => {
            return index !== i;
        });
    }

    useEffect(() => {
        //Artist has been selected, verify answer
        if (selectedArtist !== -1) {
            fetch(`/verifyanswer?BarID=${bar[0].bar.BarID}&pick=${selectedArtist}`).then(res => res.json()).then(data => {
                if(data.response === 'Incorrect') {
                    intent(StartIntent);
                } else {
                    selectArtist(-1); //Set to default to avoid multiple fetches to verifyanswer
                    setBar(removeByIndex(bar, 0));
                }
            });
        }
        //Grab new batch of bars if current batch is empty
        if (bar.length === 0) {
            fetch(`/getbars?batch_size=${batch_size}`).then(res => res.json()).then(data => {
                setBar(data);
            });
        }
    })

    if(bar.length === 0) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } else {
        return (
            <div>
                <div className="split left">
                    <ArtistButton artist={bar[0].options[0]} selectArtist={selectArtist} />
                    <ArtistButton artist={bar[0].options[1]} selectArtist={selectArtist} />
                </div>

                <div className="split right">
                    <ArtistButton artist={bar[0].options[2]} selectArtist={selectArtist} />
                    <ArtistButton artist={bar[0].options[3]} selectArtist={selectArtist} />
                </div>

                <h1 id="bar">{bar[0].bar.Line}</h1>
            </div>
        )
    }
}
