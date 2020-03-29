import React from 'react'
import SongOption from './SongOption'

export default function SongSelector(props) {

    const cards = [];

    for(const [i, option] of props.options.entries()) {
        cards.push(<SongOption key={i} details={option} pickSong={props.pickSong} />);
    }

    return (
        <div>
            {cards}
        </div>
    )
}
