import React, { useState } from 'react'
import SongSelector from './SongSelector';
import LyricView from './LyricView';
import { DebounceInput } from 'react-debounce-input';
import { useContext } from 'react';
import { IntentContext, StartIntent } from './IntentContext';

export default function AddBar() {

    const [song, setSong] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedSong, pickSong] = useState(null);
    const intent = useContext(IntentContext);

    const searchSong = (event) => {
        setSong(event.target.value);
        //reset selectedSong to re-render SongSelector component (may remove when LyricView is fleshed out)
        pickSong(null);

        fetch(`/searchsong?search_term=${event.target.value}`).then(res => res.json()).then(opts => {
            setOptions(opts);
        });
    }

    return (
        <div>
            <button id='start' type="button" onClick={() => {intent(StartIntent)}}>Home</button>
            <form>
                <label>
                    Song:
                <DebounceInput debounceTimeout={300} value={song} onChange={searchSong} />
                </label>
            </form>

            {selectedSong === null ? <SongSelector options={options} pickSong={pickSong}/> : <LyricView details={selectedSong} />}
            
        </div>
    )
}
