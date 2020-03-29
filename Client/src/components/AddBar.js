import React, { useState } from 'react'
import SongSelector from './SongSelector';
import LyricView from './LyricView';
import { DebounceInput } from 'react-debounce-input';

export default function AddBar() {

    const [song, setSong] = useState("");

    const [options, setOptions] = useState([]);

    const [selectedSong, pickSong] = useState(null);

    const searchSong = (event) => {
        setSong(event.target.value);

        fetch(`/searchsong?search_term=${event.target.value}`).then(res => res.json()).then(opts => {
            setOptions(opts);
        });
    }

    return (
        <div>
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
