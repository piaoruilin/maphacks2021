import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

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

//For the date
export function DatePickerRange() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div style={{ display: "flex" }}>
            <DatePicker
                isClearable
                filterDate={d => {
                    return new Date() > d;
                }}
                placeholderText="Select Start Date"
                dateFormat="MMMM d, yyyy"
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={date => setStartDate(date)}
            />
            <DatePicker
                isClearable
                filterDate={d => {
                    return new Date() > d;
                }}
                placeholderText="Select End Date"
                dateFormat="MMMM d, yyyy"
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                onChange={date => setEndDate(date)}
            />
        </div>
    );
}

export function TableDatePicker() {
    return (
        <Styles>
            <DatePickerRange />
        </Styles>
    );
}

//For memory keeping text
function Memory() {
    const [inputList, setInputList] = useState([{ favMemory: "", favFood: "", favGift: "" }]);
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { favMemory: "", favFood: "", favGift: "" }]);
    };

    return (
        <div className="App">
            <h3>What were your favourite parts of the trip?</h3>
            {inputList.map((x, i) => {
                return (
                    <div className="box">
                        <input
                            name="favMemory"
                            placeholder="Favourite Memory"
                            value={x.favMemory}
                            onChange={e => handleInputChange(e, i)}
                        />
                        <input
                            className="ml10"
                            name="favFood"
                            placeholder="Memorable Restaurant"
                            value={x.favFood}
                            onChange={e => handleInputChange(e, i)}
                        />
                        <input
                            className="ml10"
                            name="favGift"
                            placeholder="Favourite Souvenir"
                            value={x.favGift}
                            onChange={e => handleInputChange(e, i)}
                        />
                        <div className="btn-box">
                            {inputList.length !== 1 && <button
                                className="mr10"
                                onClick={() => handleRemoveClick(i)}>Remove</button>}
                            {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Memory