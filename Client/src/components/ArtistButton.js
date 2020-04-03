import React from 'react';
import '../styles/ArtistButton.css';

export default function ArtistButton(props) {

    const selected = (event) => {
        props.selectArtist(props.artist.ArtistID);
        event.preventDefault();
    }

    return (
        <div id='ArtistButton' onClick={selected}>
            <div id={`centered-${props.position}`}><img src="vinyl.png" alt='Vinyl' id='outline' className="vinyl" /></div>
            <div id={`centered-${props.position}`}><img src={props.artist.Image} alt='Artist' id='artist' className="vinyl" /></div>
            <div id={`centered-${props.position}`}>{props.artist.Name}</div>
        </div>
    )
}
