import React, { useState } from 'react'
import SongSelector from './SongSelector';
import LyricView from './LyricView';

export default function AddBar() {

    const [song, setSong] = useState("");

    const [options, setOptions] = useState([]);

    const [selectedSong, pickSong] = useState("");

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
                <input type="text" value={song} onChange={searchSong} />
                </label>
            </form>

            {selectedSong === "" ? <SongSelector options={options} pickSong={pickSong}/> : <LyricView song={selectedSong} />}
            
        </div>
    )
}
