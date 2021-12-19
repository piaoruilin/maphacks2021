import React, { useEffect, useState } from "react";
import "./Form.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import confetti from "canvas-confetti";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

export default function Form({
    currentCountry,
    setCurrentCountry,
    addCountry,
    closePopup,
    countriesData,
    showErrorToast,
    showSuccessToast,
}) {
    /* ------------------------------ LOCAL STORAGE ----------------------------- */
    useEffect(() => {
        // find for country in user's local storage
        const foundCountry = countriesData.filter(
            (x) => x.rsmKey === currentCountry.rsmKey
        )[0];
        if (foundCountry) {
            setStartDate(foundCountry.startDate);
            setEndDate(foundCountry.endDate);
            setMemoryList(foundCountry.memory);
            setFoodList(foundCountry.food);
            setSouvenirList(foundCountry.souvenir);
        }
    }, []);

    /* --------------------------------- STATES --------------------------------- */
    const [memoryList, setMemoryList] = useState([]);
    const [foodList, setFoodList] = useState([]);
    const [souvenirList, setSouvenirList] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <>
            <h1>{currentCountry.name}</h1>
            <DatePickerRange
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                countriesData={countriesData}
            />
            <Favourites
                memoryList={memoryList}
                setMemoryList={setMemoryList}
                foodList={foodList}
                setFoodList={setFoodList}
                souvenirList={souvenirList}
                setSouvenirList={setSouvenirList}
                showErrorToast={showErrorToast}
            />
            <button
                onClick={() => {
                    if (
                        // Adding new country or updating existing country
                        startDate ||
                        endDate ||
                        memoryList.length > 0 ||
                        foodList.length > 0 ||
                        souvenirList.length > 0
                    ) {
                        currentCountry.startDate = startDate;
                        currentCountry.endDate = endDate;
                        currentCountry.memory = memoryList;
                        currentCountry.food = foodList;
                        currentCountry.souvenir = souvenirList;
                        setCurrentCountry(currentCountry);
                        addCountry(currentCountry);
                        showSuccessToast();

                        // CONFETTI
                        var end = Date.now() + 1 * 1000;
                        // var colors = ['#bb0000', '#ffffff'];

                        (function frame() {
                            confetti({
                                particleCount: 2,
                                angle: 60,
                                spread: 55,
                                origin: { x: 0 },
                                // colors: colors
                            });
                            confetti({
                                particleCount: 2,
                                angle: 120,
                                spread: 55,
                                origin: { x: 1 },
                                // colors: colors
                            });

                            if (Date.now() < end) {
                                requestAnimationFrame(frame);
                            }
                        })();

                        closePopup();
                    } else {
                        // Fields are empty
                        // closePopup();
                        showErrorToast();
                    }
                }}
            >
                SAVE
            </button>
        </>
    );
}

function DatePickerRange({ startDate, setStartDate, endDate, setEndDate }) {
    return (
        <div style={{ display: "flex" }}>
            <DatePicker
                isClearable
                filterDate={(d) => {
                    return new Date() > d;
                }}
                placeholderText="Select Start Date"
                dateFormat="MMMM d, yyyy"
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={(date) => setStartDate(date)}
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
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                onChange={(date) => setEndDate(date)}
            />
        </div>
    );
}

function FavouriteColumn({ favList, setFavList, text, showErrorToast }) {
    const [newItem, setNewItem] = useState("");
    // Remove button
    const handleRemove = (index) => {
        const list = [...favList];
        list.splice(index, 1);
        setFavList(list);
    };
    // Add button
    const handleAdd = (event) => {
        event.preventDefault();
        if (!newItem) {
            showErrorToast("The field is empty!");
        } else {
            setFavList([...favList, newItem]);
        setNewItem("");
        }
        
        
    };
    return (
        <div>
            {favList.map((x, i) => {
                return (
                    <div key={i} className="list-item">
                        {x}
                        <FaTrashAlt className="trash-btn" onClick={() => {
                            handleRemove(i)
                        }} />
                    </div>
                );
            })}
            <form onSubmit={handleAdd}>
                <input
                    className="ml10"
                    name="favourite"
                    placeholder={`favourite ${text}`}
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <div className="btn-box">
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
}
function Favourites({
    memoryList,
    setMemoryList,
    foodList,
    setFoodList,
    souvenirList,
    setSouvenirList,
    showErrorToast
}) {
    return (
        <div>
            <h3>What were your favourite parts of the trip?</h3>
            <div className="flex-row">
                <FavouriteColumn
                    favList={memoryList}
                    setFavList={setMemoryList}
                    text={"memory"}
                    showErrorToast={showErrorToast}
                />
                <FavouriteColumn
                    favList={foodList}
                    setFavList={setFoodList}
                    text={"food"}
                    showErrorToast={showErrorToast}
                />
                <FavouriteColumn
                    favList={souvenirList}
                    setFavList={setSouvenirList}
                    text={"souvenir"}
                    showErrorToast={showErrorToast}
                />
            </div>
        </div>
    );
}
