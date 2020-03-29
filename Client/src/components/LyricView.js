import React, { useEffect, useState } from 'react'
import Popover from 'react-text-selection-popover'

export default function LyricView(props) {

    const [lyrics, setLyrics] = useState("");

    // const [range, highlightRange] = useState([]);

    useEffect(() => {

        fetch(`/getlyrics?song_id=${props.song}`).then(res => res.json()).then(data => {
            setLyrics(data);
        });

    })


    return (
        <div>
            {lyrics === "" ? 
                <h1>Loading</h1>
                 : 
                <div>
                    <p>{lyrics}</p>
                    <Popover>Hello there</Popover>
                </div>
            }
        </div>
    )
}
