import React, { useEffect, useState } from 'react';
import '../styles/LyricView.css';
import LoadingIndicator from './LoadingIndicator';
import Navbar from './Navbar';
import Highlighter from "react-highlight-words";

export default function LyricView(props) {

    const [lyrics, setLyrics] = useState("");
    const [prevBars, setPrevBars] = useState([]);

    const [position, setPosition] = useState([]);
    const [highlighted, setHighlighted] = useState('');

    const [instructions, setInstructions] = useState(true);

    useEffect(() => {

        if (lyrics === "") {
            fetch(`/getlyrics?song_id=${props.details.song_id}`).then(res => res.json()).then(data => {
                setLyrics(data.lyrics);
                setPrevBars(data.bars);
            });
        }

    })

    function addBar(event) {
        resetPopup();
        // console.log(highlighted.split('\n').join('\\n'));
        fetch(
            `/addbar?line=${highlighted.split('\n').join('%0A')}&correct_artist=${props.details.artist}&song=${props.details.title}`,
            { method: 'POST' }
        ).then(res => res.json()).then(data => {
            //reset lyrics to re-render lyrics_display with new bar
            setLyrics("");
        });
    }

    function captureHighlight() {
        var selection = window.getSelection().toString().trim();
        if (selection.length !== 0) {
            var rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
            setHighlighted(selection);
            setPosition([rect.x - 75, rect.y - 5]);
        } else {
            setHighlighted('');
            setPosition([]);
        }
    }

    function resetPopup() {
        setPosition([]);
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }

    function identifyPrevBars(text, highlights) {
        var searchWords = [];
        // console.log(text);
        highlights.map((highlight, i) => {
            // highlight.Line.split('\n').map((singleLine, i2) => {
            searchWords.push(highlight.Line);
            // return null;
            // });
            return null;
        });
        // console.log(searchWords);
        return (<pre><Highlighter
            searchWords={searchWords}
            textToHighlight={text}
            highlightClassName='highlight'
        /></pre>)
    }

    var lyrics_display = (<pre>{lyrics}</pre>);
    if (prevBars.length !== 0) {
        lyrics_display = identifyPrevBars(lyrics, prevBars);
    }

    var popup_button = null;
    if (position.length === 2) {
        popup_button = (<button id='popup' style={{ left: `${position[0]}px`, top: `${position[1]}px` }} onClick={addBar}>Save Bar</button>);
    }

    if (instructions) {
        return (
            <div id='popover'>
                <div id='card'>
                    <h1> Highlight a line in the song then click 'Save Bar' to add it to the game </h1>
                    <button onClick={() => { setInstructions(false); }}>Got It!</button>
                </div>
            </div>
        )
    } else {
        return (
            <div onScroll={resetPopup} onScrollCapture={resetPopup}>
                <Navbar pickSong={props.pickSong}/>
                {lyrics === "" ?
                    <LoadingIndicator />
                    :
                    <div id='LyricView' onMouseUp={captureHighlight}>
                        <div id='SongInfo' className='noselect'>
                            <h1 id='title'>{props.details.title}</h1>
                            <h3 id='artist'>{props.details.artist}</h3>
                        </div>
                        {lyrics_display}
                    </div>
                }

                {popup_button}
            </div>
        )
    }
}

