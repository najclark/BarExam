import React, { useEffect, useState } from 'react'
import Popover from 'react-text-selection-popover'

export default function LyricView(props) {

    const [lyrics, setLyrics] = useState("");

    const [highlighted, setHighlighted] = useState("");

    //needed to capture 'Add Bar' onClick
    const ref = React.createRef();

    useEffect(() => {

        if (lyrics === "") {
            fetch(`/getlyrics?song_id=${props.details.song_id}`).then(res => res.json()).then(data => {
                setLyrics(data);
            });
        }

    })

    function addBar(event) {
        fetch(
            `/addbar?line=${highlighted}&correct_artist=${props.details.artist}&song=${props.details.title}`,
            { method: 'POST' }
        ).then(res => res.json()).then(data => {
            console.log(data);
        });
    }

    function highlight() {
        setHighlighted(window.getSelection().toString().trim());
    }

    return (
        <div>
            {lyrics === "" ?
                <h1>Loading</h1>
                :
                <div>
                    <pre ref={ref}>{lyrics}</pre>
                    <Popover selectionRef={ref} onTextSelect={highlight}>
                        <button type="button" onClick={addBar}>Save Bar</button>
                    </Popover>
                </div>
            }
        </div>
    )
}

