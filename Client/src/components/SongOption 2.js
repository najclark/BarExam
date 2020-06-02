import React from 'react'
import '../styles/SongOption.css'

export default function SongOption(props) {

    const pickThisSong = () => {
        props.pickSong(props.details);
    }

    return (
        <div id='SongOption' onClick={pickThisSong}>
            <img src={props.details.song_art_image_url} id='img' alt='Song' />
            <div id='details'>
                <h3>{props.details.title}</h3>
                <p>{props.details.artist}</p>
            </div>
        </div>
    )
}
