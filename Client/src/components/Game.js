import React, { useState, useEffect } from 'react'
import ArtistButton from './ArtistButton'
import LoadingIndicator from './LoadingIndicator'
import '../styles/Game.css';
import ScorePage from './ScorePage'
import Filter from 'bad-words';
import { useContext } from 'react';
import { ExplicitContext } from './ExplicitContext';

export default function Game() {

    const explicit = useContext(ExplicitContext).explicit;
    const filter = (explicit ? new Filter({ emptyList: true }) : new Filter());

    const batch_size = 20;

    const [state, setState] = useState({
        bars: [],
        selectedArtist: -1,
        timer: null,
        scorePage: false,
        score: -1
    });

    function removeByIndex(array, index) {
        return array.filter((el, i) => {
            return index !== i;
        });
    }

    function refreshBar(data) {
        clearTimeout(state.timer);
        setState({
            bars: data,
            selectedArtist: -1,
            timer: null,
            scorePage: false,
            score: state.score + 1
        });
    }

    function refreshTimer() {
        setState({
            ...state, timer: setTimeout(() => {
                setState({ ...state, timer: [], selectedArtist: -1, scorePage: true });
            }, 10000)
        });
    }

    function selectArtist(id) {
        setState({ ...state, selectedArtist: id });
    }

    useEffect(() => {
        //Start timer if refreshBar was just called
        if(state.bars.length !== 0 && state.timer === null) {
            refreshTimer();
        }
        //Artist has been selected, verify answer
        if (state.selectedArtist !== -1) {
            clearTimeout(state.timer);
            fetch(`/verifyanswer?BarID=${state.bars[0].bar.BarID}&pick=${state.selectedArtist}`).then(res => res.json()).then(data => {
                if (data.response === 'Incorrect') {
                    setState({ ...state, selectedArtist: -1, scorePage: true});
                } else {
                    refreshBar(removeByIndex(state.bars, 0));
                }
            });
        }
        //Grab new batch of bars if current batch is empty
        if (state.bars.length === 0) {
            fetch(`/getbars?batch_size=${batch_size}`).then(res => res.json()).then(data => {
                refreshBar(data);
            });
        }
    })

    if (state.bars.length === 0) {
        return (
            <LoadingIndicator />
        )
    } else if (state.scorePage) {
        return (
            <ScorePage score={state.score} restart={() => {
                setState({
                    bars: [],
                    selectedArtist: -1,
                    timer: null,
                    scorePage: false,
                    score: -1
                });
            }} />
        )
    } else {
        return (
            <div>
                <div className="split left">
                    <ArtistButton artist={state.bars[0].options[0]} selectArtist={selectArtist} position='left' />
                    <ArtistButton artist={state.bars[0].options[1]} selectArtist={selectArtist} position='left' />
                </div>
                <div id={state.selectedArtist !== -1 ? '' : 'timer'}>
                    <img id='needle' src="needle.png" alt='Needle' />
                    <img id='vinyl' src="vinyl.png" alt='Vinyl' />
                    <svg> <circle /> </svg>
                </div>
                <div className="split right">
                    <ArtistButton artist={state.bars[0].options[2]} selectArtist={selectArtist} position='right' />
                    <ArtistButton artist={state.bars[0].options[3]} selectArtist={selectArtist} position='right' />
                </div>

                <h1 id="bar">"{filter.clean(state.bars[0].bar.Line)}"</h1>
            </div>
        )
    }
}