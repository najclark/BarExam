import React from 'react';
import Loader from 'react-loader-spinner';
import '../App.css';

export default function LoadingIndicator() {

    return (
        <div id='loading-indicator'><Loader color="#FFFFFF" height={100} width={100} /></div>
    )
}
