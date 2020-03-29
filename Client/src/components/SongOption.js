import React from 'react'

export default function SongOption(props) {

    const pickThisSong = () => {
        props.pickSong(props.details.song_id);
    }

    return (
        <div>
            <h3>{props.details.title}</h3>
            <p>{props.details.artist}</p>
            <button type="button" onClick={pickThisSong}>Pick</button>
        </div>
    )
}
