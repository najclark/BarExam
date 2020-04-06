import '../styles/LiveBackground.css'
import React, { Component } from 'react'

export class FallingBar extends Component {

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    updateInterval() {
        this.inteval = setInterval(() => {
            this.setState(state => ({
                top: state.top + this.microstep
            }));
        }, (this.duration * 1000) / (100 / this.microstep));
    }

    updateBar() {
        clearInterval(this.inteval);
        this.left = this.randomNumber(0, 90);
        this.line = this.props.bars[this.randomNumber(0, this.props.bars.length)].bar.Line;
        this.duration = this.randomNumber(5, 15);
        this.updateInterval();
    }

    constructor(props) {
        super(props);
        this.state = {
            top: this.randomNumber(0, 90)
        };
        this.microstep = 0.1;
    }

    componentDidMount() {
        this.updateBar();
    }

    componentDidUpdate() {
        if (this.state.top > 100) {
            this.setState({ top: 0 });
            this.updateBar();
        }
    }

    render() {
        return (
            <div>
                <pre style={{ top: `${this.state.top}%`, left: `${this.left}%`}} className='falling-bar'>"{this.line}"</pre>
            </div>
        )
    }
}

export default FallingBar