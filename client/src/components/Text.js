import React, { useState } from "react";

//For favourites
function Memory() {
    const [inputList, setInputList] = useState([{ favMemory: "", favFood: "", favGift: "" }]);
    // Input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // Add button
    const handleAddClick = () => {
        setInputList([...inputList, { favMemory: "", favFood: "", favGift: "" }]);
    };

    return (
        <div className="Favourites">
            <h2>What were your favourite parts of the trip?</h2>
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

export default Memory;