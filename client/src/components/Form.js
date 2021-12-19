import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import confetti from 'canvas-confetti';

const Styles = styled.div`
    .react-datepicker-wrapper,
    .react-datepicker__input-container,
    .react-datepicker__input-container input {
        width: 175px;
    }

    .react-datepicker__close-icon::before,
    .react-datepicker__close-icon::after {
        background-color: grey;
    }
`;

export default function Form({
    currentCountry,
    setCurrentCountry,
    addCountry,
    closePopup,
    countriesData,
}) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    return (
        <>
            <h1>{currentCountry.name}</h1>
            <DatePickerRange
                currentCountry={currentCountry}
                setCurrentCountry={setCurrentCountry}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
            <Favourites />
            <button
                onClick={() => {
                    // Add new country

                    // Update existing country

                    // Fields are empty

                    if (
                        currentCountry.startDate ||
                        currentCountry.endDate ||
                        currentCountry.photoUrl !== "" ||
                        currentCountry.memory.length !== 0 ||
                        currentCountry.food.length !== 0 ||
                        currentCountry.souvenir.length !== 0
                    ) {
                        addCountry(currentCountry);
                        closePopup();
                    } else {
                        closePopup();
                    }
                }}
            >
                SAVE
            </button>
            <button
                onClick={() => {
                    var end = Date.now() + (15 * 1000);
                    var colors = ['#bb0000', '#ffffff'];

                    (function frame() {
                        confetti({
                            particleCount: 2,
                            angle: 60,
                            spread: 55,
                            origin: { x: 0 },
                            colors: colors
                        });
                        confetti({
                            particleCount: 2,
                            angle: 120,
                            spread: 55,
                            origin: { x: 1 },
                            colors: colors
                        });

                        if (Date.now() < end) {
                            requestAnimationFrame(frame);
                        }
                    }());
                }}
            >
                CONFETTI
            </button>
        </>
    );
}

function DatePickerRange({
    currentCountry,
    setCurrentCountry,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
}) {
    return (
        <div style={{ display: "flex" }}>
            <DatePicker
                // isClearable
                filterDate={(d) => {
                    return new Date() > d;
                }}
                placeholderText="Select Start Date"
                dateFormat="MMMM d, yyyy"
                selected={currentCountry.startDate}
                selectsStart
                startDate={currentCountry.startDate}
                endDate={currentCountry.endDate}
                onChange={(date) => {
                    currentCountry.startDate = date;
                    setCurrentCountry(currentCountry);
                }}
            />
            <DatePicker
                isClearable
                filterDate={(d) => {
                    return new Date() > d;
                }}
                placeholderText="Select End Date"
                dateFormat="MMMM d, yyyy"
                selected={endDate}
                selectsEnd
                startDate={currentCountry.startDate}
                endDate={endDate}
                minDate={currentCountry.startDate}
                onChange={(date) => {
                    setEndDate(date);
                    currentCountry.endDate = date;
                    setCurrentCountry(currentCountry);
                }}
            />
        </div>
    );
}

function favouriteColumn() { }

//For memory keeping text
function Favourites() {
    const [inputList, setInputList] = useState([
        { favMemory: "", favFood: "", favGift: "" },
    ]);
    // Input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // Add button
    const handleAddClick = () => {
        setInputList([
            ...inputList,
            { favMemory: "", favFood: "", favGift: "" },
        ]);
    };

    return (
        <div className="Favourites">
            <h3>What were your favourite parts of the trip?</h3>
            {inputList.map((x, i) => {
                return (
                    <div className="box" key={i}>
                        <input
                            name="favMemory"
                            placeholder="Favourite Memory"
                            value={x.favMemory}
                            onChange={(e) => handleInputChange(e, i)}
                        />
                        <input
                            className="ml10"
                            name="favFood"
                            placeholder="Memorable Restaurant"
                            value={x.favFood}
                            onChange={(e) => handleInputChange(e, i)}
                        />
                        <input
                            className="ml10"
                            name="favGift"
                            placeholder="Favourite Souvenir"
                            value={x.favGift}
                            onChange={(e) => handleInputChange(e, i)}
                        />
                        <div className="btn-box">
                            {inputList.length !== 1 && (
                                <button
                                    className="mr10"
                                    onClick={() => handleRemoveClick(i)}
                                >
                                    Remove
                                </button>
                            )}
                            {inputList.length - 1 === i && (
                                <button onClick={handleAddClick}>Add</button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* working on the confetti pop up
const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  }

  export class SchoolPride extends React.Component {
    constructor(props) {
      super(props);
      this.isAnimationEnabled = false;
      this.animationInstance = null;
      this.nextTickAnimation = this.nextTickAnimation.bind(this);
    }

    makeShot = (angle, originX) => {
      this.animationInstance && this.animationInstance({
        particleCount: 3,
        angle,
        spread: 55,
        origin: { x: originX },
        colors: ['#bb0000', '#ffffff'],
      });
    }

    nextTickAnimation = () => {
      this.makeShot(60, 0);
      this.makeShot(120, 1);
      if (this.isAnimationEnabled) requestAnimationFrame(this.nextTickAnimation);
    }

    startAnimation = () => {
      if (!this.isAnimationEnabled) {
        this.isAnimationEnabled = true;
        this.nextTickAnimation();
      }
    }

    pauseAnimation = () => {
      this.isAnimationEnabled = false;
    }

    stopAnimation = () => {
      this.isAnimationEnabled = false;
      this.animationInstance && this.animationInstance.reset();
    }

    handlerClickStart = () => {
      this.startAnimation();
    };

    handlerClickPause = () => {
      this.pauseAnimation();
    };

    handlerClickStop = () => {
      this.stopAnimation();
    };

    getInstance = (instance) => {
      this.animationInstance = instance;
    };

    componentWillUnmount() {
      this.isAnimationEnabled = false;
    }

    render() {
      return (
        <>
          <div>
            <button onClick={this.handlerClickStart}>SAVE</button>
          </div>
          <ReactCanvasConfetti refConfetti={this.getInstance} style={canvasStyles}/>
        </>
      );
    }
  } */