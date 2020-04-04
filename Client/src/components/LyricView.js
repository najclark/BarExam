import React, { useEffect, useState } from 'react';
import '../styles/LyricView.css';
import LoadingIndicator from './LoadingIndicator';
import Navbar from './Navbar';

export default function LyricView(props) {

    const [lyrics, setLyrics] = useState("");
    const [prevBars, setPrevBars] = useState([]);

    const [position, setPosition] = useState([]);
    const [highlighted, setHighlighted] = useState('');

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
        fetch(
            `/addbar?line=${highlighted}&correct_artist=${props.details.artist}&song=${props.details.title}`,
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
        // Split on highlight terms and include term into parts, ignore case
        var regex = ``;
        highlights.map((highlight, i) => {
            regex = regex.concat(`(${highlight.Line})|`);
            return null;
        });
        regex = regex.substring(0, regex.lastIndexOf('|'));
        var parts = text.split(new RegExp(regex, 'gi'));

        return <pre> {parts.map((part, i) => {
            var prev = false;

            highlights.map((highlight, i) => {
                if (highlight.Line === part) {
                    prev = true;
                }
                return null;
            });
            if (prev) {
                return <p key={i} className='noselect'><span key={i} id='highlight'>{part}</span></p>
            }

            if (String(part) !== 'undefined') {
                return (
                    <p key={i}><span key={i} id='else'>
                        {part.trim()}
                    </span></p>
                )
            }
            return null;
        })} </pre>;
    }

    var lyrics_display = (<pre>{lyrics}</pre>);
    if (prevBars.length !== 0) {
        lyrics_display = identifyPrevBars(lyrics, prevBars);
    }

    var popup_button = null;
    if (position.length === 2) {
        popup_button = (<button id='popup' style={{ left: `${position[0]}px`, top: `${position[1]}px`}} onClick={addBar}>Save Bar</button>);
    }

    return (
        <div onScroll={resetPopup} onScrollCapture={resetPopup}>
            <Navbar />
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

