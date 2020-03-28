import React, { Component } from 'react'

export class Start extends Component {

    render() {

        const renderAddBar = () => {
            this.props.intent('AddBar')
        }

        const renderGame = () => {
            this.props.intent('Game')
        }

        return (
            <div>
                <button id="addbar-btn" type="button" onClick={renderAddBar}>ADD BAR</button>
                <div id='play'>
                    <h1>"Bar Exam"</h1>
                    <button id='start' type="button" onClick={renderGame}>START</button>
                </div>
            </div>
        )
    }
}

export default Start
