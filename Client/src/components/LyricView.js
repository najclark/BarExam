import React, { useEffect, useState } from 'react';
import Popover from 'react-text-selection-popover';
import '../styles/LyricView.css';
import LoadingIndicator from './LoadingIndicator';
import Navbar from './Navbar';

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

        return <pre ref={ref}> {parts.map((part, i) => {
            var prev = false;

            highlights.map((highlight, i) => {
                if (highlight.Line === part) {
                    prev = true;
                }
                return null;
            });
            if (prev) {
                return <p key={i}><span key={i} id='highlight'>{part}</span></p>
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

    var lyrics_display = (<pre ref={ref}>{lyrics}</pre>);
    if (prevBars.length !== 0) {
        lyrics_display = identifyPrevBars(lyrics, prevBars);
    }

    return (
        <div>
            <Navbar />
            {lyrics === "" ?
                <LoadingIndicator />
                :
                <div id='LyricView'>
                    <div id='SongInfo'>
                        <h1 id='title'>{props.details.title}</h1>
                        <h3 id='artist'>{props.details.artist}</h3>
                    </div>
                    {lyrics_display}
                    <Popover selectionRef={ref} onTextSelect={highlight}>
                        <button type="button" onClick={addBar}>Save Bar</button>
                    </Popover>
                </div>
            }
        </div>
    )
}

