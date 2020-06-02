import React from 'react';
import SongOption from './SongOption';
import '../styles/SongSelector.css';

export default function SongSelector(props) {

    const cards = [];

    for(const [i, option] of props.options.entries()) {
        cards.push(<SongOption key={i} details={option} pickSong={props.pickSong} />);
    }

    return (
        <div id='SongSelector'>
            {cards}
        </div>
    )
}
