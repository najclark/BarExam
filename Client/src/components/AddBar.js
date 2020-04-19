import React, { useState } from 'react'
import SongSelector from './SongSelector';
import LyricView from './LyricView';
import Navbar from './Navbar';
import { DebounceInput } from 'react-debounce-input';
import '../styles/AddBar.css';

export default function AddBar() {

    const [song, setSong] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedSong, pickSong] = useState(null);

    const searchSong = (event) => {
        setSong(event.target.value);
        //reset selectedSong to re-render SongSelector component (may remove when LyricView is fleshed out)
        pickSong(null);

        fetch(`/searchsong?search_term=${event.target.value}`).then(res => res.json()).then(opts => {
            setOptions(opts);
        });
    }

    if (selectedSong === null) {
        return (
            <div id='AddBar'>
                <Navbar />

                <DebounceInput id='song_input' debounceTimeout={300} value={song} onChange={searchSong} placeholder="Search for a song..." autoComplete='off' />

                <SongSelector options={options} pickSong={pickSong} />

            </div>
        )
    } else {
        return (
            <LyricView details={selectedSong} pickSong={pickSong}/>
        )
    }
    
}
