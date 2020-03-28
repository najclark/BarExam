import React from 'react'

export default function ArtistButton(props) {

    const selected = () => {
        props.selectArtist(props.artist.ArtistID);
    }

    return (
        <div>
            <div className="ArtistButton">
                <button type="button" onClick={selected}>{props.artist.Name}</button>
            </div>
        </div>
    )
}
