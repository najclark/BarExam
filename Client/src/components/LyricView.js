import React, { useEffect, useState } from 'react';
import Popover from 'react-text-selection-popover';
import '../styles/LyricView.css';
import LoadingIndicator from './LoadingIndicator';

export default function LyricView(props) {

    const [lyrics, setLyrics] = useState("");
    const [prevBars, setPrevBars] = useState([]);

    const [highlighted, setHighlighted] = useState("");

    //needed to capture 'Add Bar' onClick
    const ref = React.createRef();

    useEffect(() => {

        if (lyrics === "") {
            fetch(`/getlyrics?song_id=${props.details.song_id}`).then(res => res.json()).then(data => {
                setLyrics(data.lyrics);
                setPrevBars(data.bars);
            });
        }

    })

    function addBar(event) {
        fetch(
            `/addbar?line=${highlighted}&correct_artist=${props.details.artist}&song=${props.details.title}`,
            { method: 'POST' }
        ).then(res => res.json()).then(data => {
            //reset lyrics to re-render lyrics_display with new bar
            setLyrics("");
        });
    }

    function highlight() {
        setHighlighted(window.getSelection().toString().trim());
    }

    function identifyPrevBars(text, highlights) {
        // Split on highlight terms and include term into parts, ignore case
        var regex = ``;
        highlights.map((highlight, i) => {
            regex = regex.concat(`(${highlight.Line})|`);
            return null;
        });
        regex = regex.substring(0, regex.lastIndexOf('|'));
        var parts = text.split(new RegExp(regex, 'gi'));

        return <pre ref={ref}> {parts.map((part, i) =>{ 
            if (highlights.includes(part)) {
                return <p key={i} style={{fontWeight: 'bold'}}>{part}</p>
            }
            return (
                <p key={i} >
                    {part}
                </p>
            ) 
        })} </pre>;
    }

    var lyrics_display = (<pre ref={ref}>{lyrics}</pre>);
    if(prevBars.length !== 0) {
        lyrics_display = identifyPrevBars(lyrics, prevBars);
    }

    return (
        <div>
            {lyrics === "" ?
                <LoadingIndicator />
                :
                <div>
                    {lyrics_display}
                    <Popover selectionRef={ref} onTextSelect={highlight}>
                        <button type="button" onClick={addBar}>Save Bar</button>
                    </Popover>
                </div>
            }
        </div>
    )
}

