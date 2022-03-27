import React from 'react';
import './Visualiser.css';
import {getMergeSortAnimations} from '../Algorithms/MergeSort';
import {getBubbleSortAnimations} from '../Algorithms/BubbleSort';
import {getInsertionSortAnimations} from '../Algorithms/InsertionSort';
import {getQuickSortAnimations} from "../Algorithms/QuickSort";
// Change this value for the speed of the animations.
var ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
var NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#66CDAA';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class Visualiser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 530));
        }
        this.setState({array});
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let bar of arrayBars) {
            bar.style.backgroundColor = 'blue';
        }
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        this.renderAnimation(animations);
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        this.renderAnimation(animations);
    }

    insertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);
        this.renderAnimation(animations);
    }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        this.renderAnimation(animations);
    }

    renderAnimation(animations) {
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        const {array} = this.state;
        return (
            <div className="array-container">
                {array.map((value, idx) =>
                    (
                        <div className="array-bar"
                             key={idx}
                             style={{height: `${value}px`}}></div>
                    ))}
                <hr/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1 offset-md-1">
                            <button type="button" className="btn btn-primary" onClick={() => this.resetArray()}>New
                                Array
                            </button>
                        </div>
                        <div className="col-md-1">
                            <button type="button" className="btn btn-primary" onClick={() => this.bubbleSort()}>Bubble
                                Sort
                            </button>
                        </div>
                        <div className="col-md-1">
                            <button type="button" className="btn btn-primary" onClick={() => this.mergeSort()}>Merge
                                Sort
                            </button>
                        </div>
                        <div className="col-md-1">
                            <button type="button" className="btn btn-primary"
                                    onClick={() => this.insertionSort()}>Insertion
                                Sort
                            </button>
                        </div>
                        <div className="col-md-1">
                            <button type="button" className="btn btn-primary"
                                    onClick={() => this.quickSort()}>Quick
                                Sort
                            </button>
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" onChange={this.changeDelay}>
                                {/* <option>Select Delay</option> */}
                                <option value="1">Delay -{'>'} 1 ms</option>
                                <option value="3">Delay -{'>'} 3 ms</option>
                                <option value="5">Delay -{'>'} 5 ms</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" onChange={this.changeArraySize} defaultValue="100">
                                <option disabled>Change Array Size</option>
                                <option value="10">10</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="150">150</option>
                                <option value="200">200</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    changeDelay = selectedDelay => {
        ANIMATION_SPEED_MS = parseInt(selectedDelay.target.value);
    }
    changeArraySize = selectedSize => {
        if (parseInt(selectedSize.target.value)) {
            NUMBER_OF_ARRAY_BARS = parseInt(selectedSize.target.value);
            this.resetArray();
        }
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
